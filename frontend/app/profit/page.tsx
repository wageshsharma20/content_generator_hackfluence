"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import DashboardLayout from "@/components/layout/dashboard-layout";
import PageTransition from "@/components/ui/page-transition";

export default function ProfitPage() {
  const [price, setPrice] = useState(800);
  const [shipping, setShipping] = useState(120);
  const [platformFee, setPlatformFee] = useState(15);
  const [commission, setCommission] = useState(10);

  const [artisanReceives, setArtisanReceives] = useState(0);
  const [margin, setMargin] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function calculateProfit() {
      setIsLoading(true);
      try {
        const response = await fetchFromAPI("/profit", {
          method: "POST",
          body: JSON.stringify({
            product_price: price,
            shipping_cost: shipping,
            platform_fee: platformFee,
            commission_percent: commission
          })
        });
        setArtisanReceives(response.artisan_earnings);
        setMargin(Math.round((response.artisan_earnings / price) * 100) || 0);
      } catch (err) {
        console.error("Failed to calculate profit");
      }
      setIsLoading(false);
    }
    const timeoutId = setTimeout(() => calculateProfit(), 500);
    return () => clearTimeout(timeoutId);
  }, [price, shipping, platformFee, commission]);

  return (
    <DashboardLayout>
         <PageTransition>
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold">
          Fair Profit Calculator
        </h1>

        <p className="mt-2 text-slate-600">
          Understand exactly how much artisans earn.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Inputs */}

          <div className="rounded-3xl border bg-white p-8">
            <div className="space-y-5">
              <div>
                <label>Product Price</label>

                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(Number(e.target.value))
                  }
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </div>

              <div>
                <label>Shipping Cost</label>

                <input
                  type="number"
                  value={shipping}
                  onChange={(e) =>
                    setShipping(Number(e.target.value))
                  }
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </div>

              <div>
                <label>Platform Fee</label>

                <input
                  type="number"
                  value={platformFee}
                  onChange={(e) =>
                    setPlatformFee(Number(e.target.value))
                  }
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </div>

              <div>
                <label>Influencer Commission %</label>

                <input
                  type="number"
                  value={commission}
                  onChange={(e) =>
                    setCommission(Number(e.target.value))
                  }
                  className="mt-2 w-full rounded-xl border p-3"
                />
              </div>
            </div>
          </div>

          {/* Results */}

          <div className="mt-8 border-t pt-6">
  <div className="flex justify-between">
    <span>Product Price</span>
    <span>₹{price}</span>
  </div>

  <div className="mt-2 flex justify-between">
    <span>Shipping</span>
    <span>-₹{shipping}</span>
  </div>

  <div className="mt-2 flex justify-between">
    <span>Platform Fee</span>
    <span>-₹{platformFee}</span>
  </div>

  <div className="mt-2 flex justify-between">
    <span>Commission</span>
    <span>-{commission}%</span>
  </div>
</div>

          <div className="rounded-3xl bg-green-50 border border-green-100 p-8">
            <h2 className="text-xl font-bold">
              Artisan Earnings
            </h2>

            <p className="mt-6 text-5xl font-bold text-green-700">
              ₹{isLoading ? "..." : artisanReceives}
            </p>

            <p className="mt-3 text-green-600">
              Margin: {isLoading ? "..." : margin}%
            </p>

            <div className="mt-8 rounded-2xl bg-white p-5">
              <h3 className="font-semibold">
                Transparency Matters
              </h3>

              <p className="mt-2 text-slate-600">
                KarigarConnect AI helps artisans see
                hidden costs and maximize earnings.
              </p>
            </div>
            <Link
  href="/outreach"
  className="mt-8 inline-flex rounded-xl bg-orange-600 px-5 py-3 text-white"
>
  Generate Outreach →
</Link>
          </div>
        </div>
      </div>
      </PageTransition>
    </DashboardLayout>
  );
}

