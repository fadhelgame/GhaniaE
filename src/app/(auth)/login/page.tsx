"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Incorrect email or password");
      setLoading(false);
    } else {
      router.push(redirect);
      router.refresh();
    }
  };

  return (
    <>
      <h1
        className="text-3xl font-bold text-[#1A2B2A] mb-1"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Welcome back.
      </h1>
      <p className="text-[#8AA8A5] text-sm mb-8">
        Sign in to your GhaniaSkin account
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          required
          placeholder="you@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Button
          type="submit"
          size="lg"
          variant="dark"
          className="w-full mt-2"
          loading={loading}
        >
          Sign In
        </Button>
      </form>

      <p className="text-center text-sm text-[#8AA8A5] mt-7">
        No account yet?{" "}
        <Link href="/register" className="text-[#5BA8A0] hover:text-[#4A9189] font-medium">
          Create one
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-5 animate-pulse">
          <div className="h-9 bg-[#E4F2F0] rounded w-48" />
          <div className="h-4 bg-[#E4F2F0] rounded w-64" />
          <div className="h-14 bg-[#E4F2F0] rounded-xl" />
          <div className="h-14 bg-[#E4F2F0] rounded-xl" />
          <div className="h-12 bg-[#C4E4E0] rounded-full" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
