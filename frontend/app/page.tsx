import Link from "next/link";

import { fetchFromAPI } from "@/lib/api";
import DashboardLayout from "@/components/layout/dashboard-layout";
import StatCard from "@/components/dashboard/stat-card";
import RevenueChart from "@/components/dashboard/revenue-chart";
import ProgressTracker from "@/components/dashboard/progress-tracker";
import PageTransition from "@/components/ui/page-transition";

export default async function Home() {
  let impactData = { revenue_generated: "₹12.5L", families_supported: "850+", active_campaigns: 142 };
  let featuredProduct = { name: "Handmade Terracotta Vase", description: "Sustainable Home Decor", price: 800 };
  let recentCampaigns = [
    { product: "Terracotta Vase", influencer: "Priya Decor", match: "94%", status: "Active", color: "green" },
    { product: "Bamboo Basket", influencer: "Green Living India", match: "91%", status: "Pending", color: "yellow" }
  ];

  try {
    impactData = await fetchFromAPI("/analytics/impact");
    featuredProduct = await fetchFromAPI("/products/featured");
    recentCampaigns = await fetchFromAPI("/campaigns/recent");
  } catch (err) {
    console.error(err);
  }

  return (
    <DashboardLayout>
        <PageTransition>
      <div>
        {/* Premium Hero */}

        <div className="rounded-3xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-10 text-white shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-wider text-orange-100">
                AI Powered Creator Commerce
              </p>

              <h1 className="mt-3 text-5xl font-bold leading-tight">
                Empower Rural Artisans Through
                <br />
                Influencer Marketing
              </h1>

              <p className="mt-5 max-w-2xl text-lg text-orange-100">
                Discover creators, launch campaigns,
                predict revenue, and grow artisan
                businesses through AI-powered social
                commerce.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/upload"
                  className="
                    rounded-xl
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-orange-600
                    transition
                    hover:scale-105
                  "
                >
                  Start Campaign →
                </Link>

                <Link
                  href="/demo"
                  className="
                    rounded-xl
                    border
                    border-white/30
                    px-6
                    py-3
                    font-semibold
                    text-white
                    transition
                    hover:bg-white/10
                  "
                >
                  View Demo
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="grid gap-4">
                <div>
                  <p className="text-orange-100">
                    Artisan Families
                  </p>

                  <p className="text-3xl font-bold">
                    {impactData.families_supported}
                  </p>
                </div>

                <div>
                  <p className="text-orange-100">
                    Creator Reach
                  </p>

                  <p className="text-3xl font-bold">
                    2.1M
                  </p>
                </div>

                <div>
                  <p className="text-orange-100">
                    Revenue Generated
                  </p>

                  <p className="text-3xl font-bold">
                    {impactData.revenue_generated}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow */}

        <ProgressTracker />

        {/* KPI Cards */}

        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <StatCard
            title="Products Listed"
            value="142"
          />

          <StatCard
            title="Active Influencers"
            value="58"
          />

          <StatCard
            title="Campaign Revenue"
            value="₹4.2L"
          />

          <StatCard
            title="Expected Reach"
            value="1.8M"
          />
        </div>

        {/* Quick Actions */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
            href="/upload"
            className="
              rounded-2xl
              bg-orange-600
              p-6
              text-white
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <h3 className="text-xl font-bold">
              Upload New Product
            </h3>

            <p className="mt-2 text-orange-100">
              Add artisan products and begin AI analysis.
            </p>
          </Link>

          <Link
            href="/matching"
            className="
              rounded-2xl
              bg-green-600
              p-6
              text-white
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <h3 className="text-xl font-bold">
              Find Influencers
            </h3>

            <p className="mt-2 text-green-100">
              Discover high-converting creators.
            </p>
          </Link>

          <Link
            href="/prediction"
            className="
              rounded-2xl
              bg-slate-900
              p-6
              text-white
              transition-all
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <h3 className="text-xl font-bold">
              Predict Revenue
            </h3>

            <p className="mt-2 text-slate-300">
              Forecast campaign performance instantly.
            </p>
          </Link>
        </div>

        {/* Revenue Chart */}

        <div className="mt-10">
          <RevenueChart />
        </div>

        {/* Featured Product */}

        <div className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Featured Artisan Product
          </h2>

          <div className="mt-5 flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-orange-100 text-3xl">
              🏺
            </div>

            <div>
              <h3 className="font-semibold">
                {featuredProduct.name}
              </h3>

              <p className="text-slate-500">
                {featuredProduct.description}
              </p>

              <p className="mt-2 font-bold text-orange-600">
                ₹{featuredProduct.price}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Campaigns */}

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">
            Recent Campaigns
          </h2>

          <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left">
                    Influencer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Match
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t">
                  <td className="px-6 py-4">
                    Terracotta Vase
                  </td>

                  <td className="px-6 py-4">
                    Priya Decor
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    94%
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  </td>
                </tr>

                <tr className="border-t">
                  <td className="px-6 py-4">
                    Bamboo Basket
                  </td>

                  <td className="px-6 py-4">
                    Green Living India
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    91%
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Impact */}

        <div className="mt-10 rounded-3xl bg-slate-900 p-8 text-white">
          <h2 className="text-3xl font-bold">
            Impact Generated
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div>
              <p className="text-4xl font-bold">
                {impactData.revenue_generated}
              </p>

              <p className="mt-2 text-slate-400">
                Revenue Generated
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold">
                {impactData.families_supported}
              </p>

              <p className="mt-2 text-slate-400">
                Artisan Families Supported
              </p>
            </div>

            <div>
              <p className="text-4xl font-bold">
                2.1M
              </p>

              <p className="mt-2 text-slate-400">
                Creator Reach
              </p>
            </div>
          </div>
        </div>
      </div>
      </PageTransition>
    </DashboardLayout>
  );
}