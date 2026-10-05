import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Chat } from "../components/chat/Chat";
import { MeetTheMemory } from "../components/demo/MeetTheMemory";
import { DocumentCard } from "../components/documents/DocumentCard";
import { DocumentUploader } from "../components/documents/DocumentUploader";
import { getDocuments, type HomeDocument } from "../lib/api";

export default function Dashboard() {
	const [documents, setDocuments] = useState<HomeDocument[]>([]);

	const loadDocuments = useCallback(async () => {
		try {
			const data = await getDocuments();
			setDocuments(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		loadDocuments();
	}, [loadDocuments]);

	const readyCount = documents.filter(
		(document) => document.status === "ready",
	).length;

	const processingCount = documents.filter(
		(document) => document.status === "processing",
	).length;

	const failedCount = documents.filter(
		(document) => document.status === "failed",
	).length;

	const [searchParams] = useSearchParams();
	const demoMode = searchParams.get("demo") === "true";

	return (
		<main className="mx-auto max-w-6xl px-6 py-10">
			{/* Hero */}
			<section className="rounded-3xl bg-slate-950 p-8 text-white sm:p-10">
				<div className="max-w-2xl">
					<p className="text-sm font-medium text-slate-400">HomeCache</p>

					<h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
						Your household,
						<br />
						remembered.
					</h1>

					<p className="mt-5 max-w-xl leading-7 text-slate-300">
						Store the documents that matter and ask questions about them
						whenever you need.
					</p>

					<div className="mt-7">
						<DocumentUploader onUploaded={loadDocuments} />
					</div>
				</div>
			</section>

			{/* Stats */}
			<section className="mt-6 grid gap-4 sm:grid-cols-3">
				<div className="rounded-2xl border border-slate-200 bg-white p-5">
					<p className="text-sm text-slate-500">Ready memories</p>

					<p className="mt-2 text-3xl font-bold text-slate-950">{readyCount}</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5">
					<p className="text-sm text-slate-500">Processing</p>

					<p className="mt-2 text-3xl font-bold text-slate-950">
						{processingCount}
					</p>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5">
					<p className="text-sm text-slate-500">Needs attention</p>

					<p className="mt-2 text-3xl font-bold text-slate-950">
						{failedCount}
					</p>
				</div>
			</section>

			<section className="mt-6">
				<MeetTheMemory />
			</section>

			{demoMode && (
				<div className="mt-6 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
					<div className="flex items-center gap-3">
						<span className="text-lg">✨</span>

						<div>
							<p className="text-sm font-semibold text-amber-900">
								Demo Memory is active
							</p>

							<p className="text-xs text-amber-700">
								You're exploring fictional household data.
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Chat */}
			<section className="mt-6">
				<Chat />
			</section>

			{/* Recent documents */}
			{documents.length > 0 && (
				<section className="mt-8">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h2 className="text-xl font-bold text-slate-950">
								Recent memories
							</h2>

							<p className="mt-1 text-sm text-slate-500">
								Documents HomeMemory knows about.
							</p>
						</div>
					</div>

					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{documents.slice(0, 6).map((document) => (
							<DocumentCard
								key={document._id}
								document={document}
								onRetry={loadDocuments}
							/>
						))}
					</div>
				</section>
			)}
		</main>
	);
}
