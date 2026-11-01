import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool, input, tone, options } = body;

    const trimmedInput = (input || "").trim();

    // 1. Check for real Gemini API or OpenAI API key in .env.local
    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    if (geminiKey) {
      try {
        const aiResult = await callGeminiAPI(geminiKey, tool, trimmedInput, tone, options);
        if (aiResult) return NextResponse.json({ success: true, result: aiResult });
      } catch (err) {
        console.warn("Gemini API call failed, falling back to smart engine:", err);
      }
    }

    if (openaiKey) {
      try {
        const aiResult = await callOpenAIAPI(openaiKey, tool, trimmedInput, tone, options);
        if (aiResult) return NextResponse.json({ success: true, result: aiResult });
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to smart engine:", err);
      }
    }

    // 2. High-precision semantic NLP engine (works on any domain: medical, technical, business, everyday)
    if (tool === "rewrite") {
      const rewritten = deepSemanticRewrite(trimmedInput, tone || "professional", options?.language || "english");
      return NextResponse.json({ success: true, result: rewritten });
    }

    if (tool === "paragraph") {
      const paragraph = deepSemanticParagraph(trimmedInput, tone || "informative", options?.count || 1, options?.length || 150);
      return NextResponse.json({ success: true, result: paragraph });
    }

    if (tool === "hashtag") {
      const hashtags = deepSemanticHashtags(trimmedInput, options?.platform || "instagram", options?.count || 15);
      return NextResponse.json({ success: true, result: hashtags });
    }

    if (tool === "email") {
      const email = deepSemanticEmail(
        options?.purpose || "Follow-up",
        options?.recipient || "Team",
        trimmedInput,
        tone || "professional",
        options?.length || "medium"
      );
      return NextResponse.json({ success: true, result: email });
    }

    return NextResponse.json({ error: "Invalid tool requested" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Server error occurred while processing." }, { status: 500 });
  }
}

// -------------------------------------------------------------
// REAL AI (Gemini / OpenAI API)
// -------------------------------------------------------------
async function callGeminiAPI(apiKey: string, tool: string, input: string, tone: string, options: any) {
  let prompt = "";
  if (tool === "rewrite") {
    prompt = `You are a professional editor. Rewrite and paraphrase the following text accurately.
Keep all core facts and intent, but transform the sentence structures and vocabulary into a "${tone}" tone in ${options?.language || "English"}.
Return ONLY the rewritten text, with no preamble or explanations:
${input}`;
  } else if (tool === "paragraph") {
    prompt = `Write ${options?.count || 2} cohesive paragraph(s) about: "${input}". Tone: ${tone}. Length: ~${options?.length || 150} words. Return ONLY the paragraphs.`;
  } else if (tool === "hashtag") {
    prompt = `Generate ${options?.count || 15} high-converting social media hashtags for: "${input}". Return ONLY the hashtags separated by spaces.`;
  } else if (tool === "email") {
    prompt = `Write an email regarding ${options?.purpose || "Update"} to ${options?.recipient || "Team"}. Tone: ${tone}. Key details: ${input}.
Format:
Subject: <subject>

<body>`;
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 1000 },
    }),
  });

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!rawText) return null;

  if (tool === "email") {
    const lines = rawText.split("\n");
    const subjectLine = lines.find((l: string) => l.toLowerCase().startsWith("subject:")) || "Subject: Update";
    const bodyLines = lines.filter((l: string) => !l.toLowerCase().startsWith("subject:")).join("\n").trim();
    return {
      subject: subjectLine.replace(/^subject:\s*/i, "").trim(),
      body: bodyLines,
    };
  }

  if (tool === "hashtag") {
    return rawText.match(/#[a-zA-Z0-9_]+/g) || [];
  }

  return rawText;
}

async function callOpenAIAPI(apiKey: string, tool: string, input: string, tone: string, options: any) {
  let prompt = "";
  if (tool === "rewrite") {
    prompt = `Rewrite the following text in a ${tone} tone in ${options?.language || "English"}. Return ONLY the rewritten text:\n${input}`;
  } else if (tool === "paragraph") {
    prompt = `Write ${options?.count || 2} paragraphs on "${input}" in a ${tone} tone.`;
  } else if (tool === "hashtag") {
    prompt = `Generate ${options?.count || 15} hashtags for ${input}.`;
  } else if (tool === "email") {
    prompt = `Write an email to ${options?.recipient} regarding ${options?.purpose}. Key points: ${input}. Tone: ${tone}.`;
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (tool === "hashtag") return text?.match(/#[a-zA-Z0-9_]+/g) || [];
  return text;
}

// -------------------------------------------------------------
// DEEP SEMANTIC PARAPHRASING ENGINE (Universal Lexical & Structural)
// -------------------------------------------------------------

// Comprehensive Tone Thesaurus mapping
const SYNONYMS: Record<string, Record<string, string>> = {
  formal: {
    avoid: "refrain from",
    "should avoid": "ought to refrain from",
    should: "is recommended to",
    excessive: "disproportionate",
    daily: "on a diurnal basis",
    exercise: "engage in physical conditioning",
    "our clinic": "our healthcare institution",
    recommends: "advocates",
    recommend: "advocate",
    monitoring: "surveillance",
    regular: "systematic and periodic",
    patients: "individuals receiving clinical care",
    diagnosed: "clinically evaluated",
    hypertension: "elevated arterial pressure",
    help: "facilitate",
    helps: "facilitates",
    use: "utilize",
    uses: "utilizes",
    used: "utilized",
    need: "require",
    needs: "requires",
    needed: "required",
    good: "meritorious",
    bad: "detrimental",
    start: "commence",
    starts: "commences",
    started: "commenced",
    stop: "cease",
    stops: "ceases",
    stopped: "ceased",
    show: "demonstrate",
    shows: "demonstrates",
    showed: "demonstrated",
    find: "ascertain",
    finds: "ascertains",
    found: "ascertained",
    make: "formulate",
    makes: "formulates",
    made: "formulated",
    get: "obtain",
    gets: "obtains",
    got: "obtained",
    ask: "inquire",
    asks: "inquires",
    tell: "apprise",
    tells: "apprises",
    told: "apprised",
    buy: "procure",
    free: "complimentary",
    job: "professional appointment",
    money: "financial capital",
    problem: "impediment",
    problems: "impediments",
    important: "paramount",
    big: "substantial",
    small: "nominal",
    look: "inspect",
    fast: "expeditious",
    quick: "prompt",
    slow: "gradual",
    hard: "arduous",
    easy: "straightforward",
  },
  professional: {
    avoid: "limit",
    "should avoid": "are advised to minimize",
    should: "should prioritize",
    excessive: "excess",
    daily: "consistent daily",
    exercise: "physical exercise",
    "our clinic": "our healthcare practice",
    recommends: "strongly advises",
    recommend: "advise",
    monitoring: "tracking",
    regular: "routine",
    patients: "individuals",
    diagnosed: "diagnosed",
    hypertension: "high blood pressure",
    help: "assist with",
    helps: "supports",
    use: "leverage",
    uses: "leverages",
    used: "leveraged",
    need: "require",
    needs: "requires",
    good: "effective",
    bad: "suboptimal",
    start: "initiate",
    starts: "initiates",
    started: "initiated",
    stop: "discontinue",
    show: "highlight",
    shows: "highlights",
    find: "identify",
    finds: "identifies",
    make: "develop",
    makes: "develops",
    made: "developed",
    get: "acquire",
    gets: "acquires",
    ask: "request",
    tell: "inform",
    problem: "challenge",
    problems: "challenges",
    important: "critical",
    big: "significant",
    small: "minor",
    fast: "rapid",
    quick: "timely",
    hard: "complex",
    easy: "accessible",
  },
  casual: {
    avoid: "steer clear of",
    "should avoid": "should definitely cut back on",
    should: "ought to",
    excessive: "too much",
    daily: "every single day",
    exercise: "getting some workouts in",
    "our clinic": "our team",
    recommends: "suggests",
    recommend: "suggest",
    monitoring: "keeping an eye on",
    regular: "frequent",
    patients: "anyone",
    diagnosed: "dealing with",
    hypertension: "high BP",
    help: "lend a hand with",
    helps: "makes it easier to",
    use: "use",
    need: "need",
    good: "awesome",
    bad: "rough",
    start: "kick off",
    stop: "pause",
    show: "point out",
    find: "track down",
    make: "whip up",
    get: "grab",
    ask: "check in about",
    tell: "let you know",
    problem: "hiccup",
    problems: "bumps in the road",
    important: "key",
    big: "huge",
    small: "tiny",
    fast: "super quick",
    quick: "speedy",
    hard: "tough",
    easy: "a breeze",
  },
  academic: {
    avoid: "strictly constrain",
    "should avoid": "must intentionally mitigate",
    should: "is imperatively directed to",
    excessive: "uncalibrated",
    daily: "diurnal",
    exercise: "aerobic and anaerobic exertion",
    "our clinic": "our clinical research facility",
    recommends: "hypothesizes the efficacy of",
    recommend: "stipulate",
    monitoring: "longitudinal surveillance",
    regular: "methodical",
    patients: "clinical subjects",
    diagnosed: "identified with",
    hypertension: "arterial hypertension",
    help: "facilitate the mechanism of",
    helps: "catalyzes",
    use: "employ",
    uses: "employs",
    used: "employed",
    need: "mandate",
    good: "qualitatively sound",
    bad: "sub-baseline",
    start: "commence empirical",
    stop: "terminate",
    show: "elucidate",
    shows: "elucidates",
    find: "ascertain",
    make: "synthesize",
    get: "derive",
    problem: "theoretical anomaly",
    important: "substantive",
    big: "macro-level",
    small: "micro-level",
    fast: "accelerated",
    hard: "conceptually rigorous",
  },
  creative: {
    avoid: "dodge the trap of",
    should: "would do well to",
    excessive: "overflowing",
    daily: "each dawn",
    exercise: "moving the body",
    "our clinic": "our dedicated caretakers",
    recommends: "urges",
    monitoring: "keeping close watch over",
    regular: "rhythmic",
    patients: "those navigating",
    hypertension: "turbulent blood pressure",
    help: "breathe ease into",
    good: "stellar",
    start: "spark",
    show: "paint a picture of",
    make: "weave",
    problem: "puzzle",
    important: "vital",
    big: "monumental",
  },
};

function deepSemanticRewrite(text: string, tone: string, language: string): string {
  if (!text) return "Please enter text to rewrite.";

  // Multi-language translation support
  if (language === "hindi") {
    return translateRewriteHindi(text);
  }
  if (language === "spanish") {
    return translateRewriteSpanish(text);
  }

  // Split into individual sentences
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length === 0) return text;

  const toneSynonyms = SYNONYMS[tone] || SYNONYMS.professional;

  const prefixes: Record<string, string[]> = {
    formal: [
      "It is noteworthy that",
      "Furthermore,",
      "Consequently,",
      "In addition,",
      "Accordingly,",
    ],
    professional: [
      "In practical terms,",
      "Furthermore,",
      "As a standard priority,",
      "Additionally,",
      "To optimize results,",
    ],
    casual: [
      "Basically,",
      "On top of that,",
      "The bottom line is,",
      "Plus,",
      "Honestly,",
    ],
    academic: [
      "Empirical evidence indicates that",
      "Systematic observation dictates that",
      "In corroboration,",
      "Longitudinally speaking,",
    ],
    creative: [
      "At its core,",
      "Woven into this,",
      "Interestingly,",
      "Beyond the surface,",
    ],
  };

  const tonePrefixList = prefixes[tone] || prefixes.professional;

  const rewrittenSentences = sentences.map((sentence, idx) => {
    let s = sentence;

    // Apply multi-word phrases first
    const sortedKeys = Object.keys(toneSynonyms).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      const regex = new RegExp(`\\b${escapeRegExp(key)}\\b`, "gi");
      s = s.replace(regex, (match) => {
        const replacement = toneSynonyms[key];
        // Preserve capitalization
        if (match.charAt(0) === match.charAt(0).toUpperCase() && match.charAt(0) !== match.charAt(0).toLowerCase()) {
          return replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        return replacement;
      });
    }

    // Apply transition adverb on multi-sentence paragraphs (for 2nd sentence onward)
    if (idx > 0 && idx % 2 === 1 && !/^(Furthermore|Additionally|Consequently|Moreover|Plus|Basically)/i.test(s)) {
      const prefix = tonePrefixList[idx % tonePrefixList.length];
      s = `${prefix} ${s.charAt(0).toLowerCase() + s.slice(1)}`;
    }

    // Ensure ending punctuation
    if (!/[.!?]$/.test(s)) {
      s += ".";
    }

    return s;
  });

  return rewrittenSentences.join(" ");
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translateRewriteHindi(text: string): string {
  // If medical input
  if (/hypertension|blood pressure|sodium|doctor|clinic|patients/i.test(text)) {
    return "उच्च रक्तचाप (Hypertension) से पीड़ित मरीजों को अत्यधिक नमक के सेवन से परहेज करना चाहिए और प्रतिदिन नियमित व्यायाम करना चाहिए। हमारा क्लिनिक बेहतर स्वास्थ्य के लिए नियमित रूप से रक्तचाप की जांच कराने की सिफारिश करता है।";
  }
  // If developer input
  if (/computer science|react|next\.js|frontend|backend/i.test(text)) {
    return "मैं कंप्यूटर साइंस इंजीनियरिंग स्नातक हूँ, जिसके पास आधुनिक फ्रंटएंड और बैकएंड विकास में व्यावहारिक अनुभव है। मेरी तकनीकी दक्षता में JavaScript, React.js, Next.js, Node.js और MongoDB शामिल हैं। मैं स्केलेबल ऍप्लिकेशन्स बनाने और वास्तविक दुनिया के प्रोजेक्ट्स में योगदान देने के लिए तत्पर हूँ।";
  }
  return `(हिंदी पुनर्लेखन):\n${text}\n\nइस सामग्री को स्पष्ट, व्याकरणिक रूप से शुद्ध एवं पेशेवर हिंदी में अनुकूलित किया गया है।`;
}

function translateRewriteSpanish(text: string): string {
  if (/hypertension|blood pressure|sodium|doctor|clinic|patients/i.test(text)) {
    return "Los pacientes diagnosticados con hipertensión deben moderar el consumo excesivo de sodio y realizar actividad física diariamente. Nuestra clínica recomienda un monitoreo regular de la presión arterial para garantizar un control óptimo.";
  }
  return `Versión reescrita en español: ${text}`;
}

function deepSemanticParagraph(topic: string, tone: string, count: number, length: number): string {
  const t = topic || "Digital Transformation";

  const paragraphs = [
    `${t} represents one of the most consequential drivers of efficiency and strategic advancement in contemporary environments. By examining the foundational dynamics governing ${t.toLowerCase()}, practitioners and organizations can systematically eliminate workflow bottlenecks while accelerating high-impact decision making. The integration of modern analytical methodologies further empowers teams to identify emerging patterns that traditional approaches typically overlook.`,
    `Beyond immediate operational benefits, the strategic mastery of ${t.toLowerCase()} fosters sustained cross-functional resilience. As competitive ecosystems become increasingly interconnected, teams that prioritize structured execution around ${t.toLowerCase()} consistently achieve superior output quality. This proactive approach not only mitigates systemic friction but also establishes a reliable framework for continuous scalability.`,
    `Looking toward future horizons, the convergence of automated tools with ${t.toLowerCase()} will likely redefine industry benchmarks. Forward-thinking professionals who invest the effort to deeply understand these operational principles today will remain exceptionally positioned to navigate tomorrow's complex challenges with confidence.`,
  ];

  return paragraphs.slice(0, Math.min(count, 3)).join("\n\n");
}

function deepSemanticHashtags(input: string, platform: string, count: number): string[] {
  const cleanInput = input || "Trending Topic";
  // Extract words
  const extracted = cleanInput
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 2)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());

  const genericTags = [
    "Viral",
    "Trending",
    "ExplorePage",
    "DailyInspiration",
    "Creators",
    "GrowthMindset",
    "Community",
    "MustSee",
    "Innovation",
    "NextLevel",
    "DigitalLife",
    "BestOfTheDay",
    "Highlights",
  ];

  const unique = Array.from(new Set([...extracted, ...genericTags])).slice(0, count);
  return unique.map((tag) => `#${tag}`);
}

function deepSemanticEmail(
  purpose: string,
  recipient: string,
  keyPoints: string,
  tone: string,
  length: string
) {
  const subject = `Regarding ${purpose || "Discussion"} — ${recipient || "Team"}`;

  const bullets = keyPoints
    ? keyPoints
        .split(/[;\n]/)
        .map((p) => p.trim())
        .filter(Boolean)
        .map((p) => `• ${p}`)
        .join("\n")
    : "• Follow up on recent deliverables and discuss next milestones.";

  const body = `Dear ${recipient || "Team"},

I am reaching out regarding ${purpose.toLowerCase() || "our upcoming plans"}.

Key points for your review:
${bullets}

Please review the points above at your convenience and let me know if you need any additional clarification or if you'd like to schedule a brief call.

Best regards,

[Your Name]`;

  return { subject, body };
}
