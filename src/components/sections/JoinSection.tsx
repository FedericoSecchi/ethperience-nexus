import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

const interestOptions = [
  { value: "viajes", label: "Viajes" },
  { value: "comunidad", label: "Comunidad" },
  { value: "sponsor", label: "Sponsor" },
];

export function JoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    alias: "",
    telegram: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { alias, telegram, interest, message } = formData;

    // Build mailto URL
    const subject = encodeURIComponent("ETHperience – New contact");
    const body = encodeURIComponent(
      `Alias: ${alias}\nTelegram: ${telegram}\nInterés: ${interest}\nMensaje:\n${message}`
    );

    const mailtoUrl = `mailto:federico.secchimarino@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoUrl;

    // Reset form
    setFormData({ alias: "", telegram: "", interest: "", message: "" });
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
                value={formData.alias}
                onChange={(e) =>
                  setFormData({ ...formData, alias: e.target.value })
                }
                required
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Telegram */}
            <div className="space-y-2">
              <Label htmlFor="telegram">Telegram handle *</Label>
              <Input
                id="telegram"
                name="telegram"
                value={formData.telegram}
                onChange={(e) =>
                  setFormData({ ...formData, telegram: e.target.value })
                }
                placeholder="@username"
                required
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Interest */}
            <div className="space-y-2">
              <Label htmlFor="interest">Interest *</Label>
              <Select
                value={formData.interest}
                onValueChange={(value) =>
                  setFormData({ ...formData, interest: value })
                }
                required
              >
                <SelectTrigger className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {interestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Short message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us a bit about you and what brought you here..."
                rows={4}
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20 resize-none"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
            >
              Send
            </Button>
          </motion.form>

          {/* Alternative CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-center"
          >
            <p className="text-muted-foreground mb-4">Or jump straight in:</p>
            <Button variant="outline" asChild>
              <a
                href="https://t.me/ethperience"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join the Telegram
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
