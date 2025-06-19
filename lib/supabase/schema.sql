-- profiles table
create table
  public.profiles (
    id uuid not null,
    updated_at timestamp with time zone null,
    username text null,
    full_name text null,
    avatar_url text null,
    website text null,
    role text null default 'editor'::text,
    constraint profiles_pkey primary key (id),
    constraint profiles_username_key unique (username),
    constraint username_length check ((char_length(username) >= 3))
  ) tablespace pg_default;

-- drafts table
create table
  public.drafts (
    id uuid not null default gen_random_uuid (),
    user_id uuid not null,
    title text null,
    content text null,
    channel text null,
    optimization_score integer null,
    status text null,
    updated_at timestamp with time zone null,
    created_at timestamp with time zone null default now(),
    constraint drafts_pkey primary key (id),
    constraint drafts_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
  ) tablespace pg_default;

-- draft_snapshots table
create table
  public.draft_snapshots (
    id uuid not null default gen_random_uuid (),
    draft_id uuid not null,
    title text null,
    content text null,
    channel text null,
    created_at timestamp with time zone null default now(),
    constraint draft_snapshots_pkey primary key (id),
    constraint draft_snapshots_draft_id_fkey foreign key (draft_id) references drafts (id) on delete cascade
  ) tablespace pg_default;

-- Function to create daily snapshots
create function public.create_daily_snapshot(p_draft_id uuid)
returns void as $$
begin
  -- Check if a snapshot was already created today for this draft
  if not exists (
    select 1
    from draft_snapshots
    where draft_id = p_draft_id
    and date(created_at) = date(now())
  ) then
    -- If not, create a new snapshot by copying from the drafts table
    insert into draft_snapshots (draft_id, title, content, channel)
    select id, title, content, channel
    from drafts
    where id = p_draft_id;
  end if;
end;
$$ language plpgsql;

-- Set up Row Level Security
alter table profiles enable row level security;
alter table drafts enable row level security;
alter table draft_snapshots enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

create policy "Users can view their own drafts." on drafts
  for select using (auth.uid() = user_id);

create policy "Users can insert their own drafts." on drafts
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own drafts." on drafts
  for update using (auth.uid() = user_id);

create policy "Users can delete their own drafts." on drafts
  for delete using (auth.uid() = user_id);

create policy "Users can view their own snapshots." on draft_snapshots
  for select using (auth.uid() = (select user_id from drafts where id = draft_snapshots.draft_id)); 