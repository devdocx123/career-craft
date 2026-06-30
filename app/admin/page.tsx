'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBookings, updateBookingStatus, deleteBooking, getHRs, createHR, updateHR, deleteHR } from '@/lib/api';
import { Booking, BookingStatus, HR } from '@/types';

const STATUSES: BookingStatus[] = ['Pending', 'Contacted', 'Scheduled', 'Completed', 'Cancelled'];
const statusColors: Record<BookingStatus, string> = {
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  Contacted: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Scheduled: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  Completed: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Cancelled: 'bg-red-500/15 text-red-400 border-red-500/30',
};

type Tab = 'bookings' | 'hr';

const emptyHR: Omit<HR, 'id'> = {
  name: '', photo: '', company: '', position: '',
  experience: 0, skills: [], bio: '', education: '',
  languages: [], interview_domains: [], availability: '',
};

// ─── Password Gate ────────────────────────────────────────────────────────────
function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? 'careercraft@admin2026';
    if (password === correct) {
      sessionStorage.setItem('cc_admin_auth', '1');
      onSuccess();
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/30 to-indigo-600/20 border border-violet-500/30 flex items-center justify-center text-3xl mx-auto mb-6">🔐</div>
        <h1 className="text-2xl font-black text-white text-center mb-1">Admin Access</h1>
        <p className="text-slate-400 text-sm text-center mb-8">Restricted area. Enter the admin password to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }}
            placeholder="Enter admin password" autoFocus
            className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 transition-all text-sm ${error ? 'border-red-500/60' : 'border-white/10 focus:ring-violet-500/50'}`}
          />
          {error && <p className="text-red-400 text-xs">⚠️ Incorrect password. Please try again.</p>}
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all text-sm">
            Access Admin Dashboard →
          </button>
        </form>
        <p className="text-slate-600 text-xs text-center mt-6">CareerCraft · Admin Portal · Restricted Access</p>
      </div>
    </div>
  );
}

// ─── HR Form Modal ────────────────────────────────────────────────────────────
function HRFormModal({ hr, onSave, onClose }: {
  hr: Partial<HR> | null;
  onSave: (data: Omit<HR, 'id'>, id?: string) => Promise<void>;
  onClose: () => void;
}) {
  const isEdit = !!hr?.id;
  const [form, setForm] = useState<Omit<HR, 'id'>>({
    name: hr?.name ?? '', photo: hr?.photo ?? '', company: hr?.company ?? '',
    position: hr?.position ?? '', experience: hr?.experience ?? 0,
    skills: hr?.skills ?? [], bio: hr?.bio ?? '', education: hr?.education ?? '',
    languages: hr?.languages ?? [], interview_domains: hr?.interview_domains ?? [],
    availability: hr?.availability ?? '',
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const setF = (k: keyof Omit<HR, 'id'>, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const setArr = (k: keyof Omit<HR, 'id'>, v: string) =>
    setF(k, v.split(',').map(s => s.trim()).filter(Boolean));

  const handleSave = async () => {
    if (!form.name || !form.company || !form.position || !form.availability) {
      setErr('Name, Company, Position and Availability are required.'); return;
    }
    setSaving(true);
    try { await onSave(form, hr?.id); onClose(); }
    catch (e: unknown) { setErr(e instanceof Error ? e.message : 'Save failed'); }
    finally { setSaving(false); }
  };

  const inp = 'w-full px-3 py-2.5 bg-slate-800 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-white font-bold text-lg">{isEdit ? 'Edit HR Mentor' : 'Add New HR Mentor'}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-xl">✕</button>
        </div>
        <div className="p-6 space-y-4">
          {err && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{err}</p>}
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Full Name *</label>
              <input className={inp} value={form.name} onChange={e => setF('name', e.target.value)} placeholder="e.g., Ayesha Malik" /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Company *</label>
              <input className={inp} value={form.company} onChange={e => setF('company', e.target.value)} placeholder="e.g., Systems Limited" /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Position *</label>
              <input className={inp} value={form.position} onChange={e => setF('position', e.target.value)} placeholder="e.g., Senior HR Manager" /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Years of Experience</label>
              <input className={inp} type="number" min={0} max={50} value={form.experience} onChange={e => setF('experience', parseInt(e.target.value) || 0)} /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Photo URL</label>
              <input className={inp} value={form.photo} onChange={e => setF('photo', e.target.value)} placeholder="https://randomuser.me/api/portraits/..." /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Availability * <span className="text-slate-600 normal-case">(e.g. Mon–Fri, 10am–4pm PKT)</span></label>
              <input className={inp} value={form.availability} onChange={e => setF('availability', e.target.value)} placeholder="Mon–Fri, 10am–4pm PKT" /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Bio</label>
              <textarea className={`${inp} resize-none`} rows={3} value={form.bio} onChange={e => setF('bio', e.target.value)} placeholder="Short professional bio..." /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Education</label>
              <input className={inp} value={form.education} onChange={e => setF('education', e.target.value)} placeholder="MBA – IBA Karachi" /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Skills <span className="text-slate-600 normal-case">(comma-separated)</span></label>
              <input className={inp} value={form.skills.join(', ')} onChange={e => setArr('skills', e.target.value)} placeholder="Talent Acquisition, Interviewing" /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Languages <span className="text-slate-600 normal-case">(comma-separated)</span></label>
              <input className={inp} value={form.languages.join(', ')} onChange={e => setArr('languages', e.target.value)} placeholder="English, Urdu" /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5 uppercase tracking-wider">Interview Domains <span className="text-slate-600 normal-case">(comma-separated)</span></label>
              <input className={inp} value={form.interview_domains.join(', ')} onChange={e => setArr('interview_domains', e.target.value)} placeholder="Software Engineering, Marketing" /></div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
          <button onClick={onClose} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-sm rounded-xl border border-white/10 transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-6 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50">
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add HR Mentor'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── HR Management Tab ────────────────────────────────────────────────────────
function HRManagement() {
  const [hrs, setHrs] = useState<HR[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<Partial<HR> | null | false>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getHRs().then(setHrs).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleSave = async (data: Omit<HR, 'id'>, id?: string) => {
    if (id) { const updated = await updateHR(id, data); setHrs(p => p.map(h => h.id === id ? updated : h)); }
    else { const created = await createHR(data); setHrs(p => [...p, created]); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This will also affect any bookings with this HR.`)) return;
    setDeletingId(id);
    try { await deleteHR(id); setHrs(p => p.filter(h => h.id !== id)); }
    catch { alert('Delete failed.'); }
    finally { setDeletingId(null); }
  };

  return (
    <div>
      {modal !== false && (
        <HRFormModal hr={modal} onSave={handleSave} onClose={() => setModal(false)} />
      )}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-black text-white">HR Mentors</h2>
          <p className="text-slate-400 text-sm mt-1">Manage the HR professionals listed on the platform.</p>
        </div>
        <button
          onClick={() => setModal(null)}
          className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-violet-600/20 flex items-center gap-2"
        >
          <span className="text-base">+</span> Add HR Mentor
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" /></div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {hrs.map(hr => (
            <div key={hr.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                  {hr.photo ? (
                    <Image src={hr.photo} alt={hr.name} fill className="object-cover" sizes="48px"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-xl">👤</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-sm truncate">{hr.name}</h3>
                  <p className="text-violet-400 text-xs truncate">{hr.position}</p>
                  <p className="text-slate-500 text-xs truncate">{hr.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-slate-400 text-xs truncate">{hr.availability}</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {hr.interview_domains.slice(0, 2).map(d => (
                  <span key={d} className="px-2 py-0.5 bg-violet-500/15 text-violet-300 text-xs rounded-full">{d}</span>
                ))}
                {hr.interview_domains.length > 2 && (
                  <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full">+{hr.interview_domains.length - 2}</span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setModal(hr)}
                  className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold rounded-lg border border-white/10 transition-colors"
                >✏️ Edit</button>
                <button
                  onClick={() => handleDelete(hr.id, hr.name)}
                  disabled={deletingId === hr.id}
                  className="flex-1 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-lg border border-red-500/20 transition-colors disabled:opacity-50"
                >{deletingId === hr.id ? '...' : '🗑 Delete'}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────
function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    getBookings().then(d => { setBookings(d); setFiltered(d); }).catch(() => alert('Failed to load bookings.')).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  useEffect(() => {
    let r = bookings;
    if (search.trim()) { const s = search.toLowerCase(); r = r.filter(b => b.student_name.toLowerCase().includes(s) || b.email.toLowerCase().includes(s)); }
    if (statusFilter !== 'All') r = r.filter(b => b.status === statusFilter);
    setFiltered(r);
  }, [search, statusFilter, bookings]);

  const handleStatus = async (id: string, status: BookingStatus) => {
    setUpdatingId(id);
    try { await updateBookingStatus(id, status); setBookings(p => p.map(b => b.id === id ? { ...b, status } : b)); }
    catch { alert('Update failed.'); } finally { setUpdatingId(null); }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete booking for "${name}"?`)) return;
    setDeletingId(id);
    try { await deleteBooking(id); setBookings(p => p.filter(b => b.id !== id)); }
    catch { alert('Delete failed.'); } finally { setDeletingId(null); }
  };

  const stats = { total: bookings.length, pending: bookings.filter(b => b.status === 'Pending').length, contacted: bookings.filter(b => b.status === 'Contacted').length, completed: bookings.filter(b => b.status === 'Completed').length };

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[{ label: 'Total', value: stats.total, color: 'text-white', bg: 'bg-gradient-to-br from-violet-600/20 to-indigo-600/10 border-violet-500/30' },
          { label: 'Pending', value: stats.pending, color: 'text-amber-400', bg: 'bg-amber-500/5 border-amber-500/20' },
          { label: 'Contacted', value: stats.contacted, color: 'text-blue-400', bg: 'bg-blue-500/5 border-blue-500/20' },
          { label: 'Completed', value: stats.completed, color: 'text-emerald-400', bg: 'bg-emerald-500/5 border-emerald-500/20' },
        ].map(s => (
          <div key={s.label} className={`rounded-2xl p-5 border ${s.bg}`}>
            <div className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</div>
            <div className="text-slate-400 text-xs">{s.label} Bookings</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/15 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-3 bg-white/5 border border-white/15 text-white rounded-xl focus:outline-none text-sm min-w-[150px]">
          <option value="All" className="bg-slate-900">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s} className="bg-slate-900">{s}</option>)}
        </select>
        <button onClick={load} className="px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl text-sm font-medium transition-colors">↻ Refresh</button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20"><div className="text-5xl mb-4">📭</div><h3 className="text-white font-bold text-xl mb-2">No bookings found</h3><p className="text-slate-400 text-sm">{bookings.length === 0 ? 'No bookings submitted yet.' : 'Try adjusting search or filter.'}</p></div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10 bg-white/5">
              {['Student', 'Contact', 'Academic', 'HR / Domain', 'Schedule', 'Status', 'Date', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-slate-400 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-white/3 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap"><div className="text-white font-semibold text-xs">{b.student_name}</div><div className="text-slate-500 text-xs">{b.college}</div></td>
                  <td className="px-4 py-4"><div className="text-slate-300 text-xs">{b.email}</div><div className="text-slate-500 text-xs">{b.phone}</div></td>
                  <td className="px-4 py-4 whitespace-nowrap"><div className="text-slate-300 text-xs">{b.branch}</div><div className="text-slate-500 text-xs">{b.year}</div></td>
                  <td className="px-4 py-4 whitespace-nowrap"><div className="text-slate-300 text-xs">{b.hr?.name || '—'}</div><div className="text-slate-500 text-xs">{b.preferred_domain}</div></td>
                  <td className="px-4 py-4 whitespace-nowrap"><div className="text-slate-300 text-xs">{b.preferred_date}</div><div className="text-slate-500 text-xs">{b.preferred_time}</div></td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <select value={b.status} onChange={e => handleStatus(b.id, e.target.value as BookingStatus)} disabled={updatingId === b.id}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full border cursor-pointer focus:outline-none disabled:opacity-50 ${statusColors[b.status]} bg-transparent`}>
                      {STATUSES.map(s => <option key={s} value={s} className="bg-slate-900 text-white">{s}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap"><div className="text-slate-400 text-xs">{new Date(b.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</div></td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button onClick={() => handleDelete(b.id, b.student_name)} disabled={deletingId === b.id} className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded-lg border border-red-500/20 transition-colors disabled:opacity-50">
                      {deletingId === b.id ? '...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
        <p className="text-amber-200/70 text-xs leading-relaxed"><span className="text-amber-300 font-semibold">Note:</span> No automated emails are sent. Manually contact both the student and HR mentor to coordinate the session.</p>
      </div>
    </div>
  );
}

// ─── Admin Dashboard Shell ────────────────────────────────────────────────────
function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('bookings');

  const handleLogout = () => { sessionStorage.removeItem('cc_admin_auth'); window.location.reload(); };

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 bg-red-500/10 border border-red-500/30 rounded-full text-red-300 text-xs font-semibold uppercase tracking-wider">
              🔐 Admin Dashboard
            </div>
            <h1 className="text-4xl font-black text-white">CareerCraft Admin</h1>
            <p className="text-slate-400 mt-1">Manage bookings and HR mentors from one place.</p>
          </div>
          <button onClick={handleLogout} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-semibold rounded-xl border border-red-500/20 transition-colors flex items-center gap-2">
            🚪 Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-white/5 border border-white/10 rounded-xl mb-8 w-fit">
          {([['bookings', '📋 Bookings'], ['hr', '👥 HR Mentors']] as [Tab, string][]).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === key ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'bookings' ? <BookingsTab /> : <HRManagement />}
      </div>
    </div>
  );
}

// ─── Page Entry ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('cc_admin_auth') === '1') setAuthed(true);
    setChecking(false);
  }, []);

  if (checking) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" /></div>;
  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;
  return <AdminDashboard />;
}
