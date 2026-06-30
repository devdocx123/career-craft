// ─── Availability Parser ──────────────────────────────────────────────────────
// Parses strings like:
//   "Mon–Fri, 10am–4pm PKT"
//   "Tue & Thu, 2pm–6pm PKT"
//   "Mon, Wed, Fri, 5pm–8pm PKT"
//   "Sat, 10am–2pm PKT"

export interface ParsedAvailability {
  allowedDays: number[];   // 0=Sun,1=Mon,2=Tue,3=Wed,4=Thu,5=Fri,6=Sat
  timeSlots: string[];     // e.g. ["2:00 PM","2:30 PM",...]
  startHour: number;
  endHour: number;
  label: string;
}

const DAY_MAP: Record<string, number> = {
  sun: 0, sunday: 0,
  mon: 1, monday: 1,
  tue: 2, tuesday: 2,
  wed: 3, wednesday: 3,
  thu: 4, thursday: 4,
  fri: 5, friday: 5,
  sat: 6, saturday: 6,
};

const RANGE_MAP: Record<string, number[]> = {
  'mon–fri': [1, 2, 3, 4, 5],
  'mon-fri': [1, 2, 3, 4, 5],
  'mon–wed': [1, 2, 3],
  'mon-wed': [1, 2, 3],
  'mon–sat': [1, 2, 3, 4, 5, 6],
  'mon-sat': [1, 2, 3, 4, 5, 6],
  'tue–thu': [2, 3, 4],
  'tue-thu': [2, 3, 4],
  'wed–fri': [3, 4, 5],
  'wed-fri': [3, 4, 5],
};

function parseTime12(str: string): number {
  // e.g. "10am" -> 10, "2pm" -> 14, "6pm" -> 18
  str = str.trim().toLowerCase();
  const match = str.match(/^(\d+)(am|pm)$/);
  if (!match) return 9;
  let h = parseInt(match[1]);
  const meridiem = match[2];
  if (meridiem === 'pm' && h !== 12) h += 12;
  if (meridiem === 'am' && h === 12) h = 0;
  return h;
}

function generateSlots(startH: number, endH: number): string[] {
  const slots: string[] = [];
  for (let h = startH; h < endH; h++) {
    for (const m of [0, 30]) {
      const hour12 = h % 12 === 0 ? 12 : h % 12;
      const ampm = h < 12 ? 'AM' : 'PM';
      const mm = m === 0 ? '00' : '30';
      slots.push(`${hour12}:${mm} ${ampm}`);
    }
  }
  return slots;
}

export function parseAvailability(availability: string): ParsedAvailability {
  const raw = availability.replace(' PKT', '').trim();

  // Split on last comma before time: "Mon, Wed, Fri, 5pm–8pm"
  // Time part always contains "am" or "pm"
  const timeMatch = raw.match(/(\d+[ap]m[–-]\d+[ap]m)/i);
  const timePart = timeMatch ? timeMatch[1] : '9am–5pm';
  const dayPart = raw.replace(timePart, '').replace(/,\s*$/, '').trim();

  // Parse time range
  const timeSplit = timePart.split(/[–-]/);
  const startHour = parseTime12(timeSplit[0] ?? '9am');
  const endHour = parseTime12(timeSplit[1] ?? '5pm');

  // Parse days
  let allowedDays: number[] = [];
  const dayLower = dayPart.toLowerCase();

  // Check range shortcuts first
  for (const [range, days] of Object.entries(RANGE_MAP)) {
    if (dayLower.includes(range)) {
      allowedDays = days;
      break;
    }
  }

  // If no range found, parse individual days
  if (allowedDays.length === 0) {
    const tokens = dayLower.split(/[,&\s]+/).filter(Boolean);
    for (const token of tokens) {
      const normalized = token.replace(/[^a-z]/g, '');
      if (DAY_MAP[normalized] !== undefined) {
        allowedDays.push(DAY_MAP[normalized]);
      }
    }
  }

  // Deduplicate
  allowedDays = [...new Set(allowedDays)];

  const timeSlots = generateSlots(startHour, endHour);

  return { allowedDays, timeSlots, startHour, endHour, label: availability };
}

// Returns true if a given Date falls on one of the allowed weekdays
export function isDateAllowed(date: Date, allowedDays: number[]): boolean {
  return allowedDays.includes(date.getDay());
}

// Given a date string "YYYY-MM-DD", return whether it's allowed
export function isDateStringAllowed(dateStr: string, allowedDays: number[]): boolean {
  if (!dateStr) return false;
  // Parse as local date to avoid timezone shift
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return isDateAllowed(date, allowedDays);
}

// Get the next N available dates starting from today
export function getNextAvailableDates(allowedDays: number[], count = 30): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cursor = new Date(today);
  // Start from tomorrow
  cursor.setDate(cursor.getDate() + 1);

  while (dates.length < count) {
    if (allowedDays.includes(cursor.getDay())) {
      const y = cursor.getFullYear();
      const m = String(cursor.getMonth() + 1).padStart(2, '0');
      const d = String(cursor.getDate()).padStart(2, '0');
      dates.push(`${y}-${m}-${d}`);
    }
    cursor.setDate(cursor.getDate() + 1);
    // Safety: don't loop forever
    if (cursor.getFullYear() > today.getFullYear() + 1) break;
  }
  return dates;
}

// Format "YYYY-MM-DD" to readable "Mon, 14 Jul 2026"
export function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-PK', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
