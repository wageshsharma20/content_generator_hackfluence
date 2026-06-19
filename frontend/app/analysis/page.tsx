"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import PageTransition from "@/components/ui/page-transition";

export default function AnalysisPage() {
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    const data = localStorage.getItem("product");

    if (data) {
      setProduct(JSON.parse(data));
    }
  }, []);

  return (
    <DashboardLayout>
      <PageTransition>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-4xl font-bold">
              AI Product Analysis
            </h1>

            <p className="mt-2 text-slate-600">
              Gemini-generated insights.
            </p>
          </div>

          <Link
            href="/matching"
            className="rounded-xl bg-orange-600 px-5 py-3 text-white"
          >
            Find Influencers →
          </Link>
        </div>

        {product && (
          <div className="mt-8 rounded-3xl border bg-white p-6">
            <h2 className="text-2xl font-bold">
              {product.name}
            </h2>

            <p className="mt-2 text-slate-500">
              ₹{product.price}
            </p>

            <p className="mt-4">
              {product.description}
            </p>

            {product.image && (
              <img
                src={product.image}
                alt="product"
                className="mt-6 h-64 rounded-2xl object-cover"
              />
            )}
          </div>
        )}

<div className="mt-8 rounded-3xl border bg-white p-6">
  <h2 className="text-xl font-bold">
    Product Insights
  </h2>

  <div className="mt-4 grid gap-4 md:grid-cols-3">
    <div className="rounded-xl bg-orange-50 p-4">
      <p className="text-sm text-orange-600">
        Sustainability Score
      </p>

      <p className="mt-2 text-3xl font-bold">
        91
      </p>
    </div>

    <div className="rounded-xl bg-green-50 p-4">
      <p className="text-sm text-green-600">
        Market Demand
      </p>

      <p className="mt-2 text-3xl font-bold">
        High
      </p>
    </div>

    <div className="rounded-xl bg-blue-50 p-4">
      <p className="text-sm text-blue-600">
        AI Confidence
      </p>

      <p className="mt-2 text-3xl font-bold">
        92%
      </p>
    </div>
  </div>
</div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6">
            <h3 className="text-slate-500">
              Category
            </h3>

            <p className="mt-3 text-2xl font-bold text-orange-600">
              Home Decor
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6">
            <h3 className="text-slate-500">
              Audience
            </h3>

            <p className="mt-3 text-2xl font-bold">
              Women 25-40
            </p>
          </div>
        </div>
      </div>

<div className="mt-8 rounded-3xl bg-slate-900 p-8 text-white">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold">
        AI Confidence Score
      </h2>

      <p className="mt-2 text-slate-400">
        Based on product category,
        audience fit and creator demand.
      </p>
    </div>

    <div className="text-6xl font-bold text-green-400">
      92%
    </div>
    <div className="mt-8 rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-white">
  <h2 className="text-2xl font-bold">
    AI Recommendation
  </h2>

  <p className="mt-4 leading-relaxed text-orange-100">
    This product is highly suitable for lifestyle,
    home decor and sustainability creators.
    The strongest conversion potential comes from
    female audiences aged 25–40 who engage with
    eco-friendly purchasing decisions.
  </p>
</div>
    <Link
  href="/matching"
  className="mt-8 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-white"
>
  Continue to Influencer Matching →
</Link>
  </div>
</div>
</PageTransition>
    </DashboardLayout>
  );
}

