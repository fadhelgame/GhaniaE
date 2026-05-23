import { auth } from "@/lib/auth";
import Navbar from "@/components/shop/Navbar";
import Footer from "@/components/shop/Footer";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user
    ? {
        name: session.user.name,
        email: session.user.email,
        role: (session.user as { role?: string }).role,
      }
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
