import DashboardCalendar from "@/components/dashboard/dashboard-calendar";
import DashboardEarnings from "@/components/dashboard/dashboard-earnings";
import DashboardHours from "@/components/dashboard/dashboard-hours";
import DashboardContracts from "@/components/dashboard/dashboard-contracts";
import { Suspense } from "react";
import DashboardEarningsSkeleton from "@/components/skeletons/dashboard-earnings-skeleton";
import DashboardHoursSkeleton from "@/components/skeletons/dashboard-hours-skeleton";
import DashboardContractsSkeleton from "@/components/skeletons/dashboard-contracts-skeleton";

export default function Page() {
  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Proveedor</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <DashboardCalendar />

        <Suspense fallback={<DashboardEarningsSkeleton />}>
          <DashboardEarnings />
        </Suspense>

        <Suspense fallback={<DashboardHoursSkeleton />}>
          <DashboardHours />
        </Suspense>
      </div>

      <Suspense fallback={<DashboardContractsSkeleton/>}>
        <DashboardContracts />
      </Suspense>
    </div>
  );
}

