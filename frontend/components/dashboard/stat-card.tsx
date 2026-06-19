interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-bold text-orange-600">
        {value}
      </h2>
    </div>
  );
}