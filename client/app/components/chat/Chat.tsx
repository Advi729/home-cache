import {
  type FormEvent,
  useState,
} from "react";

import {
  askHomeCache,
  type ChatResponse,
} from "../../lib/api";

import {
  SuggestedQuestions,
} from "./SuggestedQuestions";

export function Chat() {
  const [question, setQuestion] =
    useState("");

  const [response, setResponse] =
    useState<ChatResponse | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    const trimmedQuestion =
      question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result =
        await askHomeCache(
          trimmedQuestion
        );

      setResponse(result);
      setQuestion("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xl">
            🧠
          </div>

          <div>
            <h2 className="font-semibold text-slate-950">
              Ask HomeCache
            </h2>

            <p className="text-sm text-slate-500">
              Ask questions about your household.
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-[280px] p-6">
        {!response && !loading && (
          <div className="flex h-[230px] items-center justify-center text-center">
            <div>
              <p className="text-lg font-medium text-slate-700">
                What would you like to remember?
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Try asking about a warranty, purchase,
                receipt, or service.
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex h-[230px] items-center justify-center">
            <div className="text-sm text-slate-500">
              Searching your memory...
            </div>
          </div>
        )}

        {response && !loading && (
          <div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {response.answer}
              </p>
            </div>

            {response.sources.length > 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Sources
                </p>

                <div className="space-y-2">
                  {response.sources.map(
                    (source) => (
                      <div
                        key={`${source.documentId}-${source.chunkIndex}`}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                      >
                        <span className="text-sm">
                          📄
                        </span>

                        <span className="truncate text-sm text-slate-600">
                          {source.documentName ||
                            "Household document"}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-100 p-4"
      >
        <SuggestedQuestions
            onSelect={setQuestion}
          />

        <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-slate-400">
          <input
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            placeholder="When does my washing machine warranty expire?"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />

          

          <button
            type="submit"
            disabled={
              loading ||
              !question.trim()
            }
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ask
          </button>

          
        </div>
      </form>
    </section>
  );
}