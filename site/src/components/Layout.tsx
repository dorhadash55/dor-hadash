import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Head } from "vite-react-ssg";
import Header from "./Header";
import Footer from "./Footer";
import MobileCtaBar from "./MobileCtaBar";
import WhatsAppButton from "./WhatsAppButton";
import { siteInfo } from "../content/site";
import ContentSyncInit from "./ContentSyncInit";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Dor Hadash",
  alternateName: "Association Dor Hadash",
  description: "Incubateur d'Alya francophone en Israël",
  url: "https://www.dor-hadash.com",
  logo: "https://www.dor-hadash.com/images/logo.png",
  email: siteInfo.email,
  telephone: siteInfo.phones.israel[0],
  sameAs: [siteInfo.social.facebook],
};

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <ContentSyncInit />
      <Head>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
      </Head>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileCtaBar />
    </div>
  );
}
