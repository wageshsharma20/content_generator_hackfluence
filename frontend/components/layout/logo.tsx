export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-white font-bold">
        K
      </div>

      <div>
        <h1 className="font-bold text-orange-600">
          KarigarConnect AI
        </h1>

        <p className="text-xs text-slate-500">
          Creator Economy Infrastructure
        </p>
      </div>
    </div>
  );
}