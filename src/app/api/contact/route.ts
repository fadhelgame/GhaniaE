import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Semua field wajib diisi" }, { status: 400 });
    }

    const contact = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal mengirim pesan" }, { status: 500 });
  }
}
