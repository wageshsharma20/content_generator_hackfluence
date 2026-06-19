"use client";

import { fetchFromAPI } from "@/lib/api";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageTransition from "@/components/ui/page-transition";

export default function OutreachPage() {
  const [outreachMessage, setOutreachMessage] = useState("Loading AI Outreach Message...");
  const [isLoading, setIsLoading] = useState(false);

  const generateEmail = async () => {
    setIsLoading(true);
    setOutreachMessage("Generating personalized email with Gemini 2.5 Flash...");
    try {
      const response = await fetchFromAPI("/outreach?influencer_name=Urban%20Handmade&commission=15", {
        method: "POST",
        body: JSON.stringify({
          product_name: "Handmade Terracotta Vase",
          price: 800,
          description: "Eco-friendly handmade pottery"
        })
      });
      setOutreachMessage(response.message);
    } catch (e) {
      setOutreachMessage("Failed to generate outreach message.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    generateEmail();
  }, []);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(outreachMessage);
      alert("Message copied to clipboard!");
    } catch {
      alert("Unable to copy message.");
    }
  };

  return (
    <DashboardLayout>
          <PageTransition>
      <div>
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              AI Outreach Generator
            </h1>

            <p className="mt-2 text-slate-600">
              Automatically generate personalized influencer
              collaboration proposals using AI.
            </p>
          </div>
        </div>

        {/* Main Content */}

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Campaign Details */}

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold">
              Campaign Details
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Influencer
                </label>

                <input
                  value="Priya Decor"
                  readOnly
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Product
                </label>

                <input
                  value="Handmade Terracotta Vase"
                  readOnly
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Match Score
                </label>

                <input
                  value="94%"
                  readOnly
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Expected Reach
                </label>

                <input
                  value="145,000"
                  readOnly
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600">
                  Commission Offered
                </label>

                <input
                  value="15%"
                  readOnly
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 p-3"
                />
              </div>
            </div>
          </div>

          {/* Generated Email */}

          <div className="rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-orange-600">
                Gemini Generated Outreach
              </h2>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                AI Generated
              </span>
            </div>

            <div className="mt-6 rounded-2xl bg-slate-50 p-6">
              <pre className="whitespace-pre-wrap font-sans text-slate-700">
                {outreachMessage}
              </pre>
            </div>

            {/* Action Buttons */}

            <div className="mt-6 flex gap-4">
              <button
                onClick={copyMessage}
                className="
                  rounded-xl
                  bg-orange-600
                  px-5
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-orange-700
                "
              >
                Copy Message
              </button>

              <button
                onClick={generateEmail}
                disabled={isLoading}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-5
                  py-3
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  disabled:opacity-50
                "
              >
                {isLoading ? "Generating..." : "Regenerate"}
              </button>
            </div>
          </div>
        </div>

        {/* AI Insights */}

        <div className="mt-8 rounded-3xl bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Why This Outreach Works
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">
                Personalization
              </h3>

              <p className="mt-2 text-orange-100">
                Tailored specifically to the influencer's
                niche and audience.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Data Driven
              </h3>

              <p className="mt-2 text-orange-100">
                Uses AI matching scores and campaign
                predictions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Conversion Focused
              </h3>

              <p className="mt-2 text-orange-100">
                Designed to maximize influencer response
                and campaign success.
              </p>
            </div>
          </div>
        </div>
      </div>
      </PageTransition>
    </DashboardLayout>
  );
}