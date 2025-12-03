import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Twitter, MessageCircle } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/ethperience",
    icon: Instagram,
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/ethperience",
    icon: Twitter,
  },
  {
    label: "Telegram",
    href: "https://t.me/ethperience",
    icon: MessageCircle,
  },
];

export function FooterSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="relative py-16 border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
        >
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-heading font-bold text-foreground mb-4">
              ETH<span className="text-primary">perience</span>
            </h3>
            <p className="text-muted-foreground text-sm mb-2">
              Where web3 meets the road.
            </p>
            <p className="text-muted-foreground text-sm">
              Small groups. Strong vibes. Real humans.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Links
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* On-chain Column */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              On-chain
            </h4>
            <p className="text-muted-foreground text-sm mb-2">
              ethperience.eth
            </p>
            <p className="text-muted-foreground text-sm">
              NFT memberships coming soon.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#what-is-ethperience"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#featured-experiences"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Experiences
                </a>
              </li>
              <li>
                <a
                  href="#join-us"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Join Us
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-8 border-t border-border/30"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© ETHperience · 2025</p>
            <p>Built with ❤️ and a bit of gas by the ETHperience crew.</p>
          </div>
          <p className="text-xs text-muted-foreground/60 text-center mt-4">
            This is not financial advice. It's just a bunch of humans traveling
            together.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
