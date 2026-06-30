import { WarningCircleIcon } from "@phosphor-icons/react";
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
				"flex items-center gap-2 text-xs leading-4 text-danger",
				className,
			)}
			{...props}
		>
			<WarningCircleIcon
				aria-hidden="true"
				size={16}
				weight="fill"
				className="shrink-0 text-danger"
			/>
			<span className="text-danger">{children}</span>
		</span>
	);
}

InputMessage.displayName = "InputMessage";
