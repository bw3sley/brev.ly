import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { deleteLink } from "@/http/delete-link";
import { client } from "@/lib/react-query";
import { Button } from "./ui/button";

interface LinkItemProps {
	link: {
		id: string;
		originalUrl: string;
		shortenedUrl: string;
		accessCount: number;
		createdAt: string;
		lastAccessedAt: string | null;
	};
}

export function LinkItem({ link }: LinkItemProps) {
	const { mutateAsync: deleteLinkFn, isPending: isDeletingLink } = useMutation({
		mutationFn: (shortenedUrl: string) => deleteLink({ shortenedUrl }),
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ["links"] });

			toast.success("Link encurtado deletado com sucesso!");
		},
	});

	async function handleDeleteLink(shortenedUrl: string) {
		try {
			await deleteLinkFn(shortenedUrl);
		} catch (_error) {
			toast.error("Não foi possível excluir link. Tente novamente.");
		}
	}

	function handleCopyLink(shortenedUrl: string) {
		navigator.clipboard.writeText(`brev.ly/${shortenedUrl}`);
	}

	return (
		<li className="flex gap-4 items-center justify-between">
			<div className="flex min-w-0 flex-col gap-1">
				<Link
					className="truncate text-sm font-bold text-blue-base hover:underline"
					to="/$shortenedUrl"
					params={{ shortenedUrl: link.shortenedUrl }}
				>
					brev.ly/{link.shortenedUrl}
				</Link>

				<span className="truncate text-xs text-gray-500">
					{link.originalUrl}
				</span>
			</div>

			<div className="flex items-center justify-between gap-3 sm:justify-end">
				<span className="shrink-0 text-xs text-gray-500">
					{link.accessCount} acessos
				</span>

				<div className="flex gap-1">
					<Button
						variant="icon"
						title={`Copiar link: ${link.shortenedUrl}`}
						onClick={() => handleCopyLink(link.shortenedUrl)}
					>
						<CopyIcon className="size-4" />
					</Button>

					<Button
						variant="icon"
						title={`Excluir link ${link.shortenedUrl}`}
						disabled={isDeletingLink}
						onClick={() => handleDeleteLink(link.shortenedUrl)}
					>
						<TrashIcon className="size-4" />
					</Button>
				</div>
			</div>
		</li>
	);
}
