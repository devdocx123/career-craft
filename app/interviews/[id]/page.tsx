'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getHRById } from '@/lib/api';
import { HR } from '@/types';

export default function HRProfilePage() {
  const { id } = useParams<{ id: string }>();
  const [hr, setHr] = useState<HR | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getHRById(id)
      .then(setHr)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!hr) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-white font-bold text-2xl mb-2">HR Mentor Not Found</h1>
          <p className="text-slate-400 mb-6">This profile may have been removed or doesn&apos;t exist.</p>
          <Link href="/interviews" className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors">
            Back to Mentors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-5xl mx-auto">
        {/* Back */}
        <Link href="/interviews" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Mentors
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── LEFT SIDEBAR ── */}
          <div className="lg:col-span-1 space-y-5">
            {/* Profile Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <div className="relative w-28 h-28 rounded-2xl overflow-hidden mx-auto mb-4 ring-4 ring-violet-500/30">
                <Image src={hr.photo} alt={hr.name} fill className="object-cover" sizes="112px" />
              </div>
              <h1 className="text-white font-black text-xl mb-1">{hr.name}</h1>
              <p className="text-violet-400 font-semibold text-sm">{hr.position}</p>
              <p className="text-slate-400 text-sm mt-0.5">{hr.company}</p>

              <div className="flex items-center justify-center gap-1.5 mt-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-xs font-medium">Available for Booking</span>
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="flex justify-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-400 text-xs">{hr.experience} years of experience</p>
              </div>

              <Link
                href={`/interviews/${hr.id}/book`}
                className="mt-5 block w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20"
              >
                Book Interview →
              </Link>
            </div>

            {/* Availability */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-3">Availability</h3>
              <div className="flex items-start gap-2">
                <span className="text-lg">🗓</span>
                <p className="text-slate-400 text-sm leading-relaxed">{hr.availability}</p>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-3">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {hr.languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-700">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT MAIN ── */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-3">About</h2>
              <p className="text-slate-400 leading-relaxed text-sm">{hr.bio}</p>
            </div>

            {/* Education */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-3">Education</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-lg">🎓</div>
                <p className="text-slate-300 text-sm">{hr.education}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-3">Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {hr.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-violet-500/15 text-violet-300 text-xs rounded-full border border-violet-500/25 font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Interview Domains */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-white font-bold text-base mb-3">Interview Expertise</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {hr.interview_domains.map((domain) => (
                  <div key={domain} className="flex items-center gap-2 bg-white/5 rounded-xl p-3 border border-white/8">
                    <div className="w-2 h-2 rounded-full bg-violet-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{domain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border border-violet-500/30 rounded-2xl p-6 text-center">
              <h3 className="text-white font-bold text-lg mb-2">Ready to book with {hr.name.split(' ')[0]}?</h3>
              <p className="text-slate-400 text-sm mb-5">Submit your booking request and our admin will arrange the session for you.</p>
              <Link
                href={`/interviews/${hr.id}/book`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20"
              >
                Book Interview with {hr.name.split(' ')[0]} →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
