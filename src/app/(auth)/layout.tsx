import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F7FAF9] flex">
      {/* Left: decorative panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A2B2A] flex-col items-center justify-center p-16 relative overflow-hidden">
        {/* Background circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#5BA8A0]/10" />
        <div className="absolute -bottom-32 -right-16 w-96 h-96 rounded-full bg-[#5BA8A0]/5" />

        <div className="relative z-10 text-center">
          <Link href="/" className="flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-full bg-[#5BA8A0] flex items-center justify-center">
              <span className="text-white font-bold">G</span>
            </div>
            <span
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              GhaniaSkin
            </span>
          </Link>

          {/* Decorative rings */}
          <div className="relative w-48 h-48 mx-auto mb-10">
            <div className="absolute inset-0 rounded-full border-2 border-[#5BA8A0]/30 animate-pulse" />
            <div className="absolute inset-4 rounded-full border border-[#5BA8A0]/20" />
            <div className="absolute inset-10 rounded-full bg-[#5BA8A0]/10 flex items-center justify-center">
              <span className="text-3xl text-[#5BA8A0]">✦</span>
            </div>
          </div>

          <h2
            className="text-3xl font-bold text-white mb-3 leading-tight"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Skin that{" "}
            <span className="italic text-[#98CEC9]">glows.</span>
          </h2>
          <p className="text-[#6B8B88] text-sm leading-relaxed max-w-xs mx-auto">
            Premium skincare formulated with clean ingredients for radiant, healthy skin.
          </p>
        </div>
      </div>

      {/* Right: form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#5BA8A0] flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span
                className="text-lg font-bold text-[#1A2B2A]"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                GhaniaSkin
              </span>
            </Link>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
