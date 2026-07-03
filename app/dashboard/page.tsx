import Link from 'next/link';
import { Analytics } from "@vercel/analytics/next"
const features = [
  {
    icon: '🎯',
    title: 'One-on-One Mock Interviews',
    description: 'Book a real interview simulation with experienced HR professionals from top Pakistani companies.',
    active: true,
    href: '/interviews',
    cta: 'Browse HR Mentors',
    badge: 'LIVE',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    cardColor: 'from-violet-600/20 to-indigo-600/10 border-violet-500/50',
  },
  {
    icon: '📄',
    title: 'ATS Resume Checker',
    description: 'Scan your resume against Applicant Tracking Systems and receive optimization suggestions.',
    active: false,
    href: '/ats-checker',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '🛠',
    title: 'Resume Builder',
    description: 'Create ATS-optimized resumes with field-specific templates and smart content suggestions.',
    active: false,
    href: '/resume-builder',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '🤖',
    title: 'AI Career Coach',
    description: 'Get AI-powered career advice tailored to Pakistani job market trends and your background.',
    active: false,
    href: '/career-coach',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '🗺',
    title: 'Career Roadmap',
    description: 'Visualize personalized step-by-step learning paths aligned to your target career.',
    active: false,
    href: '/roadmap',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '📊',
    title: 'Skill Gap Analysis',
    description: 'Identify skill gaps between your current profile and your dream job requirements.',
    active: false,
    href: '/skill-gap',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '📚',
    title: 'Learning Resources',
    description: 'Curated courses, articles, and materials to boost your employability skills.',
    active: false,
    href: '/resources',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '💼',
    title: 'Job Recommendations',
    description: 'Discover relevant job postings matched to your profile, skills, and preferences.',
    active: false,
    href: '/jobs',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '📈',
    title: 'Career Analytics',
    description: 'Track your career progress, application history, and improvement metrics over time.',
    active: false,
    href: '/analytics',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '👥',
    title: 'Community',
    description: 'Connect with fellow students and alumni, share experiences, and grow your network.',
    active: false,
    href: '/community',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
  {
    icon: '🙍',
    title: 'Profile',
    description: 'Manage your personal profile, career preferences, and application history.',
    active: false,
    href: '/profile',
    badge: 'COMING SOON',
    badgeColor: 'bg-slate-700 text-slate-400',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold uppercase tracking-wider">
            Dashboard
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Welcome to CareerCraft
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Your career launchpad. One feature is live today — more powerful tools are on the way.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Active Features', value: '1', color: 'text-emerald-400', small: false },
            { label: 'Coming Soon', value: '10', color: 'text-violet-400', small: false },
            { label: 'HR Mentors', value: '6+', color: 'text-amber-400', small: false },
            { label: 'Mock Interview Fee', value: 'PKR 1,000', color: 'text-sky-400', small: true },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className={`font-black mb-1 ${stat.color} ${stat.small ? 'text-xl' : 'text-3xl'}`}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Feature Grid */}
        <h2 className="text-xl font-bold text-white mb-6">All Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                f.active
                  ? `bg-gradient-to-br ${f.cardColor} hover:border-violet-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-600/20`
                  : 'bg-white/3 border-white/10'
              }`}
            >
              {/* Badge */}
              <span className={`absolute top-4 right-4 px-2.5 py-0.5 text-xs font-bold rounded-full border ${f.badgeColor}`}>
                {f.active ? f.badge : '🔒 Coming Soon'}
              </span>

              <div className={`text-3xl mb-4 ${!f.active ? 'opacity-40 grayscale' : ''}`}>{f.icon}</div>
              <h3 className={`font-bold mb-2 text-base ${f.active ? 'text-white' : 'text-slate-500'}`}>
                {f.title}
              </h3>
              <p className={`text-sm leading-relaxed mb-5 ${f.active ? 'text-slate-300' : 'text-slate-600'}`}>
                {f.description}
              </p>

              {f.active && (
                <Link
                  href={f.href}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20"
                >
                  {f.cta} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
