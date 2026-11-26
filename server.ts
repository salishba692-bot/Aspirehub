import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import { GoogleGenAI } from '@google/genai';
import {
  AuthActionError,
  loginUser,
  requireAuthenticatedUser,
  sanitizePublicUser,
  signupUser,
  updateUserBookmarks,
  updateUserProfile,
} from './server/authCore.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT) || 3000;
const IS_PROD = process.env.NODE_ENV === 'production';

type RoleMode = 'general' | 'scholarship' | 'freelance' | 'ai-tools';
type SpeedMode = 'fast' | 'balanced' | 'deep';

interface ChatMessageInput {
  role: 'user' | 'model';
  text: string;
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
- Help users navigate AspireHub's directories using plain relative paths (never invent external domains like aspirehub.com): /scholarships, /freelancing, /ai-tools, /ai-tools/compare, /resources, /toolkit, /toolkit?tab=career-quiz, /toolkit?tab=eligibility, /toolkit?tab=cv-tips, /toolkit?tab=skill-quiz, /blog, /about, /contact, /privacy-policy, and /disclaimer.
- Format replies with short headings, bullet points, or numbered steps (avoid wide Markdown tables).
- NEVER invent fake job openings, fake scholarships, fabricated deadlines, eligibility guarantees, or AI tool pricing; always advise users to verify live deadlines on official host portals.`,

  scholarship: `You are the AspireHub Scholarship Mentor. You help students plan international and local (including Chevening UK, Fulbright, Erasmus Mundus, DAAD, Commonwealth, MEXT Japan, Australia Awards, Swiss Excellence, Swedish Institute, and HEC Pakistan) scholarship applications.
- Help with Statement of Purpose (SOP) structure, Academic CV improvements, referee briefings, 12-month preparation calendars, and interview STAR practice.
- Suggest relevant AspireHub tools and guides using plain relative paths when helpful: /scholarships, /toolkit?tab=eligibility, /blog/how-to-write-a-standout-statement-of-purpose, /blog/12-month-international-scholarship-preparation-calendar, /resources/academic-cv-template-for-scholarships-and-research, /resources/international-student-readiness-and-english-tests-guide, and /resources/interview-preparation-complete-handbook.
- Format replies with clean bullet points or numbered steps (avoid Markdown tables). Never invent live deadlines or fake scholarships, and never guarantee acceptance.`,

  freelance: `You are the AspireHub Career & Freelancing Coach. You guide beginners, job seekers, and university students on exploring career tracks, learning in-demand skills, landing remote jobs or internships, and starting freelancing ethically and sustainably.
- Cover skill selection, structured learning paths, building 3 self-initiated portfolio case studies, remote job & internship applications, structuring Fiverr gigs, writing Upwork proposals, setting scope boundaries, and safe payment practices.
- Reference AspireHub playbooks and tools using plain relative paths when helpful: /freelancing, /toolkit?tab=career-quiz, /toolkit?tab=cv-tips, /toolkit?tab=skill-quiz, /freelancing/remote-jobs-and-global-internships-guide, /freelancing/freelancing-to-remote-career-roadmap, /freelancing/fiverr-complete-guide-for-beginners, /freelancing/upwork-complete-guide-winning-proposals, /freelancing/how-to-create-a-portfolio-with-no-clients, and /resources/one-page-ats-resume-blueprint.
- Keep advice concrete with short examples or scripts (avoid Markdown tables). Never fabricate fake remote job listings or salary guarantees.`,

  'ai-tools': `You are the AspireHub AI Workflow Guide. You help students, developers, and freelancers choose and combine AI tools responsibly while building genuine core skills.
- Discuss tools listed on AspireHub accurately (ChatGPT, DeepSeek, Grok, Claude, Google Gemini, NotebookLM, Perplexity, HuggingChat, Midjourney, Lovable, Replit, Readdy, Bolt.new, GitHub Copilot, Cursor, Canva, Gamma, Runway, Notion, Read AI).
- Point users to /ai-tools/compare when comparing tools side by side, /toolkit?tab=skill-quiz to assess digital skills, and /blog/using-ai-tools-to-learn-faster-without-hollowing-out-your-skills for study habits.
- Format clearly with bullet points (avoid Markdown tables) and remind users to verify current free-tier limits on each tool's official website.`,
};

const DEPTH_INSTRUCTIONS: Record<SpeedMode, string> = {
  fast: 'Keep your reply brief and scannable (about 80–130 words) with direct, actionable takeaways.',
  balanced: 'Provide a clear, structured reply (about 150–250 words) with practical steps and relevant AspireHub page paths.',
  deep: 'Provide a thorough, step-by-step breakdown or action plan (about 280–420 words) covering edge cases, milestones, and concrete examples.',
};

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

function buildSystemInstruction(
  speedMode: SpeedMode,
  roleMode: RoleMode,
  language?: string
): string {
  const base = ROLE_INSTRUCTIONS[roleMode] ?? ROLE_INSTRUCTIONS.general;
  const depth = DEPTH_INSTRUCTIONS[speedMode] ?? DEPTH_INSTRUCTIONS.balanced;
  const langName = language && language in LANGUAGE_NAMES ? LANGUAGE_NAMES[language] : null;
  const langLine =
    langName && language !== 'en'
      ? `\n- Interface language is set to ${langName}. Reply in ${langName} unless the user explicitly writes in or asks for another language.`
      : '';
  return `${base}\n\nResponse Style:\n- ${depth}${langLine}`;
}

const DEFAULT_SITE_URL = 'https://ais-pre-hpcioxlwnalbkoftskch5h-880748617521.asia-east1.run.app';

function resolveSiteBaseUrl(req: express.Request): string {
  const envUrl = process.env.APP_URL;
  if (envUrl && envUrl !== 'MY_APP_URL' && /^https?:\/\//i.test(envUrl)) {
    return envUrl.replace(/\/+$/, '');
  }
  const forwardedProto = req.headers['x-forwarded-proto'];
  const proto =
    typeof forwardedProto === 'string' && forwardedProto.length > 0
      ? forwardedProto.split(',')[0].trim()
      : req.protocol || 'https';
  const host = req.get('host');
  if (host) {
    return `${proto}://${host}`;
  }
  return DEFAULT_SITE_URL;
}

async function startServer() {
  const app = express();
  app.set('trust proxy', true);
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'aspirehub-api' });
  });

  app.post('/api/auth/signup', async (req, res) => {
    try {
      const result = await signupUser((req.body ?? {}) as Record<string, unknown>);
      res.status(201).json(result);
    } catch (err: unknown) {
      if (err instanceof AuthActionError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Unable to create account right now. Please try again.' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const result = await loginUser((req.body ?? {}) as Record<string, unknown>);
      res.json(result);
    } catch (err: unknown) {
      if (err instanceof AuthActionError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Unable to sign in right now. Please try again.' });
    }
  });

  app.get('/api/auth/me', (req, res) => {
    try {
      const user = requireAuthenticatedUser(req.headers.authorization);
      res.json({
        user: sanitizePublicUser(user),
        bookmarks: user.bookmarks ?? [],
      });
    } catch (err: unknown) {
      if (err instanceof AuthActionError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Unable to verify session.' });
    }
  });

  app.put('/api/auth/profile', (req, res) => {
    try {
      const user = requireAuthenticatedUser(req.headers.authorization);
      const updated = updateUserProfile(user.id, (req.body ?? {}) as Record<string, unknown>);
      res.json({ user: updated });
    } catch (err: unknown) {
      if (err instanceof AuthActionError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Unable to save profile changes.' });
    }
  });

  app.put('/api/auth/bookmarks', (req, res) => {
    try {
      const user = requireAuthenticatedUser(req.headers.authorization);
      const body = (req.body ?? {}) as { bookmarks?: unknown };
      const saved = updateUserBookmarks(user.id, body.bookmarks);
      res.json({ bookmarks: saved });
    } catch (err: unknown) {
      if (err instanceof AuthActionError) {
        res.status(err.status).json({ error: err.message });
        return;
      }
      res.status(500).json({ error: 'Unable to sync bookmarks.' });
    }
  });

  app.post('/api/chat', async (req, res) => {
    const ai = getGeminiClient();
    if (!ai) {
      res.status(503).json({
        error:
          'GEMINI_API_KEY is not configured yet. Add your Gemini API key in Settings > Secrets to enable the AspireHub AI Advisor.',
      });
      return;
    }

    const body = req.body as {
      messages?: ChatMessageInput[];
      roleMode?: RoleMode;
      speedMode?: SpeedMode;
      language?: string;
    };

    const rawMessages = Array.isArray(body?.messages) ? body.messages : [];
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

    const historyMessages = validMessages.slice(0, -1).slice(-16);
    const roleMode: RoleMode =
      body?.roleMode && body.roleMode in ROLE_INSTRUCTIONS ? body.roleMode : 'general';
    const speedMode: SpeedMode =
      body?.speedMode === 'fast' || body?.speedMode === 'deep' ? body.speedMode : 'balanced';

    const systemInstruction = buildSystemInstruction(speedMode, roleMode, body?.language);

    try {
      let response: Awaited<ReturnType<ReturnType<typeof ai.chats.create>['sendMessage']>> | null =
        null;
      let lastErr: unknown = null;

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const chat = ai.chats.create({
            model: ACTIVE_CHAT_MODEL,
            config: {
              systemInstruction,
            },
            history: historyMessages.map((msg) => ({
              role: msg.role,
              parts: [{ text: msg.text }],
            })),
          });

          response = await chat.sendMessage({
            message: latestMessage.text,
          });
          lastErr = null;
          break;
        } catch (attemptErr: unknown) {
          lastErr = attemptErr;
          const msg = attemptErr instanceof Error ? attemptErr.message : '';
          const isAuthOrQuota =
            msg.includes('403') ||
            msg.includes('400') ||
            msg.includes('PERMISSION_DENIED') ||
            msg.includes('API_KEY_INVALID') ||
            msg.includes('429') ||
            msg.includes('RESOURCE_EXHAUSTED');
          if (isAuthOrQuota || attempt === 2) {
            throw attemptErr;
          }
          await new Promise((resolve) => setTimeout(resolve, 600 * (attempt + 1)));
        }
      }

      if (lastErr) {
        throw lastErr;
      }

      const replyText = response?.text?.trim();
      if (!replyText) {
        res.status(502).json({
          error: 'The AI advisor returned an empty response. Please try rephrasing your question.',
        });
        return;
      }

      res.json({
        reply: replyText,
        roleMode,
      });
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : 'Unexpected Gemini API error';
      console.error('Gemini /api/chat error:', errMessage);

      if (
        errMessage.includes('403') ||
        errMessage.includes('PERMISSION_DENIED') ||
        errMessage.includes('API_KEY_INVALID')
      ) {
        res.status(403).json({
          error:
            'Your Gemini API key could not be authenticated. Please check GEMINI_API_KEY in Settings > Secrets.',
        });
        return;
      }

      if (errMessage.includes('429') || errMessage.includes('RESOURCE_EXHAUSTED')) {
        res.status(429).json({
          error:
            'Rate limit reached for the current API key quota. Please wait a few seconds and try again.',
        });
        return;
      }

      if (errMessage.includes('503') || errMessage.includes('UNAVAILABLE')) {
        res.status(503).json({
          error:
            'The AI service is momentarily busy. Please click Retry message in a few seconds.',
        });
        return;
      }

      res.status(500).json({
        error: 'Unable to reach the AI Advisor right now. Please try again shortly.',
      });
    }
  });

  // Explicitly serve robots.txt and sitemap.xml with clean crawler headers
  const publicDir = path.resolve(__dirname, 'public');
  app.get('/robots.txt', (req, res) => {
    const baseUrl = resolveSiteBaseUrl(req);
    const robotsPath = path.join(publicDir, 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      const rawRobots = fs.readFileSync(robotsPath, 'utf-8');
      const normalizedRobots = rawRobots
        .replace(DEFAULT_SITE_URL, baseUrl)
        .replace(/Sitemap:\s*\/sitemap\.xml/i, `Sitemap: ${baseUrl}/sitemap.xml`);
      res.type('text/plain').send(normalizedRobots);
      return;
    }
    res.type('text/plain').send(`User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`);
  });

  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const baseUrl = resolveSiteBaseUrl(req);
      const rawXml = fs.readFileSync(sitemapPath, 'utf-8');
      const normalizedXml = rawXml
        .replaceAll(DEFAULT_SITE_URL, baseUrl)
        .replace(/<loc>(\/[^<]*)<\/loc>/g, `<loc>${baseUrl}$1</loc>`);
      res.type('application/xml').send(normalizedXml);
      return;
    }
    res.status(404).end();
  });

  if (IS_PROD) {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AspireHub server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start AspireHub server:', err);
  process.exit(1);
});
