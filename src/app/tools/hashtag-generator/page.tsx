"use client";

import { useState } from "react";
import {
  Hash,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function HashtagGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [style, setStyle] = useState("trending");
  const [count, setCount] = useState(15);
  const [loading, setLoading] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedPill, setCopiedPill] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setHashtags([]);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "hashtag",
          input: prompt || "Artificial Intelligence and Tech Growth",
          options: {
            platform,
            style,
            count,
          },
        }),
      });
      const data = await res.json();
      setHashtags(data.result || []);
    } catch (e) {
      setHashtags([
        "#ArtificialIntelligence",
        "#AITools",
        "#TechTrends",
        "#MachineLearning",
        "#Innovation",
        "#DigitalGrowth",
        "#ContentCreator",
        "#Automation",
        "#FutureOfWork",
        "#DeepLearning",
        "#SocialMediaGrowth",
        "#TechInnovation",
        "#SmartProductivity",
        "#DataDriven",
        "#CreativeTech",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAll = () => {
    if (hashtags.length === 0) return;
    navigator.clipboard.writeText(hashtags.join(" "));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySingle = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedPill(tag);
    setTimeout(() => setCopiedPill(null), 1500);
  };

  const faqs = [
    {
      q: "How many hashtags should I use per platform?",
      a: "Instagram performs best with 5-15 relevant tags, Twitter/X with 2-3, TikTok with 4-5, and LinkedIn with 3-5 tags.",
    },
    {
      q: "Can I copy individual hashtags?",
      a: "Yes! Click on any hashtag chip to copy it directly, or click Copy All.",
    },
    {
      q: "Is this tool completely free?",
      a: "Yes, 100% free with unlimited hashtag generations.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <a href="/" className="hover:text-zinc-200 transition">Home</a>
          <span>/</span>
          <span className="text-zinc-200">Hashtag Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          AI Hashtag Generator
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Find trending, targeted hashtags for Instagram, TikTok, LinkedIn, and Twitter to increase organic reach.
        </p>
      </div>

      <AdPlaceholder format="horizontal" />

      {/* Main Container */}
      <div className="rounded-xl border border-zinc-800 bg-[#111115] p-5 sm:p-6 mb-10">
        {/* Post Topic Input */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Describe Your Post or Topic:
          </label>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Announcing our new minimalist design tool for software engineers..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
          />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Platform:</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value="instagram">Instagram</option>
              <option value="twitter">Twitter / X</option>
              <option value="tiktok">TikTok</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="all">All Platforms</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Hashtag Mix:</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value="trending">Trending & High Volume</option>
              <option value="niche">Niche & Targeted</option>
              <option value="balanced">Balanced Mix</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Quantity:</label>
            <select
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value={10}>10 Hashtags</option>
              <option value={15}>15 Hashtags</option>
              <option value={20}>20 Hashtags</option>
              <option value={30}>30 Hashtags</option>
            </select>
          </div>
        </div>

        {/* Output */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span>Generated Hashtags</span>
            {hashtags.length > 0 && (
              <span className="font-mono text-[11px] text-zinc-500">
                {hashtags.length} tags · Click any to copy
              </span>
            )}
          </div>
          <div className="relative min-h-[160px] bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-xs sm:text-sm text-zinc-200 overflow-auto">
            {loading ? (
              <div className="flex flex-wrap gap-2 py-3">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="h-7 w-24 rounded-md bg-zinc-800 animate-shimmer" />
                ))}
              </div>
            ) : hashtags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => {
                  const isCopied = copiedPill === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => handleCopySingle(tag)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition flex items-center gap-1.5 cursor-pointer border ${
                        isCopied
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {isCopied ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <span className="text-zinc-500">#</span>
                      )}
                      <span>{tag.replace(/^#/, "")}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 py-10">
                <Hash className="w-5 h-5 mb-1.5 opacity-60" />
                <p className="text-xs">Enter topic and click Generate Hashtags</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500">100% Free with zero limits.</span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {hashtags.length > 0 && (
              <button
                onClick={handleCopyAll}
                className="px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center gap-1.5 transition"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? "Copied All" : "Copy All"}</span>
              </button>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full sm:w-auto px-5 py-2 rounded-md bg-white text-black font-semibold text-xs hover:bg-zinc-200 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Hashtags</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <AdPlaceholder format="horizontal" />

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-12">
        <h3 className="text-base font-semibold text-white mb-4 text-center">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-lg border border-zinc-800 bg-[#111115]">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-3.5 text-left flex items-center justify-between text-xs font-medium text-zinc-200 hover:text-white"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-zinc-500 transition-transform ${activeFaq === idx ? "rotate-180" : ""}`} />
              </button>
              {activeFaq === idx && (
                <div className="px-3.5 pb-3 text-xs text-zinc-400 border-t border-zinc-800/60 pt-2.5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
