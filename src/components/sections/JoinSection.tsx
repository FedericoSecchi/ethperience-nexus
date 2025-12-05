import { Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_URL = "https://t.me/ethperience";

export function JoinSection() {
  return (
    <section
      id="join-us"
      className="relative py-20 md:py-28 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 overflow-hidden"
    >
      {/* Soft background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium text-slate-100">
          <Sparkles className="h-3 w-3 text-emerald-400" />
          <span>Small crew. High signal.</span>
        </div>

        <h2 className="mb-4 text-balance text-3xl sm:text-4xl font-semibold tracking-tight text-slate-50">
          Join the ETHperience crew
        </h2>

        <p className="mb-4 text-balance text-base sm:text-lg leading-relaxed text-slate-300/85">
          ETHperience is a curated group of builders, founders and explorers who prefer real adventures over
          hotel lobbies and forced networking. If this resonates with you, jump into our Telegram hub and say hi.
        </p>

        <p className="mb-8 text-sm sm:text-base text-slate-400">
          When you join, drop a quick message sharing who you are, what you&apos;re building and which experience
          you&apos;d love to join — SnowDAO, Hacker Boat, Café Chiller or Road to PN. Keep it simple, keep it real.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-lg shadow-emerald-500/25"
          >
            <a href={TELEGRAM_URL} target="_blank" rel="noreferrer noopener">
              <MessageCircle className="h-4 w-4" />
              Join the Telegram hub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
