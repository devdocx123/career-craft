import Link from 'next/link';

const standardFeatures = [
  '1 × One-on-One Mock Interview Session',
  'Choose from 6+ verified HR mentors',
  'Select your preferred domain & time slot',
  'Detailed verbal feedback from HR mentor',
  'Interview conducted via Google Meet / Zoom',
  'Admin coordinates the session via email',
  'Confirmation within 24–48 hours',
];

export default function PricingPage() {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-violet-500/10 border border-violet-500/30 rounded-full text-violet-300 text-xs font-semibold uppercase tracking-wider">
            Pricing Plans
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            One active plan, more coming soon. No hidden fees, no subscriptions.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">

          {/* ── Standard (ACTIVE) ── */}
          <div className="relative md:col-span-1 md:-mt-4 bg-gradient-to-b from-violet-600/25 to-indigo-600/10 border-2 border-violet-500/60 rounded-2xl p-7 flex flex-col shadow-2xl shadow-violet-600/20">
            {/* Popular badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="px-4 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg shadow-violet-600/30">
                ✅ AVAILABLE NOW
              </span>
            </div>

            <div className="mb-5 mt-2">
              <h2 className="text-white font-black text-xl mb-1">Standard</h2>
              <p className="text-slate-400 text-sm">Perfect for students preparing for their first interview.</p>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-white">1,000</span>
                <span className="text-violet-300 font-semibold mb-1">PKR</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">One-time payment · No subscription</p>
            </div>

            {/* EasyPaisa Payment Info */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                {/* EasyPaisa logo SVG */}
                <div className="w-8 h-8 rounded-lg bg-[#6CC51D] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-black text-xs">EP</span>
                </div>
                <span className="text-white font-semibold text-sm">Pay via EasyPaisa</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Account No.</span>
                  <span className="text-white font-bold text-xs font-mono">03105156719</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Account Title</span>
                  <span className="text-white font-semibold text-xs">SAEED ASIF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-xs">Amount</span>
                  <span className="text-emerald-400 font-bold text-xs">PKR 1,000</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-2.5 mb-8 flex-1">
              {standardFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-slate-300 text-sm">
                  <svg className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/interviews"
              className="block w-full text-center py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 text-sm"
            >
              Book a Session →
            </Link>
          </div>

          {/* ── Premium (LOCKED) ── */}
          <div className="relative bg-white/3 border border-white/10 rounded-2xl p-7 flex flex-col opacity-60">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 bg-slate-700 text-slate-400 text-xs font-semibold rounded-full border border-slate-600">
                🔒 Coming Soon
              </span>
            </div>
            <div className="mb-5">
              <h2 className="text-slate-300 font-black text-xl mb-1">Premium</h2>
              <p className="text-slate-500 text-sm">Advanced career support with extra features.</p>
            </div>
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-slate-400">TBA</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">Price to be announced</p>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {['Everything in Standard', 'Resume review by HR mentor', 'Written feedback report', 'Priority scheduling', 'Follow-up Q&A session', '2 mock interview sessions'].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-slate-500 text-sm">
                  <svg className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button disabled className="w-full py-3 bg-slate-800 text-slate-500 font-bold rounded-xl cursor-not-allowed text-sm">
              🔒 Coming Soon
            </button>
          </div>

          {/* ── Ultra (LOCKED) ── */}
          <div className="relative bg-white/3 border border-white/10 rounded-2xl p-7 flex flex-col opacity-60">
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-1 bg-slate-700 text-slate-400 text-xs font-semibold rounded-full border border-slate-600">
                🔒 Coming Soon
              </span>
            </div>
            <div className="mb-5">
              <h2 className="text-slate-300 font-black text-xl mb-1">Ultra</h2>
              <p className="text-slate-500 text-sm">Full career acceleration package.</p>
            </div>
            <div className="mb-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-black text-slate-400">TBA</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">Price to be announced</p>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {['Everything in Premium', 'ATS Resume Builder access', 'AI Career Coach sessions', 'Career roadmap creation', 'Skill gap analysis report', '4 mock interview sessions', 'Certificate of completion'].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-slate-500 text-sm">
                  <svg className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <button disabled className="w-full py-3 bg-slate-800 text-slate-500 font-bold rounded-xl cursor-not-allowed text-sm">
              🔒 Coming Soon
            </button>
          </div>
        </div>

        {/* How to Pay */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h3 className="text-white font-bold text-lg mb-6 text-center">How the Payment Works</h3>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: '01', icon: '🎯', title: 'Book Session', desc: 'Select your HR mentor and fill the booking form' },
              { step: '02', icon: '📲', title: 'Pay via EasyPaisa', desc: 'Send PKR 1,000 to 03105156719 (SAEED ASIF)' },
              { step: '03', icon: '📸', title: 'Submit Proof', desc: 'Enter transaction ID and upload payment screenshot' },
              { step: '04', icon: '✅', title: 'Confirmation', desc: 'Admin verifies and contacts you via email within 24–48 hrs' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-xl mx-auto mb-3">
                  {s.icon}
                </div>
                <div className="text-violet-400 text-xs font-bold mb-1">Step {s.step}</div>
                <div className="text-white font-semibold text-sm mb-1">{s.title}</div>
                <div className="text-slate-500 text-xs leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="space-y-3">
          {[
            { q: 'What if my payment is not verified?', a: 'Admin reviews all payments manually. If there is an issue, we will contact you at the email you provided. Please ensure the transaction ID and screenshot are correct.' },
            { q: 'Can I get a refund?', a: 'Refunds are handled on a case-by-case basis. If a session cannot be arranged due to our end, you will receive a full refund.' },
            { q: 'How long does verification take?', a: 'Payment verification typically takes 12–24 hours on business days. You will receive a confirmation email once verified.' },
          ].map((f) => (
            <div key={f.q} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h4 className="text-white font-semibold text-sm mb-2">{f.q}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
