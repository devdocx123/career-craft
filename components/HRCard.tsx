import Link from 'next/link';
import Image from 'next/image';
import { HR } from '@/types';

interface HRCardProps {
  hr: HR;
}

export default function HRCard({ hr }: HRCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-violet-500/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/10">
      {/* Top gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-indigo-500" />

      <div className="p-6">
        {/* Photo + name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-white/10">
            <Image
              src={hr.photo}
              alt={hr.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-base leading-tight">{hr.name}</h3>
            <p className="text-violet-400 text-sm font-medium mt-0.5">{hr.position}</p>
            <p className="text-slate-400 text-xs mt-0.5">{hr.company}</p>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-1.5 mb-3">
          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-slate-300 text-xs">{hr.experience} years experience</span>
        </div>

        {/* Bio */}
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 mb-4">{hr.bio}</p>

        {/* Domains */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {hr.interview_domains.slice(0, 3).map((domain) => (
            <span
              key={domain}
              className="px-2 py-0.5 bg-violet-500/15 text-violet-300 text-xs rounded-full border border-violet-500/20"
            >
              {domain}
            </span>
          ))}
          {hr.interview_domains.length > 3 && (
            <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full">
              +{hr.interview_domains.length - 3} more
            </span>
          )}
        </div>

        {/* Availability */}
        <div className="flex items-center gap-1.5 mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400 text-xs">{hr.availability}</span>
        </div>

        {/* Button */}
        <Link
          href={`/interviews/${hr.id}`}
          className="block w-full text-center py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20"
        >
          View Profile & Book
        </Link>
      </div>
    </div>
  );
}
