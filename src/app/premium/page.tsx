import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PremiumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
        ✓
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">All Tools Are 100% Free</h1>
      <p className="text-zinc-400 text-sm leading-relaxed mb-8">
        We do not charge subscriptions, credits, or paywalls. Every AI tool on this platform is completely free and unlimited for everyone.
      </p>

      <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 text-left mb-8 space-y-3">
        <div className="flex items-center gap-2.5 text-sm text-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Unlimited AI Text Rewrites & Paraphrasing</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Unlimited Paragraph & Article Generations</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Unlimited Social Media Hashtag Collections</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-zinc-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Unlimited Professional Email Drafts</span>
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition"
      >
        <span>Explore Free Tools</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
