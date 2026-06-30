import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isHTTPError } from "ky";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createLink } from "@/http/create-link";
import { client } from "@/lib/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { InputMessage } from "./ui/input-message";
import { Label } from "./ui/label";

const linkFormSchema = z.object({
	originalUrl: z.url("Digite uma url válida"),
	shortenedUrl: z
		.string()
		.trim()
		.min(1, "Digite uma url minúscula e sem espaço/caracter especial")
		.regex(
			/^[a-z0-9-]+$/,
			"Digite uma url minúscula e sem espaço/caracter especial",
		),
});

type LinkFormData = z.infer<typeof linkFormSchema>;

export function CreateLinkForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<LinkFormData>({
		resolver: zodResolver(linkFormSchema),
		defaultValues: {
			originalUrl: "",
			shortenedUrl: "",
		},
	});

	const { mutateAsync: createLinkFn, isPending } = useMutation({
		mutationFn: createLink,
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ["links"] });
		},
	});

	async function handleNewLink(data: LinkFormData) {
		try {
			await createLinkFn({
				originalUrl: data.originalUrl,
				shortenedUrl: data.shortenedUrl,
			});

			reset();
		} catch (error) {
			if (isHTTPError(error) && error.response.status === 409) {
				return toast.error("Esse link encurtado já existe. Tente outro.");
			}

			toast.error("Nao foi possível criar link. Tente novamente.");
		}
	}

	return (
		<form
			className="md:max-w-[380px] w-full md:space-y-5 space-y-4 bg-gray-100 rounded-lg md:p-8 p-6"
			onSubmit={handleSubmit(handleNewLink)}
		>
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-lg font-bold text-gray-600">Novo link</h2>
			</div>

			<div className="space-y-4">
				<div className="group space-y-2">
					<Label
						className={
							errors.originalUrl
								? "font-semibold text-danger"
								: "group-focus-within:text-blue-base group-focus-within:font-semibold"
						}
						htmlFor="original-url"
					>
						Link original
					</Label>

					<Input
						id="original-url"
						placeholder="https://www.exemplo.com.br"
						aria-invalid={Boolean(errors.originalUrl)}
						{...register("originalUrl")}
					/>

					{errors.originalUrl && (
						<InputMessage>{errors.originalUrl.message}</InputMessage>
					)}
				</div>

				<div className="group space-y-2">
					<Label
						className={
							errors.shortenedUrl
								? "font-semibold text-danger"
								: "group-focus-within:text-blue-base group-focus-within:font-semibold"
						}
						htmlFor="shortened-url"
					>
						Link encurtado
					</Label>

					<div className="relative">
						<span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm text-gray-400">
							brev.ly/
						</span>

						<Input
							id="shortened-url"
							className="pl-16"
							aria-invalid={Boolean(errors.shortenedUrl)}
							{...register("shortenedUrl")}
						/>
					</div>

					{errors.shortenedUrl && (
						<InputMessage>{errors.shortenedUrl.message}</InputMessage>
					)}
				</div>
			</div>

			<Button className="w-full" type="submit" disabled={isPending}>
				{isPending ? "Salvando..." : "Salvar link"}
			</Button>
		</form>
	);
}
