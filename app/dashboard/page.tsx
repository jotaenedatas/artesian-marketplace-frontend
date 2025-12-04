import { ArtisanDashboard } from "@/components/features/dashboard/artisan-view";
import { CustomerDashboard } from "@/components/features/dashboard/customer-view";
import { getAPIClient } from "@/services/api";
import { BackendUser, UserRole } from "@/types/backend";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const api = await getAPIClient();
  let user: BackendUser;

  try {
    const { data } = await api.get<BackendUser>("/auth/me");
    user = data;
  } catch (error) {
    redirect("/login");
  }

  switch (user.role) {
    case UserRole.ARTISAN:
      return <ArtisanDashboard user={user} />;

    case UserRole.ADMIN:
      return (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          Painel Admin (Em construção)
        </div>
      );

    case UserRole.CUSTOMER:
    default:
      return <CustomerDashboard user={user} />;
  }
}
