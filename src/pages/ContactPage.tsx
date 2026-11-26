import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  FileWarning,
  Globe2,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useLanguage } from '../context/LanguageContext';
import { useToast } from '../context/ToastContext';
import { isValidEmail } from '../utils/formatters';
import { PageHeader } from '../components/PageHeader';

const CONTACT_TOPICS = [
  'Scholarship Update or Expired Cycle Report',
  'Broken Official Link or Correction',
  'AI Tool Directory Listing Update',
  'Course / Learning Resource Suggestion',
  'General Platform Feedback',
];

export function ContactPage() {
  const { t } = useLanguage();
  const { showToast } = useToast();

  useDocumentTitle(
    `${t.pages.contactTitle} — AspireHub`,
    t.pages.contactSubtitle,
    {
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact AspireHub',
        description:
          'Editorial contact and opportunity verification feedback channel for AspireHub.',
      },
    }
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(CONTACT_TOPICS[0]);
  const [referenceUrl, setReferenceUrl] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<{
    name: string;
    topic: string;
    email: string;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedUrl = referenceUrl.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      const errMsg = 'Please enter your name (at least 2 characters).';
      setError(errMsg);
      showToast(errMsg, 'error');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      const errMsg = 'Please enter a valid email address so we can follow up if needed.';
      setError(errMsg);
      showToast(errMsg, 'error');
      return;
    }
    if (trimmedUrl && !/^https?:\/\/.+/i.test(trimmedUrl)) {
      const errMsg = 'Please enter a valid URL starting with https:// or http:// (or leave it empty).';
      setError(errMsg);
      showToast(errMsg, 'error');
      return;
    }
    if (trimmedMessage.length < 15) {
      const errMsg = 'Please provide a brief description (at least 15 characters).';
      setError(errMsg);
      showToast(errMsg, 'error');
      return;
    }

    setError('');
    setSubmittedRecord({
      name: trimmedName,
      topic,
      email: trimmedEmail,
    });
    showToast('Editorial feedback note prepared.', 'success');
    setName('');
    setEmail('');
    setReferenceUrl('');
    setMessage('');
  }

  return (
    <div>
      <PageHeader
        sectionLabel={t.pages.contactLabel}
        title={t.pages.contactTitle}
        subtitle={t.pages.contactSubtitle}
        breadcrumbCurrent={t.nav.contact}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#101B3D] dark:text-white mb-2">
              Send an Editorial Note or Correction
            </h2>
            <p className="text-sm text-[#202A44]/80 dark:text-slate-300 mb-6 leading-relaxed">
              Spotted an expired scholarship cycle, a changed official portal URL, or a helpful open
              course worth covering? Submit the details below or write directly to our editorial
              inbox.
            </p>

            {submittedRecord ? (
              <div
                role="status"
                className="rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-6 space-y-3"
              >
                <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  Message Preview Prepared
                </div>
                <p className="text-sm text-emerald-900/90 dark:text-emerald-200 leading-relaxed">
                  Thank you, <strong>{submittedRecord.name}</strong>. Your note regarding{' '}
                  <strong>{submittedRecord.topic}</strong> is ready. For direct delivery to the
                  AspireHub editorial desk, you can also send your message straight via email to{' '}
                  <a
                    href={`mailto:salishba692@gmail.com?subject=${encodeURIComponent(
                      `[AspireHub] ${submittedRecord.topic}`
                    )}`}
                    className="font-semibold underline text-[#101B3D] dark:text-white"
                  >
                    salishba692@gmail.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => setSubmittedRecord(null)}
                  className="text-xs font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] cursor-pointer"
                >
                  Prepare another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                  >
                    Inquiry Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  >
                    {CONTACT_TOPICS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-url"
                    className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                  >
                    Official Portal or AspireHub Page URL (Optional)
                  </label>
                  <input
                    id="contact-url"
                    type="url"
                    value={referenceUrl}
                    onChange={(e) => setReferenceUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-[#101B3D] dark:text-slate-200 mb-1.5"
                  >
                    Details
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share the scholarship name, official portal link, deadline update, or resource suggestion..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F7F8FC] dark:bg-[#0D152E] border border-slate-200 dark:border-slate-700 rounded-lg text-[#101B3D] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4DA8FF]"
                    required
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs font-medium text-red-700 dark:text-red-400">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#101B3D] hover:bg-[#192854] dark:bg-[#6956D8] dark:hover:bg-[#5542C0] rounded-xl transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  Submit Feedback
                </button>
              </form>
            )}
          </div>

          {/* Direct Channels & Verification Standards */}
          <aside className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 text-[#101B3D] dark:text-white font-bold text-base">
                <Mail className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]" aria-hidden="true" />
                Direct Editorial Channel
              </div>
              <p className="text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
                For official corrections, partnership inquiries, or content removal requests, reach
                our editorial desk directly:
              </p>
              <a
                href="mailto:salishba692@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6956D8] dark:text-[#4DA8FF] hover:text-[#5542C0] break-all"
              >
                salishba692@gmail.com
              </a>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Typical editorial review cycle: 2–4 business days.
              </p>
            </div>

            <div className="bg-white dark:bg-[#141E3D] border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-[#101B3D] dark:text-white flex items-center gap-2">
                <ShieldCheck
                  className="w-5 h-5 text-[#6956D8] dark:text-[#4DA8FF]"
                  aria-hidden="true"
                />
                What We Can &amp; Cannot Do
              </h3>
              <ul className="space-y-3 text-sm text-[#202A44]/85 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <Globe2
                    className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    We verify official university, government, and foundation portals and flag
                    expired cycles transparently.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FileWarning
                    className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    AspireHub is not a scholarship selection agency, visa broker, or paid placement
                    firm. Always submit official scholarship applications only through host portals.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MessageSquare
                    className="w-4 h-4 text-[#6956D8] dark:text-[#4DA8FF] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <span>
                    Need quick guidance on structuring an SOP or Fiverr profile? Try the AspireHub AI
                    Advisor button at the bottom-right corner.
                  </span>
                </li>
              </ul>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 text-xs font-semibold">
                <Link
                  to="/privacy-policy"
                  className="text-[#6956D8] dark:text-[#4DA8FF] hover:underline"
                >
                  {t.footer.privacyLink}
                </Link>
                <Link
                  to="/disclaimer"
                  className="text-[#6956D8] dark:text-[#4DA8FF] hover:underline"
                >
                  {t.footer.disclaimerLink}
                </Link>
                <Link to="/about" className="text-[#6956D8] dark:text-[#4DA8FF] hover:underline">
                  {t.nav.about}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
