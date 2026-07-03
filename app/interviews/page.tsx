'use client';

import { useEffect, useState } from 'react';
import { getHRs } from '@/lib/api';
import { HR } from '@/types';
import HRCard from '@/components/HRCard';
import SkeletonCard from '@/components/SkeletonCard';

const domains = [
  'All',
  'Software Engineering',
  'Data Science',
  'Frontend Development',
  'Backend Development',
  'Full Stack',
  'Marketing',
  'Finance',
  'Banking',
  'Human Resources',
  'Operations',
  'DevOps',
  'Product Management',
];

export default function InterviewsPage() {
  const [hrs, setHrs] = useState<HR[]>([]);
  const [filtered, setFiltered] = useState<HR[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  useEffect(() => {
    getHRs()
      .then((data) => {
        setHrs(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = hrs;
    if (search.trim()) {
      const s = search.toLowerCase();
      result = result.filter(
        (hr) =>
          hr.name.toLowerCase().includes(s) ||
          hr.company.toLowerCase().includes(s) ||
          hr.position.toLowerCase().includes(s) ||
          hr.skills.some((sk) => sk.toLowerCase().includes(s))
      );
    }
    if (selectedDomain !== 'All') {
      result = result.filter((hr) =>
        hr.interview_domains.some((d) =>
          d.toLowerCase().includes(selectedDomain.toLowerCase())
        )
      );
    }
    setFiltered(result);
  }, [search, selectedDomain, hrs]);

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold uppercase tracking-wider">
            Mock Interviews
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Meet Your HR Mentors
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-lg">
            Choose from verified HR professionals. Book a one-on-one mock interview session for PKR 1,000 via EasyPaisa.
          </p>
        </div>

        {/* ── Search + Filter ── */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search by name, company, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-sm"
            />
          </div>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/15 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-sm min-w-[200px]"
          >
            {domains.map((d) => (
              <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>
            ))}
          </select>
        </div>

        {/* ── Results count ── */}
        {!loading && (
          <p className="text-slate-500 text-sm mb-6">
            Showing{' '}
            <span className="text-white font-semibold">{filtered.length}</span>{' '}
            mentor{filtered.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* ── Loading skeletons ── */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── HR Grid ── */}
        {!loading && filtered.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((hr) => <HRCard key={hr.id} hr={hr} />)}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-2">No mentors found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search or filter.</p>
            <button
              onClick={() => { setSearch(''); setSelectedDomain('All'); }}
              className="mt-4 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
