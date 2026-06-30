import {
	DownloadSimpleIcon,
	LinkIcon,
	SpinnerGapIcon,
} from "@phosphor-icons/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { exportLinks } from "@/http/export-links";
import { getLinks } from "@/http/get-links";
import { LinkItem } from "./link-item";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function LinksList() {
	const { data, isLoading } = useQuery({
		queryKey: ["links"],
		queryFn: getLinks,
	});
	const links = data?.links ?? [];

	const { mutateAsync: exportLinksFn, isPending: isExportPending } =
		useMutation({
			mutationFn: exportLinks,
			onSuccess: ({ url }) => {
				window.location.assign(url);
			},
		});

	async function handleExportLinks() {
		await exportLinksFn();
	}

	const isExportButtonDisabled = isLoading || links.length === 0;

	return (
		<div className="md:max-w-[580px] w-full relative md:space-y-5 space-y-4 bg-gray-100 rounded-lg md:p-8 p-6">
			{isLoading && <div className="links-loading-indicator" />}

			<div className="flex items-center justify-between gap-4">
				<h2 className="text-lg font-bold text-gray-600">Meus links</h2>

				<Button
					variant="secondary"
					onClick={handleExportLinks}
					disabled={isExportButtonDisabled}
				>
					<DownloadSimpleIcon className="size-4" />
					{isExportPending ? "Baixando..." : "Baixar CSV"}
				</Button>
			</div>

			<Separator />

			{isLoading && (
				<div className="px-6 py-10 flex flex-col justify-center items-center space-y-4">
					<SpinnerGapIcon className="size-8 animate-spin text-gray-400" />
					<p className="text-[10px] uppercase text-gray-500 leading-3.5">
						Carregando links...
					</p>
				</div>
			)}

			{!isLoading && links.length === 0 && (
				<div className="px-6 py-10 flex flex-col justify-center items-center space-y-4">
					<LinkIcon className="size-8 text-gray-400" />

					<p className="text-[10px] uppercase text-gray-500 leading-3.5">
						Ainda não existem links cadastrados
					</p>
				</div>
			)}

			{!isLoading && links.length > 0 && (
				<ul className="space-y-4">
					{links.map((link, index) => (
						<div key={link.id} className="space-y-4">
							<LinkItem link={link} />

							{index < links.length - 1 && <Separator />}
						</div>
					))}
				</ul>
			)}
		</div>
	);
}
