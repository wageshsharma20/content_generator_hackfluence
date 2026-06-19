"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import PageTransition from "@/components/ui/page-transition";

export default function AnalysisPage() {
  const [product, setProduct] = useState<any>();
  const [analysis, setAnalysis] = useState<any>();

  useEffect(() => {
    const data = localStorage.getItem("product");
    if (data) {
      const parsedProduct = JSON.parse(data);
      setProduct(parsedProduct);
      
      const fetchAnalysis = async () => {
        try {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: 'no-store', // Force no-cache so we get fresh data every time!
            body: JSON.stringify({
              product_name: parsedProduct.name || "Handmade Terracotta Vase",
              price: parseFloat(String(parsedProduct.price || "800").replace("₹", "")),
              description: parsedProduct.description || "Eco-friendly handmade pottery"
            })
          });
          const ans = await res.json();
          setAnalysis(ans);
        } catch(e) {
          console.error(e);
        }
      };
      fetchAnalysis();
    }
  }, []);



  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl">
          {/* Header */}

          <div className="border-b border-black/10 pb-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              02 / PRODUCT INTELLIGENCE
            </p>

            <h1 className="mt-6 text-7xl font-bold leading-[0.92] text-[#1c1b17]">
              AI Product
              <br />
              Analysis
            </h1>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              Machine learning models evaluate product
              positioning, audience alignment, creator
              relevance and market demand before campaign
              deployment.
            </p>
          </div>

          {/* Product Section */}

          {product && (
            <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                {product.image && (
                  <img
                    src={product.image}
                    alt="product"
                    className="h-[500px] w-full object-cover"
                  />
                )}
              </div>

              <div>
                <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                  FIG. A
                </p>

                <h2 className="mt-4 text-5xl font-bold text-[#1c1b17]">
                  {product.name}
                </h2>

                <p className="mt-4 text-3xl font-semibold">
                  ₹{product.price}
                </p>

                <p className="mt-8 leading-relaxed text-[#6e7064]">
                  {product.description}
                </p>

                <div className="mt-12 border-t border-black/10 pt-8">
                  <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                    STATUS
                  </p>

                  <p className="mt-4 text-2xl font-bold">
                    Ready For Creator Matching
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Intelligence Metrics */}

          <div className="mt-20">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              PRODUCT INTELLIGENCE
            </p>

            <div className="mt-10 grid gap-10 md:grid-cols-3">
              <div className="border-t border-black/10 pt-6">
                <p className="text-sm text-[#6e7064]">
                  Sustainability Score
                </p>

                <p className="mt-4 text-7xl font-bold">
                  {analysis?.sustainability_score ?? "..."}
                </p>
              </div>

              <div className="border-t border-black/10 pt-6">
                <p className="text-sm text-[#6e7064]">
                  Market Demand
                </p>

                <p className="mt-4 text-7xl font-bold">
                  {analysis?.market_demand ?? "..."}
                </p>
              </div>

              <div className="border-t border-black/10 pt-6">
                <p className="text-sm text-[#6e7064]">
                  AI Confidence
                </p>

                <p className="mt-4 text-7xl font-bold">
                  {analysis?.ai_confidence ? `${analysis.ai_confidence}%` : "..."}
                </p>
              </div>
            </div>
          </div>

          {/* Category + Audience */}

          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <div className="border border-black/10 bg-white p-10">
              <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                CATEGORY
              </p>

              <h3 className={`mt-6 text-5xl font-bold ${analysis?.error ? "text-red-500" : ""}`}>
                {analysis?.error ? "API Error" : (analysis ? analysis.category : 'Home Decor')}
              </h3>

              <p className="mt-4 text-[#6e7064]">
                {analysis?.error ? String(analysis.error) : "Strong creator-commerce category with growing consumer demand."}
              </p>
            </div>

            <div className="border border-black/10 bg-white p-10">
              <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                TARGET AUDIENCE
              </p>

              <h3 className={`mt-6 text-5xl font-bold ${analysis?.error ? "text-red-500" : ""}`}>
                {analysis?.error ? "API Error" : (analysis ? analysis.audience : 'Women 25–40')}
              </h3>

              <p className="mt-4 text-[#6e7064]">
                {analysis?.error ? String(analysis.error) : (analysis ? `Aligned with interests like ${analysis.interests?.join(', ')}` : 'Sustainability-focused consumers with')}
              </p>
            </div>
          </div>

          {/* AI Recommendation */}

          <div className="mt-20 bg-[#1c1b17] p-16 text-white">
            <p className="text-xs tracking-[0.35em] text-white/50">
              AI RECOMMENDATION
            </p>

            <h2 className="mt-6 max-w-5xl text-5xl font-bold leading-tight">
              This product demonstrates
              strong market potential
              within {analysis ? analysis.keywords?.slice(0,3).join(', ') : 'sustainability, lifestyle and handcrafted goods'} categories.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/70">
              Audience analysis indicates that
              {analysis ? analysis.audience : 'eco-conscious consumers'} are highly
              responsive to this type of product. Creators in the {analysis ? analysis.category : 'lifestyle and home decor'} space are expected to generate the strongest conversion rates.
            </p>

            <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-10">
              <div>
                <p className="text-xs tracking-[0.35em] text-white/50">
                  CONFIDENCE SCORE
                </p>

                <div className="mt-4 text-7xl font-bold text-[#efece4]">
                  {analysis?.ai_confidence ? `${analysis.ai_confidence}%` : "92%"}
                </div>
              </div>

              <Link
                href="/matching"
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
                CONTINUE TO MATCHING →
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}