import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-medium text-[#4A6663] uppercase tracking-wider mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full px-4 py-3 rounded-xl border bg-white text-[#1A2B2A] placeholder-[#8AA8A5] text-sm",
            "border-[#D8ECEB] focus:outline-none focus:ring-2 focus:ring-[#5BA8A0]/30 focus:border-[#5BA8A0]",
            "transition-all duration-200",
            error && "border-red-300 focus:ring-red-200 focus:border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
