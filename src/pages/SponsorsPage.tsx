import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/sections/FooterSection";

const interestOptions = [
  "Viajes de equipo",
  "Activaciones de marca",
  "Series de eventos",
];

export default function SponsorsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    interest: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, company, role, interest, message } = formData;

    // Build mailto URL
    const subject = encodeURIComponent("ETHperience – Sponsorship enquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nRole: ${role}\nInterest: ${interest}\nMessage:\n${message}`
    );

    const mailtoUrl = `mailto:federico.secchimarino@gmail.com?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoUrl;

    // Reset form
    setFormData({ name: "", email: "", company: "", role: "", interest: "", message: "" });
  };

  return (
    <>
      <Navigation />
      <section className="min-h-screen py-24 lg:py-32 relative">
        {/* Background */}
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
              className="text-center mb-12"
            >
              <h1 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
                For Sponsors & Teams
              </h1>
              <p className="text-lg text-muted-foreground">
                Not another logo-on-wall deal. Think real presence with your people.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              initial={{ opacity: 0, y: 36, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
              onSubmit={handleSubmit}
              className="glass-card p-6 lg:p-8 space-y-6 mb-8"
            >
              {/* Name & Email Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
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
                    name="email"
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

              {/* Company & Role Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                    className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                    className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
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
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your sponsorship goals and how you'd like to collaborate..."
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
                Send enquiry
              </Button>
            </motion.form>

            {/* Back to home */}
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </>
  );
}

