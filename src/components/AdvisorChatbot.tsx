import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  Bot,
  Check,
  Copy,
  MessageSquare,
  RotateCcw,
  Send,
  Sparkles,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

type RoleMode = 'general' | 'scholarship' | 'freelance' | 'ai-tools';
type SpeedMode = 'fast' | 'balanced' | 'deep';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  roleMode?: RoleMode;
}

interface AdvisorChatbotProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const STORAGE_KEY = 'aspirehub_advisor_chat_v1';

const STARTER_PROMPTS: Record<RoleMode, string[]> = {
  general: [
    'Help me pick a suitable career path and learning roadmap',
    'Which AspireHub guides & toolkit tabs should a student start with?',
    'How do I avoid AI hollowing out my real skills?',
  ],
  scholarship: [
    'Outline a winning Chevening or Erasmus SOP structure',
    'What documents do I need 12 months before international deadlines?',
    'What belongs on an academic CV vs an industry resume?',
  ],
  freelance: [
    'Suggest a 90-day skill roadmap for remote internships & freelancing',
    'Write a clean Upwork proposal outline for a web project',
    'How do I build 3 portfolio case studies with zero clients?',
  ],
  'ai-tools': [
    'Compare DeepSeek, ChatGPT, and Claude for coding & study',
    'Lovable vs Replit vs Bolt.new — which fits my project?',
    'Best free AI stack for academic research and writing',
  ],
};

const INTERNAL_PATH_PREFIXES =
  /^\/(?:scholarships|freelancing|ai-tools|resources|toolkit|blog|about|contact|privacy-policy|disclaimer)(?:\/[a-z0-9-]+)*(?:\?[a-z0-9_=&%-]+)?$/i;

function extractInternalPath(rawUrl: string): string | null {
  if (INTERNAL_PATH_PREFIXES.test(rawUrl)) return rawUrl;
  try {
    const parsed = new URL(rawUrl);
    const fullPath = `${parsed.pathname}${parsed.search}`;
    if (
      (parsed.hostname.includes('aspirehub') || parsed.hostname === window.location.hostname) &&
      INTERNAL_PATH_PREFIXES.test(fullPath)
    ) {
      return fullPath;
    }
  } catch {
    // Not a full URL
  }
  return null;
}

function renderFormattedText(text: string, onNavigatePath: (path: string) => void) {
  const lines = text.split('\n');

  const renderInline = (line: string, lineKey: string) => {
    const tokenPattern =
      /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\/(?:scholarships|freelancing|ai-tools|resources|toolkit|blog|about|contact|privacy-policy|disclaimer)(?:\/[a-z0-9-]+)*(?:\?[a-z0-9_=&%-]+)?)/g;
    const tokens = line.split(tokenPattern);

    return tokens.map((token, idx) => {
      if (!token) return null;

      const mdLinkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (mdLinkMatch) {
        const [, label, href] = mdLinkMatch;
        const internalPath = extractInternalPath(href);
        if (internalPath) {
          return (
            <button
              key={`${lineKey}-md-${idx}`}
              type="button"
              onClick={() => onNavigatePath(internalPath)}
              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded bg-[#6956D8]/10 text-[#5542C0] dark:text-[#4DA8FF] hover:bg-[#6956D8]/20 font-medium text-xs transition-colors cursor-pointer align-baseline"
            >
              <span>{label}</span>
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </button>
          );
        }
        return (
          <a
            key={`${lineKey}-ext-${idx}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5542C0] dark:text-[#4DA8FF] underline underline-offset-2 hover:text-[#101B3D]"
          >
            {label}
          </a>
        );
      }

      if (token.startsWith('**') && token.length > 4 && token.endsWith('**')) {
        return (
          <strong key={`${lineKey}-b-${idx}`} className="font-semibold text-[#101B3D] dark:text-white">
            {token.slice(2, -2)}
          </strong>
        );
      }

      if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
        return (
          <code
            key={`${lineKey}-c-${idx}`}
            className="px-1 py-0.5 rounded bg-slate-200/70 dark:bg-slate-700 text-[#101B3D] dark:text-slate-100 font-mono text-[11px]"
          >
            {token.slice(1, -1)}
          </code>
        );
      }

      if (INTERNAL_PATH_PREFIXES.test(token)) {
        return (
          <button
            key={`${lineKey}-lnk-${idx}`}
            type="button"
            onClick={() => onNavigatePath(token)}
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded bg-[#6956D8]/10 text-[#5542C0] dark:text-[#4DA8FF] hover:bg-[#6956D8]/20 font-medium text-xs transition-colors cursor-pointer align-baseline"
          >
            <span>{token}</span>
            <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
          </button>
        );
      }

      return <React.Fragment key={`${lineKey}-t-${idx}`}>{token}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-2 text-[13px] leading-relaxed">
      {lines.map((rawLine, index) => {
        const trimmed = rawLine.trim();
        if (!trimmed) {
          return <div key={`sp-${index}`} className="h-0.5" />;
        }

        if (/^---+$/.test(trimmed)) {
          return <hr key={`hr-${index}`} className="border-slate-200/80 dark:border-slate-700 my-1" />;
        }

        const isBullet = /^[-*•]\s+/.test(trimmed);
        const numberedMatch = trimmed.match(/^(\d+\.)\s+(.*)$/);

        if (isBullet) {
          const content = trimmed.replace(/^[-*•]\s+/, '');
          return (
            <div key={`ul-${index}`} className="flex items-start gap-2 pl-1">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6956D8] shrink-0" />
              <p className="flex-1 min-w-0">{renderInline(content, `ul-${index}`)}</p>
            </div>
          );
        }

        if (numberedMatch) {
          return (
            <div key={`ol-${index}`} className="flex items-start gap-2 pl-0.5">
              <span className="font-semibold text-[#6956D8] dark:text-[#4DA8FF] tabular-nums shrink-0">
                {numberedMatch[1]}
              </span>
              <p className="flex-1 min-w-0">{renderInline(numberedMatch[2], `ol-${index}`)}</p>
            </div>
          );
        }

        const headingMatch = trimmed.match(/^#{1,3}\s+(.*)$/);
        if (headingMatch) {
          return (
            <p key={`h-${index}`} className="font-semibold text-[#101B3D] dark:text-white pt-0.5">
              {renderInline(headingMatch[1], `h-${index}`)}
            </p>
          );
        }

        return <p key={`p-${index}`}>{renderInline(trimmed, `p-${index}`)}</p>;
      })}
    </div>
  );
}

export function AdvisorChatbot({ isOpen, onOpen, onClose }: AdvisorChatbotProps) {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const [roleMode, setRoleMode] = useState<RoleMode>('general');
  const [speedMode, setSpeedMode] = useState<SpeedMode>('balanced');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed)) return parsed.slice(-24);
      }
    } catch {
      // Ignore storage read error
    }
    return [];
  });
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const threadEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const roleOptions: Array<{ id: RoleMode; label: string; hint: string }> = [
    {
      id: 'general',
      label: t.advisor.roleGeneral,
      hint: 'Career paths, scholarships & learning stacks',
    },
    {
      id: 'scholarship',
      label: t.advisor.roleScholarship,
      hint: 'SOP structure, academic CV & timelines',
    },
    {
      id: 'freelance',
      label: t.advisor.roleFreelance,
      hint: 'Remote jobs, roadmaps, Fiverr & Upwork',
    },
    {
      id: 'ai-tools',
      label: t.advisor.roleAiTools,
      hint: 'Tool selection, comparisons & study stacks',
    },
  ];

  const speedOptions: Array<{ id: SpeedMode; label: string }> = [
    { id: 'fast', label: t.advisor.speedFast },
    { id: 'balanced', label: t.advisor.speedBalanced },
    { id: 'deep', label: t.advisor.speedDeep },
  ];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-24)));
    } catch {
      // Ignore storage write error
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        threadEndRef.current?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        inputRef.current?.focus();
      }, 90);
    }
  }, [isOpen, messages.length, isSending, prefersReducedMotion]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  async function submitConversation(
    nextMessages: ChatMessage[],
    activeRole: RoleMode,
    activeSpeed: SpeedMode
  ) {
    setIsSending(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map((m) => ({ role: m.role, text: m.text })),
          roleMode: activeRole,
          speedMode: activeSpeed,
          language,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (!res.ok || !data.reply) {
        throw new Error(
          data.error || 'Could not get a response from the AI Advisor right now.'
        );
      }

      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        roleMode: activeRole,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Network issue while contacting the AI Advisor.';
      setErrorMessage(msg);
    } finally {
      setIsSending(false);
    }
  }

  function handleSend(customPrompt?: string) {
    const text = (customPrompt ?? inputValue).trim();
    if (!text || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      roleMode,
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    if (!customPrompt) setInputValue('');
    void submitConversation(updated, roleMode, speedMode);
  }

  function handleRetryLast() {
    if (isSending || messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (last.role === 'user') {
      void submitConversation(messages, roleMode, speedMode);
    }
  }

  function handleClearChat() {
    setMessages([]);
    setErrorMessage(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  }

  function handleCopyReply(id: string, text: string) {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
    });
  }

  function handleNavigateInternal(path: string) {
    navigate(path);
    if (window.innerWidth < 640) {
      onClose();
    }
  }

  const activeRoleMeta = roleOptions.find((r) => r.id === roleMode) ?? roleOptions[0];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="advisor-launcher"
            type="button"
            onClick={onOpen}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            aria-label={t.advisor.launcher}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 h-11 px-4 rounded-xl bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] text-white shadow-lg shadow-[#101B3D]/25 border border-white/15 inline-flex items-center gap-2 text-sm font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#4DA8FF] dark:text-white" aria-hidden="true" />
            <span>{t.advisor.launcher}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="advisor-panel"
            role="dialog"
            aria-modal="false"
            aria-label={t.advisor.title}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-6 sm:right-6 z-50 sm:w-[420px] h-[82vh] max-h-[640px] bg-white dark:bg-[#131D3B] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#243668] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3.5 bg-[#101B3D] text-white flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#6956D8] flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-white truncate">
                    {t.advisor.title}
                  </h2>
                  <p className="text-[11px] text-slate-300 truncate">{activeRoleMeta.hint}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearChat}
                    title="Start a new chat"
                    aria-label="Start a new chat"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close AI Advisor"
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Role & Reasoning Controls */}
            <div className="px-3.5 py-2.5 bg-[#F7F8FC] dark:bg-[#0D152E] border-b border-slate-200 dark:border-[#243668] space-y-2 shrink-0">
              <div className="grid grid-cols-4 gap-1 bg-white dark:bg-[#131D3B] p-1 rounded-lg border border-slate-200/80 dark:border-[#243668]">
                {roleOptions.map((option) => {
                  const active = roleMode === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRoleMode(option.id)}
                      className={`py-1.5 px-1.5 rounded-md text-[11px] font-semibold transition-colors cursor-pointer truncate ${
                        active
                          ? 'bg-[#6956D8] text-white'
                          : 'text-[#202A44]/80 dark:text-slate-300 hover:text-[#101B3D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  {t.advisor.detailLabel}
                </span>
                <div className="inline-flex items-center bg-white dark:bg-[#131D3B] border border-slate-200/80 dark:border-[#243668] rounded-lg p-0.5">
                  {speedOptions.map((mode) => {
                    const active = speedMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setSpeedMode(mode.id)}
                        className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#101B3D] dark:bg-[#6956D8] text-white'
                            : 'text-slate-600 dark:text-slate-300 hover:text-[#101B3D] dark:hover:text-white'
                        }`}
                      >
                        {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Scrollable Thread */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-white dark:bg-[#131D3B]">
              {messages.length === 0 ? (
                <div className="space-y-4 py-2">
                  <div className="p-4 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668]">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] mb-1.5">
                      <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{t.advisor.welcomeTitle}</span>
                    </div>
                    <p className="text-xs text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
                      {t.advisor.welcomeDesc}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                      {t.advisor.tryAsking} ({activeRoleMeta.label})
                    </p>
                    <div className="space-y-1.5">
                      {STARTER_PROMPTS[roleMode].map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => handleSend(prompt)}
                          className="w-full text-left px-3 py-2.5 rounded-xl bg-[#F7F8FC] dark:bg-[#0D152E] hover:bg-[#6956D8]/8 border border-slate-200/80 dark:border-[#243668] hover:border-[#6956D8]/35 text-xs font-medium text-[#101B3D] dark:text-slate-100 transition-colors cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-lg bg-[#6956D8]/12 text-[#6956D8] dark:text-[#4DA8FF] flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" aria-hidden="true" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 ${
                          isUser
                            ? 'bg-[#101B3D] text-white rounded-br-sm'
                            : 'bg-[#F7F8FC] dark:bg-[#0D152E] text-[#202A44] dark:text-slate-200 border border-slate-200/80 dark:border-[#243668] rounded-bl-sm'
                        }`}
                      >
                        {isUser ? (
                          <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        ) : (
                          <div>
                            {renderFormattedText(msg.text, handleNavigateInternal)}
                            <div className="mt-2 pt-1.5 border-t border-slate-200/70 dark:border-[#243668] flex items-center justify-end">
                              <button
                                type="button"
                                onClick={() => handleCopyReply(msg.id, msg.text)}
                                className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-[#101B3D] dark:hover:text-white transition-colors cursor-pointer"
                              >
                                {copiedId === msg.id ? (
                                  <>
                                    <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />
                                    <span className="text-emerald-700 dark:text-emerald-400">
                                      {t.common.copied}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3 h-3" aria-hidden="true" />
                                    <span>{t.common.copy}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-[#0D152E] text-[#101B3D] dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" aria-hidden="true" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}

              {isSending && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#6956D8]/12 text-[#6956D8] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl rounded-bl-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200/80 dark:border-[#243668] text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <span className="inline-flex gap-1" aria-hidden="true">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6956D8] animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6956D8] animate-pulse [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6956D8] animate-pulse [animation-delay:300ms]" />
                    </span>
                    <span>{t.advisor.drafting}</span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <p className="leading-relaxed">{errorMessage}</p>
                    {messages.length > 0 && messages[messages.length - 1].role === 'user' && (
                      <button
                        type="button"
                        onClick={handleRetryLast}
                        className="font-semibold text-[#101B3D] dark:text-white underline underline-offset-2 hover:text-[#6956D8] cursor-pointer"
                      >
                        {t.advisor.retry}
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div ref={threadEndRef} />
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 border-t border-slate-200 dark:border-[#243668] bg-[#F7F8FC] dark:bg-[#0D152E] shrink-0"
            >
              <div className="flex items-end gap-2 bg-white dark:bg-[#131D3B] border border-slate-200 dark:border-[#243668] rounded-xl px-3 py-2 focus-within:border-[#6956D8] transition-colors">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={t.advisor.placeholder}
                  className="flex-1 resize-none bg-transparent text-sm text-[#101B3D] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none max-h-24"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isSending}
                  aria-label="Send message"
                  className="p-2 rounded-lg bg-[#6956D8] hover:bg-[#5542C0] disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 text-white transition-colors shrink-0 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 text-center">
                {t.advisor.disclaimer}
              </p>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
