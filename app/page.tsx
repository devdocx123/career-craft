import Link from 'next/link';

const features = [
  {
    icon: '🎯',
    title: 'One-on-One Mock Interviews',
    description: 'Book a real interview simulation with experienced HR professionals from top companies.',
    active: true,
    href: '/interviews',
  },
  {
    icon: '📄',
    title: 'ATS Resume Checker',
    description: 'Scan your resume against ATS algorithms and get instant optimization suggestions.',
    active: false,
  },
  {
    icon: '🛠',
    title: 'Resume Builder',
    description: 'Build ATS-friendly, field-specific resumes with our smart template engine.',
    active: false,
  },
  {
    icon: '🤖',
    title: 'AI Career Coach',
    description: 'Get personalized career advice powered by AI, tailored to Pakistani job market trends.',
    active: false,
  },
  {
    icon: '🗺',
    title: 'Career Roadmap',
    description: 'Visualize step-by-step learning paths for your desired career track.',
    active: false,
  },
  {
    icon: '📊',
    title: 'Skill Gap Analysis',
    description: 'Identify missing skills and get recommendations based on your target job.',
    active: false,
  },
];

const steps = [
  { step: '01', title: 'Browse HR Mentors', desc: 'Explore verified HR professionals from leading companies across Pakistan.' },
  { step: '02', title: 'View Their Profile', desc: 'Check their expertise, experience, and available interview domains.' },
  { step: '03', title: 'Submit Booking Request', desc: 'Fill out a simple form with your details and preferred schedule.' },
  { step: '04', title: 'Admin Confirms & Connects', desc: 'Our team manually contacts both parties via email to finalize the session.' },
];

const testimonials = [
  {
    name: 'Haris Iqbal',
    role: 'CS Graduate, FAST Lahore',
    text: 'The mock interview with Usman helped me crack my first technical interview at a product company. The feedback was incredibly detailed.',
    avatar: '👨‍💻',
  },
  {
    name: 'Zainab Siddiqui',
    role: 'BBA Student, IBA Karachi',
    text: 'I had no idea how FMCG interviews worked. After one session with Omar, I felt completely prepared and confident for my internship drive.',
    avatar: '👩‍🎓',
  },
  {
    name: 'Ahmed Raza',
    role: 'Fresh Graduate, NUST',
    text: 'CareerCraft connected me with an HR expert in my exact domain. The booking process was simple and the session was life-changing.',
    avatar: '🧑‍💼',
  },
];

const faqs = [
  {
    q: 'Is CareerCraft free to use?',
    a: 'Currently the mock interview booking feature is completely free. Premium features will be introduced in future versions.',
  },
  {
    q: 'How does the interview booking work?',
    a: 'You submit a booking request on our platform. Our admin then manually reviews it and contacts both you and the selected HR professional via email to finalize the schedule.',
  },
  {
    q: 'Does the interview happen on this website?',
    a: 'No. CareerCraft only handles the booking. The actual interview is arranged and conducted outside the platform — typically over Google Meet, Zoom, or phone call.',
  },
  {
    q: 'Who are the HR professionals on CareerCraft?',
    a: 'They are real HR managers, recruiters, and talent acquisition professionals from leading Pakistani companies who have volunteered to mentor students.',
  },
  {
    q: 'When will the other features like Resume Builder and AI Coach be available?',
    a: 'These features are currently under development and will be rolled out in the next version of CareerCraft. Stay tuned!',
  },
];

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── HERO ───────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.25),transparent)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Career Help for Youth in Pakistan
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent leading-[1.05]">
            Land Your Dream Job.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Start With a Mock Interview.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            CareerCraft connects Pakistani students and fresh graduates with real HR professionals
            for one-on-one mock interview sessions — completely free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/interviews"
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-2xl shadow-violet-600/30 hover:-translate-y-0.5 text-base"
            >
              Book a Mock Interview →
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-medium rounded-xl transition-all duration-200 text-base"
            >
              Explore Dashboard
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-16">
            {[
              { value: '6+', label: 'HR Mentors' },
              { value: '100%', label: 'Free to Book' },
              { value: '5+', label: 'Industry Domains' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-white">{stat.value}</div>
                <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              About CareerCraft
            </div>
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              Bridging the Gap Between Education and Employment
            </h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Young people in Pakistan face serious challenges in securing employment — not because of lack of talent,
              but due to limited access to career guidance, resume help, and interview preparation.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              Existing support services are fragmented and inaccessible. CareerCraft was built to fix that —
              a centralized platform that connects students directly with industry professionals.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our MVP launches with mock interview booking. More powerful features are on the way.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '🎓', title: 'For Students', desc: 'University students preparing for placements and internships' },
              { icon: '👔', title: 'For Graduates', desc: 'Fresh graduates entering the job market for the first time' },
              { icon: '💼', title: 'Real Mentors', desc: 'Verified HR professionals from top companies in Pakistan' },
              { icon: '🚀', title: 'Zero Cost', desc: 'Completely free during the MVP phase — no credit card needed' },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-colors">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CAREERCRAFT ─────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-violet-950/10">
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-black text-white mb-4">Why Choose CareerCraft?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">Built specifically for the Pakistani student and job seeker — not a generic global tool.</p>
        </div>
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          {[
            { icon: '🇵🇰', title: 'Pakistan-Focused', desc: 'HR mentors from Pakistan\'s top companies who understand local hiring culture and expectations.' },
            { icon: '⚡', title: 'Fast & Simple', desc: 'Book a mock interview in under 3 minutes. No lengthy sign-ups, no complexity.' },
            { icon: '🤝', title: 'Human Touch', desc: 'Real humans coordinate every booking. No automation, no bots — just genuine help.' },
            { icon: '🔒', title: 'Safe & Private', desc: 'Your personal data is stored securely. We never share your information without consent.' },
            { icon: '📈', title: 'Career-First Design', desc: 'Every feature is designed to move you closer to employment, not engagement metrics.' },
            { icon: '🌱', title: 'Growing Platform', desc: 'More features are being actively developed based on real student feedback.' },
          ].map((item) => (
            <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 hover:bg-white/8 transition-all duration-300">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h4 className="text-white font-semibold mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Platform Features</h2>
            <p className="text-slate-400 max-w-xl mx-auto">One feature is live. More are coming. Everything built around your career success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                  f.active
                    ? 'bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border-violet-500/50 hover:border-violet-400'
                    : 'bg-white/3 border-white/10 opacity-60'
                }`}
              >
                {f.active ? (
                  <span className="absolute top-4 right-4 px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                    LIVE
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-slate-700/80 text-slate-300 text-xs font-semibold rounded-full border border-slate-600">
                    🔒 Coming Soon
                  </span>
                )}
                <div className="text-3xl mb-4">{f.icon}</div>
                <h4 className="text-white font-bold mb-2">{f.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.description}</p>
                {f.active && f.href && (
                  <Link href={f.href} className="text-violet-400 text-sm font-semibold hover:text-violet-300 transition-colors">
                    Get Started →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">How It Works</h2>
            <p className="text-slate-400 max-w-xl mx-auto">Four simple steps from browsing to your mock interview.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-violet-500/50 to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-lg mx-auto mb-4 shadow-lg shadow-violet-600/30">
                    {s.step}
                  </div>
                  <h4 className="text-white font-bold mb-2 text-sm">{s.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Student Stories</h2>
            <p className="text-slate-400">Real results from students who used CareerCraft.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xl">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <h4 className="text-white font-semibold mb-2">{faq.q}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border border-violet-500/30 rounded-3xl p-12 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.2),transparent_60%)]" />
            <div className="relative z-10">
              <h2 className="text-4xl font-black text-white mb-4">Ready to Ace Your Interview?</h2>
              <p className="text-slate-400 mb-8 max-w-md mx-auto">
                Browse our HR mentors and book your free one-on-one mock interview session today.
              </p>
              <Link
                href="/interviews"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-2xl shadow-violet-600/30 hover:-translate-y-0.5 text-base"
              >
                Book Your Free Session →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
