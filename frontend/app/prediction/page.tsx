import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import PageTransition from "@/components/ui/page-transition";
import { fetchFromAPI } from "@/lib/api";

export default async function PredictionPage() {
  let forecast = null;
  try {
    forecast = await fetchFromAPI("/prediction", {
      method: "POST",
      body: JSON.stringify({
        match_score: 92,
        followers: 45000,
        engagement: 5.2,
        product_price: 800
      })
    });
  } catch (err) {
    console.error(err);
  }

  const reach = forecast ? forecast.expected_reach : "145K";
  const ctr = forecast ? forecast.predicted_ctr + "%" : "3.4%";
  const orders = forecast ? forecast.expected_orders : "61";
  const revenue = forecast ? "₹" + forecast.revenue : "₹48,800";
  const netProfit = forecast ? "₹" + forecast.net_profit : "₹31,000";
  const confidence = forecast ? forecast.ai_confidence_score + "%" : "92%";

  return (
    <DashboardLayout>
        <PageTransition>
      <div>
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Campaign Prediction
            </h1>

            <p className="mt-2 text-slate-600">
              AI-generated forecast for campaign performance.
            </p>
          </div>

          <Link
            href="/profit"
            className="rounded-xl bg-orange-600 px-5 py-3 text-white hover:bg-orange-700"
          >
            Calculate Profit →
          </Link>
        </div>

        {/* Prediction Cards */}

        <div className="mt-8 grid gap-6 md:grid-cols-5">
          <div className="rounded-3xl bg-blue-50 p-6 border border-blue-100">
            <h3 className="text-sm text-blue-600">
              Expected Reach
            </h3>

            <p className="mt-3 text-4xl font-bold text-blue-700">
              {reach}
            </p>
          </div>

          <div className="rounded-3xl bg-purple-50 p-6 border border-purple-100">
            <h3 className="text-sm text-purple-600">
              Predicted CTR
            </h3>

            <p className="mt-3 text-4xl font-bold text-purple-700">
              {ctr}
            </p>
          </div>

          <div className="rounded-3xl bg-orange-50 p-6 border border-orange-100">
            <h3 className="text-sm text-orange-600">
              Expected Orders
            </h3>

            <p className="mt-3 text-4xl font-bold text-orange-700">
              {orders}
            </p>
          </div>

          <div className="rounded-3xl bg-green-50 p-6 border border-green-100">
            <h3 className="text-sm text-green-600">
              Revenue
            </h3>

            <p className="mt-3 text-4xl font-bold text-green-700">
              {revenue}
            </p>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-6 border border-emerald-100">
            <h3 className="text-sm text-emerald-600">
              Net Profit
            </h3>

            <p className="mt-3 text-4xl font-bold text-emerald-700">
              {netProfit}
            </p>
          </div>
        </div>

        {/* AI Explanation */}

        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold">
            Why AI Predicts Success
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-orange-600">
                Audience Match
              </h3>

              <p className="mt-2 text-slate-600">
                Creator audience aligns strongly with
                sustainable home decor buyers.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-orange-600">
                Engagement Rate
              </h3>

              <p className="mt-2 text-slate-600">
                Historical engagement exceeds industry
                average by 27%.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-orange-600">
                Product Demand
              </h3>

              <p className="mt-2 text-slate-600">
                Eco-friendly handmade products show strong
                seasonal demand.
              </p>
            </div>
          </div>
        </div>

        {/* Prediction Confidence */}

        <div className="mt-8 rounded-3xl bg-slate-900 p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                AI Confidence Score
              </h2>

              <p className="mt-2 text-slate-400">
                Based on creator profile similarity,
                engagement metrics and category demand.
              </p>
            </div>

            <div className="text-6xl font-bold text-green-400">
              {confidence}
            </div>
            <Link
  href="/profit"
  className="mt-8 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-white"
>
  Continue to Profit Calculator →
</Link>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border bg-white p-8">
  <h2 className="text-2xl font-bold">
    Campaign Funnel
  </h2>

<div className="mt-8 rounded-3xl border bg-white p-8">
  <h2 className="text-2xl font-bold">
    Campaign Success Factors
  </h2>

  <div className="mt-6 grid gap-6 md:grid-cols-3">
    <div className="rounded-2xl bg-blue-50 p-5">
      <p className="text-sm text-blue-600">
        Audience Alignment
      </p>

      <p className="mt-2 text-3xl font-bold">
        94%
      </p>
    </div>

    <div className="rounded-2xl bg-green-50 p-5">
      <p className="text-sm text-green-600">
        Creator Engagement
      </p>

      <p className="mt-2 text-3xl font-bold">
        5.2%
      </p>
    </div>

    <div className="rounded-2xl bg-orange-50 p-5">
      <p className="text-sm text-orange-600">
        Product Demand
      </p>

      <p className="mt-2 text-3xl font-bold">
        High
      </p>
    </div>
  </div>
</div>

  <div className="mt-6 space-y-4">
    <div className="flex justify-between">
      <span>Reach</span>
      <span>{reach}</span>
    </div>

    <div className="flex justify-between">
      <span>Clicks</span>
      <span>4,930</span>
    </div>

    <div className="flex justify-between">
      <span>Orders</span>
      <span>{orders}</span>
    </div>

    <div className="flex justify-between font-bold text-green-600">
      <span>Revenue</span>
      <span>{revenue}</span>
    </div>
  </div>
</div>
</PageTransition>
    </DashboardLayout>
  );
}
