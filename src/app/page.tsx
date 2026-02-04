import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Welcome from "@/components/Welcome";
import RedBanner from "@/components/RedBanner";
import CampaignGallery from "@/components/CampaignGallery";
import VideoSection from "@/components/VideoSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Welcome />
      <RedBanner />
      <CampaignGallery />
      <VideoSection />
      <EventsSection />
      <Footer />
    </main>
  );
}
