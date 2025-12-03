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
import { toast } from "@/hooks/use-toast";
import { Send, MessageCircle } from "lucide-react";

const interestOptions = [
  "I want to join a future trip",
  "I want to bring my team",
  "I'm interested in sponsoring",
  "I just want to stay in the loop",
];

export function JoinSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    interest: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Got it!",
      description:
        "We'll reach out when the next experience matches your vibe.",
    });

    setIsSubmitting(false);
    setFormData({ name: "", email: "", role: "", interest: "", message: "" });
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
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card p-6 lg:p-8 space-y-6"
          >
            {/* Name & Email Row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Role / What you do in web3</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
              />
            </div>

            {/* Interest */}
            <div className="space-y-2">
              <Label htmlFor="interest">How do you want to be involved? *</Label>
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
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Tell us a bit about you</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Short is fine. Who are you, what excites you and what brought you here?"
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
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Syncing to the chain…"
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
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
