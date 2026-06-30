-- CareerCraft Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "pgcrypto";

-- ─── HRS TABLE ───────────────────────────────────────────────────────────────
create table if not exists hrs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  photo text not null,
  company text not null,
  position text not null,
  experience integer not null default 0,
  skills text[] not null default '{}',
  bio text not null default '',
  education text not null default '',
  languages text[] not null default '{}',
  interview_domains text[] not null default '{}',
  availability text not null default '',
  created_at timestamptz default now()
);

-- ─── BOOKINGS TABLE ──────────────────────────────────────────────────────────
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  email text not null,
  phone text not null,
  college text not null,
  degree text not null,
  branch text not null,
  year text not null,
  preferred_domain text not null,
  preferred_date text not null,
  preferred_time text not null,
  notes text default '',
  hr_id uuid references hrs(id) on delete set null,
  status text not null default 'Pending' check (status in ('Pending', 'Contacted', 'Scheduled', 'Completed', 'Cancelled')),
  -- Payment fields
  payment_status text not null default 'Unpaid' check (payment_status in ('Unpaid', 'Pending Verification', 'Verified', 'Rejected')),
  payment_txn_id text default '',
  payment_screenshot_url text default '',
  created_at timestamptz default now()
);

-- ─── RLS POLICIES ─────────────────────────────────────────────────────────────
-- Allow public read on hrs
alter table hrs enable row level security;
create policy "Allow public read hrs" on hrs for select using (true);

-- Allow public insert/read on bookings (no auth for MVP)
alter table bookings enable row level security;
create policy "Allow public insert bookings" on bookings for insert with check (true);
create policy "Allow public read bookings" on bookings for select using (true);
create policy "Allow public update bookings" on bookings for update using (true);
create policy "Allow public delete bookings" on bookings for delete using (true);

-- ─── SAMPLE HR DATA ───────────────────────────────────────────────────────────
insert into hrs (name, photo, company, position, experience, skills, bio, education, languages, interview_domains, availability) values
(
  'Ayesha Malik',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'Systems Limited',
  'Senior HR Manager',
  9,
  array['Talent Acquisition', 'Behavioral Interviewing', 'Campus Recruitment', 'Onboarding'],
  'Ayesha has over 9 years of experience in HR, specializing in technology sector recruitment. She has helped 300+ fresh graduates land their first jobs and is passionate about bridging the gap between academia and industry.',
  'MBA (HRM) – IBA Karachi',
  array['English', 'Urdu'],
  array['Software Engineering', 'Data Science', 'Business Analysis', 'Product Management'],
  'Mon–Fri, 10am–4pm PKT'
),
(
  'Usman Tariq',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'Netsol Technologies',
  'Head of Talent',
  12,
  array['Technical Interviews', 'Leadership Assessment', 'Culture Fit', 'Employer Branding'],
  'Usman leads talent acquisition at Netsol Technologies and has personally interviewed over 1000 candidates. He specializes in technical roles and loves helping engineers prepare for whiteboard-style interviews.',
  'BS Computer Science – FAST-NUCES',
  array['English', 'Urdu', 'Punjabi'],
  array['Software Engineering', 'DevOps', 'Cloud Computing', 'Cybersecurity'],
  'Tue & Thu, 2pm–6pm PKT'
),
(
  'Sana Rizvi',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'Telenor Pakistan',
  'HR Business Partner',
  7,
  array['Career Counseling', 'Competency Mapping', 'Graduate Programs', 'Interview Coaching'],
  'Sana is an HRBP at Telenor with deep expertise in graduate hiring programs. She regularly mentors students through structured interview preparation and career path planning sessions.',
  'MS HRM – LUMS',
  array['English', 'Urdu'],
  array['Marketing', 'Finance', 'Human Resources', 'Operations'],
  'Wed & Fri, 11am–3pm PKT'
),
(
  'Bilal Chaudhry',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'Arbisoft',
  'Engineering Recruiter',
  5,
  array['Technical Screening', 'React', 'Node.js', 'System Design'],
  'Bilal focuses on engineering recruitment at Arbisoft, one of Pakistan''s top software companies. He offers mock technical interviews including coding challenges and system design discussions for aspiring engineers.',
  'BS Software Engineering – UET Lahore',
  array['English', 'Urdu'],
  array['Frontend Development', 'Backend Development', 'Full Stack', 'Mobile Development'],
  'Mon, Wed, Fri, 5pm–8pm PKT'
),
(
  'Fatima Zahra',
  'https://randomuser.me/api/portraits/women/26.jpg',
  'HBL',
  'Talent Acquisition Lead',
  10,
  array['Banking Interviews', 'Case Interviews', 'Psychometric Testing', 'Group Discussions'],
  'Fatima leads graduate hiring at HBL and has an exceptional track record of preparing candidates for structured banking and finance interviews. She is well-versed in HBL''s Management Trainee Officer program.',
  'MBA Finance – SZABIST',
  array['English', 'Urdu', 'Sindhi'],
  array['Banking', 'Finance', 'Accounting', 'Investment'],
  'Sat, 10am–2pm PKT'
),
(
  'Omar Sheikh',
  'https://randomuser.me/api/portraits/men/54.jpg',
  'Unilever Pakistan',
  'Senior Recruiter',
  8,
  array['Case Studies', 'FMCG Interviews', 'Leadership Competencies', 'Assessment Centers'],
  'Omar recruits top talent for Unilever Pakistan and has conducted 500+ interviews for FMCG roles. He specializes in preparing candidates for competency-based interviews and structured assessment centers.',
  'BBA Marketing – IBA Karachi',
  array['English', 'Urdu'],
  array['Marketing', 'Supply Chain', 'Sales', 'General Management'],
  'Mon–Wed, 6pm–9pm PKT'
);

-- ─── MIGRATION: Add payment columns to existing bookings table ────────────────
-- Run this if your bookings table already exists:
-- alter table bookings add column if not exists payment_status text not null default 'Unpaid' check (payment_status in ('Unpaid', 'Pending Verification', 'Verified', 'Rejected'));
-- alter table bookings add column if not exists payment_txn_id text default '';
-- alter table bookings add column if not exists payment_screenshot_url text default '';
