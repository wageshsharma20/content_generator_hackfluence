"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageTransition from "@/components/ui/page-transition";

export default function OutreachPage() {
  const [outreachMessage, setOutreachMessage] = useState("Click Regenerate to generate outreach with Gemini 2.5 Flash...");
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState("Handmade Terracotta Vase");
  const [topMatch, setTopMatch] = useState<any>(null);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("product") || "{}");
      if (data.name) setProductName(data.name);
      
      const matchData = JSON.parse(localStorage.getItem("top_match") || "{}");
      setTopMatch(matchData);
    } catch (e) {}
  }, []);

  const generateMessage = async () => {
    setLoading(true);
    setOutreachMessage("Gemini AI is crafting your message...");
    try {
      const productData = JSON.parse(localStorage.getItem('product') || '{}');
      const topMatch = JSON.parse(localStorage.getItem('top_match') || '{}');
      const infName = encodeURIComponent(topMatch.influencer_name || "Priya Decor");
      const comm = encodeURIComponent(topMatch.recommended_commission || 15);
      
      const response = await fetch(`/api/outreach?influencer_name=${infName}&commission=${comm}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: productData.name || "Handmade Terracotta Vase",
          price: parseFloat((productData.price || "800").replace("₹", "")),
          description: productData.description || "Eco-friendly handmade pottery"
        })
      });
      if (!response.ok) {
        setOutreachMessage(`API Error: ${response.status}`);
        return;
      }
      const data = await response.json();
      setOutreachMessage(data.message);
    } catch (e) {
      setOutreachMessage("Failed to generate. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(
        outreachMessage
      );

      alert("Message copied to clipboard.");
    } catch {
      alert("Unable to copy message.");
    }
  };

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl">
          {/* Header */}

          <div className="border-b border-black/10 pb-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              06 / CREATOR OUTREACH
            </p>

            <h1 className="mt-6 text-7xl font-bold leading-[0.92] text-[#1c1b17]">
              Executive
              <br />
              Correspondence
            </h1>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              AI-generated outreach designed to
              maximize creator response rates while
              preserving authentic artisan storytelling.
            </p>
          </div>

          {/* Layout */}

          <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Campaign Data */}

            <div>
              <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                CAMPAIGN PROFILE
              </p>

              <div className="mt-8 border border-black/10 bg-white p-10">
                <div className="space-y-8">
                  <div>
                    <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                      CREATOR
                    </p>

                    <div className="mt-2 text-3xl font-bold">
                      {topMatch?.influencer_name || "Priya Decor"}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                      PRODUCT
                    </p>

                    <div className="mt-2 text-3xl font-bold">
                      {productName}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                      MATCH SCORE
                    </p>

                    <div className="mt-2 text-5xl font-bold">
                      {topMatch?.match_score || 94}%
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                      EXPECTED REACH
                    </p>

                    <div className="mt-2 text-5xl font-bold">
                      {topMatch?.followers ? Math.round(topMatch.followers * (topMatch.engagement / 100) * 8).toLocaleString() : "145K"}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                      COMMISSION
                    </p>

                    <div className="mt-2 text-5xl font-bold">
                      {topMatch?.recommended_commission || 15}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outreach Letter */}

            <div>
              <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                GENERATED LETTER
              </p>

              <div className="mt-8 border border-black/10 bg-white p-10">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-bold">
                      Creator Proposal
                    </h2>

                    <p className="mt-2 text-sm text-[#6e7064]">
                      AI Generated Communication
                    </p>
                  </div>

                  <div className="border border-black/10 px-4 py-2 text-xs tracking-[0.2em]">
                    GENERATED
                  </div>
                </div>

                <div className="border-t border-black/10 pt-8">
                  <pre className="whitespace-pre-wrap font-sans leading-relaxed text-[#1c1b17]">
                    {outreachMessage}
                  </pre>
                </div>

                <div className="mt-10 flex gap-4 border-t border-black/10 pt-8">
                  <button
                    onClick={copyMessage}
                    className="
                      rounded-full
                      bg-[#1c1b17]
                      px-8
                      py-4
                      text-xs
                      tracking-[0.25em]
                      text-white
                    "
                  >
                    COPY LETTER
                  </button>

                  <button
                    onClick={generateMessage}
                    disabled={loading}
                    className="
                      rounded-full
                      border
                      border-black/20
                      px-8
                      py-4
                      text-xs
                      tracking-[0.25em]
                      disabled:opacity-50
                    "
                  >
                    {loading ? "GENERATING..." : "REGENERATE"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Intelligence Layer */}

          <div className="mt-20 bg-[#1c1b17] p-16 text-white">
            <p className="text-xs tracking-[0.35em] text-white/50">
              OUTREACH STRATEGY
            </p>

            <h2 className="mt-6 text-5xl font-bold">
              Why This Message Works
            </h2>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              <div>
                <div className="text-5xl font-bold">
                  01
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Personalization
                </h3>

                <p className="mt-4 leading-relaxed text-white/70">
                  Tailored to creator interests,
                  audience profile and content style.
                </p>
              </div>

              <div>
                <div className="text-5xl font-bold">
                  02
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Data Driven
                </h3>

                <p className="mt-4 leading-relaxed text-white/70">
                  Uses matching intelligence and
                  campaign forecasting insights.
                </p>
              </div>

              <div>
                <div className="text-5xl font-bold">
                  03
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  Conversion Focused
                </h3>

                <p className="mt-4 leading-relaxed text-white/70">
                  Structured to maximize creator
                  response and partnership likelihood.
                </p>
              </div>
            </div>
          </div>

          {/* Final Completion Section */}

          <div className="mt-20 border-t border-black/10 pt-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              CAMPAIGN READY
            </p>

            <h2 className="mt-6 text-6xl font-bold leading-tight">
              Your Campaign
              <br />
              Is Ready To Launch.
            </h2>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              Product analysis, creator matching,
              forecasting, profitability assessment and
              outreach generation have been completed.
            </p>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}