import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperiencesSection } from "@/components/sections/ExperiencesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { UpcomingSection } from "@/components/sections/UpcomingSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { JoinSection } from "@/components/sections/JoinSection";
import { FooterSection } from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperiencesSection />
      <HowItWorksSection />
      <CommunitySection />
      <UpcomingSection />
      <SponsorsSection />
      <JoinSection />
      <FooterSection />
    </main>
  );
};

export default Index;
