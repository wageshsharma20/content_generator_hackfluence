"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageTransition from "@/components/ui/page-transition";

export default function ProfitPage() {
  const [price, setPrice] = useState("800");
  const [shipping, setShipping] = useState("120");
  const [platformFee, setPlatformFee] = useState("15");
  const [commission, setCommission] = useState("10");

  useEffect(() => {
    try {
      const prod = JSON.parse(localStorage.getItem("product") || "{}");
      if (prod.price) {
        setPrice(String(prod.price).replace("₹", ""));
      }
      
      const matchData = JSON.parse(localStorage.getItem("top_match") || "{}");
      if (matchData.recommended_commission) {
        setCommission(String(matchData.recommended_commission));
      }
    } catch(e) {}
  }, []);

  const priceNum = Number(price) || 0;
  const shippingNum = Number(shipping) || 0;
  const platformFeeNum = Number(platformFee) || 0;
  const commissionNum = Number(commission) || 0;

  const artisanReceives =
    priceNum -
    shippingNum -
    platformFeeNum -
    (priceNum * commissionNum) / 100;

  const margin =
    priceNum > 0
      ? Math.round((artisanReceives / priceNum) * 100)
      : 0;

  return (
    <DashboardLayout>
      <PageTransition>
        <div className="max-w-7xl">
          {/* Header */}

          <div className="border-b border-black/10 pb-16">
            <p className="text-xs tracking-[0.35em] text-[#6e7064]">
              05 / PROFIT ANALYSIS
            </p>

            <h1 className="mt-6 text-7xl font-bold leading-[0.92] text-[#1c1b17]">
              Artisan
              <br />
              Economics
            </h1>

            <p className="mt-8 max-w-3xl text-lg text-[#6e7064]">
              Understand exactly how campaign costs,
              commissions and platform fees impact
              artisan profitability.
            </p>
          </div>

          <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Inputs */}

            <div>
              <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                INPUT VARIABLES
              </p>

              <div className="mt-8 border border-black/10 bg-white p-10">
                {/* Product Price */}

                <div className="mb-10">
                  <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                    PRODUCT PRICE
                  </p>

                  <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value)
                    }
                    className="
                      mt-4
                      w-full
                      border-b
                      border-black/20
                      bg-transparent
                      pb-4
                      text-6xl
                      font-bold
                      outline-none
                    "
                  />
                </div>

                {/* Shipping */}

                <div className="mb-10">
                  <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                    SHIPPING COST
                  </p>

                  <input
                    type="number"
                    value={shipping}
                    onChange={(e) =>
                      setShipping(e.target.value)
                    }
                    className="
                      mt-4
                      w-full
                      border-b
                      border-black/20
                      bg-transparent
                      pb-4
                      text-6xl
                      font-bold
                      outline-none
                    "
                  />
                </div>

                {/* Platform Fee */}

                <div className="mb-10">
                  <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                    PLATFORM FEE
                  </p>

                  <input
                    type="number"
                    value={platformFee}
                    onChange={(e) =>
                      setPlatformFee(e.target.value)
                    }
                    className="
                      mt-4
                      w-full
                      border-b
                      border-black/20
                      bg-transparent
                      pb-4
                      text-6xl
                      font-bold
                      outline-none
                    "
                  />
                </div>

                {/* Commission */}

                <div>
                  <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                    COMMISSION %
                  </p>

                  <input
                    type="number"
                    value={commission}
                    onChange={(e) =>
                      setCommission(e.target.value)
                    }
                    className="
                      mt-4
                      w-full
                      border-b
                      border-black/20
                      bg-transparent
                      pb-4
                      text-6xl
                      font-bold
                      outline-none
                    "
                  />
                </div>
              </div>
            </div>

            {/* Results */}

            <div>
              <p className="text-xs tracking-[0.35em] text-[#6e7064]">
                EARNINGS BREAKDOWN
              </p>

              <div className="mt-8 border border-black/10 bg-white p-10">
                <div className="space-y-5">
                  <div className="flex justify-between border-b border-black/10 pb-4">
                    <span>Product Price</span>
                    <span>₹{priceNum}</span>
                  </div>

                  <div className="flex justify-between border-b border-black/10 pb-4">
                    <span>Shipping</span>
                    <span>- ₹{shippingNum}</span>
                  </div>

                  <div className="flex justify-between border-b border-black/10 pb-4">
                    <span>Platform Fee</span>
                    <span>- ₹{platformFeeNum}</span>
                  </div>

                  <div className="flex justify-between border-b border-black/10 pb-4">
                    <span>Commission</span>
                    <span>{commissionNum}%</span>
                  </div>
                </div>

                <div className="mt-12 border-t border-black/10 pt-10">
                  <p className="text-xs tracking-[0.25em] text-[#6e7064]">
                    ARTISAN RECEIVES
                  </p>

                  <div className="mt-4 text-7xl font-bold text-[#1c1b17]">
                    ₹{artisanReceives.toFixed(0)}
                  </div>

                  <div className="mt-4 text-lg text-[#6e7064]">
                    Margin: {margin}%
                  </div>
                </div>
              </div>

              <div className="mt-10 bg-[#1c1b17] p-10 text-white">
                <p className="text-xs tracking-[0.35em] text-white/50">
                  TRANSPARENCY
                </p>

                <h2 className="mt-4 text-4xl font-bold">
                  Every Rupee
                  <br />
                  Accounted For.
                </h2>

                <p className="mt-6 leading-relaxed text-white/70">
                  KarigarConnect AI enables artisans to
                  understand the true economics behind
                  creator-led commerce and optimize for
                  long-term profitability.
                </p>

                <Link
                  href="/outreach"
                  className="
                    mt-8
                    inline-flex
                    rounded-full
                    bg-white
                    px-8
                    py-4
                    text-xs
                    font-semibold
                    tracking-[0.25em]
                    text-[#1c1b17]
                  "
                >
                  GENERATE OUTREACH →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </DashboardLayout>
  );
}