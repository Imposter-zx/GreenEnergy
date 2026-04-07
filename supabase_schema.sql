-- Supabase schema for GreenEnergy application
-- Equivalent to the Prisma schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table users (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  password text not null,
  role text default 'INDIVIDUAL',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profiles table
create table profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid unique not null references users(id) on delete cascade,
  name text,
  address text,
  bio text,
  location text,
  smart_meter_id text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Energy readings table
create table energy_readings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  amount double precision not null, -- kWh
  device_id text,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Budgets table
create table budgets (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  limit double precision not null,
  period text not null, -- "Daily", "Monthly"
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Alerts table
create table alerts (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  type text not null, -- "ANOMALY", "BUDGET_EXCEEDED"
  message text not null,
  seen boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Recommendations table
create table recommendations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references users(id) on delete cascade,
  content text not null,
  impact_score double precision not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for better performance
create index idx_energy_readings_user_id on energy_readings(user_id);
create index idx_energy_readings_timestamp on energy_readings(timestamp);
create index idx_alerts_user_id on alerts(user_id);
create index idx_alerts_seen on alerts(seen);
create index idx_budgets_user_id on budgets(user_id);
create index idx_profiles_user_id on profiles(user_id);
create index idx_recommendations_user_id on recommendations(user_id);

-- Enable real-time for all tables (optional, but useful for real-time features)
alter publication supabase_realtime add table users;
alter publication supabase_realtime add table profiles;
alter publication supabase_realtime add table energy_readings;
alter publication supabase_realtime add table budgets;
alter publication supabase_realtime add table alerts;
alter publication supabase_realtime add table recommendations;