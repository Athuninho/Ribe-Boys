import DashboardLayout from "@/components/DashboardLayout";
import AnalyticsOverview from "@/components/AnalyticsOverview";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Administrative Overview</h1>
        <p className="text-slate-500 mt-2 font-medium">Welcome back, Principal. Here is what's happening at Ribe Boys today.</p>
      </div>

      <AnalyticsOverview />
    </DashboardLayout>
  );
}
