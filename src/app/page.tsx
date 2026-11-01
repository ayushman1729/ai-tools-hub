import Link from "next/link";
import {
  PenTool,
  AlignLeft,
  Hash,
  Mail,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function HomePage() {
  const tools = [
    {
      title: "AI Text Rewriter",
      slug: "/tools/rewriter",
      icon: PenTool,
      description:
        "Paraphrase and rewrite text to improve clarity, adapt tone, and eliminate repetition without losing your original meaning.",
      tags: ["Multiple Tones", "Multi-Language", "Plagiarism-free"],
      cta: "Launch Rewriter",
    },
    {
      title: "AI Paragraph Generator",
      slug: "/tools/paragraph-generator",
      icon: AlignLeft,
      description:
        "Draft cohesive paragraphs and essay sections on any subject with precise control over length and structure.",
      tags: ["Word Count Control", "Multi-Paragraph", "Structured Arguments"],
      cta: "Launch Generator",
    },
    {
      title: "AI Hashtag Generator",
      slug: "/tools/hashtag-generator",
      icon: Hash,
      description:
        "Generate relevant hashtags for Instagram, TikTok, Twitter/X, and LinkedIn to maximize organic content reach.",
      tags: ["Platform Tailored", "Trending & Niche", "Click-to-Copy"],
      cta: "Launch Hashtags",
    },
    {
      title: "AI Email Writer",
      slug: "/tools/email-writer",
      icon: Mail,
      description:
        "Generate professional correspondence, follow-ups, and cold outreach with automated subject lines and structured layout.",
      tags: ["Subject Line Included", "Professional & Formal", "Ready to Send"],
      cta: "Launch Email Writer",
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-16 pb-12 sm:pt-24 sm:pb-16 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Simple badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Free Online Writing Utilities</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400">No Account Required</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          Essential AI Writing Tools <br />
          <span className="text-zinc-400 font-normal">Built for Fast Results</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
          A minimalist suite of text tools to rewrite sentences, generate paragraphs, find hashtags, and draft emails. Fast, clean, and completely free.
        </p>

        {/* Quick Jump Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition"
            >
              {tool.title}
            </Link>
          ))}
        </div>
      </section>

      {/* Leaderboard Ad Placeholder */}
      <AdPlaceholder format="horizontal" />

      {/* Tools Grid */}
      <section className="py-8 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800/80">
          <div>
            <h2 className="text-lg font-semibold text-white">All Tools</h2>
            <p className="text-xs text-zinc-400">Select any tool to start creating immediately</p>
          </div>
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
            4 Free Tools Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.slug}
                className="tool-card-clean rounded-xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-200">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-white">{tool.title}</h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tool.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[11px] font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={tool.slug}
                  className="w-full py-2.5 rounded-lg bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-zinc-200 transition"
                >
                  <span>{tool.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mid-page Ad */}
      <AdPlaceholder format="horizontal" />

      {/* Why Use Section - Clean & Human */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8">
          <h3 className="text-base font-semibold text-white mb-4">Why AI Tools Hub?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-zinc-400">
            <div>
              <div className="flex items-center gap-2 text-white font-medium mb-1">
                <Check className="w-4 h-4 text-emerald-400" /> 100% Free & Unlimited
              </div>
              <p>No subscriptions, no hidden tokens, and no payment walls. Use as much as you need.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white font-medium mb-1">
                <Zap className="w-4 h-4 text-amber-400" /> Fast & Direct
              </div>
              <p>No logins, email verifications, or waiting queues. Open the page and generate in seconds.</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white font-medium mb-1">
                <Shield className="w-4 h-4 text-blue-400" /> Private & Secure
              </div>
              <p>We do not store your drafts or inputs. Everything is processed live and discarded.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <AdPlaceholder format="horizontal" />
    </div>
  );
}
