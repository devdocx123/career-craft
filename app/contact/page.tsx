import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold uppercase tracking-wider">
            Contact Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
            Reach out and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Email Card ── */}
          <div className="bg-gradient-to-br from-violet-600/15 to-indigo-600/10 border border-violet-500/30 rounded-2xl p-8 flex flex-col items-start gap-5 hover:border-violet-400/50 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-2xl">
              ✉️
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                For general inquiries, HR collaborations, or platform feedback — drop us an email and we&apos;ll respond within 24–48 hours.
              </p>
              <a
                href="mailto:amalcareercraft@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                amalcareercraft@gmail.com
              </a>
            </div>
          </div>

          {/* ── Response Info Card ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5 hover:border-white/20 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-2xl">
              🕐
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Response Time</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We typically respond within <span className="text-white font-semibold">24–48 hours</span> on business days. For urgent matters related to a scheduled interview, please mention it in your subject line.
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2">
              {[
                { label: 'General Inquiries', time: '24–48 hrs' },
                { label: 'HR Collaboration', time: '48–72 hrs' },
                { label: 'Booking Support', time: '12–24 hrs' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">{item.label}</span>
                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Reasons to contact ── */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-8">
          <h3 className="text-white font-bold text-base mb-5">What can you reach out about?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { icon: '🎯', text: 'Book or reschedule a mock interview' },
              { icon: '👔', text: 'Become an HR mentor on CareerCraft' },
              { icon: '🏫', text: 'University or NGO partnership inquiry' },
              { icon: '🐞', text: 'Report a bug or technical issue' },
              { icon: '💡', text: 'Suggest a new feature or improvement' },
              { icon: '📋', text: 'General questions about the platform' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 p-3 bg-white/3 rounded-xl border border-white/8">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span className="text-slate-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Looking to book a mock interview directly?
          </p>
          <Link
            href="/interviews"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 text-sm"
          >
            Browse HR Mentors →
          </Link>
        </div>

      </div>
    </div>
  );
}
