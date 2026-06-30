import { WarningIcon } from "@phosphor-icons/react";
import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type InputMessageProps = ComponentProps<"span"> & {
	children: ReactNode;
};

export function InputMessage({
	children,
	className,
	...props
}: InputMessageProps) {
	return (
		<span
			role="alert"
			data-slot="input-message"
			className={twMerge(
				"flex items-center gap-2 leading-4 text-danger",
				className,
			)}
			{...props}
		>
			<WarningIcon
				aria-hidden="true"
				className="shrink-0 size-4 text-danger"
			/>
			<span className="text-gray-500 text-xs">{children}</span>
		</span>
	);
}

InputMessage.displayName = "InputMessage";
