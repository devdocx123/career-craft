'use client';

import { useEffect, useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getHRById, createBooking } from '@/lib/api';
import { HR } from '@/types';
import {
  parseAvailability,
  getNextAvailableDates,
  formatDate,
  isDateStringAllowed,
} from '@/lib/availability';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year', 'Fresh Graduate', 'Alumni'];

const degrees = [
  'BS (Bachelor of Science)',
  'BE (Bachelor of Engineering)',
  'BBA (Bachelor of Business Administration)',
  'BCS (Bachelor of Computer Science)',
  'BCom (Bachelor of Commerce)',
  'BA (Bachelor of Arts)',
  'MBBS',
  'MS (Master of Science)',
  'MBA (Master of Business Administration)',
  'MCS (Master of Computer Science)',
  'MEng (Master of Engineering)',
  'MA (Master of Arts)',
  'PhD',
  'Associate Degree',
  'Diploma',
  'Other',
];

const specializations = [
  // Computer Science & IT
  'Computer Science',
  'Software Engineering',
  'Information Technology',
  'Artificial Intelligence',
  'Data Science',
  'Cybersecurity',
  'Network Engineering',
  'Web Development',
  // Business
  'Business Administration',
  'Marketing',
  'Finance',
  'Accounting',
  'Human Resource Management',
  'Supply Chain Management',
  'Economics',
  'Entrepreneurship',
  // Engineering
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Industrial Engineering',
  'Telecommunications',
  // Other
  'Mass Communication',
  'Psychology',
  'English Literature',
  'Law',
  'Education',
  'Architecture',
  'Medicine / MBBS',
  'Other',
];

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [hr, setHr] = useState<HR | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Parsed availability
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [availabilityLabel, setAvailabilityLabel] = useState('');

  const [form, setForm] = useState({
    student_name: '',
    email: '',
    phone: '',
    college: '',
    degree: '',
    branch: '',
    year: '',
    preferred_domain: '',
    preferred_date: '',
    preferred_time: '',
    notes: '',
  });

  useEffect(() => {
    if (!id) return;
    getHRById(id).then((data) => {
      setHr(data);
      if (data) {
        const parsed = parseAvailability(data.availability);
        const dates = getNextAvailableDates(parsed.allowedDays, 30);
        setAvailableDates(dates);
        setAvailableSlots(parsed.timeSlots);
        setAvailabilityLabel(data.availability);
        setForm((prev) => ({
          ...prev,
          preferred_domain: data.interview_domains?.[0] ?? '',
        }));
      }
    }).finally(() => setLoading(false));
  }, [id]);

  const set = (field: string, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      // Reset time when date changes (so user re-picks)
      if (field === 'preferred_date') updated.preferred_time = '';
      return updated;
    });
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.student_name.trim()) e.student_name = 'Full name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Valid email is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    if (!form.college.trim()) e.college = 'College/University is required';
    if (!form.degree.trim()) e.degree = 'Degree is required';
    if (!form.branch.trim()) e.branch = 'Branch/Major is required';
    if (!form.year) e.year = 'Current year is required';
    if (!form.preferred_domain) e.preferred_domain = 'Please select a domain';
    if (!form.preferred_date) {
      e.preferred_date = 'Please select an available date';
    } else if (!isDateStringAllowed(form.preferred_date, parseAvailability(hr?.availability ?? '').allowedDays)) {
      e.preferred_date = 'Selected date is not within availability';
    }
    if (!form.preferred_time) e.preferred_time = 'Please select a time slot';
    return e;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      const booking = await createBooking({ ...form, hr_id: id });
      router.push(`/payment?booking_id=${booking.id}`);
    } catch {
      alert('Booking failed. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-violet-500/30 border-t-violet-500 animate-spin" />
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500/60'
        : 'border-white/10 focus:border-violet-500/50'
    }`;

  const selectClass = (field: string) =>
    `w-full px-4 py-3 bg-slate-900 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all text-sm appearance-none ${
      errors[field]
        ? 'border-red-500/60 focus:border-red-500/60'
        : 'border-white/10 focus:border-violet-500/50'
    }`;

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href={`/interviews/${id}`}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </Link>

        {/* HR Banner */}
        {hr && (
          <div className="flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl mb-8">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={hr.photo} alt={hr.name} fill className="object-cover" sizes="56px" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-xs mb-0.5">Booking with</p>
              <h2 className="text-white font-bold">{hr.name}</h2>
              <p className="text-violet-400 text-xs">{hr.position} · {hr.company}</p>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3 py-1 bg-violet-500/15 text-violet-300 text-xs font-bold rounded-full border border-violet-500/30">
                PKR 1,000
              </span>
            </div>
          </div>
        )}

        {/* Availability Notice */}
        {availabilityLabel && (
          <div className="flex items-start gap-3 p-4 bg-violet-500/5 border border-violet-500/20 rounded-xl mb-8">
            <span className="text-lg flex-shrink-0">🗓</span>
            <div>
              <p className="text-violet-300 text-xs font-semibold mb-0.5">
                {hr?.name?.split(' ')[0]}&apos;s Availability
              </p>
              <p className="text-slate-300 text-sm font-medium">{availabilityLabel}</p>
              <p className="text-slate-500 text-xs mt-1">
                You can only book dates and times within this schedule.
              </p>
            </div>
          </div>
        )}

        <h1 className="text-3xl font-black text-white mb-2">Book Your Mock Interview</h1>
        <p className="text-slate-400 text-sm mb-8">
          Fill in your details. Our admin will contact both you and{' '}
          {hr?.name?.split(' ')[0] || 'the HR'} via email to confirm the schedule.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* ── Step 1: Personal Info ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 font-bold">
                1
              </span>
              Personal Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ali Khan"
                  value={form.student_name}
                  onChange={(e) => set('student_name', e.target.value)}
                  className={inputClass('student_name')}
                />
                {errors.student_name && <p className="text-red-400 text-xs mt-1">{errors.student_name}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="ali@email.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className={inputClass('email')}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+92 300 1234567"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className={inputClass('phone')}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* ── Step 2: Academic Info ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 font-bold">
                2
              </span>
              Academic Details
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  College / University *
                </label>
                <input
                  type="text"
                  placeholder="e.g., FAST-NUCES, NUST, LUMS"
                  value={form.college}
                  onChange={(e) => set('college', e.target.value)}
                  className={inputClass('college')}
                />
                {errors.college && <p className="text-red-400 text-xs mt-1">{errors.college}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Degree *
                </label>
                <select
                  value={form.degree}
                  onChange={(e) => set('degree', e.target.value)}
                  className={selectClass('degree')}
                >
                  <option value="">Select degree...</option>
                  {degrees.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.degree && <p className="text-red-400 text-xs mt-1">{errors.degree}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Specialization / Major *
                </label>
                <select
                  value={form.branch}
                  onChange={(e) => set('branch', e.target.value)}
                  className={selectClass('branch')}
                >
                  <option value="">Select specialization...</option>
                  {specializations.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.branch && <p className="text-red-400 text-xs mt-1">{errors.branch}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Current Year *
                </label>
                <select
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                  className={selectClass('year')}
                >
                  <option value="">Select year...</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
                {errors.year && <p className="text-red-400 text-xs mt-1">{errors.year}</p>}
              </div>
            </div>
          </div>

          {/* ── Step 3: Interview Preferences ── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-bold mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-violet-600/30 border border-violet-500/30 flex items-center justify-center text-xs text-violet-400 font-bold">
                3
              </span>
              Interview Preferences
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">

              {/* Domain / Mentorship Area */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Mentorship Area / Interview Domain *
                </label>
                <select
                  value={form.preferred_domain}
                  onChange={(e) => set('preferred_domain', e.target.value)}
                  className={selectClass('preferred_domain')}
                >
                  <option value="">Select the area you need mentorship in...</option>
                  {hr?.interview_domains.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.preferred_domain && (
                  <p className="text-red-400 text-xs mt-1">{errors.preferred_domain}</p>
                )}
              </div>

              {/* Available Date Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Preferred Date *
                </label>
                <select
                  value={form.preferred_date}
                  onChange={(e) => set('preferred_date', e.target.value)}
                  className={selectClass('preferred_date')}
                >
                  <option value="">Select an available date...</option>
                  {availableDates.map((d) => (
                    <option key={d} value={d}>{formatDate(d)}</option>
                  ))}
                </select>
                {errors.preferred_date && (
                  <p className="text-red-400 text-xs mt-1">{errors.preferred_date}</p>
                )}
                {availableDates.length === 0 && (
                  <p className="text-slate-500 text-xs mt-1">No available dates found.</p>
                )}
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Preferred Time Slot *
                </label>
                <select
                  value={form.preferred_time}
                  onChange={(e) => set('preferred_time', e.target.value)}
                  disabled={!form.preferred_date}
                  className={`${selectClass('preferred_time')} disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  <option value="">
                    {form.preferred_date ? 'Select a time slot...' : 'Pick a date first'}
                  </option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                {errors.preferred_time && (
                  <p className="text-red-400 text-xs mt-1">{errors.preferred_time}</p>
                )}
              </div>

              {/* Notes */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Additional Notes
                </label>
                <textarea
                  placeholder="Tell the HR mentor about your background, goals, or areas you'd like to focus on..."
                  value={form.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-3 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <span className="text-lg flex-shrink-0 mt-0.5">ℹ️</span>
            <p className="text-amber-200/80 text-xs leading-relaxed">
              <strong className="text-amber-300">Important:</strong> This form only submits a
              booking request. Our admin will manually review it and contact both you and{' '}
              {hr?.name || 'the HR mentor'} via email to confirm the interview. The actual interview
              takes place outside this platform.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-xl shadow-violet-600/30 text-base flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting Booking...
              </>
            ) : (
              'Submit Booking Request →'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
