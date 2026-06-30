import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const inputVariants = tv({
	base: "flex h-12 w-full rounded-lg border border-gray-300 px-4 text-sm leading-[18px] text-gray-600 outline-none transition-colors placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-base aria-invalid:ring-2 aria-invalid:ring-danger aria-invalid:focus-visible:ring-danger disabled:cursor-not-allowed disabled:bg-gray-200/50",
});

type InputProps = ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={twMerge(inputVariants(), className)}
				{...props}
			/>
		);
	},
);

Input.displayName = "Input";
