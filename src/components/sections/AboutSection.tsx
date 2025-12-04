import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const bullets = [
  {
    icon: "🤝",
    title: "Real connections",
    text: "Trips designed for deep conversations, not elevator pitches.",
  },
  {
    icon: "🌍",
    title: "Shared adventures",
    text: "Moto, sea, snow and island experiences with small groups of 8–12 people.",
  },
  {
    icon: "🧬",
    title: "Web3-native",
    text: "Memberships, access and participation powered by NFTs and on-chain tools.",
  },
  {
    icon: "🧠",
    title: "Time that matters",
    text: "Slow mornings, long dinners, real-time building and co-creation.",
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="what-is-ethperience"
      ref={ref}
      className="py-24 lg:py-32 relative"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -36, scale: 0.98 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-6">
              What is{" "}
              <span className="text-primary text-glow">ETHperience</span>?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ETHperience is a curated community of web3 humans who travel
              together through themed adventures – from moto trips to Hacker
              Boats – using web3 tooling as a layer, not the main show.
            </p>
          </motion.div>

          {/* Right Content - Bullet Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {bullets.map((bullet, index) => (
              <motion.div
                key={bullet.title}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
                className="glass-card p-6 group cursor-default"
              >
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {bullet.icon}
                </span>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {bullet.title}
                </h3>
                <p className="text-sm text-muted-foreground">{bullet.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
