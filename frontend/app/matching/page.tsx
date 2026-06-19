import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { fetchFromAPI } from "@/lib/api";
import PageTransition from "@/components/ui/page-transition";

export default async function MatchingPage() {
  let influencers: any[] = [];
  try {
    influencers = await fetchFromAPI("/matching", {
      method: "POST",
      body: JSON.stringify({ product_name: "Handmade Terracotta Vase", price: 800, description: "Eco-friendly handmade pottery" })
    });
  } catch (err) {
    console.error(err);
  }
  return (
    <DashboardLayout>
        <PageTransition>
      <div>
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Influencer Matching
            </h1>

            <p className="mt-2 text-slate-600">
              AI-ranked creator recommendations based on
              audience alignment and engagement.
            </p>
          </div>

          <Link
            href="/prediction"
            className="rounded-xl bg-orange-600 px-5 py-3 text-white transition hover:bg-orange-700"
          >
            Predict Campaign →
          </Link>
        </div>

        {/* Summary */}

        <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            AI Recommendation Summary
          </h2>

          <p className="mt-3 text-slate-600">
            Based on audience demographics, product
            category, sustainability interests, and
            creator engagement patterns, these creators
            are most likely to generate conversions for
            your artisan product.
          </p>
        </div>

        {/* Influencers */}

        <div className="mt-8 space-y-6">
          {influencers.map((item) => (
            <div
              key={item.influencer_name}
              className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold">
                    {item.influencer_name}
                  </h3>

                  <p className="text-slate-500">
                    {item.why_match && item.why_match[0] ? item.why_match[0] : "Lifestyle & Decor"}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.followers.toLocaleString()} followers
                  </p>

                  <p className="text-sm text-green-600">
                    {item.engagement}% engagement
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-4xl font-bold text-green-600">
                    {item.match_score}%
                  </div>

                  <p className="text-sm text-slate-500">
                    Match Score
                  </p>
                </div>
              </div>

              {/* Progress Bar */}

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Audience Match</span>
                  <span>{item.match_score}%</span>
                </div>

                <div className="h-4 rounded-full bg-slate-100">
                  <div
                    className="h-4 rounded-full bg-gradient-to-r from-green-400 to-green-600"
                    style={{
                      width: `${item.match_score}%`,
                    }}
                  />
                </div>

                {/* Match Reasons */}

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                    Home Decor
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Sustainability
                  </span>

                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    Lifestyle
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why These Matches */}

        <div className="mt-10 rounded-3xl bg-slate-900 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Why These Creators?
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-orange-400">
                Audience Alignment
              </h3>

              <p className="mt-2 text-slate-300">
                Their followers closely match the target
                demographic for sustainable home decor.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-orange-400">
                Engagement Quality
              </h3>

              <p className="mt-2 text-slate-300">
                Higher engagement rates indicate stronger
                trust and purchase intent.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-orange-400">
                Product Relevance
              </h3>

              <p className="mt-2 text-slate-300">
                Their content naturally aligns with
                handmade and eco-friendly products.
              </p>
            </div>
          </div>
        </div>

        {/* Continue */}

        <div className="mt-8">
          <Link
            href="/prediction"
            className="inline-flex rounded-xl bg-orange-600 px-6 py-3 text-white transition hover:bg-orange-700"
          >
            Continue to Prediction →
          </Link>
        </div>
      </div>
      </PageTransition>
    </DashboardLayout>
  );
}