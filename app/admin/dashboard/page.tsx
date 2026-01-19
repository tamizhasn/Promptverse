import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import BackButton from "@/components/BackButton";
import StatsCards from "@/components/dashboard/StatsCards";
import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import MyPromptsTable from "@/components/dashboard/MyPromptsTable";
import ReportHistory from "@/components/dashboard/ReportHistory";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AppealsAndTerms from "@/components/dashboard/AppealsAndTerms";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="container-app space-y-12 py-10 grid-bg">
      <BackButton label="Home" fallback="/" />
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <StatsCards />
      <AnalyticsCharts />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MyPromptsTable />
        </div>
        <ProfileCard user={session.user} />
      </div>

      <ReportHistory />
      <AppealsAndTerms />
    </div>
  );
}
