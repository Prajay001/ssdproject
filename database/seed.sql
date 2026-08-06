-- VentureIQ AI Sample Seed Data
-- Run this in Supabase SQL Editor to populate sample analysis reports

INSERT INTO public.users (id, email, full_name, theme, ai_credits, plan_tier)
VALUES (
  'e2b4d9a1-8765-4321-9876-123456789abc',
  'founder@ventureiq.ai',
  'Alex Rivera',
  'dark',
  480,
  'Pro'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO public.projects (id, user_id, name, one_sentence_idea, industry, stage)
VALUES (
  'f1a3c5e7-1111-2222-3333-444455556666',
  'e2b4d9a1-8765-4321-9876-123456789abc',
  'DevPulse AI',
  'Automated AI code review and architectural health scoring for Next.js engineering teams.',
  'Developer Tools & AI',
  'Early Users'
) ON CONFLICT (id) DO NOTHING;
