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
];
