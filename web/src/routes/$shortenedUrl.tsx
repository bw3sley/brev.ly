import { useMutation } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import linkIconSvg from "@/assets/brevy-logo-icon.svg";
import { incrementLinkAccess } from "@/http/increment-link-access";
import { getOriginalUrlByShortenedUrl } from "../http/get-original-url-by-shortened-url";

export const Route = createFileRoute("/$shortenedUrl")({
	component: RouteComponent,
	loader: async ({ params: { shortenedUrl } }) => {
		try {
			return await getOriginalUrlByShortenedUrl(shortenedUrl);
		} catch (_error) {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { shortenedUrl } = Route.useParams();
	const { originalUrl } = Route.useLoaderData();

	const { mutate: incrementLinkAccessFn } = useMutation({
		mutationFn: (value: string) => incrementLinkAccess(value),
		onSuccess: () => {
			window.location.href = originalUrl;
		},
	});

	useEffect(() => {
		incrementLinkAccessFn(shortenedUrl);
	}, [incrementLinkAccessFn, shortenedUrl]);

	return (
		<div className="min-h-screen grid place-items-center px-3">
			<div className="bg-gray-100 px-5 mx-auto py-12 flex flex-col items-center justify-center gap-6 rounded-lg md:w-[580px] md:px-12 md:py-16">
				<img src={linkIconSvg} className="size-12" alt="" />

				<h1 className="text-2xl text-gray-600 font-bold">Redirecionando...</h1>

				<div className="space-y-2 text-center">
					<p className="text-sm text-gray-500">
						O link sera aberto automaticamente em alguns instantes.
					</p>
					<p className="text-sm text-gray-500">
						Nao foi redirecionado? Acesse aqui{" "}
						<a
							href={originalUrl}
							className="font-semibold text-blue-base underline transition-colors hover:text-blue-dark"
						>
							Acesse aqui
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
