import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { subscribeNewsletter } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';

export function NewsletterSection() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    const result = await subscribeNewsletter(email);
    if (result.ok) {
      setStatus('success');
      setFeedback(result.message);
      setEmail('');
      showToast(result.message, 'success');
    } else {
      setStatus('error');
      setFeedback(result.message);
      showToast(result.message, 'error');
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-gradient-to-br from-[#101B3D] via-[#16234E] to-[#4E3FB2] rounded-2xl p-8 sm:p-10 lg:p-12 text-white relative overflow-hidden"
    >
      <div
        className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[#4DA8FF]/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium tracking-wide text-[#4DA8FF] mb-2">
            {t.newsletter.kicker}
          </p>
          <h2
            id="newsletter-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
          >
            {t.newsletter.title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-200/85 max-w-xl leading-relaxed">
            {t.newsletter.subtitle}
          </p>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={t.newsletter.placeholder}
                aria-invalid={status === 'error'}
                className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-white text-[#101B3D] placeholder:text-slate-400 text-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#6956D8] hover:bg-[#5542C0] disabled:opacity-60 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {status === 'submitting' ? t.newsletter.saving : t.newsletter.subscribe}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {status === 'error' && (
              <p role="alert" className="flex items-start gap-2 text-xs text-red-200 leading-relaxed">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-300" aria-hidden="true" />
                <span>{feedback}</span>
              </p>
            )}

            {status === 'success' && (
              <p role="status" className="flex items-start gap-2 text-xs text-sky-100 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#4DA8FF]" aria-hidden="true" />
                <span>{feedback}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
