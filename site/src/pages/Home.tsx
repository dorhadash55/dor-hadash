import SeoHead from "../components/SeoHead";
import Hero from "../components/Hero";
import HomeStats from "../components/HomeStats";
import EntryDoors from "../components/EntryDoors";
import AccompagnementSection from "../components/AccompagnementSection";
import ServicesSection from "../components/ServicesSection";
import PartnersSection from "../components/PartnersSection";
import CitiesTeaser from "../components/CitiesTeaser";
import VideoTeaser from "../components/VideoTeaser";
import FinalCta from "../components/FinalCta";

export default function Home() {
  return (
    <>
      <SeoHead />
      <Hero />
      <HomeStats />
      <EntryDoors />
      <AccompagnementSection />
      <ServicesSection />
      <CitiesTeaser />
      <PartnersSection />
      <VideoTeaser />
      <FinalCta />
    </>
  );
}
