import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

const experiences = {
  snowdao: {
    label: "SnowDAO",
    tg: "https://t.me/ethperience",
  },
  hackerboat: {
    label: "Hacker Boat",
    tg: "https://t.me/ethperience",
  },
  cafechiller: {
    label: "Cafe Chiller",
    tg: "https://t.me/ethperience",
  },
  roadtopn: {
    label: "Road to PN",
    tg: "https://t.me/ethperience",
  },
};

export function JoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [alias, setAlias] = useState("");
  const [telegram, setTelegram] = useState("");
  const [experience, setExperience] = useState("snowdao");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const exp = experiences[experience as keyof typeof experiences];
    const telegramFormatted = telegram ? ` (@${telegram})` : "";

    const message = `Hey! I'm ${alias}${telegramFormatted}. I'd love to join ETHperience and I'm interested in ${exp.label}. Nice to meet everyone! 🙌`;

    const tgUrl = `${exp.tg}?text=${encodeURIComponent(message)}`;

    window.open(tgUrl, "_blank");

    // Reset form
    setAlias("");
    setTelegram("");
    setExperience("snowdao");
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
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
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
                value={telegram}
                onChange={(e) => setTelegram(e.target.value)}
                placeholder="username"
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience">Experience *</Label>
              <Select
                value={experience}
                onValueChange={setExperience}
                required
              >
                <SelectTrigger className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20">
                  <SelectValue placeholder="Select an experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="snowdao">SnowDAO</SelectItem>
                  <SelectItem value="hackerboat">Hacker Boat</SelectItem>
                  <SelectItem value="cafechiller">Cafe Chiller</SelectItem>
                  <SelectItem value="roadtopn">Road to PN</SelectItem>
                </SelectContent>
              </Select>
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
