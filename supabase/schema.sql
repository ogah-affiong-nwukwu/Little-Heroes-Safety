-- Little Heroes Academy — Supabase schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL → New query).
-- Stores each child's progress (completed lessons) per parent account.
-- No child names, photos, or other personal details are collected.

create table if not exists public.progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null check (lesson_id in ('magic', 'clean', 'friends', 'stranger', 'emergency')),
  earned_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

alter table public.progress enable row level security;

drop policy if exists "parents select own progress" on public.progress;
create policy "parents select own progress"
  on public.progress for select
  using (auth.uid() = user_id);

drop policy if exists "parents insert own progress" on public.progress;
create policy "parents insert own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "parents update own progress" on public.progress;
create policy "parents update own progress"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "parents delete own progress" on public.progress;
create policy "parents delete own progress"
  on public.progress for delete
  using (auth.uid() = user_id);
