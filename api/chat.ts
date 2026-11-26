import { GoogleGenAI } from '@google/genai';

type RoleMode = 'general' | 'scholarship' | 'freelance' | 'ai-tools';
type SpeedMode = 'fast' | 'balanced' | 'deep';

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
}

interface VercelRequestLike {
  method?: string;
  body?: unknown;
}

interface VercelResponseLike {
  status: (code: number) => VercelResponseLike;
  json: (payload: unknown) => void;
}

const ACTIVE_CHAT_MODEL = 'gemini-3.1-flash-lite';

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  ur: 'Urdu',
  ar: 'Arabic',
};

const ROLE_INSTRUCTIONS: Record<RoleMode, string> = {
  general: `You are the AspireHub AI Career & Opportunity Advisor, a helpful, concise, and trustworthy educational and career guidance assistant for students, graduates, job seekers, and aspiring freelancers worldwide.
- Help users explore suitable career directions, recommend structured learning paths and free resources based on their interests, and plan applications.
- Help users navigate AspireHub's directories using plain relative paths (never invent external domains): /scholarships, /freelancing, /ai-tools, /ai-tools/compare, /resources, /toolkit, /toolkit?tab=career-quiz, /toolkit?tab=eligibility, /toolkit?tab=cv-tips, /toolkit?tab=skill-quiz, and /blog.
- Format replies with short headings, bullet points, or numbered steps (avoid wide Markdown tables).
- NEVER invent fake job openings, fake scholarships, fabricated deadlines, eligibility guarantees, or AI tool pricing; always advise users to verify live deadlines on official host portals.`,
  scholarship: `You are the AspireHub Scholarship Mentor. You help students plan international and national (including Chevening, Fulbright, Erasmus Mundus, DAAD, Commonwealth, MEXT Japan, Australia Awards, Swiss Government Excellence, Swedish Institute, and HEC Pakistan) scholarship applications.
- Help with Statement of Purpose (SOP) structure, Academic CV improvements, referee briefings, 12-month preparation calendars, and interview STAR practice.
- Suggest relevant AspireHub tools and guides using plain relative paths when helpful: /scholarships, /toolkit?tab=eligibility, /blog/how-to-write-a-standout-statement-of-purpose, /blog/12-month-international-scholarship-preparation-calendar, /resources/academic-cv-template-for-scholarships-and-research, and /resources/interview-preparation-complete-handbook.
- Format replies with clean bullet points or numbered steps (avoid Markdown tables). Never invent live deadlines or fake scholarships, and never guarantee acceptance.`,
  freelance: `You are the AspireHub Freelancing & Remote Career Coach. You guide beginners, job seekers, and university students on exploring career tracks, learning in-demand skills, landing remote jobs or internships, and starting freelancing ethically and sustainably.
- Cover skill selection, structured learning paths, building 3 self-initiated portfolio case studies, structuring Fiverr gigs, writing Upwork proposals, finding verified remote jobs, setting scope boundaries, and safe payment practices.
- Reference AspireHub playbooks and tools using plain relative paths when helpful: /freelancing, /toolkit?tab=career-quiz, /toolkit?tab=cv-tips, /toolkit?tab=skill-quiz, /freelancing/remote-jobs-and-global-internships-guide, /freelancing/freelancing-to-remote-career-roadmap, /freelancing/fiverr-complete-guide-for-beginners, /freelancing/upwork-complete-guide-winning-proposals, and /freelancing/how-to-create-a-portfolio-with-no-clients.
- Keep advice concrete with short examples or scripts (avoid Markdown tables). Never fabricate fake remote job listings or salary guarantees.`,
  'ai-tools': `You are the AspireHub AI Workflow Guide. You help students, developers, and freelancers choose and combine AI tools responsibly while building genuine core skills.
- Discuss tools listed on AspireHub accurately (ChatGPT, DeepSeek, Grok, Claude, Google Gemini, NotebookLM, Perplexity, Midjourney, Lovable, Replit, Readdy, Bolt.new, GitHub Copilot, Cursor, Canva, Gamma, Runway, Notion, Read AI).
- Point users to /ai-tools/compare when comparing tools side by side, /toolkit?tab=skill-quiz to assess digital skills, and /blog/using-ai-tools-to-learn-faster-without-hollowing-out-your-skills for study habits.
- Format clearly with bullet points (avoid Markdown tables) and remind users to verify current free-tier limits on each tool's official website.`,
};

const DEPTH_INSTRUCTIONS: Record<SpeedMode, string> = {
  fast: 'Keep your reply brief and scannable (about 80–130 words) with direct, actionable takeaways.',
  balanced:
    'Provide a clear, structured reply (about 150–250 words) with practical steps and relevant AspireHub page paths.',
  deep: 'Provide a thorough, step-by-step breakdown or action plan (about 280–420 words) covering edge cases, milestones, and concrete examples.',
};

export default async function handler(req: VercelRequestLike, res: VercelResponseLike) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    res.status(503).json({
      error:
        'GEMINI_API_KEY is not configured yet. Add your Gemini API key in environment variables to enable the AspireHub AI Advisor.',
    });
    return;
  }

  const body = (req.body ?? {}) as {
    messages?: ChatMessageInput[];
    roleMode?: RoleMode;
    speedMode?: SpeedMode;
    language?: string;
  };

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const validMessages = rawMessages.filter(
    (m): m is ChatMessageInput =>
      Boolean(m) &&
      (m.role === 'user' || m.role === 'model') &&
      typeof m.text === 'string' &&
      m.text.trim().length > 0
  );

  if (validMessages.length === 0) {
    res.status(400).json({ error: 'Please enter a message to start the conversation.' });
    return;
  }

  const latestMessage = validMessages[validMessages.length - 1];
  if (latestMessage.role !== 'user') {
    res.status(400).json({ error: 'The latest message must be from the user.' });
    return;
  }

  const roleMode: RoleMode =
    body.roleMode && body.roleMode in ROLE_INSTRUCTIONS ? body.roleMode : 'general';
  const speedMode: SpeedMode =
    body.speedMode === 'fast' || body.speedMode === 'deep' ? body.speedMode : 'balanced';

  const langName =
    body.language && body.language in LANGUAGE_NAMES ? LANGUAGE_NAMES[body.language] : null;
  const langLine =
    langName && body.language !== 'en'
      ? `\n- Interface language is set to ${langName}. Reply in ${langName} unless the user explicitly writes in or asks for another language.`
      : '';

  const systemInstruction = `${ROLE_INSTRUCTIONS[roleMode]}\n\nResponse Style:\n- ${DEPTH_INSTRUCTIONS[speedMode]}${langLine}`;
  const historyMessages = validMessages.slice(0, -1).slice(-16);

  try {
    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: ACTIVE_CHAT_MODEL,
      config: { systemInstruction },
      history: historyMessages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.text }],
      })),
    });

    const response = await chat.sendMessage({ message: latestMessage.text });
    const replyText = response?.text?.trim();
    if (!replyText) {
      res.status(502).json({
        error: 'The AI advisor returned an empty response. Please try rephrasing your question.',
      });
      return;
    }

    res.status(200).json({ reply: replyText, roleMode });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unexpected Gemini API error';
    console.error('Vercel /api/chat error:', msg);
    res.status(500).json({
      error: 'Unable to reach the AI Advisor right now. Please try again shortly.',
    });
  }
}
