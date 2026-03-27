import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

const questions = [
  {
    id: 1,
    question: "What best describes your project?",
    answers: [
      { id: 'q1_ai',         text: 'AI infrastructure / data center',           fitScore: 4 },
      { id: 'q1_renewable',  text: 'Renewable energy (solar, wind, hydro)',      fitScore: 4 },
      { id: 'q1_mfg',        text: 'Advanced manufacturing or industrial campus',fitScore: 3 },
      { id: 'q1_extraction', text: 'Resource extraction or processing',          fitScore: 2 },
      { id: 'q1_other',      text: 'Other industrial / infrastructure',          fitScore: 3 },
    ],
  },
  {
    id: 2,
    question: "How would you describe your project's relationship with the surrounding community right now?",
    answers: [
      { id: 'q2_proactive',  text: "We haven't engaged yet — we want to get ahead of concerns before they start", fitScore: 4 },
      { id: 'q2_early',      text: "We've had some early conversations but there's uncertainty and questions",    fitScore: 3 },
      { id: 'q2_opposition', text: "There's active opposition and we need to address it with real data",          fitScore: 4 },
      { id: 'q2_permits',    text: "Community hasn't been a priority — we're focused on permits and approvals",   fitScore: 2 },
    ],
  },
  {
    id: 3,
    question: "When it comes to sharing project data with the public, your team's instinct is to...",
    answers: [
      { id: 'q3_open',      text: "Share everything we can — verified data builds trust faster than silence",       fitScore: 4 },
      { id: 'q3_selective', text: "Share selectively — some things are sensitive but we want to be transparent",    fitScore: 3 },
      { id: 'q3_legal',     text: "Share only what's legally required",                                             fitScore: 2 },
      { id: 'q3_unsure',    text: "We haven't thought about it yet",                                                fitScore: 2 },
    ],
  },
  {
    id: 4,
    question: "What's your biggest concern about how information about your project spreads?",
    answers: [
      { id: 'q4_misinfo',     text: "Misinformation spreading before we can respond",                                  fitScore: 4 },
      { id: 'q4_unofficial',  text: "Community members getting answers from unofficial sources",                       fitScore: 4 },
      { id: 'q4_meetings',    text: "Public meetings getting derailed by emotional objections we can't address in real time", fitScore: 4 },
      { id: 'q4_notracking',  text: "We don't have a system to track what questions are being asked",                  fitScore: 3 },
    ],
  },
  {
    id: 5,
    question: "Is your project entering a community that has had negative experiences with similar developments in the past?",
    answers: [
      { id: 'q5_yes_specific', text: "Yes — there are specific past projects the community compares us to",          fitScore: 4 },
      { id: 'q5_yes_general',  text: "Yes — there's general distrust of industrial development in this area",        fitScore: 4 },
      { id: 'q5_no_new',       text: "Not that we know of — this is relatively new territory for the community",     fitScore: 3 },
      { id: 'q5_supportive',   text: "No — the community is generally supportive of development",                    fitScore: 3 },
    ],
  },
  {
    id: 6,
    question: "Does your project involve public meetings, town halls, or regulatory hearings?",
    answers: [
      { id: 'q6_yes_multiple', text: "Yes — multiple planned, and managing them is a real challenge",     fitScore: 4 },
      { id: 'q6_yes_one',      text: "Yes — at least one major public meeting is coming up",              fitScore: 4 },
      { id: 'q6_maybe',        text: "Possibly — we're not sure what the permitting process will require",fitScore: 3 },
      { id: 'q6_no_digital',   text: "No — our engagement is primarily digital",                          fitScore: 3 },
    ],
  },
  {
    id: 7,
    question: "Where are you in the development timeline?",
    answers: [
      { id: 'q7_pre',    text: "Pre-announcement — we want to get ahead of the narrative before anything goes public", fitScore: 4 },
      { id: 'q7_early',  text: "Early permitting — community engagement is starting now",                               fitScore: 4 },
      { id: 'q7_mid',    text: "Mid-process — we're already in it and need to course-correct",                         fitScore: 3 },
      { id: 'q7_future', text: "We're exploring options for future projects",                                           fitScore: 2 },
    ],
  },
];

// Improvement areas keyed by answerId
const improvementAreas = {
  q1_extraction: { category: "Project Positioning", title: "Extraction projects face the steepest trust deficit", problem: "Resource extraction carries decades of negative community associations. Without a proactive data strategy, you're fighting perception before the first shovel hits the ground.", firstStep: "Load your environmental impact data and regulatory filings into the Source Silo before any public announcement.", urgency: "high" },
  q1_ai:         { category: "Project Positioning", title: "AI infrastructure is the fastest-growing trust challenge", problem: "Data centers face water, noise, and power concerns that communities are increasingly vocal about. The good news: the data almost always tells a better story than the rumors.", firstStep: "Prepare a closed-loop cooling comparison document for the Benchmark Silo — it's your most powerful de-escalation tool.", urgency: "medium" },
  q1_renewable:  { category: "Project Positioning", title: "Renewable projects win on values but lose on specifics", problem: "Communities support clean energy in principle but object to specific impacts (visual, noise, land use). Source-locked specifics close that gap.", firstStep: "Upload your site-specific impact studies so the Liaison can answer 'but what about OUR area?' with real data.", urgency: "medium" },
  q1_mfg:        { category: "Project Positioning", title: "Manufacturing projects need a jobs-first narrative", problem: "Industrial campuses often lead with economic benefit but underinvest in environmental and traffic data — which is what communities actually ask about.", firstStep: "Prepare a traffic impact comparison and noise study for the Source Silo.", urgency: "medium" },
  q1_other:      { category: "Project Positioning", title: "Undefined project types need a clear community story fast", problem: "If your project doesn't fit a familiar category, communities fill the gap with their worst assumptions.", firstStep: "Start with a plain-language project summary document in the Source Silo — let the Liaison answer 'what actually is this?'", urgency: "medium" },

  q2_proactive:  { category: "Community Strategy", title: "Getting ahead of the narrative is your biggest advantage", problem: "Most developers wait until opposition forms to engage. You have a window to establish the Liaison as the authoritative source before misinformation takes root.", firstStep: "Deploy the Liaison in Coming Soon mode and share the link with local officials and media before the public announcement.", urgency: "high" },
  q2_early:      { category: "Community Strategy", title: "Early uncertainty is the easiest stage to address with data", problem: "Unanswered questions in the early phase become entrenched objections later. Every day without a source-locked answer is a day misinformation can fill the vacuum.", firstStep: "Identify the top 5 questions you're already hearing and make sure those answers are in your Source Silo.", urgency: "high" },
  q2_opposition: { category: "Community Strategy", title: "Active opposition requires contrast data, not just defense", problem: "Defending against objections without showing the alternative keeps you on the back foot. The Benchmark Silo lets you reframe: 'compared to what?'", firstStep: "Load documentation from the specific past projects being used against you into the Benchmark Silo.", urgency: "high" },
  q2_permits:    { category: "Community Strategy", title: "Permit-focused projects are most vulnerable to late-stage opposition", problem: "Projects that skip community engagement during permitting often face organized opposition at the final approval stage — when it's most costly to address.", firstStep: "Schedule a community engagement kickoff before your next permit milestone.", urgency: "high" },

  q3_open:       { category: "Data Strategy", title: "Full transparency is your competitive advantage — make it verifiable", problem: "Saying you're transparent isn't enough. Source-locked citations make transparency provable and legally defensible.", firstStep: "Upload all public-facing regulatory filings with their public filing URLs so every answer includes a clickable citation.", urgency: "medium" },
  q3_selective:  { category: "Data Strategy", title: "Selective transparency creates the gaps misinformation fills", problem: "When communities sense information is being withheld, they assume the worst. Defining what you share — and why — is more effective than staying silent.", firstStep: "Use the redaction tool to prepare sanitized versions of sensitive documents so you can share more without exposing confidential data.", urgency: "medium" },
  q3_legal:      { category: "Data Strategy", title: "Legal minimums invite maximum suspicion", problem: "Communities interpret legal-minimum disclosure as hiding something. The Liaison lets you share more without creating legal exposure — cited snippets, not full documents.", firstStep: "Work with your legal team to identify which additional data points can be shared safely.", urgency: "high" },
  q3_unsure:     { category: "Data Strategy", title: "A transparency strategy is the first thing to define", problem: "Without a clear data-sharing posture, your team will make inconsistent decisions under pressure — usually too little, too late.", firstStep: "Use the LBKH onboarding call to define your transparency tiers before uploading any documents.", urgency: "high" },

  q4_misinfo:    { category: "Narrative Control", title: "Misinformation spreads fastest in the absence of a single source of truth", problem: "Without a source-locked Liaison, every rumor has equal standing with your official data. Speed of deployment is everything.", firstStep: "Get the Liaison live before your next media mention — even in Coming Soon mode with a basic FAQ.", urgency: "high" },
  q4_unofficial: { category: "Narrative Control", title: "Unofficial sources win when official sources are hard to reach", problem: "If your project data lives in PDFs on a government website, communities will get their answers from Facebook instead.", firstStep: "Deploy the Liaison as the single, always-available source and link it from every official communication.", urgency: "high" },
  q4_meetings:   { category: "Live Event Readiness", title: "Real-time data access changes the dynamic of a public meeting", problem: "Public meetings derail when executives can't answer specific technical questions on the spot. The Liaison's live event mode gives your team instant access to cited answers.", firstStep: "Test the Live Event mode before your next public meeting — load your documents and run a practice session.", urgency: "high" },
  q4_notracking: { category: "Intelligence Gathering", title: "Not knowing what's being asked is a strategic blind spot", problem: "The questions communities are asking tell you exactly where your narrative has gaps. The Liaison's executive dashboard tracks trending topics in real time.", firstStep: "Review the question heatmap after your first week of deployment to identify your top 3 narrative gaps.", urgency: "medium" },

  q5_yes_specific: { category: "Contrast Strategy", title: "Named past projects are your most powerful reframe opportunity", problem: "When a community says 'we don't want another [Project X]', that's an opening — not a wall. The Benchmark Silo lets you show exactly why this project is different.", firstStep: "Load documentation from the specific past project being cited and configure Benchmark Mode.", urgency: "high" },
  q5_yes_general:  { category: "Contrast Strategy", title: "General distrust requires a general contrast — the zoning alternative", problem: "When there's no specific project to compare against, the most effective reframe is: 'what would be built here if not this?' The Benchmark Silo makes that case with data.", firstStep: "Prepare a zoning alternatives document showing the realistic alternative land uses.", urgency: "high" },
  q5_no_new:       { category: "Contrast Strategy", title: "New territory means you set the standard — make it count", problem: "In communities without prior industrial development, you have the opportunity to define what good looks like. Don't waste it.", firstStep: "Load global industry benchmark data to show how your project compares to best-in-class developments elsewhere.", urgency: "medium" },
  q5_supportive:   { category: "Contrast Strategy", title: "Supportive communities still need data to defend their support", problem: "Community supporters face pushback from neighbors. Give them the data to make the case — the Liaison works for your advocates too.", firstStep: "Create a shareable public FAQ link so supporters can send it when they get questions.", urgency: "low" },

  q6_yes_multiple: { category: "Live Event Readiness", title: "Multiple public meetings require a repeatable system", problem: "Each meeting is a new opportunity for misinformation to take root. A consistent, source-locked Liaison presence across all meetings creates a coherent narrative arc.", firstStep: "Configure the Live Event mode and test the Digital Digest generation before your first meeting.", urgency: "high" },
  q6_yes_one:      { category: "Live Event Readiness", title: "One major meeting can define the entire project narrative", problem: "The first major public meeting sets the tone for everything that follows. Arriving with a live Liaison and real-time data access changes the dynamic entirely.", firstStep: "Schedule your LBKH live event setup session at least 2 weeks before the meeting date.", urgency: "high" },
  q6_maybe:        { category: "Live Event Readiness", title: "Permitting almost always requires public hearings — prepare now", problem: "Most industrial projects trigger mandatory public comment periods. Building the Liaison before you need it means you're not scrambling when the hearing is scheduled.", firstStep: "Ask your permitting attorney which public engagement requirements apply to your project type.", urgency: "medium" },
  q6_no_digital:   { category: "Digital Engagement", title: "Digital-first engagement still needs a source-locked backbone", problem: "Social media and email campaigns drive traffic — but without a source-locked destination, that traffic lands on unofficial information.", firstStep: "Embed the Liaison widget on your project website and link it from all digital communications.", urgency: "medium" },

  q7_pre:    { category: "Launch Timing", title: "Pre-announcement is the highest-leverage deployment window", problem: "The 48 hours after a public announcement are when misinformation moves fastest. Deploying the Liaison before announcement means it's already the authoritative source when the news breaks.", firstStep: "Target Liaison deployment 1 week before your public announcement date.", urgency: "high" },
  q7_early:  { category: "Launch Timing", title: "Early permitting is the ideal window — don't wait", problem: "Community concerns formed during early permitting become the objections that delay final approval. Address them now with data, not later with damage control.", firstStep: "Book your LBKH onboarding call this week — 24-hour deployment is achievable.", urgency: "high" },
  q7_mid:    { category: "Launch Timing", title: "Mid-process deployment is harder but still decisive", problem: "Established opposition is harder to shift than emerging uncertainty — but source-locked data still outperforms press releases and community liaisons working from memory.", firstStep: "Prioritize loading the documents that address your most active objections first.", urgency: "high" },
  q7_future: { category: "Launch Timing", title: "Future projects benefit most from a repeatable system", problem: "The real value of the Liaison is the 48-hour launch protocol — once your team knows how to deploy it, every future project gets a head start.", firstStep: "Use the demo to walk your team through the deployment process so it's ready when the next project launches.", urgency: "low" },
};

const MAX_SCORE = 28;
const STRONG_FIT_THRESHOLD = 22;

const urgencyColor = { high: '#40E0D0', medium: '#00A8A8', low: '#4b5563' };
const urgencyLabel = { high: 'High Priority', medium: 'Medium Priority', low: 'Low Priority' };

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function QuizFunnel() {
  const navigate = useNavigate();
  const [stage, setStage] = useState('landing'); // landing | quiz | calculating | results | thankyou
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({}); // { questionId: answerId }
  const [score, setScore] = useState(0);
  const [isStrongFit, setIsStrongFit] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [topAreas, setTopAreas] = useState([]);

  // Auto-advance calculating stage
  useEffect(() => {
    if (stage === 'calculating') {
      const t = setTimeout(() => setStage('results'), 2800);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const handleAnswer = (answerId, fitScore) => {
    const newAnswers = { ...answers, [questions[currentQ].id]: answerId };
    setAnswers(newAnswers);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 280);
    } else {
      // Final question — tally score
      const total = questions.reduce((sum, q) => {
        const aid = newAnswers[q.id];
        const ans = q.answers.find(a => a.id === aid);
        return sum + (ans ? ans.fitScore : 0);
      }, 0);
      setScore(total);
      setIsStrongFit(total >= STRONG_FIT_THRESHOLD);

      // Compute top 3 improvement areas
      const areas = Object.entries(newAnswers)
        .map(([qId, aId]) => {
          const q = questions.find(q => q.id === parseInt(qId));
          const ans = q?.answers.find(a => a.id === aId);
          const area = improvementAreas[aId];
          if (!area) return null;
          return { ...area, painScore: ans?.fitScore || 0 };
        })
        .filter(Boolean)
        .sort((a, b) => {
          const urgencyOrder = { high: 3, medium: 2, low: 1 };
          if (b.painScore !== a.painScore) return b.painScore - a.painScore;
          return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
        })
        .slice(0, 3);
      setTopAreas(areas);

      setStage('calculating');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Webhook will be wired in by client — placeholder POST
    try {
      await fetch('https://placeholder-webhook.lbkh.solutions/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          score,
          outcome: isStrongFit ? 'strong_fit' : 'possible_fit',
          answers,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {}); // swallow — webhook not yet wired
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setStage('thankyou'), 600);
    }
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  // ─── LANDING ──────────────────────────────────────────────────────────────
  if (stage === 'landing') return (
    <div style={styles.page}>
      <button onClick={() => navigate('/industrial')} style={styles.backBtn}>← Back to Industrial</button>
      <div style={styles.landingCard}>
        <div style={styles.badge}>INDUSTRIAL PROJECT DIAGNOSTIC</div>
        <h1 style={styles.h1}>Is LBKH Liaison<br />a fit for your project?</h1>
        <p style={styles.subhead}>
          7 questions. 3 minutes. Find out if your project is ready for source-locked community engagement — and what it would take to go live within 24 hours.
        </p>
        <div style={styles.pillRow}>
          {['AI Infrastructure', 'Renewable Energy', 'Advanced Manufacturing', 'Industrial Campus'].map(t => (
            <span key={t} style={styles.pill}>{t}</span>
          ))}
        </div>
        <button onClick={() => setStage('quiz')} style={styles.ctaBtn}>
          Start the Diagnostic →
        </button>
        <p style={styles.disclaimer}>No commitment. No spam. Just clarity.</p>
      </div>
    </div>
  );

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (stage === 'quiz') {
    const q = questions[currentQ];
    return (
      <div style={styles.page}>
        <button onClick={() => navigate('/industrial')} style={styles.backBtn}>← Back</button>
        <div style={styles.quizCard}>
          {/* Progress bar */}
          <div style={styles.progressWrap}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }} />
          </div>
          <div style={styles.qCounter}>{currentQ + 1} / {questions.length}</div>
          <h2 style={styles.qText}>{q.question}</h2>
          <div style={styles.answerGrid}>
            {q.answers.map(a => (
              <button
                key={a.id}
                onClick={() => handleAnswer(a.id, a.fitScore)}
                style={styles.answerBtn}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#40E0D0'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {a.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ─── CALCULATING ──────────────────────────────────────────────────────────
  if (stage === 'calculating') return (
    <div style={styles.page}>
      <div style={styles.calcCard}>
        <div style={styles.spinner} />
        <p style={styles.calcText}>Analyzing your project profile...</p>
        <div style={styles.calcDots}>
          {['Evaluating community context', 'Assessing data readiness', 'Mapping deployment path'].map((t, i) => (
            <div key={t} style={{ ...styles.calcDot, animationDelay: `${i * 0.4}s` }}>
              <span style={styles.calcDotDot}>◆</span> {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── RESULTS ──────────────────────────────────────────────────────────────
  if (stage === 'results') return (
    <div style={styles.page}>
      <div style={styles.resultsCard}>
        {/* Score reveal */}
        <div style={styles.scoreReveal}>
          <div style={styles.scoreBadge}>
            <span style={styles.scoreNum}>{score}</span>
            <span style={styles.scoreMax}>/ {MAX_SCORE}</span>
          </div>
          <div style={{ ...styles.outcomeTag, background: isStrongFit ? 'rgba(64,224,208,0.15)' : 'rgba(0,168,168,0.12)', borderColor: isStrongFit ? '#40E0D0' : '#00A8A8' }}>
            {isStrongFit ? '✓ STRONG FIT' : '◎ POSSIBLE FIT'}
          </div>
        </div>

        <h2 style={styles.resultsH2}>
          {isStrongFit
            ? 'Your project is ready. We can go live in 24 hours.'
            : 'A few tweaks and this platform is built for you.'}
        </h2>
        <p style={styles.resultsBody}>
          {isStrongFit
            ? 'Your project has the transparency posture, community context, and timeline alignment that makes LBKH Liaison most effective. The source-locked architecture, Benchmark Silo, and live event mode are all directly applicable to what you\'re facing. We can begin onboarding today and have your Liaison live before your next community touchpoint.'
            : 'Your project has real potential for the Liaison platform. Some elements may need light customization — whether that\'s refining your transparency strategy, preparing your document library, or scoping the live event configuration. None of that is a blocker. We\'ve deployed in 24 hours for projects at every stage of the process.'}
        </p>

        {/* Feature cards */}
        <div style={styles.featureGrid}>
          {[
            { icon: '🔒', title: 'Source-Locked Truth Engine', desc: 'Every answer grounded in your verified documents. No hallucinations, no liability.' },
            { icon: '⚡', title: '24-Hour Deployment', desc: 'Upload your documents, configure branding, go live. The 48-hour launch protocol is built into the platform.' },
            { icon: '📊', title: 'Benchmark Contrast Mode', desc: 'Load documentation from past projects the community compares you to. Let the data make the case.' },
            { icon: '🎤', title: 'Live Event Mode', desc: 'Real-time source-locked Q&A for public meetings, town halls, and regulatory hearings.' },
          ].map(f => (
            <div key={f.title} style={styles.featureCard}>
              <div style={styles.featureIcon}>{f.icon}</div>
              <div>
                <div style={styles.featureTitle}>{f.title}</div>
                <div style={styles.featureDesc}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead capture form */}
        {!submitted ? (
          <form onSubmit={handleFormSubmit} style={styles.form}>
            <h3 style={styles.formH3}>
              {isStrongFit ? 'Book your onboarding call →' : 'Let\'s talk about your project →'}
            </h3>
            <p style={styles.formSub}>
              {isStrongFit
                ? 'We\'ll confirm your deployment timeline and get your document library started.'
                : 'We\'ll walk through what customization looks like for your specific project and timeline.'}
            </p>
            <div style={styles.formGrid}>
              <input required placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={styles.input} />
              <input required type="email" placeholder="Work Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={styles.input} />
              <input required placeholder="Company / Project Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} style={styles.input} />
              <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={styles.input} />
            </div>
            <button type="submit" disabled={submitting} style={styles.submitBtn}>
              {submitting ? 'Sending...' : isStrongFit ? 'Book My Onboarding Call →' : 'Start the Conversation →'}
            </button>
            <p style={styles.formDisclaimer}>No spam. No pressure. Just a real conversation about your project.</p>
          </form>
        ) : (
          <div style={styles.successMsg}>✓ Received — we'll be in touch within one business day.</div>
        )}
      </div>
    </div>
  );

  // ─── THANK YOU ────────────────────────────────────────────────────────────
  if (stage === 'thankyou') return (
    <div style={styles.page}>
      <div style={styles.tyCard}>
        <div style={styles.tyCheck}>✓</div>
        <h2 style={styles.tyH2}>You're on the list.</h2>
        <p style={styles.tyBody}>
          {isStrongFit
            ? "We'll reach out within one business day to confirm your onboarding timeline. In the meantime, explore the live demo to see exactly what your community will experience."
            : "We'll reach out within one business day to walk through what a customized deployment looks like for your project. The demo is ready when you are."}
        </p>
        <a href="https://lbkh-liason.pages.dev" target="_blank" rel="noreferrer" style={styles.demoBtn}>
          Explore the Live Demo →
        </a>

        {topAreas.length > 0 && (
          <div style={styles.areasSection}>
            <h3 style={styles.areasH3}>Your Top 3 Deployment Priorities</h3>
            <p style={styles.areasSub}>Based on your answers, these are the areas where the Liaison will have the most immediate impact for your project.</p>
            <div style={styles.areasGrid}>
              {topAreas.map((area, i) => (
                <div key={i} style={styles.areaCard}>
                  <div style={styles.areaHeader}>
                    <span style={styles.areaCategory}>{area.category}</span>
                    <span style={{ ...styles.urgencyBadge, background: urgencyColor[area.urgency] + '22', color: urgencyColor[area.urgency], borderColor: urgencyColor[area.urgency] + '44' }}>
                      {urgencyLabel[area.urgency]}
                    </span>
                  </div>
                  <div style={styles.areaTitle}>{area.title}</div>
                  <div style={styles.areaLabel}>The Problem</div>
                  <div style={styles.areaText}>{area.problem}</div>
                  <div style={styles.areaLabel}>First Step</div>
                  <div style={styles.areaText}>{area.firstStep}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={() => navigate('/industrial')} style={styles.backToIndustrial}>
          ← Back to Industrial Solutions
        </button>
      </div>
    </div>
  );

  return null;
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 50% 0%, #071a19 0%, #050505 60%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px 80px',
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    position: 'relative',
  },
  backBtn: {
    alignSelf: 'flex-start',
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    fontSize: '12px',
    letterSpacing: '0.05em',
    marginBottom: '32px',
    padding: '0',
    textTransform: 'uppercase',
  },
  // Landing
  landingCard: {
    maxWidth: '640px',
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  badge: {
    background: 'rgba(64,224,208,0.1)',
    border: '1px solid rgba(64,224,208,0.3)',
    borderRadius: '4px',
    color: '#40E0D0',
    fontSize: '10px',
    fontWeight: '900',
    letterSpacing: '0.15em',
    padding: '6px 16px',
    textTransform: 'uppercase',
  },
  h1: {
    color: '#ffffff',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    lineHeight: '1.05',
    margin: '0',
    textTransform: 'uppercase',
  },
  subhead: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '16px',
    lineHeight: '1.6',
    margin: '0',
    maxWidth: '480px',
  },
  pillRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
  },
  pill: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '100px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: '11px',
    letterSpacing: '0.05em',
    padding: '4px 14px',
  },
  ctaBtn: {
    background: 'linear-gradient(135deg, #40E0D0, #00A8A8)',
    border: 'none',
    borderRadius: '8px',
    color: '#050505',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '900',
    letterSpacing: '0.05em',
    padding: '16px 40px',
    textTransform: 'uppercase',
    transition: 'opacity 0.2s',
  },
  disclaimer: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '11px',
    letterSpacing: '0.05em',
    margin: '0',
    textTransform: 'uppercase',
  },
  // Quiz
  quizCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(64,224,208,0.15)',
    borderRadius: '16px',
    maxWidth: '680px',
    padding: '48px 40px',
    width: '100%',
  },
  progressWrap: {
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '100px',
    height: '3px',
    marginBottom: '32px',
    overflow: 'hidden',
    width: '100%',
  },
  progressBar: {
    background: 'linear-gradient(90deg, #40E0D0, #00A8A8)',
    borderRadius: '100px',
    height: '100%',
    transition: 'width 0.4s ease',
  },
  qCounter: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.1em',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  qText: {
    color: '#ffffff',
    fontSize: 'clamp(1.1rem, 3vw, 1.5rem)',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    lineHeight: '1.3',
    marginBottom: '32px',
  },
  answerGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  answerBtn: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px',
    color: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: '1.4',
    padding: '16px 20px',
    textAlign: 'left',
    transition: 'border-color 0.15s, background 0.15s',
  },
  // Calculating
  calcCard: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    maxWidth: '480px',
    textAlign: 'center',
    width: '100%',
    marginTop: '80px',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
    border: '2px solid rgba(64,224,208,0.15)',
    borderRadius: '50%',
    borderTopColor: '#40E0D0',
    height: '48px',
    width: '48px',
  },
  calcText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '14px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  calcDots: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  calcDot: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '12px',
    letterSpacing: '0.05em',
  },
  calcDotDot: {
    color: '#40E0D0',
    marginRight: '8px',
  },
  // Results
  resultsCard: {
    maxWidth: '760px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  scoreReveal: {
    alignItems: 'center',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
  },
  scoreBadge: {
    alignItems: 'baseline',
    display: 'flex',
    gap: '4px',
  },
  scoreNum: {
    color: '#40E0D0',
    fontSize: '64px',
    fontWeight: '900',
    letterSpacing: '-0.04em',
    lineHeight: '1',
  },
  scoreMax: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '24px',
    fontWeight: '700',
  },
  outcomeTag: {
    border: '1px solid',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '900',
    letterSpacing: '0.1em',
    padding: '8px 20px',
    textTransform: 'uppercase',
    color: '#40E0D0',
  },
  resultsH2: {
    color: '#ffffff',
    fontSize: 'clamp(1.4rem, 3.5vw, 2.2rem)',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    lineHeight: '1.15',
    margin: '0',
  },
  resultsBody: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: '15px',
    lineHeight: '1.7',
    margin: '0',
  },
  featureGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },
  featureCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(64,224,208,0.12)',
    borderRadius: '12px',
    display: 'flex',
    gap: '16px',
    padding: '20px',
  },
  featureIcon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  featureTitle: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '-0.01em',
    marginBottom: '6px',
    textTransform: 'uppercase',
  },
  featureDesc: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '12px',
    lineHeight: '1.5',
  },
  // Form
  form: {
    background: 'rgba(64,224,208,0.04)',
    border: '1px solid rgba(64,224,208,0.2)',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '36px',
  },
  formH3: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '-0.02em',
    margin: '0',
    textTransform: 'uppercase',
  },
  formSub: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '13px',
    lineHeight: '1.6',
    margin: '0',
  },
  formGrid: {
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  },
  input: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none',
    padding: '12px 16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  submitBtn: {
    background: 'linear-gradient(135deg, #40E0D0, #00A8A8)',
    border: 'none',
    borderRadius: '8px',
    color: '#050505',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '0.05em',
    padding: '16px',
    textTransform: 'uppercase',
    transition: 'opacity 0.2s',
  },
  formDisclaimer: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: '11px',
    letterSpacing: '0.04em',
    margin: '0',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  successMsg: {
    background: 'rgba(64,224,208,0.1)',
    border: '1px solid rgba(64,224,208,0.3)',
    borderRadius: '12px',
    color: '#40E0D0',
    fontSize: '14px',
    fontWeight: '700',
    letterSpacing: '0.05em',
    padding: '24px',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  // Thank You
  tyCard: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '760px',
    textAlign: 'center',
    width: '100%',
  },
  tyCheck: {
    background: 'rgba(64,224,208,0.1)',
    border: '2px solid rgba(64,224,208,0.4)',
    borderRadius: '50%',
    color: '#40E0D0',
    fontSize: '28px',
    height: '72px',
    lineHeight: '72px',
    width: '72px',
  },
  tyH2: {
    color: '#ffffff',
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    fontWeight: '900',
    letterSpacing: '-0.03em',
    margin: '0',
    textTransform: 'uppercase',
  },
  tyBody: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: '15px',
    lineHeight: '1.7',
    margin: '0',
    maxWidth: '520px',
  },
  demoBtn: {
    background: 'linear-gradient(135deg, #40E0D0, #00A8A8)',
    borderRadius: '8px',
    color: '#050505',
    display: 'inline-block',
    fontSize: '13px',
    fontWeight: '900',
    letterSpacing: '0.05em',
    padding: '14px 32px',
    textDecoration: 'none',
    textTransform: 'uppercase',
  },
  areasSection: {
    textAlign: 'left',
    width: '100%',
  },
  areasH3: {
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: '900',
    letterSpacing: '-0.02em',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },
  areasSub: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '13px',
    lineHeight: '1.5',
    marginBottom: '24px',
  },
  areasGrid: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  },
  areaCard: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
  },
  areaHeader: {
    alignItems: 'center',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
  },
  areaCategory: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '9px',
    fontWeight: '900',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  urgencyBadge: {
    border: '1px solid',
    borderRadius: '4px',
    fontSize: '9px',
    fontWeight: '900',
    letterSpacing: '0.08em',
    padding: '3px 8px',
    textTransform: 'uppercase',
  },
  areaTitle: {
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '800',
    letterSpacing: '-0.01em',
    lineHeight: '1.3',
  },
  areaLabel: {
    color: '#40E0D0',
    fontSize: '9px',
    fontWeight: '900',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  areaText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '12px',
    lineHeight: '1.6',
  },
  backToIndustrial: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    color: 'rgba(255,255,255,0.4)',
    cursor: 'pointer',
    fontSize: '12px',
    letterSpacing: '0.05em',
    padding: '12px 24px',
    textTransform: 'uppercase',
  },
};
