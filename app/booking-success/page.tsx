import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="relative mx-auto w-28 h-28 mb-8">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
          <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
            <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Interview Booking Submitted Successfully!
        </h1>

        {/* Message */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left space-y-3">
          <p className="text-slate-300 text-sm leading-relaxed">
            Your booking request has been received. Our administrator will review your request and manually contact both you and the selected HR mentor through email to finalize the interview schedule.
          </p>
          <div className="border-t border-white/10 pt-3">
            <p className="text-slate-400 text-xs leading-relaxed">
              <span className="text-amber-400 font-semibold">Note:</span> This website only handles interview bookings. The actual mock interview will be conducted outside the platform — typically via Google Meet, Zoom, or phone call.
            </p>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-5 mb-8 text-left">
          <h3 className="text-violet-300 font-semibold text-sm mb-3">What happens next?</h3>
          <ol className="space-y-2">
            {[
              'Admin reviews your booking request (within 24–48 hours)',
              'Admin contacts you and the HR mentor via email',
              'Both parties confirm a suitable time',
              'You receive the meeting link or contact details',
              'Your mock interview takes place!',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400 text-xs">
                <span className="w-5 h-5 rounded-full bg-violet-600/30 border border-violet-500/30 text-violet-400 text-xs flex items-center justify-center flex-shrink-0 font-bold mt-0.5">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-600/20 text-sm"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/interviews"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white border border-white/15 font-medium rounded-xl transition-all duration-200 text-sm"
          >
            Book Another Interview
          </Link>
        </div>
      </div>
    </div>
  );
}
