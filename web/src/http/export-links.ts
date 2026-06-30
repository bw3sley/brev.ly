import { api } from "@/lib/ky";

type ExportLinksResponse = {
	url: string;
};

export async function exportLinks() {
	const data = await api.post("/links/export").json<ExportLinksResponse>();

	return { url: data.url };
}
