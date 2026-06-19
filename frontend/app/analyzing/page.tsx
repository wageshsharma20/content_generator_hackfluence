"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/dashboard-layout";
import AiLoader from "@/components/ui/ai-loader";

export default function AnalyzingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/analysis");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <DashboardLayout>
      <AiLoader />
    </DashboardLayout>
  );
}