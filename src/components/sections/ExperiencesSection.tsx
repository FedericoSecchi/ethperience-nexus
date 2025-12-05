import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const experiences = [
  {
    emoji: "🏍️",
    title: "Road to PN – Moto Trip",
    slug: "road-to-pn",
    description:
      "Multi-day moto trip for riders who want winding roads, good food and late-night chats about protocols, tokens and life.",
    tags: ["On the road", "Builders", "Long-form conversations"],
  },
  {
    emoji: "⛵",
    title: "Hacker Boat",
    slug: "hacker-boat",
    description:
      "Days on the water, laptops on deck. Code sprints, idea jams and swims between commits.",
    tags: ["On the water", "Deep work", "Crypto meets sea"],
  },
  {
    emoji: "🏝️",
    title: "Cafe Chiller – Island Mode",
    slug: "cafe-chiller",
    description:
      "Island base with good coffee, slow mornings and exploration afternoons. Perfect for remote teams and DAO squads.",
    tags: ["Island life", "Remote work", "Soft pace"],
  },
  {
    emoji: "❄️",
    title: "SnowDAO",
    slug: "snow-dao",
    description:
      "Snow, slopes and sauna chats. Morning rides, evening debriefs and late-night scheming.",
    tags: ["Snow", "Teams", "Reset + rethink"],
  },
];

export function ExperiencesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="featured-experiences"
      ref={ref}
      className="py-24 lg:py-32 relative"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
            Experiences
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Different formats, same core: small groups, strong vibes, real
            connection.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 36, scale: 0.98, rotate: -2 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="glass-card p-6 flex flex-col h-full group"
            >
              {/* Emoji */}
              <span className="text-5xl mb-4 group-hover:scale-110 group-hover:animate-bounce transition-transform duration-300">
                {exp.emoji}
              </span>

              {/* Title */}
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                {exp.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {exp.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to={`/experience/${exp.slug}`}>View details</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
