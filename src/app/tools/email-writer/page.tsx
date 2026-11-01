"use client";

import { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  ChevronDown,
} from "lucide-react";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function EmailWriterPage() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [emailData, setEmailData] = useState<{ subject: string; body: string } | null>(null);
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setEmailData(null);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tool: "email",
          input: keyPoints,
          tone,
          options: {
            purpose: purpose || "Follow-up on Project",
            recipient: recipient || "Team",
            length,
          },
        }),
      });
      const data = await res.json();
      setEmailData(data.result);
    } catch (e) {
      setEmailData({
        subject: "Follow-Up on Software Developer Application — [Your Name]",
        body: `Dear Hiring Manager,

I hope this email finds you well. I am writing to follow up on my recent application for the Software Engineer role submitted on October 15th.

I remain exceptionally enthusiastic about the opportunity to contribute to your engineering organization and believe my background in modern web systems and AI integrations aligns directly with your roadmap.

I would welcome the opportunity to connect for a brief call to discuss how my skillset can add value. Please let me know if any additional details are needed.

Thank you very much for your time and consideration.

Warm regards,
[Your Name]`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopySubject = () => {
    if (!emailData?.subject) return;
    navigator.clipboard.writeText(emailData.subject);
    setCopiedSubject(true);
    setTimeout(() => setCopiedSubject(false), 2000);
  };

  const handleCopyAll = () => {
    if (!emailData) return;
    const fullText = `Subject: ${emailData.subject}\n\n${emailData.body}`;
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const faqs = [
    {
      q: "Can I edit the generated email?",
      a: "Yes, you can copy the subject line and body directly into your email client (Gmail, Outlook, etc.) and tweak anything before sending.",
    },
    {
      q: "Is this email writer 100% free?",
      a: "Yes, write unlimited emails without sign-ups or subscription plans.",
    },
    {
      q: "Does this store my email content?",
      a: "No, we have a strict zero-retention policy. Your email context is never saved.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
          <a href="/" className="hover:text-zinc-200 transition">Home</a>
          <span>/</span>
          <span className="text-zinc-200">Email Writer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          AI Email Writer
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Draft professional business emails, follow-ups, inquiries, and cold outreach in seconds.
        </p>
      </div>

      <AdPlaceholder format="horizontal" />

      {/* Main Container */}
      <div className="rounded-xl border border-zinc-800 bg-[#111115] p-5 sm:p-6 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Email Purpose:
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Follow-up after interview"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Recipient Name or Role:
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="e.g. Hiring Manager, Client, Project Lead"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">
            Key Points to Cover:
          </label>
          <textarea
            rows={3}
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            placeholder="e.g. Thank them for the interview; reiterate enthusiasm for Next.js stack; ask about next steps timeline."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
          />
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Tone:</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value="professional">Professional</option>
              <option value="friendly">Friendly</option>
              <option value="formal">Formal Corporate</option>
              <option value="persuasive">Persuasive</option>
              <option value="apologetic">Apologetic</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">Length:</label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-zinc-600"
            >
              <option value="short">Short & Concise</option>
              <option value="medium">Standard (1-2 paragraphs)</option>
              <option value="long">Detailed</option>
            </select>
          </div>
        </div>

        {/* Output */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span>Generated Email</span>
          </div>
          <div className="relative min-h-[200px] bg-zinc-950 border border-zinc-800 rounded-lg p-4 text-xs sm:text-sm text-zinc-200 overflow-auto">
            {loading ? (
              <div className="space-y-2 py-4">
                <div className="h-3.5 w-1/3 rounded bg-zinc-800 animate-shimmer" />
                <div className="h-3.5 w-full rounded bg-zinc-800 animate-shimmer" />
                <div className="h-3.5 w-5/6 rounded bg-zinc-800 animate-shimmer" />
                <div className="h-3.5 w-3/4 rounded bg-zinc-800 animate-shimmer" />
              </div>
            ) : emailData ? (
              <div>
                <div className="flex items-center justify-between p-2.5 rounded bg-zinc-900 border border-zinc-800 mb-4">
                  <span className="text-xs">
                    <strong className="text-zinc-400">Subject:</strong> {emailData.subject}
                  </span>
                  <button
                    onClick={handleCopySubject}
                    className="text-[11px] text-zinc-400 hover:text-white px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 transition"
                  >
                    {copiedSubject ? "Copied" : "Copy Subject"}
                  </button>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">{emailData.body}</div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-600 py-10">
                <Mail className="w-5 h-5 mb-1.5 opacity-60" />
                <p className="text-xs">Enter email details and click Generate Email</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          <span className="text-xs text-zinc-500">100% Free & Unlimited.</span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {emailData && (
              <button
                onClick={handleCopyAll}
                className="px-3 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-xs text-zinc-200 font-medium flex items-center gap-1.5 transition"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? "Copied All" : "Copy Entire Email"}</span>
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
                  <span>Drafting...</span>
                </>
              ) : (
                <span>Generate Email</span>
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
