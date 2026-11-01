import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800/80 bg-[#09090b] text-zinc-500 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-white text-black font-bold text-xs flex items-center justify-center">
                AI
              </div>
              <span className="font-semibold text-sm text-zinc-200">Tools Hub</span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Fast, distraction-free writing and productivity utilities. 100% free for everyone, with no subscriptions or accounts required.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-3">
              Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/rewriter" className="hover:text-zinc-200 transition">
                  AI Text Rewriter
                </Link>
              </li>
              <li>
                <Link href="/tools/paragraph-generator" className="hover:text-zinc-200 transition">
                  AI Paragraph Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/hashtag-generator" className="hover:text-zinc-200 transition">
                  AI Hashtag Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/email-writer" className="hover:text-zinc-200 transition">
                  AI Email Writer
                </Link>
              </li>
            </ul>
          </div>

          {/* Philosophy / About */}
          <div>
            <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-3">
              Philosophy
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li>Always 100% Free</li>
              <li>Zero Sign-up Barriers</li>
              <li>No Daily Credit Limits</li>
              <li>Privacy First — No Data Saved</li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div>
            <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider mb-3">
              Transparency
            </h4>
            <p className="text-zinc-400 leading-relaxed mb-2">
              Clean, fast, and completely free online utilities built to help you write better and faster.
            </p>
            <div className="flex items-center gap-1.5 text-zinc-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero text logging policy</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500">
          <p>© 2026 AI Tools Hub. Free for personal & commercial use.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for writers & creators
          </p>
        </div>
      </div>
    </footer>
  );
}
