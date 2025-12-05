import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { lazy, Suspense, useState, useEffect, type CSSProperties } from "react";

const Hyperspeed = lazy(() => import("@/components/Hyperspeed"));

export function HeroSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setScrollProgress(0);
      return;
    }

    const updateMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      const max = window.innerWidth < 768 ? 140 : 240; // less movement on mobile
      const y = window.scrollY;
      const clamped = Math.min(Math.max(y, 0), max);
      setScrollProgress(clamped / max);
    };

    updateMobile();
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMobile, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMobile);
    };
  }, []);

  const heroOffset = isMobile ? -10 : -16;
  const backgroundOffset = isMobile ? 6 : 10;

  const heroMotionStyle: CSSProperties = {
    transform: `translateY(${scrollProgress * heroOffset}px)`,
    opacity: 1 - scrollProgress * 0.12,
  };

  const backgroundMotionStyle: CSSProperties = {
    transform: `translateY(${scrollProgress * backgroundOffset}px)`,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32">
      {/* Hyperspeed Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden" style={backgroundMotionStyle}>
        <Suspense fallback={null}>
          <Hyperspeed />
        </Suspense>
      </div>
      
      {/* Animated Background */}
      <div className="absolute inset-0 grid-bg opacity-30 animate-grid-draw" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: "4s" }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div
          style={heroMotionStyle}
          className="max-w-xl mx-auto md:max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm lg:text-base font-heading tracking-[0.3em] text-muted-foreground mb-6"
          >
            COMMUNITY · WEB3 · ADVENTURE
          </motion.p>

          {/* Title */}
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-semibold tracking-tight mb-6 leading-tight opacity-0 animate-hero-fade-up">
            Where{" "}
            <span className="text-primary text-glow animate-glitch inline-block">
              Web3
            </span>{" "}
            Meets the Road
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed opacity-0 animate-hero-fade-up-delayed">
            Beta v0.2 – Hyperspeed engaged 🚀
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 opacity-0 animate-hero-fade-pop">
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto transition-transform transition-shadow duration-150 hover:scale-[1.03] hover:shadow-lg">
              <a href="#join-us">Join the Community</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto transition-transform duration-150 hover:scale-[1.02]">
              <a href="#upcoming-trips">See Upcoming Trips</a>
            </Button>
          </div>

          {/* Support Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sm text-muted-foreground"
          >
            Small groups · Real connections · No cringe networking.
          </motion.p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <a
          href="#what-is-ethperience"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs tracking-wider">SCROLL</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>

      {/* Scanlines Overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none opacity-50" />
    </section>
  );
}
