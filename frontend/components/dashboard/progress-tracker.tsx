"use client";

import { CheckCircle2 } from "lucide-react";

export default function ProgressTracker() {
  const steps = [
    "Upload Product",
    "AI Analysis",
    "Influencer Match",
    "Prediction",
    "Profit",
    "Outreach",
  ];

  return (
    <div className="mt-8 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Campaign Workflow
      </h2>

      <div className="flex flex-wrap gap-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 text-sm font-medium text-orange-700"
          >
            <CheckCircle2 size={16} />
            {index + 1}. {step}
          </div>
        ))}
      </div>
    </div>
  );
}