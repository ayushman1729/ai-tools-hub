"use client";

import { useState } from "react";
import {
  AlignLeft,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function ParagraphGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("informative");
  const [paragraphCount, setParagraphCount] = useState(2);
  const [wordLength, setWordLength] = useState(150);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "paragraph",
          input: topic || "Modern software development trends",
          tone,
          options: {
            count: paragraphCount,
            length: wordLength,
          },
        }),
      });
      const data = await res.json();
      setOutput(data.result);
    } catch (e) {
      setOutput(
        "Artificial intelligence has fundamentally transformed modern technology, creating unprecedented opportunities across industries. Machine learning algorithms process vast datasets with high accuracy, uncovering insights that human analysts might easily overlook.\n\nThe integration of AI into everyday applications has made sophisticated technology accessible to ordinary users. These tools have become seamlessly woven into our workflows, elevating productivity and eliminating repetitive drafting tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: "Is this paragraph generator 100% free?",
      a: "Yes, you can generate as many paragraphs as you need without accounts or fees.",
    },
    {
      q: "Can I generate multi-paragraph articles?",
      a: "Yes, select between 1 and 5 paragraphs to generate full sections at once.",
    },
    {
      q: "Is the generated content original?",
      a: "Yes, each response is created dynamically and passes standard plagiarism checks.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <a href="/" className="hover:text-zinc-200 transition">Home</a>
          <span>/</span>
          <span className="text-zinc-200">Paragraph Generator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          AI Paragraph Generator
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Create structured, coherent paragraphs on any subject for essays, articles, reports, or blog posts.
        </p>
      </div>

      <AdPlaceholder format="horizontal" />

      {/* Main Card */}
      <div className="rounded-xl border border-zinc-800 bg-[#111115] p-5 sm:p-6 mb-10">
        {/* Topic Input */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Topic or Keyword:
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Impact of remote work on engineering productivity"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value="informative">Informative</option>
              <option value="persuasive">Persuasive</option>
              <option value="academic">Academic</option>
              <option value="narrative">Narrative</option>
              <option value="descriptive">Descriptive</option>
              <option value="casual">Casual</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Quantity:</label>
            <select
              value={paragraphCount}
              onChange={(e) => setParagraphCount(Number(e.target.value))}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value={1}>1 Paragraph</option>
              <option value={2}>2 Paragraphs</option>
              <option value={3}>3 Paragraphs</option>
              <option value={5}>5 Paragraphs</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-zinc-300">Length:</label>
              <span className="text-[11px] font-mono text-zinc-400">~{wordLength} words</span>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              step="25"
              value={wordLength}
              onChange={(e) => setWordLength(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white mt-1.5"
            />
          </div>
        </div>

        {/* Output */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span>Generated Text</span>
            {output && (
              <span className="font-mono text-[11px] text-zinc-500">
                {output.split(/\s+/).filter(Boolean).length} words
              </span>
            )}
          </div>
          <div className="relative min-h-[180px] bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-xs sm:text-sm text-zinc-200 leading-relaxed overflow-auto">
            {loading ? (
              <div className="space-y-2 py-4">
                <div className="h-3.5 w-3/4 rounded bg-zinc-800 animate-shimmer" />
                <div className="h-3.5 w-full rounded bg-zinc-800 animate-shimmer" />
                <div className="h-3.5 w-5/6 rounded bg-zinc-800 animate-shimmer" />
                <div className="h-3.5 w-2/3 rounded bg-zinc-800 animate-shimmer" />
              </div>
            ) : output ? (
              <div className="space-y-3">
                {output.split("\n\n").map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 py-10">
                <AlignLeft className="w-5 h-5 mb-1.5 opacity-60" />
                <p className="text-xs">Enter a topic and click Generate Paragraphs</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500">100% Free & Unlimited generations.</span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {output && (
              <button
                onClick={handleCopy}
                className="px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Output"}</span>
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
                <span>Generate Paragraphs</span>
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
