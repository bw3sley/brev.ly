import { type ComponentProps, forwardRef } from "react";

import { twMerge } from "tailwind-merge";

export type LabelProps = ComponentProps<"label">;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
	({ className, ...props }, ref) => {
		return (
			<label
				ref={ref}
				className={twMerge(
					"text-[10px] leading-3.5 font-normal uppercase text-gray-500",
					className,
				)}
				{...props}
			/>
		);
	},
);

Label.displayName = "Label";
