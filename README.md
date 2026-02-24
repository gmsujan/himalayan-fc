# 🏔️ Himalayan FC Website

**Hamilton, New Zealand · Est. 2024**

A modern, fully functional football club website built with Next.js, Supabase, and Tailwind CSS.

---

## 📋 Features

- ✅ Home page with hero, stats, fixture preview, and CTA
- ✅ About page — club story and values
- ✅ Teams page — Men's, Women's, Youth
- ✅ Fixtures & Results — live from Supabase
- ✅ News/Blog — managed from admin panel
- ✅ Photo Gallery — with lightbox and category filter
- ✅ Contact form — emails via Formspree
- ✅ Player Registration form — saves to Supabase
- ✅ Admin Dashboard — manage registrations, messages, fixtures, news
- ✅ Fully responsive (mobile + desktop)
- ✅ SEO optimised

---

## 🚀 DEPLOYMENT GUIDE (Step by Step)

### STEP 1 — Copy the Logo

Put your `HimalayanFC-LOGO.png` file into the `/public` folder and rename it to `logo.png`.

```
himalayan-fc-website/
└── public/
    └── logo.png   ← Your logo goes here
```

### STEP 2 — Install Dependencies

Open Terminal in the project folder and run:

```bash
npm install
```

### STEP 3 — Set Up Supabase

1. Go to [supabase.com](https://supabase.com) → create a free account
2. Click **New Project** → name it `himalayan-fc`
3. Go to **SQL Editor** → paste the contents of `supabase-setup.sql` → click Run
4. Go to **Settings → API** → copy your:
   - Project URL
   - anon public key

### STEP 4 — Set Up Formspree (Contact Form Emails)

1. Go to [formspree.io](https://formspree.io) → create free account
2. Click **New Form** → name it "Himalayan FC Contact"
3. Copy the form ID (e.g., `xpzvwkrb`)
4. Create a second form for registrations, copy that ID too

### STEP 5 — Create Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_FORMSPREE_ID=your-contact-form-id
NEXT_PUBLIC_FORMSPREE_REGISTER_ID=your-register-form-id
NEXT_PUBLIC_ADMIN_PASSWORD=choose-a-strong-password
```

### STEP 6 — Test Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. ✅

### STEP 7 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial Himalayan FC website"
```

Create a repo at [github.com/new](https://github.com/new), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/himalayan-fc-website.git
git branch -M main
git push -u origin main
```

### STEP 8 — Deploy to Vercel (Free)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **Add New Project** → Import your `himalayan-fc-website` repo
3. Before clicking Deploy, click **Environment Variables** and add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_FORMSPREE_ID`
   - `NEXT_PUBLIC_FORMSPREE_REGISTER_ID`
   - `NEXT_PUBLIC_ADMIN_PASSWORD`
4. Click **Deploy** 🎉

Your site will be live at: `himalayan-fc-website.vercel.app`

---

## 🔐 Admin Panel

Access the admin dashboard at: `/admin`

Default password: `himalayan2024` (**change this in your .env.local!**)

From the admin panel you can:
- View all player registrations
- Read contact form messages
- Add/delete fixtures and match results
- Publish and delete news articles

---

## 📁 Project Structure

```
himalayan-fc-website/
├── app/
│   ├── page.js          → Home page
│   ├── about/page.js    → About page
│   ├── teams/page.js    → Teams page
│   ├── fixtures/page.js → Fixtures & Results
│   ├── news/page.js     → News/Blog
│   ├── gallery/page.js  → Photo Gallery
│   ├── contact/page.js  → Contact form
│   ├── register/page.js → Player registration
│   └── admin/page.js    → Admin dashboard
├── components/
│   ├── Navbar.js
│   └── Footer.js
├── lib/
│   └── supabase.js      → Supabase client
├── public/
│   └── logo.png         ← PUT YOUR LOGO HERE
├── supabase-setup.sql   → Database setup
└── .env.local.example   → Environment variables template
```

---

## 🛠️ Tech Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Next.js 14 | Framework | Free |
| Tailwind CSS | Styling | Free |
| Supabase | Database + Backend | Free (up to 500MB) |
| Formspree | Form emails | Free (50/month) |
| Vercel | Hosting | Free |
| GitHub | Code storage | Free |

**Total cost: $0/month** ✅

---

## 🆘 Troubleshooting

**Images not showing?** → Make sure `logo.png` is in the `/public` folder

**Forms not submitting?** → Check your `.env.local` has the correct Formspree IDs

**Admin not working?** → Make sure Supabase is set up and `.env.local` has correct keys

**Deployment failing?** → Make sure all environment variables are added in Vercel settings

---

## 📧 Support

If you need help, contact your developer or post an issue on GitHub.

**Himalayan FC · Hamilton, New Zealand · Est. 2024** 🏔️⚽
