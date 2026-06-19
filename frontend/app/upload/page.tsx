"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Upload } from "lucide-react";
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
        <div className="max-w-6xl">
          {/* Editorial Header */}

          <div className="border-b border-black/10 pb-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              01 / PRODUCT SUBMISSION
            </p>

            <h1 className="mt-6 text-7xl font-bold leading-[0.92] text-[#1c1b17]">
              Submit An
              <br />
              Artisan Product
            </h1>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              Upload product information and allow
              KarigarConnect AI to analyze market fit,
              identify creators, forecast campaign
              performance, and generate outreach.
            </p>
          </div>

          {/* Main Layout */}

          <div className="mt-16 grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Form */}

            <div>
              <div className="space-y-10">
                <div>
                  <p className="mb-3 text-xs tracking-[0.3em] text-[#6e7064]">
                    PRODUCT NAME
                  </p>

                  <input
                    id="productName"
                    type="text"
                    placeholder="Handmade Terracotta Vase"
                    className="
                      w-full
                      border-b
                      border-black/20
                      bg-transparent
                      pb-4
                      text-3xl
                      font-semibold
                      outline-none
                      placeholder:text-black/20
                    "
                  />
                </div>

                <div>
                  <p className="mb-3 text-xs tracking-[0.3em] text-[#6e7064]">
                    PRODUCT PRICE
                  </p>

                  <input
                    id="price"
                    type="text"
                    placeholder="₹800"
                    className="
                      w-full
                      border-b
                      border-black/20
                      bg-transparent
                      pb-4
                      text-3xl
                      font-semibold
                      outline-none
                      placeholder:text-black/20
                    "
                  />
                </div>

                <div>
                  <p className="mb-3 text-xs tracking-[0.3em] text-[#6e7064]">
                    PRODUCT DESCRIPTION
                  </p>

                  <textarea
                    id="description"
                    rows={6}
                    placeholder="Describe the artisan product, its craftsmanship, materials, story and sustainability impact."
                    className="
                      w-full
                      border
                      border-black/10
                      bg-transparent
                      p-6
                      text-lg
                      outline-none
                      placeholder:text-black/30
                    "
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Panel */}

            {/* Sidebar Panel */}

<div>
  <div className="border border-[#d7d2c7] bg-[#f4f1ea] p-8">
    <p className="text-xs tracking-[0.35em] text-[#6e7064]">
      FIG. A
    </p>

    <h2 className="mt-4 text-3xl font-bold text-[#1c1b17]">
      Product Asset
    </h2>

    <div className="mt-8 border border-dashed border-[#d7d2c7] p-12 text-center transition hover:bg-[#efece4]">
      <Upload
        size={40}
        className="mx-auto text-[#1c1b17]"
      />

      <p className="mt-4 font-medium text-[#1c1b17]">
        Upload Product Image
      </p>

      <p className="mt-2 text-sm text-[#6e7064]">
        JPG, PNG • Up to 10MB
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="
          mt-6
          w-full
          text-sm
          text-[#6e7064]
          file:mr-4
          file:border
          file:border-[#d7d2c7]
          file:bg-[#efece4]
          file:px-4
          file:py-2
          file:text-xs
          file:tracking-[0.2em]
          file:text-[#1c1b17]
        "
      />
    </div>

    {image && (
      <div className="mt-8">
        <img
          src={image}
          alt="preview"
          className="
            h-80
            w-full
            border
            border-[#d7d2c7]
            object-cover
          "
        />
      </div>
    )}

    <div className="mt-10 border-t border-[#d7d2c7] pt-8">
      <p className="text-xs tracking-[0.35em] text-[#6e7064]">
        PLATFORM PROCESS
      </p>

      <div className="mt-6 space-y-5">
        {[
          "Product Analysis",
          "Creator Matching",
          "Forecasting",
          "AI Outreach",
          "Profit Optimization",
        ].map((item, index) => (
          <div
            key={item}
            className="flex justify-between border-b border-black/5 pb-3"
          >
            <span className="text-[#6e7064]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="text-[#1c1b17]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>
          </div>

          {/* Action Bar */}

          <div className="mt-16 flex flex-wrap gap-4 border-t border-black/10 pt-10">
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
                rounded-full
                bg-[#1c1b17]
                px-8
                py-4
                text-xs
                tracking-[0.25em]
                text-white
              "
            >
              ANALYZE WITH AI →
            </button>

            <button
              className="
                rounded-full
                border
                border-black/20
                px-8
                py-4
                text-xs
                tracking-[0.25em]
              "
            >
              SAVE DRAFT
            </button>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}