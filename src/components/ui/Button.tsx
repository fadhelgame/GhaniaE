import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "dark";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-[#5BA8A0] hover:bg-[#4A9189] text-white focus-visible:ring-[#5BA8A0] shadow-sm hover:shadow-md",
      secondary:
        "bg-[#1A2B2A] hover:bg-[#5BA8A0] text-white focus-visible:ring-[#1A2B2A]",
      dark:
        "bg-[#1A2B2A] hover:bg-[#2D4A48] text-white focus-visible:ring-[#1A2B2A]",
      outline:
        "border border-[#B8D9D7] text-[#5BA8A0] hover:bg-[#E4F2F0] hover:border-[#5BA8A0] focus-visible:ring-[#5BA8A0]",
      ghost:
        "text-[#4A6663] hover:bg-[#E4F2F0] hover:text-[#1A2B2A] focus-visible:ring-[#5BA8A0]",
      danger:
        "bg-red-500 hover:bg-red-600 text-white focus-visible:ring-red-400",
    };

    const sizes = {
      sm: "px-5 py-2 text-xs",
      md: "px-6 py-2.5 text-sm",
      lg: "px-8 py-3.5 text-sm",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
