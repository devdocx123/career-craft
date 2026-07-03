import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VisitorCounter from '@/components/VisitorCounter';

export const metadata: Metadata = {
  title: 'CareerCraft – Career Help for Youth',
  description:
    'CareerCraft is a centralized career-support platform helping Pakistani students and fresh graduates through mock interviews, career guidance, and job readiness tools.',
  icons: {
    icon: [
      { url: '/logo.jpeg', type: 'image/jpeg' },
    ],
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <VisitorCounter />
      </body>
    </html>
  );
}
