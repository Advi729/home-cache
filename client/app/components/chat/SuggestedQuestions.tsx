interface Props {
  onSelect: (question: string) => void;
}

const questions = [
  "When does my washing machine warranty expire?",
  "How much did the water purifier cost?",
  "When should the AC be serviced again?",
  "How do I factory reset the TV?",
];

export function SuggestedQuestions({
  onSelect,
}: Props) {
  return (
    <div className="mt-5 mb-5">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        Try asking
      </p>

      <div className="flex flex-wrap gap-2">
        {questions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => onSelect(question)}
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-left text-xs text-slate-600 transition hover:border-slate-400 hover:text-slate-950"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}