"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import PageTransition from "@/components/ui/page-transition";

export default function PredictionPage() {
  const [forecast, setForecast] = useState<any>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch("/api/prediction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            match_score: 92,
            followers: 45000,
            engagement: 5.2,
            product_price: 800
          })
        });
        const data = await response.json();
        setForecast(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchForecast();
  }, []);

  const reach = forecast ? forecast.expected_reach : "...";
  const ctr = forecast ? forecast.predicted_ctr + "%" : "...";
  const orders = forecast ? forecast.expected_orders : "...";
  const revenue = forecast ? "₹" + forecast.revenue : "...";
  const netProfit = forecast ? "₹" + forecast.net_profit : "...";
  const confidence = forecast ? forecast.ai_confidence_score + "%" : "...";

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl">
          {/* Header */}

          <div className="border-b border-black/10 pb-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              04 / CAMPAIGN FORECAST
            </p>

            <h1 className="mt-6 text-7xl font-bold leading-[0.92] text-[#1c1b17]">
              Revenue
              <br />
              Forecast
            </h1>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              Predictive models estimate campaign
              performance, conversion potential and
              expected financial outcomes prior to launch.
            </p>
          </div>

          {/* Forecast Metrics */}

          <div className="mt-16 grid gap-10 md:grid-cols-5">
            <div className="border-t border-black/10 pt-6">
              <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                REACH
              </p>

              <div className="mt-4 text-6xl font-bold">
                {reach}
              </div>
            </div>

            <div className="border-t border-black/10 pt-6">
              <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                CTR
              </p>

              <div className="mt-4 text-6xl font-bold">
                {ctr}
              </div>
            </div>

            <div className="border-t border-black/10 pt-6">
              <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                ORDERS
              </p>

              <div className="mt-4 text-6xl font-bold">
                {orders}
              </div>
            </div>

            <div className="border-t border-black/10 pt-6">
              <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                REVENUE
              </p>

              <div className="mt-4 text-6xl font-bold">
                {revenue}
              </div>
            </div>

            <div className="border-t border-black/10 pt-6">
              <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                PROFIT
              </p>

              <div className="mt-4 text-6xl font-bold">
                {netProfit}
              </div>
            </div>
          </div>

          {/* Forecast Narrative */}

          <div className="mt-20 border border-black/10 bg-white p-12">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              EXECUTIVE OUTLOOK
            </p>

            <h2 className="mt-6 text-5xl font-bold">
              Strong Probability
              <br />
              Of Commercial Success
            </h2>

            <p className="mt-8 max-w-4xl text-lg leading-relaxed text-[#6e7064]">
              Forecasting models indicate strong alignment
              between creator audience demographics and
              artisan product demand. Historical campaign
              benchmarks suggest above-average conversion
              performance and sustainable customer
              acquisition economics.
            </p>
          </div>

          {/* Forecast Drivers */}

          <div className="mt-20">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              FORECAST DRIVERS
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div className="border border-black/10 p-10">
                <div className="text-6xl font-bold">
                  94%
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Audience Alignment
                </h3>

                <p className="mt-4 text-[#6e7064]">
                  Creator demographics closely match
                  target artisan consumers.
                </p>
              </div>

              <div className="border border-black/10 p-10">
                <div className="text-6xl font-bold">
                  5.2%
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Engagement Quality
                </h3>

                <p className="mt-4 text-[#6e7064]">
                  Strong engagement signals indicate
                  higher trust and purchase intent.
                </p>
              </div>

              <div className="border border-black/10 p-10">
                <div className="text-6xl font-bold">
                  HIGH
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  Market Demand
                </h3>

                <p className="mt-4 text-[#6e7064]">
                  Growing consumer demand for ethical,
                  sustainable artisan products.
                </p>
              </div>
            </div>
          </div>

          {/* Funnel */}

          <div className="mt-20 border border-black/10 bg-white p-12">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              CONVERSION FUNNEL
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span>Reach</span>
                <span className="font-bold">{reach}</span>
              </div>

              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span>Clicks</span>
                <span className="font-bold">4,930</span>
              </div>

              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <span>Orders</span>
                <span className="font-bold">{orders}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Revenue</span>
                <span className="text-3xl font-bold">
                  {revenue}
                </span>
              </div>
            </div>
          </div>

          {/* Confidence Report */}

          <div className="mt-20 bg-[#1c1b17] p-16 text-white">
            <p className="text-xs tracking-[0.35em] text-white/50">
              MODEL CONFIDENCE
            </p>

            <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-5xl font-bold">
                  Forecast Confidence
                </h2>

                <p className="mt-6 max-w-2xl text-lg text-white/70">
                  Generated using creator similarity
                  scoring, historical campaign
                  performance and category demand signals.
                </p>
              </div>

              <div className="text-8xl font-bold">
                {confidence}
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-10">
              <Link
                href="/profit"
                className="
                  rounded-full
                  border
                  border-white/20
                  px-8
                  py-4
                  text-xs
                  tracking-[0.25em]
                  text-white
                "
              >
                CONTINUE TO PROFIT ANALYSIS →
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}