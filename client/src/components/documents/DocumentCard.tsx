import type { HomeDocument } from "../../lib/api";
import { DocumentStatus } from "./DocumentStatus";

interface Props {
  document: HomeDocument;
  onRetry: (id: string) => void;
}

export function DocumentCard({
  document,
  onRetry,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg">
              📄
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-900">
                {document.name}
              </h3>

              <p className="text-xs text-slate-500">
                {document.type}
              </p>
            </div>
          </div>
        </div>

        <DocumentStatus
          status={document.status}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          {Math.round(document.size / 1024)} KB
        </span>

        {document.status === "ready" && (
          <span>
            {document.chunkCount ?? 0} memory chunks
          </span>
        )}
      </div>

      {document.status === "failed" && (
        <div className="mt-4 rounded-xl bg-red-50 p-3">
          <p className="text-sm text-red-700">
            {document.errorMessage ||
              "Document processing failed."}
          </p>

          <button
            type="button"
            onClick={() => onRetry(document._id)}
            className="mt-3 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700"
          >
            Retry processing
          </button>
        </div>
      )}
    </div>
  );
}