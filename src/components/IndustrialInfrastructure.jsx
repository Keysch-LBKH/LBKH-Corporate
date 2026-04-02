import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, X, FileText, Users, Radio,
  ShieldCheck, Search, BarChart3, MessageSquare,
  BookOpen, Mic, ChevronDown, CheckCircle, AlertTriangle,
  Clock, TrendingUp, Lock, Eye, Zap, HardHat, Flame, Layers
} from 'lucide-react';

const VIDEO_ID = 'g7l-EVG6S4Q';
const QUIZ_URL = '/quiz';

/* ── Reusable mode mock-up panel (industrial-flavored) ── */
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
            { icon: FileText, name: 'Pipeline_FERC_Application_2024.pdf', tag: 'SOURCE', color: 'text-cyanGlow' },
            { icon: FileText, name: 'Environmental_Impact_Assessment.pdf', tag: 'SOURCE', color: 'text-cyanGlow' },
            { icon: FileText, name: 'Industry_Safety_Standards_OSHA.pdf', tag: 'BENCHMARK', color: 'text-smokyTeal' },
            { icon: FileText, name: 'Community_Health_Risk_Analysis.pdf', tag: 'SOURCE', color: 'text-cyanGlow' },
          ].map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/3 border border-white/5 hover:border-smokyTeal/30 transition-colors">
              <f.icon className={`w-3.5 h-3.5 shrink-0 ${f.color}`} />
              <span className="text-gray-300 flex-1 truncate">{f.name}</span>
              <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${f.tag === 'SOURCE' ? 'border-cyanGlow/40 text-cyanGlow' : 'border-smokyTeal/40 text-smokyTeal'}`}>{f.tag}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-3 p-2 rounded-lg border border-dashed border-orange-500/40 bg-orange-500/5">
            <Lock className="w-3.5 h-3.5 text-orange-400 shrink-0" />
            <span className="text-orange-400/80">PII Scan ready — 5 items flagged for redaction</span>
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
          <span className="ml-2 text-gray-500 text-[10px] uppercase tracking-widest">Public Portal — Community Chat</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-[8px] text-gray-400">R</div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 max-w-[85%]">
              What happens if there's a pipeline leak near the river?
            </div>
          </div>
          <div className="flex gap-2 flex-row-reverse">
            <div className="w-6 h-6 rounded-full bg-cyanGlow/20 border border-cyanGlow/40 shrink-0 flex items-center justify-center text-[8px] text-cyanGlow">L</div>
            <div className="bg-smokyTeal/10 border border-smokyTeal/30 rounded-lg px-3 py-2 text-gray-200 max-w-[85%]">
              Per the Emergency Response Plan (Section 6.3), automatic shutoff valves activate within 30 seconds of a pressure anomaly. The nearest valve is 0.4 miles upstream. <span className="text-cyanGlow cursor-pointer">[¹]</span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-700 shrink-0 flex items-center justify-center text-[8px] text-gray-400">R</div>
            <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-gray-300 max-w-[85%]">
              How does this affect our water supply?
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
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
          <span className="ml-2 text-gray-500 text-[10px] uppercase tracking-widest">Live Session — Executive Briefing</span>
        </div>
        <div className="p-4 space-y-3">
          {/* Heatmap */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { label: 'Safety', count: 8, color: 'bg-red-500/70' },
              { label: 'Jobs', count: 5, color: 'bg-orange-500/60' },
              { label: 'Water', count: 4, color: 'bg-yellow-500/60' },
              { label: 'Timeline', count: 3, color: 'bg-cyanGlow/60' },
              { label: 'Noise', count: 2, color: 'bg-smokyTeal/60' },
              { label: 'Other', count: 2, color: 'bg-gray-500/50' },
            ].map((t, i) => (
              <div key={i} className={`${t.color} rounded-lg p-2 flex flex-col items-center justify-center`}>
                <span className="text-white font-bold text-sm">{t.count}</span>
                <span className="text-white/80 text-[9px] uppercase tracking-wide">{t.label}</span>
              </div>
            ))}
          </div>
          {/* Briefing snippet */}
          <div className="border border-cyanGlow/20 rounded-lg p-2.5 bg-cyanGlow/5">
            <div className="text-[9px] uppercase tracking-widest text-cyanGlow mb-1.5 font-bold">Briefing — Safety Question</div>
            <div className="text-gray-300 leading-relaxed">Automatic shutoff activates in &lt;30s. No recorded incidents in 12 years of operation. PHMSA inspection passed March 2024.</div>
            <div className="text-gray-600 text-[9px] mt-1.5">Sources: [¹] Emergency Response Plan · [²] PHMSA Inspection Report</div>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg border border-dashed border-red-500/30 bg-red-500/5">
            <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />
            <span className="text-red-400/80 text-[10px]">2 questions flagged for follow-up research</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

const MODES = [
  {
    id: 'developer',
    label: 'Developer Mode',
    icon: Layers,
    tagline: 'Build your project knowledge base',
    description: 'Upload your engineering documents, environmental filings, permits, and safety studies. Add regulatory benchmarks as contrasting sources. Run AI-powered PII scans to redact sensitive personnel data before anything goes public. One-way redaction means the original is always preserved.',
    features: [
      'Upload PDFs, DOCX, and technical specs',
      'Benchmark against regulatory standards',
      'AI PII scan with one-way redaction',
      'Custom redaction terms and safe-word lists',
      'Visual and media asset library',
    ],
  },
  {
    id: 'portal',
    label: 'Public Portal',
    icon: MessageSquare,
    tagline: '24/7 community Q&A — no staff required',
    description: 'Community members, landowners, and regulators get accurate, cited answers around the clock — pulled directly from your project documents. Every answer links to the exact source. No hallucinations, no liability from off-script responses. Your documents do the talking.',
    features: [
      'AI answers cited to your exact documents',
      'Embeddable widget for any project site',
      'Handles technical and safety questions',
      'Logs every unanswered question for review',
      'Available in multiple languages',
    ],
  },
  {
    id: 'live',
    label: 'Live Session',
    icon: Radio,
    tagline: 'Real-time support for town halls and hearings',
    description: 'During public hearings, FERC proceedings, or community meetings, your executive team gets a live briefing engine — not a search bar. Questions from the room are categorized in real time on a topic heatmap. Each question generates a structured briefing with talking points, key numbers, and a suggested verbal response.',
    features: [
      'Real-time question topic heatmap',
      'Executive briefing engine (not first-person)',
      'Talking points with numbered source citations',
      'Suggested verbal response for the presenter',
      'Flags unanswerable questions for follow-up',
    ],
  },
];

const PAIN_POINTS = [
  {
    icon: AlertTriangle,
    color: 'text-red-400',
    border: 'border-red-500/20',
    bg: 'bg-red-500/5',
    title: 'One unanswered question becomes a campaign',
    body: "A landowner can't get a straight answer about easement compensation. They post online. Three weeks later you're managing a coalition. The information gap doesn't stay small — it compounds.",
  },
  {
    icon: Clock,
    color: 'text-orange-400',
    border: 'border-orange-500/20',
    bg: 'bg-orange-500/5',
    title: 'Your team is answering the same questions on repeat',
    body: "Every public comment period, every hearing, every community meeting — the same 40 questions. Your engineers are fielding calls instead of building. Your comms team is writing the same email for the fifth time.",
  },
  {
    icon: Eye,
    color: 'text-yellow-400',
    border: 'border-yellow-500/20',
    bg: 'bg-yellow-500/5',
    title: "Obscurity used to be a strategy. It isn't anymore.",
    body: "The era of keeping things complex enough that people give up is over. Regulators, journalists, and organized opposition all have the same AI tools you do. The companies winning public trust are the ones making their information easier to access, not harder.",
  },
];

export default function IndustrialInfrastructure() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeMode, setActiveMode] = useState('developer');

  const activeData = MODES.find(m => m.id === activeMode);

  return (
    <div className="min-h-screen bg-carbon text-gray-100 flex flex-col relative overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col">
        {/* Background glows */}
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-smokyTeal/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Nav */}
        <header className="z-10 py-5 px-8 border-b border-smokyTeal/20 flex items-center justify-between shrink-0">
          <Link to="/" className="text-sm border border-smokyTeal/30 px-4 py-1.5 rounded-full text-smokyTeal hover:bg-smokyTeal hover:text-carbon transition-colors">
            &larr; Back to Solutions
          </Link>
          <div className="flex items-center gap-3">
            <Link to={QUIZ_URL} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Take the Fit Quiz</Link>
            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-2 text-xs border border-cyanGlow/40 text-cyanGlow px-4 py-1.5 rounded-full hover:bg-cyanGlow/10 transition-colors"
            >
              <Play className="w-3 h-3 fill-current" /> Watch the Video
            </button>
          </div>
        </header>

        {/* Hero content */}
        <div className="z-10 flex-1 flex flex-col items-center justify-center px-8 py-20 text-center max-w-5xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-smokyTeal border border-smokyTeal/30 px-4 py-1.5 rounded-full mb-8">
            <HardHat className="w-3.5 h-3.5" />
            Industrial Infrastructure
          </div>

          <h1 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-6 leading-tight">
            The opposition isn't the project.<br />
            <span className="text-cyanGlow font-medium">It's the information gap.</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Industrial projects fail community review not because of what they're doing — but because the people affected can't get answers. LBKH Liaison turns your engineering documents into a 24/7 community resource, and gives your executive team real-time support when the room gets difficult.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={() => setVideoOpen(true)}
              className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 transform shadow-xl"
              style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 40px rgba(0,229,204,0.35)' }}
            >
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-current" />
              </div>
              Watch the Video
            </button>
            <Link
              to={QUIZ_URL}
              className="flex items-center gap-2 border border-smokyTeal/40 text-smokyTeal hover:bg-smokyTeal/10 hover:border-smokyTeal px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 transform"
            >
              Is Liaison a fit for my project? <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-gray-600 mt-4">7 questions · 3 min · unlocks the live demo</p>
        </div>

        {/* Scroll cue */}
        <div className="z-10 flex justify-center pb-8 animate-bounce">
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="relative py-24 px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-smokyTeal/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-smokyTeal mb-3">The Problem</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Good projects get stopped by <span className="text-cyanGlow font-medium">bad communication</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              You've done the environmental work. You've filed the permits. You've followed the process. And yet — the opposition is growing. Here's why.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className={`glass-morphism p-7 rounded-2xl border ${p.border} ${p.bg} flex flex-col gap-4`}>
                <p.icon className={`w-7 h-7 ${p.color}`} />
                <h3 className="text-lg font-medium text-white leading-snug">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>

          {/* Divider statement */}
          <div className="mt-16 text-center">
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              "There are enough companies trying to do enough good work. The ones that win public trust aren't hiding less — they're <span className="text-cyanGlow font-medium">making their information easier to find.</span>"
            </p>
            <p className="text-xs text-gray-600 mt-3 uppercase tracking-widest">— LBKH Solutions</p>
          </div>
        </div>
      </section>

      {/* ── THREE MODES ── */}
      <section className="py-24 px-8 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyanGlow/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-smokyTeal mb-3">How It Works</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Three modes. One <span className="text-cyanGlow font-medium">done-for-you</span> system.
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Liaison isn't a chatbot you point at a website. It's a structured information architecture built around your specific project documents — deployed in three distinct modes depending on who needs what.
            </p>
          </div>

          {/* Mode tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {MODES.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMode(m.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${
                  activeMode === m.id
                    ? 'bg-cyanGlow/15 border-cyanGlow/60 text-cyanGlow shadow-lg'
                    : 'border-smokyTeal/20 text-gray-400 hover:border-smokyTeal/40 hover:text-gray-300'
                }`}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </button>
            ))}
          </div>

          {/* Mode content */}
          {activeData && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* Left — description */}
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest text-smokyTeal mb-2">{activeData.label}</p>
                  <h3 className="text-2xl font-medium text-white mb-3">{activeData.tagline}</h3>
                  <p className="text-gray-400 leading-relaxed">{activeData.description}</p>
                </div>
                <ul className="space-y-2.5">
                  {activeData.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-cyanGlow shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={QUIZ_URL}
                  className="inline-flex items-center gap-2 text-sm text-cyanGlow hover:text-white transition-colors font-medium"
                >
                  See if this fits your project <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Right — mockup */}
              <div className="relative">
                <div className="absolute -inset-4 bg-cyanGlow/5 blur-2xl rounded-3xl pointer-events-none" />
                <ModeMockup mode={activeMode} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-smokyTeal/3 to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-widest text-smokyTeal mb-3">Results</p>
            <h2 className="text-3xl font-light text-white">
              What changes when your information is <span className="text-cyanGlow font-medium">always accessible</span>
            </h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: '24/7', label: 'Community access to project information', icon: Clock, color: 'text-cyanGlow' },
              { stat: '< 3s', label: 'Average response time to constituent questions', icon: Zap, color: 'text-smokyTeal' },
              { stat: '100%', label: 'Answers cited to your actual project documents', icon: ShieldCheck, color: 'text-green-400' },
            ].map((s, i) => (
              <div key={i} className="glass-morphism p-8 rounded-2xl border border-smokyTeal/20 text-center flex flex-col items-center gap-3">
                <s.icon className={`w-6 h-6 ${s.color}`} />
                <div className={`text-4xl font-bold ${s.color}`}>{s.stat}</div>
                <p className="text-sm text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Testimonial placeholder */}
          <div className="glass-morphism p-8 rounded-2xl border border-smokyTeal/20 relative">
            <div className="absolute top-4 left-6 text-5xl text-smokyTeal/20 font-serif leading-none">"</div>
            <p className="text-lg text-gray-300 leading-relaxed pl-6 italic">
              When community members can get accurate answers at 2 AM from their phone, they stop showing up to hearings angry. The questions we were dreading never came — because they'd already been answered.
            </p>
            <div className="mt-4 pl-6 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-smokyTeal/20 border border-smokyTeal/40 flex items-center justify-center text-xs text-smokyTeal font-bold">P</div>
              <div>
                <p className="text-sm text-white font-medium">Project Director</p>
                <p className="text-xs text-gray-500">Large-scale infrastructure development — representative of client outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FUNNEL ── */}
      <section className="py-24 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="glass-morphism p-10 rounded-2xl border border-cyanGlow/30 bg-smokyTeal/5 flex flex-col items-center gap-6 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyanGlow/8 blur-[80px] rounded-full pointer-events-none" />
            <div className="z-10 flex flex-col items-center gap-6 w-full">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-smokyTeal border border-smokyTeal/30 px-4 py-1.5 rounded-full">
                <Flame className="w-3.5 h-3.5" />
                See it before you decide
              </div>
              <h2 className="text-2xl md:text-3xl font-light text-white">
                Watch the 90-second overview.<br />
                <span className="text-cyanGlow font-medium">Then take the fit quiz to unlock the demo.</span>
              </h2>
              <p className="text-gray-400 text-sm max-w-xl">
                The quiz takes 3 minutes. It tells you exactly how Liaison maps to your project type — and unlocks access to the live demo so you can see it working on real documents.
              </p>

              <button
                onClick={() => setVideoOpen(true)}
                className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 transform shadow-xl w-full max-w-sm justify-center"
                style={{ background: 'linear-gradient(135deg, #00e5cc, #00b8a9)', color: '#0a0a0a', boxShadow: '0 0 40px rgba(0,229,204,0.4)' }}
              >
                <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center shrink-0">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                Watch the Video
              </button>

              <div className="flex flex-col items-center gap-1 w-full">
                <p className="text-xs text-gray-600 uppercase tracking-widest">Then</p>
                <Link
                  to={QUIZ_URL}
                  className="border border-cyanGlow/40 hover:border-cyanGlow text-cyanGlow hover:bg-cyanGlow/10 font-semibold px-8 py-3 rounded-lg transition-colors flex items-center gap-2 hover:scale-105 transform w-full max-w-sm justify-center"
                >
                  Is LBKH Liaison a fit for my project? <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-gray-600 mt-1">7 questions · 3 min · unlocks the live demo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO MODAL ── */}
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
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2.5 shrink-0" style={{ background: 'rgba(0,229,204,0.08)', borderBottom: '1px solid rgba(0,229,204,0.2)' }}>
              <div className="flex items-center gap-2">
                <Play className="w-3 h-3 text-cyanGlow" />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">LBKH Liaison — 90 sec</span>
              </div>
              <button onClick={() => setVideoOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 9:16 embed */}
            <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="LBKH Liaison Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Post-video CTA */}
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
