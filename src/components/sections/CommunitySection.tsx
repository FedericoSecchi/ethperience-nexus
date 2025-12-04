import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import motoTripImg from "@/assets/moto-trip.jpg";
import hackerBoatImg from "@/assets/hacker-boat.jpg";
import islandCafeImg from "@/assets/island-cafe.jpg";

const highlights = [
  {
    type: "image",
    src: motoTripImg,
    caption: "Late-night roadmap session after a full day on the road.",
  },
  {
    type: "image",
    src: hackerBoatImg,
    caption: "Hacker Boat crew syncing between code sprints and swims.",
  },
  {
    type: "quote",
    text: "Felt more connected in 3 days than in a whole week of conferences.",
    author: "Early ETHperience participant (beta run)",
  },
  {
    type: "image",
    src: islandCafeImg,
    caption: "Moments that don't fit in a conference schedule.",
  },
];

export function CommunitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="community-highlights"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
            Community Highlights
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            A mix of real moments and future worlds we're building towards.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.98, y: 24 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className={`glass-card overflow-hidden ${
                item.type === "quote" ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {item.type === "image" && item.src ? (
                <div className="relative aspect-[4/3] group overflow-hidden">
                  <img 
                    src={item.src} 
                    alt={item.caption || "Community highlight"} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-sm text-foreground">{item.caption}</p>
                  </div>
                </div>
              ) : (
                <div className="p-6 lg:p-8 flex flex-col justify-center min-h-[200px]">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-foreground font-medium mb-4 italic">
                    "{item.text}"
                  </p>
                  <p className="text-sm text-muted-foreground">— {item.author}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
