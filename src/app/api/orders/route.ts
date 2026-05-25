import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id! },
    orderBy: { createdAt: "desc" },
    include: {
      items: { include: { product: { select: { name: true, image: true } } } },
    },
  });

  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { items, shippingName, shippingPhone, shippingAddress } = body;

    if (!items?.length || !shippingName || !shippingPhone || !shippingAddress) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    // Validate stock AND fetch real prices from DB (never trust client price)
    const validatedItems: { productId: string; quantity: number; price: number; name: string }[] = [];
    let serverTotal = 0;

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Produk tidak ditemukan` },
          { status: 400 }
        );
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stok ${product.name} tidak mencukupi` },
          { status: 400 }
        );
      }
      validatedItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price, // use DB price, ignore client price
        name: product.name,
      });
      serverTotal += product.price * item.quantity;
    }

    // Create order using server-calculated total
    const order = await prisma.order.create({
      data: {
        userId: session.user.id!,
        total: serverTotal,
        shippingName,
        shippingPhone,
        shippingAddress,
        items: {
          create: validatedItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    // Decrease stock
    for (const item of validatedItems) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Try Midtrans snap token
    let snapToken = null;
    try {
      const midtransClient = await import("midtrans-client");
      const snap = new midtransClient.Snap({
        isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
        serverKey: process.env.MIDTRANS_SERVER_KEY!,
      });

      const parameter = {
        transaction_details: {
          order_id: order.id,
          gross_amount: Math.round(serverTotal),
        },
        customer_details: {
          first_name: shippingName,
          phone: shippingPhone,
          shipping_address: { address: shippingAddress },
        },
        item_details: validatedItems.map((item) => ({
          id: item.productId,
          price: Math.round(item.price),
          quantity: item.quantity,
          name: item.name,
        })),
      };

      const transaction = await snap.createTransaction(parameter);
      snapToken = transaction.token;

      await prisma.order.update({
        where: { id: order.id },
        data: { snapToken },
      });
    } catch (midtransError) {
      console.warn("Midtrans error (continuing without payment):", midtransError);
    }

    return NextResponse.json({ orderId: order.id, snapToken });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal membuat pesanan" }, { status: 500 });
  }
}
