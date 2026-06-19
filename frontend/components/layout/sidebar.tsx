"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  Brain,
  Users,
  BarChart3,
  Calculator,
  Mail,
} from "lucide-react";

const links = [
{
  href: "/demo",
  label: "Demo Overview",
  icon: LayoutDashboard,
},
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/upload",
    label: "Upload Product",
    icon: Upload,
  },
  {
    href: "/analysis",
    label: "AI Analysis",
    icon: Brain,
  },
  {
    href: "/matching",
    label: "Influencer Match",
    icon: Users,
  },
  {
    href: "/prediction",
    label: "Campaign Prediction",
    icon: BarChart3,
  },
  {
    href: "/profit",
    label: "Profit Calculator",
    icon: Calculator,
  },
  {
    href: "/outreach",
    label: "AI Outreach",
    icon: Mail,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-orange-600">
          KarigarConnect AI
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Creator Economy Platform
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-3
                transition-all
                ${
                  active
                    ? "bg-orange-100 text-orange-600 font-semibold"
                    : "text-gray-700 hover:bg-orange-50"
                }
              `}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-4 rounded-2xl bg-orange-600 p-5 text-white">
        <h3 className="font-semibold">
          Impact Generated
        </h3>

        <div className="mt-4 space-y-3">
          <div>
            <p className="text-2xl font-bold">
              ₹12.5L
            </p>

            <p className="text-xs text-orange-100">
              Revenue Generated
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold">
              850+
            </p>

            <p className="text-xs text-orange-100">
              Artisan Families Supported
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}