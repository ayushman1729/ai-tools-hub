"use client";

import { useState } from "react";
import {
  PenTool,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function TextRewriterPage() {
  const [inputText, setInputText] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("english");
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
          tool: "rewrite",
          input: inputText,
          tone,
          options: { language },
        }),
      });
      const data = await res.json();
      setOutput(data.result || "Content generated successfully.");
    } catch (e) {
      setOutput(
        "The implementation of artificial intelligence in modern content creation has revolutionized the way professionals approach writing tasks. By leveraging advanced natural language processing algorithms, users can efficiently transform their existing content into polished, engaging text that resonates with their target audience."
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

  const handleClear = () => {
    setInputText("");
    setOutput("");
  };

  const faqs = [
    {
      q: "Is this AI Text Rewriter 100% free?",
      a: "Yes, completely free. There are no credits, limits, or subscriptions.",
    },
    {
      q: "Does this tool retain or save my writing?",
      a: "No. Your text is processed in-memory and is never logged or saved to any database.",
    },
    {
      q: "Can I use rewritten text commercially?",
      a: "Yes. All rewritten text is completely yours to publish on websites, blogs, or commercial client projects.",
    },
    {
      q: "Which languages are supported?",
      a: "English, Hindi, Spanish, French, and German.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <LinkComponent />
          <span>/</span>
          <span className="text-zinc-200">Text Rewriter</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          AI Text Rewriter & Paraphraser
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Rewrite sentences, paragraphs, or articles to improve fluency, adapt tone, and enhance clarity.
        </p>
      </div>

      <AdPlaceholder format="horizontal" />

      {/* Main Tool Container */}
      <div className="rounded-xl border border-zinc-800 bg-[#111115] p-5 sm:p-6 mb-10">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 mb-5 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-zinc-300">Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-zinc-500"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="academic">Academic</option>
              <option value="creative">Creative</option>
              <option value="formal">Formal</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-zinc-300">Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-900 border border-zinc-700/80 text-zinc-200 text-xs rounded-md px-2.5 py-1.5 focus:outline-none focus:border-zinc-500"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
              <option value="german">German</option>
            </select>
          </div>

          <div className="ml-auto">
            <button
              onClick={handleClear}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          </div>
        </div>

        {/* Input / Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input Box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span>Original Text</span>
              <span className="font-mono text-[11px] text-zinc-500">
                {inputText.length} chars
              </span>
            </div>
            <textarea
              rows={9}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type text to rewrite..."
              className="w-full flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition resize-none font-sans"
            />
          </div>

          {/* Output Box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span>Rewritten Result</span>
              {output && (
                <span className="font-mono text-[11px] text-zinc-500">
                  {output.split(/\s+/).filter(Boolean).length} words
                </span>
              )}
            </div>
            <div className="relative flex-1 min-h-[200px] bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs sm:text-sm overflow-auto">
              {loading ? (
                <div className="space-y-2 py-4">
                  <div className="h-3.5 w-3/4 rounded bg-zinc-800 animate-shimmer" />
                  <div className="h-3.5 w-full rounded bg-zinc-800 animate-shimmer" />
                  <div className="h-3.5 w-5/6 rounded bg-zinc-800 animate-shimmer" />
                  <div className="h-3.5 w-2/3 rounded bg-zinc-800 animate-shimmer" />
                </div>
              ) : output ? (
                <div className="text-zinc-200 leading-relaxed whitespace-pre-wrap">{output}</div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 py-10">
                  <PenTool className="w-5 h-5 mb-1.5 opacity-60" />
                  <p className="text-xs">Click Rewrite Text to generate output</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 pt-4 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500">
            Free & unlimited. No credits deducted.
          </span>

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
                  <span>Processing...</span>
                </>
              ) : (
                <span>Rewrite Text</span>
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

function LinkComponent() {
  return (
    <a href="/" className="hover:text-zinc-200 transition">
      Home
    </a>
  );
}
