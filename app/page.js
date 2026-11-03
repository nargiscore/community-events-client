import Banner from "@/components/Banner";
import Features from "@/components/Features";
import UpcomingSection from "@/components/UpcomingSection";
import Gallery from "@/components/Gallery";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Banner />
      <UpcomingSection />
      <Features />
      <Gallery />
      <Newsletter />
    </>
  );
}
