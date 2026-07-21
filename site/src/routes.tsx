import type { RouteRecord } from "vite-react-ssg";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Mission from "./pages/Mission";
import Equipe from "./pages/Equipe";
import NosVilles from "./pages/NosVilles";
import VillePage from "./pages/VillePage";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import TemoignagesVideos from "./pages/TemoignagesVideos";
import NotFound from "./pages/NotFound";
import AdminRoot from "./admin/AdminRoot";
import AdminLayout from "./admin/components/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVideosPage from "./pages/admin/AdminVideosPage";
import AdminBlogPage from "./pages/admin/AdminBlogPage";
import AdminBlogEditorPage from "./pages/admin/AdminBlogEditorPage";
import AdminContactsPage from "./pages/admin/AdminContactsPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import { cities } from "./content/cities";
import { blogPosts } from "./content/blog";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "mission", Component: Mission },
      { path: "lequipe", Component: Equipe },
      { path: "nos-villes", Component: NosVilles },
      {
        path: ":slug",
        Component: VillePage,
        getStaticPaths: () => cities.map((c) => c.slug),
      },
      { path: "temoignages-videos", Component: TemoignagesVideos },
      { path: "blog", Component: Blog },
      {
        path: "blog/:slug",
        Component: BlogPost,
        getStaticPaths: () => blogPosts.map((p) => `blog/${p.slug}`),
      },
      { path: "nous-contacter", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminRoot,
    children: [
      { path: "login", Component: AdminLogin },
      {
        path: "",
        Component: AdminLayout,
        children: [
          { index: true, Component: AdminDashboard },
          { path: "videos", Component: AdminVideosPage },
          { path: "blog", Component: AdminBlogPage },
          { path: "blog/new", Component: AdminBlogEditorPage },
          { path: "blog/:slug/edit", Component: AdminBlogEditorPage },
          { path: "contacts", Component: AdminContactsPage },
          { path: "settings", Component: AdminSettingsPage },
        ],
      },
    ],
  },
];
