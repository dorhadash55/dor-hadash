import { Outlet } from "react-router-dom";
import { Head } from "vite-react-ssg";
import RequireAuth from "../auth/RequireAuth";
import AdminSidebar from "./AdminSidebar";
import FirebaseBanner from "./FirebaseBanner";

export default function AdminLayout() {
  return (
    <RequireAuth>
      <Head>
        <title>Admin | Dor Hadash</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex min-h-dvh flex-col bg-gray-50 lg:flex-row">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <FirebaseBanner />
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  );
}
