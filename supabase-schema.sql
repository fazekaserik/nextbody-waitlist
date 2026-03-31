-- Run this in your Supabase SQL editor to create the waitlist table

create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  goal text not null check (goal in ('fat_loss', 'muscle_gain')),
  gender text not null check (gender in ('male', 'female')),
  created_at timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.waitlist enable row level security;

-- Allow inserts from anon (the frontend)
create policy "Allow anon inserts" on public.waitlist
  for insert to anon
  with check (true);

-- Allow reading count from anon
create policy "Allow anon count" on public.waitlist
  for select to anon
  using (true);
