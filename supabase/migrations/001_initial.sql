-- projects table
create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  tech text[],
  description text,
  image_url text,
  live_url text,
  github_url text,
  status text default 'draft',  -- 'published' | 'draft' | 'review'
  created_at timestamptz default now()
);

-- blog_posts table
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  content text,
  status text default 'draft',  -- 'published' | 'draft'
  views integer default 0,
  created_at timestamptz default now()
);

-- messages table (contact form)
create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text,
  created_at timestamptz default now()
);

-- RLS: public can read published projects and blog posts
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table messages enable row level security;

create policy "Public read published projects"
  on projects for select using (status = 'published');

create policy "Admin full access projects"
  on projects for all using (auth.role() = 'authenticated');

create policy "Public read published posts"
  on blog_posts for select using (status = 'published');

create policy "Admin full access posts"
  on blog_posts for all using (auth.role() = 'authenticated');

create policy "Insert messages anonymously"
  on messages for insert with check (true);

create policy "Admin read messages"
  on messages for select using (auth.role() = 'authenticated');

-- Storage Setup
insert into storage.buckets (id, name, public) 
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'project-images' );

create policy "Admin Full Access"
  on storage.objects for all
  using ( bucket_id = 'project-images' and auth.role() = 'authenticated' );

