-- NaijaVerse AI database schema
create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table if not exists worlds (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  title text not null,
  slug text unique not null,
  description text not null default '',
  prompt text not null default '',
  setting text not null default 'Future Africa',
  genre text not null default 'Adventure',
  tone text not null default 'Cinematic',
  cover_image_url text,
  status text not null default 'draft' check (status in ('draft','published')),
  is_public boolean not null default false,
  world_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists game_sessions (
  id uuid primary key default gen_random_uuid(),
  world_id uuid not null references worlds(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  current_scene text not null,
  game_state jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists game_choices (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references game_sessions(id) on delete cascade,
  scene_id text not null,
  choice_id text not null,
  choice_text text not null,
  created_at timestamptz not null default now()
);

create index if not exists worlds_public_idx on worlds(is_public, updated_at desc);
create index if not exists worlds_user_idx on worlds(user_id, updated_at desc);
create index if not exists sessions_world_idx on game_sessions(world_id, updated_at desc);
create index if not exists choices_session_idx on game_choices(session_id, created_at);

alter table profiles enable row level security;
alter table worlds enable row level security;
alter table game_sessions enable row level security;
alter table game_choices enable row level security;

create policy "Public worlds are viewable" on worlds for select using (is_public = true or auth.uid() = user_id);
create policy "Users manage their worlds" on worlds for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users view own sessions" on game_sessions for select using (auth.uid() = user_id);
create policy "Users create own sessions" on game_sessions for insert with check (auth.uid() = user_id);
create policy "Users update own sessions" on game_sessions for update using (auth.uid() = user_id);
create policy "Users view own choices" on game_choices for select using (exists (select 1 from game_sessions s where s.id = session_id and s.user_id = auth.uid()));
create policy "Users create own choices" on game_choices for insert with check (exists (select 1 from game_sessions s where s.id = session_id and s.user_id = auth.uid()));
