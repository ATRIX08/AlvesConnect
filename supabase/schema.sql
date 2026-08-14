create extension if not exists pgcrypto;

create table if not exists public.site_content (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.site_links (
  type text primary key,
  url text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  url text not null,
  position integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null default '',
  phone text not null,
  service text not null,
  investment_range text not null,
  start_timeline text not null,
  message text not null default '',
  status text not null default 'Novo'
    check (status in ('Novo', 'Em contato', 'Proposta enviada', 'Fechado', 'Perdido')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at
before update on public.site_content
for each row execute function public.set_updated_at();

drop trigger if exists site_links_set_updated_at on public.site_links;
create trigger site_links_set_updated_at
before update on public.site_links
for each row execute function public.set_updated_at();

drop trigger if exists videos_set_updated_at on public.videos;
create trigger videos_set_updated_at
before update on public.videos
for each row execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

alter table public.site_content enable row level security;
alter table public.site_links enable row level security;
alter table public.videos enable row level security;
alter table public.leads enable row level security;

drop policy if exists "Public can read site content" on public.site_content;
create policy "Public can read site content"
on public.site_content for select
using (true);

drop policy if exists "Public can read links" on public.site_links;
create policy "Public can read links"
on public.site_links for select
using (true);

drop policy if exists "Public can read active videos" on public.videos;
create policy "Public can read active videos"
on public.videos for select
using (active = true);

drop policy if exists "Service role manages leads" on public.leads;
create policy "Service role manages leads"
on public.leads
for all
to service_role
using (true)
with check (true);

grant select, insert, update, delete on public.leads to service_role;
