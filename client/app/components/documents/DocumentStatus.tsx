interface Props {
	status: "processing" | "ready" | "failed";
}

export function DocumentStatus({ status }: Props) {
	if (status === "ready") {
		return (
			<span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
				Ready
			</span>
		);
	}

	if (status === "processing") {
		return (
			<span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
				Processing...
			</span>
		);
	}

	return (
		<span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
			Failed
		</span>
	);
}
