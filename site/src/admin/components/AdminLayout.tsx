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
      <div className="flex min-h-screen flex-col bg-gray-50 lg:flex-row">
        <AdminSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <FirebaseBanner />
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  );
}
