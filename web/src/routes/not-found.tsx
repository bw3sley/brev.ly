import { Link } from "@tanstack/react-router";

import notFoundSvg from "@/assets/404-image.svg";

export function NotFound() {
	return (
		<div className="min-h-screen grid place-items-center px-3">
			<div className="bg-gray-100 px-5 py-12 flex flex-col items-center justify-center rounded-lg gap-6 md:w-[580px] md:px-12 md:py-16">
				<img src={notFoundSvg} className="" alt="" />

				<h1 className="text-2xl text-gray-600 font-bold">
					Link não encontrado
				</h1>

				<p className="text-sm text-gray-500 text-center">
					O link que você está tentando acessar não existe, foi removido ou é
					uma URL inválida. Saiba mais em{" "}
					<Link
						to="/"
						className="font-semibold text-blue-base underline transition-colors hover:text-blue-dark"
					>
						brev.ly.
					</Link>
				</p>
			</div>
		</div>
	);
}
