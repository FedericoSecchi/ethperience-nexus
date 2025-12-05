import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const columns = [
  {
    title: "Why it makes sense",
    bullets: [
      "Curated environment to connect with your own team and the broader ecosystem.",
      "Better than a rushed dinner at the end of a 12-hour conference day.",
      "Content opportunities (photo, video, storytelling) that feel organic.",
    ],
  },
  {
    title: "What you get",
    bullets: [
      "Slots for your team in specific trips.",
      "Co-branded experiences and touchpoints.",
      "Post-trip content pack (photos, clips, stories) for your channels.",
    ],
  },
  {
    title: "Next step",
    bullets: [
      "Reach out to co-design a format that actually fits your culture.",
      "We keep groups small and aligned – no random logo soup.",
    ],
  },
];

export function SponsorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sponsors" ref={ref} className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
            For Sponsors & Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Not another logo-on-wall deal. Think real presence with your people.
          </p>
        </motion.div>

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {columns.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="glass-card p-6 lg:p-8"
            >
              <h3 className="font-heading font-semibold text-xl text-foreground mb-6">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button variant="secondary" size="lg" asChild>
            <Link to="/sponsors">Talk about sponsorship</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
