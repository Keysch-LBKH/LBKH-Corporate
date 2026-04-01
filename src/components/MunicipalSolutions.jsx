import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, X, FileText, Users, Radio,
  ShieldCheck, Search, BarChart3, MessageSquare,
  BookOpen, Mic, ChevronDown, CheckCircle, AlertTriangle,
  Clock, TrendingUp, Lock, Eye
} from 'lucide-react';

const VIDEO_ID = 'g7l-EVG6S4Q';
const QUIZ_URL = '/quiz';

/* ── Reusable mode mock-up panel ── */
function ModeMockup({ mode }) {
  if (mode === 'developer') {
    return (
      <div className="rounded-xl overflow-hidden border border-smokyTeal/30 bg-black/60 text-left text-xs font-mono">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-smokyTeal/20 bg-smokyTeal/5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-gray-500 text-[10px] uppercase tracking-widest">Project Settings — Source Data</span>
        </div>
        <div className="p-4 space-y-2">
          {[
            { icon: FileText, name: 'Downtown_Corridor_EIS.pdf', tag: 'SOURCE', color: 'text-cyanGlow' },
            { icon: FileText, name: 'DEQ_Permit_2024-0042.pdf', tag: 'SOURCE', color: 'text-cyanGlow' },
            { icon: FileText, name: 'NEPA_Benchmark_Federal.pdf', tag: 'BENCHMARK', color: 'text-smokyTeal' },
            { icon: FileText, name: 'Community_Noise_Study.pdf', tag: 'SOURCE', color: 'text-cyanGlow' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/3 border border-white/5 hover:border-smokyTeal/30 transition-colors">
              <f.icon className={`w-3.5 h-3.5 shrink-0 ${f.color}`} />
              <span className="text-gray-300 flex-1 truncate">{f.name}</span>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${f.tag === 'SOURCE' ? 'border-cyanGlow/40 text-cyanGlow' : 'border-smokyTeal/40 text-smokyTeal'}`}>{f.tag}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-3 p-2 rounded-lg border border-dashed border-orange-500/40 bg-orange-500/5">
            <Lock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-orange-400/80">PII Scan ready — 3 items flagged for review</span>
          </div>
        </div>
      </div>
    );
  }
  if (mode === 'portal') {
    return (
      <div className="rounded-xl overflow-hidden border border-smokyTeal/30 bg-black/60 text-left text-xs font-mono">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-smokyTeal/20 bg-smokyTeal/5">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-gray-500 text-[10px] uppercase tracking-widest">Public Portal — Constituent Chat</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-[8px] text-gray-400">R</div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 max-w-[85%]">
              Will the new transit line affect parking on 5th Ave?
            </div>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <div className="w-6 h-6 rounded-full bg-cyanGlow/20 border border-cyanGlow/40 shrink-0 flex items-center justify-center text-[8px] text-cyanGlow">L</div>
            <div className="bg-smokyTeal/10 border border-smokyTeal/30 rounded-lg px-3 py-2 text-gray-200 max-w-[85%]">
              Based on the Downtown Corridor EIS (Section 4.2), parking on 5th Ave between Main and Broadway will be reduced by 12 spaces during Phase 1 construction, with a temporary lot available at City Garage B. <span className="text-cyanGlow cursor-pointer">[¹]</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-[8px] text-gray-400">R</div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 max-w-[85%]">
              What's the noise mitigation plan?
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-7 rounded-lg bg-white/5 border border-white/10 px-3 flex items-center">
              <span className="text-gray-600 text-[10px]">Ask a question about this project...</span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-cyanGlow/20 border border-cyanGlow/40 flex items-center justify-center">
              <ArrowRight className="w-3 h-3 text-cyanGlow" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (mode === 'live') {
    return (
      <div className="rounded-xl overflow-hidden border border-smokyTeal/30 bg-black/60 text-left text-xs font-mono">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-smokyTeal/20 bg-smokyTeal/5">
          <div className="w-2 h-2 rounded-full bg-red-500/70 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-gray-500 text-[10px] uppercase tracking-widest">Live Event — Executive Briefing</span>
          <span className="ml-auto text-red-400 text-[9px] font-bold animate-pulse">● LIVE</span>
        </div>
        <div className="p-4 space-y-2">
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {[
              { label: 'Traffic', count: 8, color: '#00e5cc' },
              { label: 'Noise', count: 5, color: '#a78bfa' },
              { label: 'Timeline', count: 4, color: '#f59e0b' },
              { label: 'Budget', count: 3, color: '#34d399' },
              { label: 'Access', count: 2, color: '#f87171' },
              { label: 'Other', count: 3, color: '#6b7280' },
            ].map((t, i) => (
              <div key={i} className="rounded-lg p-1.5 text-center" style={{ background: `${t.color}15`, border: `1px solid ${t.color}40` }}>
                <div className="text-[11px] font-bold" style={{ color: t.color }}>{t.count}</div>
                <div className="text-[9px] text-gray-500">{t.label}</div>
              </div>
            ))}
          </div>
          <div className="border border-cyanGlow/30 rounded-lg p-2 bg-cyanGlow/5">
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Selected Question</div>
            <div className="text-gray-300 text-[10px] mb-2">"When will the Main St closure end?"</div>
            <div className="text-[9px] text-gray-500 uppercase tracking-widest mb-1">Briefing Note</div>
            <div className="text-cyanGlow/80 text-[10px]">Per Schedule B: Main St reopens Phase 1 end, est. Q3 2025. Detour via Oak Ave remains active.</div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default function MunicipalSolutions() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('developer');

  return (
    <div className="min-h-screen bg-carbon text-gray-100 flex flex-col relative overflow-hidden">

      {/* ── Global background glows ── */}
      <div className="fixed top-0 right-0 w-[700px] h-[700px] bg-smokyTeal/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-cyanGlow/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Header ── */}
      <header className="z-10 py-5 px-8 border-b border-smokyTeal/20 flex items-center justify-between sticky top-0 bg-carbon/80 backdrop-blur-md">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="LBKH Solutions" className="h-7 w-auto opacity-90" />
          <span className="text-sm text-gray-500 hidden sm:block">LBKH Solutions</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link to="/industrial" className="text-sm text-gray-500 hover:text-cyanGlow transition-colors hidden md:block">Industrial</Link>
          <button
            onClick={() => setVideoOpen(true)}
            className="text-sm border border-cyanGlow/40 px-4 py-1.5 rounded-full text-cyanGlow hover:bg-cyanGlow hover:text-carbon transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3 h-3 fill-current" /> Watch
          </button>
        </nav>
      </header>

      {/* ══════════════════════════════════════════
          SECTION 1 — HERO
      ══════════════════════════════════════════ */}
      <section className="z-10 relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 border border-smokyTeal/30 rounded-full px-4 py-1.5 text-xs text-smokyTeal uppercase tracking-widest mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyanGlow animate-pulse" />
          Municipal &amp; Public Infrastructure
        </div>

        <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
          The information gap<br />
          <span className="text-cyanGlow font-medium">is the fight.</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          Communities don't oppose projects because they're bad. They oppose them because they can't get answers. Every unanswered question becomes a public meeting derailment. Every obscured document becomes a lawsuit.
        </p>
        <p className="text-lg text-gray-500 max-w-xl mx-auto mb-12 leading-relaxed">
          LBKH Liaison gives your project a 24/7 public information layer — so the right answers reach the right people before the wrong narrative does.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setVideoOpen(true)}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 transform shadow-xl"
            style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 40px rgba(0,229,204,0.35)' }}
          >
            <div className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            Watch the 90-Second Overview
          </button>
          <Link
            to={QUIZ_URL}
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base border border-smokyTeal/40 text-smokyTeal hover:border-cyanGlow hover:text-cyanGlow transition-colors"
          >
            Is Liaison right for my city? <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-16 flex justify-center">
          <ChevronDown className="w-5 h-5 text-gray-600 animate-bounce" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 2 — THE PROBLEM
      ══════════════════════════════════════════ */}
      <section className="z-10 py-20 px-6 border-t border-smokyTeal/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-smokyTeal uppercase tracking-widest mb-3">The Real Problem</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Companies used to hide in <span className="text-cyanGlow font-medium">obscurity.</span><br />
              That era is over.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              In an era of instant information, silence reads as guilt. The projects that win public trust aren't the ones with the best PR — they're the ones that make their documentation impossible to misrepresent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                color: 'text-red-400',
                borderColor: 'border-red-500/20',
                bgColor: 'bg-red-500/5',
                title: 'The Unanswered Question',
                body: 'A resident asks about noise mitigation at a town hall. Your team doesn\'t have the study in front of them. The meeting derails. The story that runs the next day isn\'t about your project — it\'s about your silence.',
              },
              {
                icon: Clock,
                color: 'text-yellow-400',
                borderColor: 'border-yellow-500/20',
                bgColor: 'bg-yellow-500/5',
                title: 'The 3 A.M. Concern',
                body: 'Constituents don\'t have concerns during business hours. They research at night, share on social media, and show up to meetings armed with misinformation. Your team can\'t respond in real time. Liaison can.',
              },
              {
                icon: TrendingUp,
                color: 'text-orange-400',
                borderColor: 'border-orange-500/20',
                bgColor: 'bg-orange-500/5',
                title: 'The Compounding Fight',
                body: 'One unanswered question becomes ten. Ten become a petition. A petition becomes a delay. Delays cost money. The information gap isn\'t a communications problem — it\'s a project risk.',
              },
            ].map((item, i) => (
              <div key={i} className={`glass-morphism p-7 rounded-2xl border ${item.borderColor} ${item.bgColor} text-left`}>
                <item.icon className={`w-7 h-7 ${item.color} mb-4`} />
                <h3 className="text-lg font-medium text-white mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 3 — THREE MODES
      ══════════════════════════════════════════ */}
      <section className="z-10 py-20 px-6 border-t border-smokyTeal/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-smokyTeal uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Three modes. One <span className="text-cyanGlow font-medium">done-for-you</span> system.
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Liaison operates in three distinct modes — each purpose-built for a different phase of your project's public engagement lifecycle.
            </p>
          </div>

          {/* Mode selector tabs */}
          <div className="flex gap-2 mb-8 justify-center flex-wrap">
            {[
              { id: 'developer', label: 'Developer Mode', icon: FileText },
              { id: 'portal', label: 'Public Portal', icon: Users },
              { id: 'live', label: 'Live Session', icon: Radio },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMode(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeMode === tab.id
                    ? 'bg-cyanGlow/15 border border-cyanGlow/50 text-cyanGlow'
                    : 'border border-smokyTeal/20 text-gray-500 hover:border-smokyTeal/40 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mode content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Left — description */}
            <div>
              {activeMode === 'developer' && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-cyanGlow/10 border border-cyanGlow/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-cyanGlow" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Developer Mode</h3>
                      <p className="text-xs text-gray-500">Project team only — private setup environment</p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Your team uploads the project's source documents — EIS reports, DEQ permits, traffic studies, community agreements. You can also upload benchmark documents for the AI to use as context, without exposing them publicly.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { icon: BookOpen, text: 'Upload source documents and benchmark comparisons separately' },
                      { icon: Eye, text: 'Add graphics, infographics, and media assets for the public portal' },
                      { icon: Lock, text: 'AI-powered PII scan flags sensitive information before it goes live' },
                      { icon: ShieldCheck, text: 'One-way redaction — permanently remove sensitive content from public-facing versions' },
                      { icon: Search, text: 'Test the AI against your documents before going live' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <item.icon className="w-4 h-4 text-cyanGlow shrink-0 mt-0.5" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeMode === 'portal' && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-smokyTeal/10 border border-smokyTeal/30 flex items-center justify-center">
                      <Users className="w-5 h-5 text-smokyTeal" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Public Portal</h3>
                      <p className="text-xs text-gray-500">24/7 constituent access — no staff required</p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    Residents, neighbors, and stakeholders get a branded project portal where they can ask any question about the project and receive accurate, cited answers — at 3 a.m. on a Sunday, or five minutes before a public meeting.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { icon: MessageSquare, text: 'AI answers questions directly from your uploaded project documents' },
                      { icon: CheckCircle, text: 'Every answer includes a clickable citation linking to the source snippet' },
                      { icon: ShieldCheck, text: 'Redacted content never surfaces — only approved public-facing versions' },
                      { icon: BarChart3, text: 'Knowledge map shows the full scope of project documentation at a glance' },
                      { icon: Users, text: 'Embeddable widget deploys on your existing project website in minutes' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <item.icon className="w-4 h-4 text-smokyTeal shrink-0 mt-0.5" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {activeMode === 'live' && (
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                      <Radio className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">Live Session Mode</h3>
                      <p className="text-xs text-gray-500">Town halls, public hearings, community meetings</p>
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    During live public meetings, Liaison becomes an executive briefing engine. Constituents submit questions via QR code. The system classifies them in real time, builds a topic heatmap, and surfaces briefing notes for your exec — so they can answer with confidence, not improvisation.
                  </p>
                  <ul className="space-y-3">
                    {[
                      { icon: BarChart3, text: 'Real-time topic heatmap groups questions by category as they come in' },
                      { icon: Mic, text: 'Executive briefing panel shows talking points, key numbers, and suggested verbal responses' },
                      { icon: FileText, text: 'Every briefing note is cited — click to pull the exact source snippet' },
                      { icon: AlertTriangle, text: 'Unanswerable questions are flagged and logged automatically for follow-up' },
                      { icon: Clock, text: 'Full session transcript and Q&A log saved for post-meeting reporting' },
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                        <item.icon className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right — mockup */}
            <div>
              <ModeMockup mode={activeMode} />
              <p className="text-center text-xs text-gray-600 mt-3">
                Actual interface — your branding, your documents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 4 — SOCIAL PROOF / RESULTS
      ══════════════════════════════════════════ */}
      <section className="z-10 py-20 px-6 border-t border-smokyTeal/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs text-smokyTeal uppercase tracking-widest mb-3">Why It Works</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Transparency isn't a risk.<br />
              <span className="text-cyanGlow font-medium">Obscurity is.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {[
              {
                stat: '24/7',
                label: 'Public access to project information',
                sub: 'Without a single staff member on call',
                color: 'text-cyanGlow',
              },
              {
                stat: '< 3s',
                label: 'Average AI response time',
                sub: 'Cited, accurate, and sourced from your documents',
                color: 'text-smokyTeal',
              },
              {
                stat: '100%',
                label: 'Questions logged and tracked',
                sub: 'Every unanswerable question flagged for follow-up',
                color: 'text-purple-400',
              },
            ].map((item, i) => (
              <div key={i} className="glass-morphism p-8 rounded-2xl border border-smokyTeal/20 text-center">
                <div className={`text-5xl font-bold mb-2 ${item.color}`}>{item.stat}</div>
                <div className="text-white font-medium mb-1">{item.label}</div>
                <div className="text-xs text-gray-500">{item.sub}</div>
              </div>
            ))}
          </div>

          {/* Placeholder testimonial */}
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/20 text-center max-w-3xl mx-auto">
            <div className="text-4xl text-smokyTeal/30 mb-4 font-serif">"</div>
            <p className="text-gray-300 text-lg leading-relaxed italic mb-6">
              We went into our public hearing expecting the usual pushback on the noise study. Instead, residents had already read the mitigation plan through the portal. The meeting was the most productive we've had in three years.
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-smokyTeal/20 border border-smokyTeal/40 flex items-center justify-center text-smokyTeal font-bold text-sm">
                PM
              </div>
              <div className="text-left">
                <div className="text-white text-sm font-medium">Project Manager</div>
                <div className="text-gray-500 text-xs">Municipal Infrastructure — Pacific Northwest</div>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-4 italic">* Testimonial representative of client outcomes. Name withheld at client request.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 5 — CTA FUNNEL
      ══════════════════════════════════════════ */}
      <section className="z-10 py-20 px-6 border-t border-smokyTeal/10">
        <div className="max-w-3xl mx-auto">
          <div className="glass-morphism p-10 rounded-2xl border border-cyanGlow/30 bg-smokyTeal/5 flex flex-col items-center gap-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-cyanGlow/10 border border-cyanGlow/30 flex items-center justify-center mb-2">
              <Play className="w-6 h-6 text-cyanGlow" />
            </div>
            <h2 className="text-3xl font-light text-white">See it before you decide.</h2>
            <p className="text-gray-400 max-w-lg">
              Watch the 90-second overview, then take the fit quiz to unlock the live demo. No sales call required.
            </p>

            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 transform shadow-xl w-full sm:w-auto justify-center"
              style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 40px rgba(0,229,204,0.4)' }}
            >
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-current" />
              </div>
              Watch the Video
            </button>

            <div className="flex flex-col items-center gap-1">
              <p className="text-xs text-gray-600 uppercase tracking-widest">Then</p>
              <Link
                to={QUIZ_URL}
                className="border border-cyanGlow/40 hover:border-cyanGlow text-cyanGlow hover:bg-cyanGlow/10 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 hover:scale-105 transform"
              >
                Is LBKH Liaison right for my city? <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-gray-600 mt-1">7 questions · 3 min · unlocks the live demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Portrait Video Modal ── */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)' }}
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative rounded-2xl overflow-hidden flex flex-col"
            style={{ width: '100%', maxWidth: '400px', boxShadow: '0 0 80px rgba(0,229,204,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: 'rgba(0,229,204,0.08)', borderBottom: '1px solid rgba(0,229,204,0.2)' }}>
              <div className="flex items-center gap-2">
                <Play className="w-3 h-3 text-cyanGlow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">LBKH Liaison — 90 sec</span>
              </div>
              <button onClick={() => setVideoOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="LBKH Liaison Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="px-4 py-3 flex flex-col items-center gap-2 shrink-0" style={{ background: '#0a0a0a', borderTop: '1px solid rgba(0,229,204,0.15)' }}>
              <p className="text-xs text-gray-500 uppercase tracking-widest text-center">Ready? Take the fit quiz to unlock the demo.</p>
              <Link
                to={QUIZ_URL}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105 transform"
                style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 20px rgba(0,229,204,0.3)' }}
                onClick={() => setVideoOpen(false)}
              >
                Take the Fit Quiz <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
