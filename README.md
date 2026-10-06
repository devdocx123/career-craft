# CareerCraft

An AI & HR mock interview platform connecting Pakistani students and fresh graduates with industry HR professionals for one-on-one mock interview sessions.

---

## 📌 Project Overview

CareerCraft is a full-stack web application designed to bridge the gap between job seekers and industry expectations. Users can explore available HR mentors across multiple domains, track real-time analytics via a interactive dashboard, and book structured 1-on-1 mock interview sessions starting at accessible price points.

---

## 🛠️ Key Technical Highlights

* Full-Stack Architecture: Built with Next.js (App Router), TypeScript, and Tailwind CSS for responsive, modern UI performance.
* Backend & Data Management: Integrated Supabase for seamless database operations, user authentication, and real-time visitor counter tracking.
* Dynamic Dashboard: Interactive interface allowing candidates to browse top mentors across 5+ industry domains and book mock interview slots.
* Production Deployment: Fully configured and deployed on Vercel with automated continuous delivery (CI/CD).

---

## 📁 Project Structure

├── app/                # Next.js App Router pages and layouts
├── components/         # Reusable React UI components
├── lib/                # Utility functions, Supabase client configuration
├── public/             # Static assets and icons
├── supabase/           # Supabase schemas and migration scripts
├── types/              # TypeScript type definitions
├── next.config.ts      # Next.js configuration settings
├── tailwind.config.ts  # Tailwind CSS theme and styling rules
└── tsconfig.json       # TypeScript configuration

---

## 🚀 Tech Stack

* Framework: Next.js 14+ (React / TypeScript)
* Styling: Tailwind CSS, PostCSS
* Database & Auth: Supabase
* Hosting & Deployment: Vercel

---

## ⚡ Quickstart Guide

1. Clone the Repository:
   git clone https://github.com/devdocx123/careercraft.git
   cd careercraft

2. Install Dependencies:
   npm install

3. Configure Environment Variables:
   Create a .env.local file in the root directory and add your Supabase credentials:
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run the Development Server:
   npm run dev

Open [http://localhost:3000](https://career-craft-black.vercel.app/)  to see the result.
