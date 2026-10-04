import { useCallback, useEffect, useState } from "react";

import {
  getDocuments,
  retryDocument,
  type HomeDocument,
} from "../lib/api";

import { DocumentCard } from "../components/documents/DocumentCard";
import { DocumentUploader } from "../components/documents/DocumentUploader";

export default function Documents() {
  const [documents, setDocuments] =
    useState<HomeDocument[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadDocuments = useCallback(
    async () => {
      try {
        const data = await getDocuments();
        setDocuments(data);
      } catch (error) {
        console.error(
          "Failed to load documents:",
          error
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleRetry = async (id: string) => {
    try {
      await retryDocument(id);
      await loadDocuments();
    } catch (error) {
      console.error(
        "Retry failed:",
        error
      );
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Your memory
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            Documents
          </h1>

          <p className="mt-2 text-slate-500">
            Upload the documents HomeCache should
            remember.
          </p>
        </div>

        <DocumentUploader
          onUploaded={loadDocuments}
        />
      </div>

      {loading ? (
        <div className="mt-10 text-center text-sm text-slate-500">
          Loading your documents...
        </div>
      ) : documents.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <div className="text-4xl">📚</div>

          <h2 className="mt-4 font-semibold text-slate-900">
            Your memory is empty
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Add an invoice, warranty, manual or service
            document to get started.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((document) => (
            <DocumentCard
              key={document._id}
              document={document}
              onRetry={handleRetry}
            />
          ))}
        </div>
      )}
    </main>
  );
}