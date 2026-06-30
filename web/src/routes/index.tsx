import { createFileRoute } from "@tanstack/react-router";
import brevlyLogo from "@/assets/brevly-logo.svg";
import { CreateLinkForm } from "@/components/create-link-form";
import { LinksList } from "@/components/links-list";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="min-h-screen flex flex-col items-start justify-start mx-auto md:max-w-[1004px] md:pt-20 pt-8 px-3 gap-6 md:gap-8">
			<img src={brevlyLogo} className="h-6 md:self-start self-center" alt="" />

			<div className="flex w-full items-start flex-col md:flex-row md:gap-5 space-y-3">
				<CreateLinkForm />
				<LinksList />
			</div>
		</div>
	);
}
