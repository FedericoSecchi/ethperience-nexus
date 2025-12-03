import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";

const trips = [
  {
    status: "In planning",
    statusColor: "bg-primary",
    title: "ETHDenver 2025 Side Trip",
    description:
      "Pre/post-conference experience for a small group of builders joining ETHDenver.",
    tag: "Conference-linked",
    date: "2025 · USA",
    note: "Limited spots · Prioritizing people already active in web3.",
  },
  {
    status: "Concept",
    statusColor: "bg-secondary",
    title: "Hacker Boat 2025",
    description: "Floating co-working + adventure base for web3 teams.",
    tag: "On the water",
    date: "2025 · TBD",
    note: "Ideal for small teams or early-stage projects.",
  },
  {
    status: "Exploring",
    statusColor: "bg-accent",
    title: "SnowDAO Winter Edition",
    description: "Snow reset + strategic offsite format for DAOs and squads.",
    tag: "Snow",
    date: "2025–2026",
    note: "Locations under review.",
  },
];

export function UpcomingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="upcoming-trips" ref={ref} className="py-24 lg:py-32 relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
            Upcoming Trips & Ideas
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Living roadmap – not a promise chain, but a pulse of what's coming.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent lg:-translate-x-1/2" />

            {/* Trip Items */}
            <div className="space-y-12">
              {trips.map((trip, index) => (
                <motion.div
                  key={trip.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`relative pl-8 lg:pl-0 ${
                    index % 2 === 0
                      ? "lg:pr-[calc(50%+2rem)] lg:text-right"
                      : "lg:pl-[calc(50%+2rem)]"
                  }`}
                >
                  {/* Node */}
                  <div
                    className={`absolute left-0 lg:left-1/2 top-0 w-4 h-4 rounded-full ${trip.statusColor} lg:-translate-x-1/2 shadow-[0_0_20px_currentColor] animate-pulse-glow`}
                  />

                  {/* Card */}
                  <div className="glass-card p-6">
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trip.statusColor}/20 text-foreground mb-3`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${trip.statusColor}`}
                      />
                      {trip.status}
                    </span>

                    <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                      {trip.title}
                    </h3>

                    <p className="text-muted-foreground mb-4">
                      {trip.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {trip.date}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-muted text-xs">
                        {trip.tag}
                      </span>
                    </div>

                    <p className="text-xs text-primary/70 italic">{trip.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
