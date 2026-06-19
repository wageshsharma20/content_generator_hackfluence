"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Link from "next/link";
import { Upload, Sparkles } from "lucide-react";
import PageTransition from "@/components/ui/page-transition";

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(URL.createObjectURL(file));
  };

  return (
    <DashboardLayout>
        <PageTransition>
      <div className="max-w-5xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Upload Product
          </h1>

          <p className="mt-2 text-slate-600">
            Add an artisan product and let AI discover the
            perfect creators for promotion.
          </p>
        </div>

        {/* Main Card */}

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="space-y-6">
            {/* Product Name */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Name
              </label>

              <input
              id="productName"
                type="text"
                placeholder="Handmade Terracotta Vase"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-orange-500
                  focus:outline-none
                "
              />
            </div>

            {/* Price */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Price
              </label>

              <input
              id="price"
                type="text"
                placeholder="₹800"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-orange-500
                  focus:outline-none
                "
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Description
              </label>

              <textarea
              id="description"
                rows={5}
                placeholder="Eco-friendly handmade pottery crafted by rural artisans..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-white
                  px-4
                  py-3
                  text-slate-900
                  placeholder:text-slate-400
                  focus:border-orange-500
                  focus:outline-none
                "
              />
            </div>

            {/* Image Upload */}

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Product Image
              </label>

              <div className="rounded-2xl border-2 border-dashed border-orange-200 p-8 text-center">
                <Upload
                  size={40}
                  className="mx-auto text-orange-500"
                />

                <p className="mt-3 text-slate-700">
                  Upload Product Image
                </p>

                <p className="text-sm text-slate-500">
                  JPG, PNG up to 10MB
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="mt-4"
                />
              </div>
            </div>

            {/* Preview */}

            {image && (
              <div>
                <h3 className="mb-3 font-semibold text-slate-800">
                  Image Preview
                </h3>

                <img
                  src={image}
                  alt="preview"
                  className="h-80 rounded-2xl border object-cover"
                />
              </div>
            )}

            {/* Action Buttons */}

            <div className="flex gap-4">
              <button
  onClick={() => {
    localStorage.setItem(
      "product",
      JSON.stringify({
        name: (
          document.getElementById(
            "productName"
          ) as HTMLInputElement
        )?.value,
        price: (
          document.getElementById(
            "price"
          ) as HTMLInputElement
        )?.value,
        description: (
          document.getElementById(
            "description"
          ) as HTMLTextAreaElement
        )?.value,
        image,
      })
    );

    window.location.href = "/analyzing";
  }}
  className="
    inline-flex
    items-center
    gap-2
    rounded-xl
    bg-orange-600
    px-6
    py-3
    text-white
    font-semibold
  "
>
  Analyze With AI
</button>

              <button
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-6
                  py-3
                  font-medium
                  text-slate-700
                  hover:bg-slate-50
                "
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>

        {/* Demo Note */}

        <div className="mt-6 rounded-2xl bg-orange-50 p-4">
          <p className="text-sm text-orange-700">
            Demo Flow: Upload Product → AI Analysis →
            Influencer Matching → Campaign Prediction →
            Profit Calculator
          </p>
        </div>
      </div>
      </PageTransition>
    </DashboardLayout>
  );
}