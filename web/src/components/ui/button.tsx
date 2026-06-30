import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
	base: "inline-flex cursor-pointer shrink-0 items-center justify-center whitespace-nowrap border text-center font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-base disabled:pointer-events-none",
	variants: {
		variant: {
			primary:
				"h-12 gap-3 rounded-lg border-transparent bg-blue-base px-5 text-sm leading-[18px] text-white hover:bg-blue-dark disabled:bg-blue-base/50",
			secondary:
				"h-8 gap-1.5 rounded border border-transparent bg-gray-200 px-2 text-xs leading-4 text-gray-500 hover:border-blue-base hover:bg-white disabled:bg-gray-200/50 disabled:text-gray-400",
			icon: "size-8 rounded border border-transparent bg-gray-200 p-0 text-gray-500 hover:border-blue-base hover:bg-white disabled:bg-gray-200/50 disabled:text-gray-400",
		},
	},
	defaultVariants: {
		variant: "primary",
	},
});

export type ButtonProps = ComponentProps<"button"> &
	VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, type = "button", variant, ...props }, ref) => {
		const resolvedVariant = variant ?? "primary";

		return (
			<button
				ref={ref}
				type={type}
				data-variant={resolvedVariant}
				className={twMerge(
					buttonVariants({ variant: resolvedVariant }),
					className,
				)}
				{...props}
			/>
		);
	},
);

Button.displayName = "Button";
