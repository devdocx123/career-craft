import Link from 'next/link';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: string;
}

export default function ComingSoon({
  title,
  description = 'This feature will be available in the next version of CareerCraft.',
  icon = '🔒',
}: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl">
          {icon}
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-slate-800 border border-slate-700 rounded-full text-slate-400 text-xs font-semibold uppercase tracking-wider">
          Coming Soon
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">{title}</h1>
        <p className="text-slate-400 leading-relaxed mb-8">{description}</p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
