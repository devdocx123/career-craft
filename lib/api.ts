import { supabase } from './supabase';
import { Booking, BookingStatus, HR } from '@/types';
import { sampleHRs } from './hrData';

// ─── HR FUNCTIONS ───────────────────────────────────────────────────────────

// Fallback: sample HRs with fake UUIDs for use when DB is unavailable
const fallbackHRs: HR[] = sampleHRs.map((hr, i) => ({
  ...hr,
  id: `00000000-0000-0000-0000-00000000000${i + 1}`,
}));

export async function seedHRs(): Promise<void> {
  try {
    const { count } = await supabase.from('hrs').select('*', { count: 'exact', head: true });
    if (count && count > 0) return;
    await supabase.from('hrs').insert(sampleHRs);
  } catch {
    // silently fail — DB not set up yet
  }
}

export async function getHRs(): Promise<HR[]> {
  try {
    const { data, error } = await supabase.from('hrs').select('*').order('name');
    if (error || !data || data.length === 0) return fallbackHRs;
    return data as HR[];
  } catch {
    return fallbackHRs;
  }
}

export async function getHRById(id: string): Promise<HR | null> {
  // Check fallback first (for fake UUIDs)
  const fallback = fallbackHRs.find((hr) => hr.id === id);

  try {
    const { data, error } = await supabase.from('hrs').select('*').eq('id', id).single();
    if (error || !data) return fallback ?? null;
    return data as HR;
  } catch {
    return fallback ?? null;
  }
}

export async function createHR(hr: Omit<HR, 'id'>): Promise<HR> {
  const { data, error } = await supabase.from('hrs').insert(hr).select().single();
  if (error) throw new Error(error.message);
  return data as HR;
}

export async function updateHR(id: string, hr: Partial<Omit<HR, 'id'>>): Promise<HR> {
  const { data, error } = await supabase.from('hrs').update(hr).eq('id', id).select().single();
  if (error) throw new Error(error.message);
  return data as HR;
}

export async function deleteHR(id: string): Promise<void> {
  const { error } = await supabase.from('hrs').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// ─── VISITOR COUNT ────────────────────────────────────────────────────────────

export async function incrementVisitor(): Promise<number> {
  try {
    // Use rpc to atomically increment
    const { data, error } = await supabase.rpc('increment_visitors');
    if (error || data === null) {
      // Fallback: manual read-then-update
      const { data: row } = await supabase
        .from('site_stats').select('visitor_count').eq('id', 'main').single();
      const current = (row?.visitor_count ?? 0) + 1;
      await supabase.from('site_stats').update({ visitor_count: current }).eq('id', 'main');
      return current;
    }
    return data as number;
  } catch {
    return 0;
  }
}

export async function getVisitorCount(): Promise<number> {
  try {
    const { data } = await supabase
      .from('site_stats').select('visitor_count').eq('id', 'main').single();
    return data?.visitor_count ?? 0;
  } catch {
    return 0;
  }
}

// ─── BOOKING FUNCTIONS ───────────────────────────────────────────────────────

export async function createBooking(
  booking: Omit<Booking, 'id' | 'status' | 'created_at'>
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .insert({ ...booking, status: 'Pending' })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Booking;
}

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, hr:hrs(*)')
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data as Booking[];
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<void> {
  const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function updatePaymentStatus(id: string, payment_status: string): Promise<void> {
  const { error } = await supabase.from('bookings').update({ payment_status }).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
