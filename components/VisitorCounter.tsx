'use client';

import { useEffect, useState } from 'react';
import { incrementVisitor, getVisitorCount } from '@/lib/api';

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // sessionStorage is per-tab — each new tab/window increments once
    // but refreshing the same tab does NOT re-count
    const KEY = 'cc_tab_visited';
    const already = sessionStorage.getItem(KEY);

    if (!already) {
      sessionStorage.setItem(KEY, '1');
      incrementVisitor().then((n) => {
        setCount(n);
        setTimeout(() => setVisible(true), 600);
      });
    } else {
      getVisitorCount().then((n) => {
        setCount(n);
        setTimeout(() => setVisible(true), 600);
      });
    }
  }, []);

  if (count === null) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div
        title="Total site visitors"
        className="flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 backdrop-blur-md border border-white/15 rounded-full shadow-2xl shadow-black/40 group hover:border-violet-500/50 transition-all duration-300 cursor-default"
      >
        <span className="relative flex h-2 w-2 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <svg
          className="w-3.5 h-3.5 text-slate-400 group-hover:text-violet-400 transition-colors flex-shrink-0"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
        <span className="text-white font-bold text-xs tabular-nums tracking-wide">
          {formatCount(count)}
        </span>
        <span className="text-slate-500 text-xs group-hover:text-slate-400 transition-colors hidden sm:inline">
          visitors
        </span>
      </div>
    </div>
  );
}
