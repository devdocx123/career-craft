'use client';

import { useState, FormEvent, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaymentForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('booking_id') ?? '';

  const [txnId, setTxnId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErrors(p => ({ ...p, screenshot: 'File must be under 5MB' })); return; }
    setScreenshot(file);
    setErrors(p => ({ ...p, screenshot: '' }));
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!txnId.trim()) e.txnId = 'Transaction ID is required';
    if (!screenshot) e.screenshot = 'Payment screenshot is required';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);

    try {
      const { supabase } = await import('@/lib/supabase');

      let screenshotUrl = '';

      // Convert screenshot to base64 and store directly in DB
      // This avoids needing a Supabase Storage bucket
      if (screenshot) {
        screenshotUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(screenshot);
        });
      }

      // Update booking with payment info
      if (bookingId) {
        await supabase.from('bookings').update({
          payment_status: 'Pending Verification',
          payment_txn_id: txnId.trim(),
          payment_screenshot_url: screenshotUrl,
        }).eq('id', bookingId);
      }

      router.push('/booking-success');
    } catch {
      router.push('/booking-success');
    } finally {
      setSubmitting(false);
    }
  };

  const inp = (field: string) =>
    `w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm ${errors[field] ? 'border-red-500/60' : 'border-white/10 focus:border-violet-500/50'}`;

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            💳 Complete Your Booking
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Payment Required</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your booking form has been received. Complete the payment of{' '}
            <span className="text-white font-bold">PKR 1,000</span> via EasyPaisa to confirm your session.
          </p>
        </div>

        {/* EasyPaisa Details Card */}
        <div className="bg-gradient-to-br from-[#6CC51D]/15 to-[#4a8f12]/5 border border-[#6CC51D]/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            {/* EasyPaisa branding */}
            <div className="w-12 h-12 rounded-xl bg-[#6CC51D] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#6CC51D]/20">
              <span className="text-white font-black text-sm">EP</span>
            </div>
            <div>
              <h3 className="text-white font-bold">EasyPaisa</h3>
              <p className="text-slate-400 text-xs">Mobile Account Transfer</p>
            </div>
            <div className="ml-auto">
              <span className="px-3 py-1 bg-[#6CC51D]/20 text-[#6CC51D] text-xs font-bold rounded-full border border-[#6CC51D]/30">
                PKR 1,000
              </span>
            </div>
          </div>

          <div className="space-y-3 bg-black/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Account Number</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-bold font-mono text-sm tracking-wider">0310-5156719</span>
              </div>
            </div>
            <div className="border-t border-white/5" />
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Account Title</span>
              <span className="text-white font-semibold text-sm">SAEED ASIF</span>
            </div>
            <div className="border-t border-white/5" />
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">Amount to Send</span>
              <span className="text-[#6CC51D] font-black text-lg">PKR 1,000</span>
            </div>
          </div>

          <p className="text-slate-500 text-xs mt-3 text-center">
            Open EasyPaisa app → Send Money → Enter number above → Send PKR 1,000
          </p>
        </div>

        {/* Payment Proof Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 font-bold">✓</span>
              Submit Payment Proof
            </h3>

            {/* Transaction ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Transaction ID *
              </label>
              <input
                type="text"
                placeholder="e.g., EP2024123456789"
                value={txnId}
                onChange={(e) => { setTxnId(e.target.value); setErrors(p => ({ ...p, txnId: '' })); }}
                className={inp('txnId')}
              />
              {errors.txnId && <p className="text-red-400 text-xs mt-1">{errors.txnId}</p>}
              <p className="text-slate-600 text-xs mt-1">Find the Transaction ID in your EasyPaisa app under transaction history.</p>
            </div>

            {/* Screenshot Upload */}
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Payment Screenshot *
              </label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="hidden"
              />
              {!preview ? (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className={`w-full border-2 border-dashed rounded-xl p-8 text-center transition-all ${errors.screenshot ? 'border-red-500/50 bg-red-500/5' : 'border-white/15 hover:border-violet-500/40 hover:bg-white/3'}`}
                >
                  <div className="text-3xl mb-2">📸</div>
                  <p className="text-slate-400 text-sm font-medium">Click to upload screenshot</p>
                  <p className="text-slate-600 text-xs mt-1">PNG, JPG, JPEG · Max 5MB</p>
                </button>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Payment screenshot" className="w-full max-h-56 object-contain bg-slate-900" />
                  <button
                    type="button"
                    onClick={() => { setScreenshot(null); setPreview(null); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-400 text-white rounded-full text-xs flex items-center justify-center transition-colors"
                  >✕</button>
                </div>
              )}
              {errors.screenshot && <p className="text-red-400 text-xs mt-1">{errors.screenshot}</p>}
            </div>
          </div>

          {/* Info notice */}
          <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <span className="text-lg flex-shrink-0">ℹ️</span>
            <p className="text-amber-200/80 text-xs leading-relaxed">
              <strong className="text-amber-300">What happens next?</strong> Our admin will manually verify your payment within 24–48 hours and contact both you and your selected HR mentor via email to finalize the interview schedule.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-violet-600/30 text-base flex items-center justify-center gap-3"
          >
            {submitting ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting Payment Proof...</>
            ) : (
              '✅ Submit Payment & Confirm Booking →'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" /></div>}>
      <PaymentForm />
    </Suspense>
  );
}
