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
  // Payment fields
  payment_status: 'Unpaid' | 'Pending Verification' | 'Verified' | 'Rejected';
  payment_txn_id: string;
  payment_screenshot_url: string;
  created_at: string;
  hr?: HR;
}

export type BookingStatus = 'Pending' | 'Contacted' | 'Scheduled' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Unpaid' | 'Pending Verification' | 'Verified' | 'Rejected';
