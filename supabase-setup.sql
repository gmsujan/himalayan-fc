-- ============================================
-- Himalayan FC — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Player Registrations
create table if not exists registrations (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  phone text,
  age int,
  position text,
  preferred_team text,
  experience text,
  notes text,
  created_at timestamp with time zone default now()
);

-- 2. Contact Form Submissions
create table if not exists contacts (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamp with time zone default now()
);

-- 3. Fixtures / Match Schedule
create table if not exists fixtures (
  id uuid default gen_random_uuid() primary key,
  home_team text not null,
  away_team text not null,
  match_date timestamp with time zone not null,
  venue text,
  competition text default 'Hamilton League',
  home_score int,
  away_score int,
  status text default 'upcoming', -- upcoming | completed | cancelled
  created_at timestamp with time zone default now()
);

-- 4. News Articles
create table if not exists news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  image_url text,
  category text default 'Club News',
  published_at timestamp with time zone default now()
);

-- 5. Gallery Images (optional — link to uploaded images)
create table if not exists gallery (
  id uuid default gen_random_uuid() primary key,
  url text not null,
  caption text,
  category text,
  created_at timestamp with time zone default now()
);

-- ============================================
-- Row Level Security (RLS) — Enable for safety
-- ============================================

-- Enable RLS on all tables
alter table registrations enable row level security;
alter table contacts enable row level security;
alter table fixtures enable row level security;
alter table news enable row level security;
alter table gallery enable row level security;

-- Allow public read on fixtures, news, gallery
create policy "Public can read fixtures" on fixtures for select using (true);
create policy "Public can read news" on news for select using (true);
create policy "Public can read gallery" on gallery for select using (true);

-- Allow public INSERT on registrations and contacts (forms)
create policy "Public can insert registrations" on registrations for insert with check (true);
create policy "Public can insert contacts" on contacts for insert with check (true);

-- Allow all operations for service role (admin)
-- These are automatically granted to service_role

-- ============================================
-- Sample Data (optional — delete if not needed)
-- ============================================

insert into news (title, content, category, published_at) values
  ('Himalayan FC Officially Founded!', 'We are thrilled to announce the official founding of Himalayan FC in Hamilton, New Zealand. This club is the result of months of hard work by a passionate group of individuals who share a love for football and community.', 'Club News', now() - interval '3 months'),
  ('Player Registrations Now Open', 'Registration for the 2025 football season is now open! We are looking for players of all ages and abilities to join our teams.', 'Registrations', now() - interval '1 month'),
  ('Himalayan FC Joins Hamilton Local League', 'We are proud to confirm that Himalayan FC will compete in the Hamilton local football league for the 2025 season.', 'Club News', now() - interval '2 weeks');

insert into fixtures (home_team, away_team, match_date, venue, competition, status) values
  ('Himalayan FC', 'Hamilton AFC', now() + interval '3 weeks', 'Porritt Stadium', 'Hamilton League', 'upcoming'),
  ('Waikato United', 'Himalayan FC', now() + interval '5 weeks', 'FMG Stadium', 'Hamilton League', 'upcoming');
