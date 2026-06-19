export default function AiLoader() {
  return (
    <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">
      <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

      <h2 className="mt-6 text-2xl font-bold">
        AI Processing...
      </h2>

      <p className="mt-2 text-slate-500">
        Analyzing product attributes and creator audience
        data.
      </p>
    </div>
  );
}