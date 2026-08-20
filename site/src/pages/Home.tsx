import SeoHead from "../components/SeoHead";
import Hero from "../components/Hero";
import HomeStats from "../components/HomeStats";
import EntryDoors from "../components/EntryDoors";
import ServicesSection from "../components/ServicesSection";
import CitiesTeaser from "../components/CitiesTeaser";
import VideoTeaser from "../components/VideoTeaser";
import PartnersSection from "../components/PartnersSection";
import BlogTeaser from "../components/BlogTeaser";
import FinalCta from "../components/FinalCta";

export default function Home() {
  return (
    <>
      <SeoHead />
      <Hero />
      <HomeStats />
      <EntryDoors />
      <ServicesSection />
      <CitiesTeaser />
      <VideoTeaser />
      <PartnersSection />
      <BlogTeaser />
      <FinalCta />
    </>
  );
}
