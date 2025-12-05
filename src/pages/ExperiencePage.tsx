import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/sections/FooterSection";

const experienceMap: Record<string, { title: string; subtitle: string }> = {
  "road-to-pn": {
    title: "Road to PN – Moto Trip",
    subtitle: "Multi-day moto trip for riders who want winding roads, good food and late-night chats about protocols, tokens and life.",
  },
  "hacker-boat": {
    title: "Hacker Boat",
    subtitle: "Days on the water, laptops on deck. Code sprints, idea jams and swims between commits.",
  },
  "cafe-chiller": {
    title: "Cafe Chiller – Island Mode",
    subtitle: "Island base with good coffee, slow mornings and exploration afternoons. Perfect for remote teams and DAO squads.",
  },
  "snow-dao": {
    title: "SnowDAO",
    subtitle: "Snow, slopes and sauna chats. Morning rides, evening debriefs and late-night scheming.",
  },
};

export default function ExperiencePage() {
  const { slug } = useParams<{ slug: string }>();
  const experience = slug ? experienceMap[slug] : null;

  if (!experience) {
    return (
      <>
        <Navigation />
        <section className="min-h-screen flex items-center justify-center py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
              Experience not found
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              The experience you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        </section>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <section className="min-h-screen py-24 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-8">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to experiences
              </Link>
            </Button>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl xl:text-6xl font-heading font-bold mb-6">
              {experience.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-muted-foreground mb-12 leading-relaxed">
              {experience.subtitle}
            </p>

            {/* Description */}
            <div className="glass-card p-6 lg:p-8 mb-12">
              <p className="text-muted-foreground leading-relaxed mb-6">
                This experience is part of ETHperience's curated collection of web3 adventures. 
                Small groups, strong vibes, real connections. We bring together builders, founders, 
                and explorers who prefer campfires over conference halls.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Details about dates, locations, and availability will be shared with the community 
                as they're confirmed. Join the circle to stay in the loop.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/#join-us">Join the Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
}

