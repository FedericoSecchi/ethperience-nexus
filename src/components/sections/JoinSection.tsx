import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MessageCircle } from "lucide-react";

const experiences: Record<string, string> = {
  snowdao: "SnowDAO",
  hackerboat: "Hacker Boat",
  cafechiller: "Cafe Chiller",
  roadtopn: "Road to PN",
};

export function JoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const alias = (formData.get("alias") as string || "").trim();
    const telegram = (formData.get("telegram") as string || "").trim();
    const experience = (formData.get("experience") as string || "").trim();

    // Normalize telegram: add @ if not present
    const telegramNormalized = telegram && !telegram.startsWith("@") 
      ? `@${telegram}` 
      : telegram;

    // Build the English message
    const message = `Hey! I'm ${alias}${telegramNormalized ? ` (${telegramNormalized})` : ""}. I'd love to join ETHperience and I'm interested in ${experiences[experience] || experience}. Nice to meet everyone! 🙌`;

    // Build Telegram URL
    const telegramUrl = `https://t.me/ethperience?text=${encodeURIComponent(message)}`;

    // Open Telegram in new tab
    window.open(telegramUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="join-us" ref={ref} className="py-24 lg:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
              Join the{" "}
              <span className="text-primary text-glow">ETHperience</span> circle
            </h2>
            <p className="text-lg text-muted-foreground">
              Tell us who you are and how you'd like to plug in.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="glass-card p-6 lg:p-8 space-y-6"
          >
            {/* Alias */}
            <div className="space-y-2">
              <Label htmlFor="alias">Alias *</Label>
              <Input
                id="alias"
                name="alias"
                type="text"
                placeholder="Your alias"
                required
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Telegram */}
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram (sin @)</Label>
              <Input
                id="telegram"
                name="telegram"
                type="text"
                placeholder="username"
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <select
                id="experience"
                name="experience"
                required
                defaultValue="snowdao"
                className="flex h-10 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-border focus:border-primary focus:ring-primary/20"
              >
                <option value="snowdao">SnowDAO</option>
                <option value="hackerboat">Hacker Boat</option>
                <option value="cafechiller">Cafe Chiller</option>
                <option value="roadtopn">Road to PN</option>
              </select>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Join the Telegram Group
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
