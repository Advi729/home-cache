import { useState } from "react";
import { useNavigate } from "react-router";

import { startDemo } from "../../lib/api";

const demoDocuments = [
  {
    icon: "🧺",
    name: "LG Washing Machine Invoice",
  },
  {
    icon: "🧊",
    name: "Samsung Refrigerator Warranty",
  },
  {
    icon: "❄️",
    name: "Voltas AC Service Receipt",
  },
  {
    icon: "📺",
    name: "TV User Manual",
  },
  {
    icon: "💧",
    name: "Water Purifier Invoice",
  },
];

export function MeetTheMemory() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleDemo = async () => {
    try {
      setLoading(true);
      setError(null);

      await startDemo();

      navigate("/?demo=true");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to start the demo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-slate-50 p-8 sm:p-10">
        <div className="max-w-2xl">
          <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            DEMO MODE
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
            Meet the Memory
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            See what HomeCache can do without
            uploading anything. We've prepared a
            fictional household with five documents
            ready to explore.
          </p>

          <button
            type="button"
            onClick={handleDemo}
            disabled={loading}
            className="mt-6 rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Preparing the memory..."
              : "Meet the Memory →"}
          </button>

          {error && (
            <p className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className="grid divide-y border-t border-slate-100 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {demoDocuments.map(
          (document) => (
            <div
              key={document.name}
              className="flex items-center gap-4 p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                {document.icon}
              </div>

              <div>
                <p className="text-sm font-medium text-slate-900">
                  {document.name}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Fictional demo document
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}