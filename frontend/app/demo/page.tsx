import DashboardLayout from "@/components/layout/dashboard-layout";

export default function DemoPage() {
  return (
    <DashboardLayout>
      <div>
        <h1 className="text-5xl font-bold">
          KarigarConnect AI
        </h1>

        <p className="mt-3 text-xl text-slate-600">
          Creator Economy Infrastructure Layer
          for Rural India
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl bg-orange-50 p-6">
            <h3 className="font-semibold">
              Artisans
            </h3>

            <p className="mt-4 text-4xl font-bold">
              850+
            </p>
          </div>

          <div className="rounded-3xl bg-green-50 p-6">
            <h3 className="font-semibold">
              Campaigns
            </h3>

            <p className="mt-4 text-4xl font-bold">
              320
            </p>
          </div>

          <div className="rounded-3xl bg-blue-50 p-6">
            <h3 className="font-semibold">
              Reach
            </h3>

            <p className="mt-4 text-4xl font-bold">
              2.1M
            </p>
          </div>

          <div className="rounded-3xl bg-purple-50 p-6">
            <h3 className="font-semibold">
              Revenue
            </h3>

            <p className="mt-4 text-4xl font-bold">
              ₹12.5L
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-8 text-white">
          <h2 className="text-3xl font-bold">
            Mission
          </h2>

          <p className="mt-4 text-slate-300">
            Enable rural artisans to access the creator
            economy through AI-powered influencer discovery,
            campaign forecasting, and social commerce.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}