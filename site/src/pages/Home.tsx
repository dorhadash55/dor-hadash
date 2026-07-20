import SeoHead from "../components/SeoHead";
import Hero from "../components/Hero";
import MethodeSection from "../components/MethodeSection";
import ServicesSection from "../components/ServicesSection";
import CitiesTeaser from "../components/CitiesTeaser";
import VideoTeaser from "../components/VideoTeaser";
import BlogTeaser from "../components/BlogTeaser";
import FinalCta from "../components/FinalCta";

export default function Home() {
  return (
    <>
      <SeoHead />
      <Hero />
      <MethodeSection />
      <ServicesSection />
      <CitiesTeaser />
      <VideoTeaser />
      <BlogTeaser />
      <FinalCta />
    </>
  );
}
