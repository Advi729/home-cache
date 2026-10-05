const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// interface ApiResponse<T> {
//   success: boolean;
//   message?: string;
//   data: T;
// }

export interface HomeDocument {
	_id: string;
	name: string;
	originalName: string;
	type: string;
	status: "processing" | "ready" | "failed";
	errorMessage?: string;
	size: number;
	chunkCount?: number;
	processedAt?: string;
	createdAt: string;
}

export interface ChatSource {
	documentId: string;
	documentName?: string;
	chunkIndex: number;
	score: number;
}

export interface ChatResponse {
	answer: string;
	sources: ChatSource[];
}

export interface DemoDocument {
	id: string;
	name: string;
	type: string;
	status: string;
}

const request = async <T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> => {
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers: {
			...(options?.headers || {}),
		},
	});

	const data = await response.json();

	if (!response.ok) {
		throw new Error(data.message || "Something went wrong.");
	}

	return data.data;
};

export const getDocuments = () => request<HomeDocument[]>("/documents");

export const uploadDocument = async (file: File, type = "receipt") => {
	const formData = new FormData();

	formData.append("document", file);
	formData.append("type", type);

	return request<HomeDocument>("/documents", {
		method: "POST",
		body: formData,
	});
};

export const retryDocument = (id: string) =>
	request<HomeDocument>(`/documents/${id}/retry`, {
		method: "POST",
	});

export const askHomeCache = (question: string) =>
	request<ChatResponse>("/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			question,
		}),
	});

export const startDemo = () =>
	request<{
		seeded: boolean;
		documents: DemoDocument[];
	}>("/demo", {
		method: "POST",
	});
