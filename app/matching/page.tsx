"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";

import PageTransition from "@/components/ui/page-transition";

export default function MatchingPage() {
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const productData = JSON.parse(localStorage.getItem('product') || '{}');
        const response = await fetch("/api/matching", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_name: productData.name || "Handmade Terracotta Vase",
            category: "Home Decor",
            description: productData.description || "Sustainable handmade pottery by rural artisans",
            price: parseFloat((productData.price || "800").replace("₹", ""))
          })
        });
        const data = await response.json();
        setInfluencers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-2xl font-bold tracking-[0.2em] text-[#1c1b17] animate-pulse">
            GEMINI AI IS ANALYZING MATCHES...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl">
          {/* Header */}

          <div className="border-b border-black/10 pb-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              03 / CREATOR INTELLIGENCE
            </p>

            <h1 className="mt-6 text-7xl font-bold leading-[0.92] text-[#1c1b17]">
              Creator
              <br />
              Matching
            </h1>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              AI evaluates audience demographics,
              engagement quality, niche relevance and
              creator affinity to identify the highest
              probability conversion partners.
            </p>
          </div>

          {/* Executive Summary */}

          <div className="mt-16 border border-black/10 bg-white p-10">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              EXECUTIVE SUMMARY
            </p>

            <h2 className="mt-6 text-4xl font-bold">
              Recommended Creator Network
            </h2>

            <p className="mt-6 max-w-4xl leading-relaxed text-[#6e7064]">
              Based on audience demographics,
              sustainability interests, engagement
              patterns and historical creator-commerce
              performance, the following creators
              demonstrate the highest probability of
              generating artisan product conversions.
            </p>
          </div>

          {/* Influencer Rankings */}

          <div className="mt-16 space-y-8">
            {influencers.map((item, index) => (
              <div
                key={item.name}
                className="border border-black/10 bg-white p-10 transition hover:border-black/20"
              >
                <div className="grid gap-8 lg:grid-cols-[120px_1fr_180px]">
                  {/* Rank */}

                  <div>
                    <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                      RANK
                    </p>

                    <div className="mt-4 text-7xl font-bold">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Creator */}

                  <div>
                    <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                      CREATOR PROFILE
                    </p>

                    <h3 className="mt-4 text-4xl font-bold">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-lg text-[#6e7064]">
                      {item.niche}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <span className="border border-black/10 px-4 py-2 text-xs tracking-[0.2em]">
                        HOME DECOR
                      </span>

                      <span className="border border-black/10 px-4 py-2 text-xs tracking-[0.2em]">
                        SUSTAINABILITY
                      </span>

                      <span className="border border-black/10 px-4 py-2 text-xs tracking-[0.2em]">
                        LIFESTYLE
                      </span>
                    </div>

                    <div className="mt-10 grid gap-8 md:grid-cols-2">
                      <div>
                        <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                          FOLLOWERS
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                          {item.followers.toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs tracking-[0.3em] text-[#6e7064]">
                          ENGAGEMENT
                        </p>

                        <p className="mt-2 text-3xl font-bold">
                          {item.engagement}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score */}

                  <div className="border-l border-black/10 pl-8">
                    <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                      MATCH SCORE
                    </p>

                    <div className="mt-6 text-8xl font-bold text-[#1c1b17]">
                      {item.match_score}
                    </div>

                    <p className="mt-2 text-sm text-[#6e7064]">
                      AI Confidence
                    </p>

                    <div className="mt-8 h-[2px] bg-black/10">
                      <div
                        className="h-[2px] bg-[#1c1b17]"
                        style={{
                          width: `${item.match_score}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Intelligence Report */}

          <div className="mt-20 bg-[#1c1b17] p-16 text-white">
            <p className="text-xs tracking-[0.35em] text-white/50">
              MATCHING RATIONALE
            </p>

            <h2 className="mt-6 text-5xl font-bold">
              Why These Creators
            </h2>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              <div>
                <div className="text-5xl font-bold">
                  01
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Audience Alignment
                </h3>

                <p className="mt-4 leading-relaxed text-white/70">
                  Follower demographics strongly align
                  with sustainability-focused artisan
                  commerce consumers.
                </p>
              </div>

              <div>
                <div className="text-5xl font-bold">
                  02
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Engagement Quality
                </h3>

                <p className="mt-4 leading-relaxed text-white/70">
                  Above-average engagement indicates
                  stronger trust and higher purchasing
                  intent.
                </p>
              </div>

              <div>
                <div className="text-5xl font-bold">
                  03
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Product Relevance
                </h3>

                <p className="mt-4 leading-relaxed text-white/70">
                  Content themes naturally align with
                  handmade, ethical and sustainable
                  product categories.
                </p>
              </div>
            </div>

            <div className="mt-16 border-t border-white/10 pt-10">
              <Link
                href="/prediction"
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
                CONTINUE TO FORECASTING →
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}