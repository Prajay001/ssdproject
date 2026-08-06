-- VentureIQ AI PostgreSQL Database Schema for Supabase
-- Run this migration script in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  theme TEXT DEFAULT 'dark',
  ai_credits INT DEFAULT 500,
  custom_openai_key TEXT,
  notifications_enabled BOOLEAN DEFAULT true,
  plan_tier TEXT DEFAULT 'Pro',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  one_sentence_idea TEXT NOT NULL,
  industry TEXT,
  stage TEXT DEFAULT 'Idea',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Startup Ideas Table
CREATE TABLE IF NOT EXISTS public.startup_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  one_sentence_idea TEXT NOT NULL,
  problem TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  country TEXT NOT NULL,
  stage TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Analysis Reports Table
CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  startup_name TEXT NOT NULL,
  overall_score INT NOT NULL DEFAULT 75,
  status TEXT NOT NULL DEFAULT 'completed',
  report_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Market Analysis Table
CREATE TABLE IF NOT EXISTS public.market_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  tam_amount NUMERIC(15,2),
  sam_amount NUMERIC(15,2),
  som_amount NUMERIC(15,2),
  tam_label TEXT,
  sam_label TEXT,
  som_label TEXT,
  currency TEXT DEFAULT 'USD',
  industry TEXT,
  cagr_growth TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Competitors Table
CREATE TABLE IF NOT EXISTS public.competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('Direct', 'Indirect')),
  strengths TEXT[],
  weaknesses TEXT[],
  pricing TEXT,
  target_audience TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SWOT Analysis Table
CREATE TABLE IF NOT EXISTS public.swot (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  strengths TEXT[],
  weaknesses TEXT[],
  opportunities TEXT[],
  threats TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Revenue Models Table
CREATE TABLE IF NOT EXISTS public.revenue_models (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  model_type TEXT NOT NULL,
  rank INT NOT NULL,
  description TEXT,
  pros TEXT[],
  cons TEXT[],
  estimated_arpu TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Business Model Canvas Table
CREATE TABLE IF NOT EXISTS public.business_canvas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  key_partners TEXT[],
  key_activities TEXT[],
  key_resources TEXT[],
  value_propositions TEXT[],
  customer_relationships TEXT[],
  channels TEXT[],
  customer_segments TEXT[],
  cost_structure TEXT[],
  revenue_streams TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Investor Scores Table
CREATE TABLE IF NOT EXISTS public.investor_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  score INT NOT NULL,
  tier TEXT NOT NULL,
  summary TEXT,
  deduction_breakdown JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. History Table
CREATE TABLE IF NOT EXISTS public.history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  report_id UUID REFERENCES public.reports(id) ON DELETE SET NULL,
  action_type TEXT NOT NULL, -- 'Created', 'Renamed', 'Duplicated', 'Deleted', 'Exported'
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_project_id ON public.reports(project_id);
CREATE INDEX IF NOT EXISTS idx_history_user_id ON public.history(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history ENABLE ROW LEVEL SECURITY;

-- Allow public / anon read & insert for demo testing environment
CREATE POLICY "Allow read access to authenticated or anon" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow insert/update for anon demo" ON public.users FOR ALL USING (true);
CREATE POLICY "Allow all on projects" ON public.projects FOR ALL USING (true);
CREATE POLICY "Allow all on reports" ON public.reports FOR ALL USING (true);
CREATE POLICY "Allow all on history" ON public.history FOR ALL USING (true);
