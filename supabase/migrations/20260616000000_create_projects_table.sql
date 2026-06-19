create table public.projects (
  id            uuid        primary key default gen_random_uuid(),
  created_at    timestamptz not null    default now(),
  name          text        not null,
  description   text,
  location      text,
  year          integer,
  type          text        check (type in ('architectural', 'interior', 'mixed')),
  cover_image   text,
  images        text[],
  show_homepage boolean     not null    default false,
  show_gallery  boolean     not null    default true,
  sort_order    integer                 default 0
);

alter table public.projects enable row level security;

-- anyone can read projects
create policy "projects_select_public"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- only authenticated users can write
create policy "projects_insert_authenticated"
  on public.projects
  for insert
  to authenticated
  with check (true);

create policy "projects_update_authenticated"
  on public.projects
  for update
  to authenticated
  using (true)
  with check (true);

create policy "projects_delete_authenticated"
  on public.projects
  for delete
  to authenticated
  using (true);
