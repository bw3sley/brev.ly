import type { ComponentProps } from "react";

import { twMerge } from "tailwind-merge";

export type SeparatorProps = ComponentProps<"div">;

export function Separator({ className, ...props }: SeparatorProps) {
	return (
		<div
			className={twMerge("h-px w-full shrink-0 bg-gray-200", className)}
			{...props}
		/>
	);
}

Separator.displayName = "Separator";
