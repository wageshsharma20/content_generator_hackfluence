import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
      <h1 className="text-7xl font-bold text-orange-600">
        404
      </h1>

      <p className="mt-4 text-slate-600">
        Page not found.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-orange-600 px-5 py-3 text-white"
      >
        Back Dashboard
      </Link>
    </div>
  );
}