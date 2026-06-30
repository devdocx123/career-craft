export interface HR {
  id: string;
  name: string;
  photo: string;
  company: string;
  position: string;
  experience: number;
  skills: string[];
  bio: string;
  education: string;
  languages: string[];
  interview_domains: string[];
  availability: string;
}

export interface Booking {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  preferred_domain: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  hr_id: string;
  status: 'Pending' | 'Contacted' | 'Scheduled' | 'Completed' | 'Cancelled';
  created_at: string;
  hr?: HR;
}

export type BookingStatus = 'Pending' | 'Contacted' | 'Scheduled' | 'Completed' | 'Cancelled';
