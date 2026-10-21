# VentureIQ AI - Institutional Startup Validation & Due Diligence SaaS

VentureIQ AI is a modern SaaS web application designed to evaluate and validate startup ideas using institutional venture capital frameworks and AI models. Styled with inspiration from **Linear, Stripe Dashboard, Vercel, Notion AI, and Lovable**, VentureIQ delivers high-density strategic intelligence for founders, venture capital incubators, and product leaders.

---

## Key Product Features

### 1. 7-Step Interactive Analysis Wizard
- **Step 1:** Startup Name & Brand Identity
- **Step 2:** One-Sentence Value Proposition
- **Step 3:** Problem Statement & Inefficiencies
- **Step 4:** Target Customer Audience & Buyer Personas
- **Step 5:** Target Country / Geographic Market Region
- **Step 6:** Business Stage (Idea, MVP, Early Users, Growing)
- **Step 7:** Neural AI Generation experience with telemetry progress indicators.

### 2. 15 Comprehensive Institutional Analysis Modules
1. **Executive Summary**: Pitch, core value proposition, key differentiator, tagline, and mission.
2. **Problem Analysis**: Problem severity rating (1-10), affected segments, workarounds, and cost of inaction.
3. **Market Opportunity**: Industry CAGR growth, demand drivers, challenges, and 5-year outlook.
4. **Competitor Matrix**: Direct vs indirect competitors, strengths, weaknesses, pricing, and target audience comparison cards.
5. **SWOT Analysis**: Interactive 4-quadrant grid (Strengths, Weaknesses, Opportunities, Threats).
6. **Revenue Models**: Ranked monetization models with ARPU estimates, pros, and cons.
7. **TAM / SAM / SOM**: Interactive Recharts animated bar & pie chart market sizing.
8. **Customer Personas**: Detailed buyer profiles with age, occupation, pain points, goals, and quote.
9. **Business Model Canvas**: Interactive, editable 9-section strategic grid.
10. **Go-To-Market Strategy**: Launch timeline, marketing channels with expected ROI, and growth loops.
11. **Investor Readiness Score**: 0-100 radial score indicator with deduction breakdown and recommendations.
12. **Risk Analysis**: Traffic-light indicators (Green/Amber/Red) for Technical, Financial, Legal, Market, and Execution risks.
13. **Feature Roadmap**: 4-phase milestone timeline.
14. **Elevator Pitch & Pitch Deck**: 30s, 1m, and 5m speeches + 10-slide interactive presentation viewer.
15. **Unit Economics & 24-Month Financial Sandbox**: Interactive pro-forma financial simulation with real-time sliders for ARPU, CAC, Monthly Churn, Headcount OpEx, LTV:CAC sensitivity ratios, CAC payback period, and cash-flow breakeven chart.

### 3. Interactive AI Venture Partner Co-Pilot
- Real-time in-report conversational due diligence assistant.
- One-click triggers for **Y Combinator Partner Interview Grill Sessions**, **Competitive Moat Stress-Testing**, and **High-Conversion Enterprise Cold Outbound Pitch Generation**.

### 4. Startup Comparison & Benchmarking Studio (`/compare`)
- Head-to-head comparison tool for two or more evaluated ideas.
- Multi-axis Recharts Polar Radar Chart comparing Overall Score, Market TAM ($B), Problem Severity, Investor Interest, and GTM Velocity.
- Institutional VC Verdict determining superior risk-adjusted return profiles.

### 5. Multi-Format Export Studio
- **PDF Print Deck**: Formatted print styling optimized for slide decks and multi-page investor briefs.
- **CSV Data Table**: Raw spreadsheet data export of key quantitative due diligence metrics.
- **Markdown Export**: Clean `.md` files ready for GitHub, Obsidian, or Notion import.
- **Structured JSON Export**: Complete raw JSON payload for programmatic workflows and APIs.

### 6. Global Productivity & Modern UX
- **Public SaaS Landing Page**: Modern dark-mode showcase with live interactive idea score calculator demo, 15 modules grid, pricing plans, and testimonials.
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Keyboard-driven navigation across reports, compare studio, settings, and wizard.
- **Pitch Deck Presentation Studio**: Fullscreen presentation HUD, live stopwatch timer, and founder speaker notes drawer.
- **Dark & Light Mode**: Fluid `next-themes` toggle with glassmorphism CSS variables and glowing borders.
- **AI Credit Management**: Metered AI credit usage tracking and plan tiers (Starter, Pro, Syndicate).
- **History & Audit Logs**: Detailed audit trail for report creations, updates, duplicates, and deletions.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Glassmorphism design tokens + Framer Motion animations
- **Database**: Supabase PostgreSQL + Migration DDL (`database/schema.sql`)
- **State & Data**: TanStack Query + Supabase JS Client + LocalStorage Fallback
- **Charts**: Recharts (ComposedChart, Area, Bar, Line, RadarChart, PieChart)
- **AI Engine**: OpenAI API (`gpt-4o`) + Quantitative Analytical Fallback Generator
- **Deployment Target**: Netlify (`netlify.toml` + `@netlify/plugin-nextjs`)

---

## Database Migration Setup

Run the SQL migration script located in [`database/schema.sql`](file:///c:/Users/jayzp/Pictures/FOUNDRY/database/schema.sql) in your Supabase SQL Editor to provision the 11 core tables:
`users`, `projects`, `reports`, `startup_ideas`, `competitors`, `swot`, `revenue_models`, `business_canvas`, `market_analysis`, `investor_scores`, `history`.

Optionally run [`database/seed.sql`](file:///c:/Users/jayzp/Pictures/FOUNDRY/database/seed.sql) to seed realistic sample startup reports.

---

## Getting Started Locally

```bash
# Install dependencies
npm install

# Run dev server with Turbo
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to launch VentureIQ AI.
