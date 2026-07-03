import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
              <Image src="/logo.jpeg" alt="CareerCraft Logo" width={32} height={32} className="w-full h-full object-contain" />
            </div>
            <span className="text-white font-bold text-lg">CareerCraft</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Bridging the gap between academic education and workforce requirements for students and fresh graduates across Pakistan.
          </p>
          <p className="text-xs mt-4 text-slate-500">© 2026 CareerCraft. All rights reserved.</p>
        </div>

        {/* Platform */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
            <li><Link href="/interviews" className="hover:text-white transition-colors">Mock Interviews</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/admin" className="hover:text-white transition-colors">Admin</Link></li>
          </ul>
        </div>

        {/* Coming Soon */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4">Coming Soon</h4>
          <ul className="space-y-2 text-sm">
            <li className="opacity-50">ATS Resume Checker</li>
            <li className="opacity-50">Resume Builder</li>
            <li className="opacity-50">AI Career Coach</li>
            <li className="opacity-50">Career Roadmap</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
