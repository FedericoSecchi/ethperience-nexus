import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Join the community",
    text: "Jump into the ETHperience circle via Telegram or NFT membership and tell us who you are.",
    microcopy: "We care more about your vibe than your follower count.",
  },
  {
    number: "02",
    title: "Choose your experience",
    text: "Pick from upcoming trips: moto, boat, island, snow or special editions around conferences.",
    microcopy: "Small groups, first-come with curation.",
  },
  {
    number: "03",
    title: "Live the trip",
    text: "Show up, disconnect from the noise and plug into people. The rest is handled by the ETHperience crew.",
    microcopy: "Logistics, safety and structure are on us.",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" ref={ref} className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
            How it works
          </h2>
          <p className="text-lg text-muted-foreground">
            Simple by design, curated in the background.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connector Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative text-center lg:text-left"
              >
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted border border-border mb-6 group-hover:border-primary transition-colors">
                  <span className="font-heading font-bold text-primary text-glow">
                    {step.number}
                  </span>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-3">{step.text}</p>
                <p className="text-sm text-primary/70 italic">{step.microcopy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
