import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'


function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '3px', color: '#E2001A' }}>
      {children}
    </p>
  )
}

function MetaLabel({ children }: { children: string }) {
  return (
    <p className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '2px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px', marginBottom: '20px' }}>
      {children}
    </p>
  )
}

function Tag({ children, red, blue, green }: { children: string; red?: boolean; blue?: boolean; green?: boolean }) {
  const bg = red ? '#fff5f5' : blue ? '#eff6ff' : green ? '#f0fdf4' : '#f5f5f5'
  const border = red ? '#fecaca' : blue ? '#bfdbfe' : green ? '#bbf7d0' : '#e5e5e5'
  const color = red ? '#E2001A' : blue ? '#3b82f6' : green ? '#16a34a' : '#525252'
  return (
    <span style={{
      fontSize: '10px',
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      padding: '3px 10px',
      background: bg,
      border: `1px solid ${border}`,
      color,
      display: 'inline-block',
      marginRight: '6px',
      marginBottom: '6px',
    }}>
      {children}
    </span>
  )
}

// ─── Illusion ratio pill ──────────────────────────────────────────────────────

function RatioPill({ ratio }: { ratio: number }) {
  const isExtreme = ratio >= 15
  const isHigh = ratio >= 8
  const color = isExtreme ? '#E2001A' : isHigh ? '#d97706' : '#525252'
  const bg = isExtreme ? '#fff5f5' : isHigh ? '#fffbeb' : '#f5f5f5'
  const border = isExtreme ? '#fecaca' : isHigh ? '#fde68a' : '#e5e5e5'
  return (
    <span style={{
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      fontSize: '13px',
      fontWeight: 700,
      color,
      background: bg,
      border: `1px solid ${border}`,
      padding: '3px 10px',
      display: 'inline-block',
    }}>
      {ratio.toFixed(1)}×
    </span>
  )
}

// ─── Failure type badge ───────────────────────────────────────────────────────

function TypeBadge({ type }: { type: 'EMBARRASSING' | 'ADJACENT' | 'IRRELEVANT' | 'MISSING' }) {
  const cfg = {
    EMBARRASSING: { color: '#E2001A', bg: '#fff5f5', border: '#fecaca' },
    ADJACENT:     { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    IRRELEVANT:   { color: '#737373', bg: '#f5f5f5', border: '#e5e5e5' },
    MISSING:      { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
  }
  const c = cfg[type]
  return (
    <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: '3px 8px' }}>
      {type}
    </span>
  )
}

function BlindSpotBadge({ spot }: { spot: 'INVISIBLE' | 'PARTIAL' | 'VISIBLE' }) {
  const cfg = {
    INVISIBLE: { color: '#E2001A', bg: '#fff5f5', border: '#fecaca' },
    PARTIAL:   { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
    VISIBLE:   { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  }
  const c = cfg[spot]
  return (
    <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: c.color, background: c.bg, border: `1px solid ${c.border}`, padding: '3px 8px' }}>
      {spot}
    </span>
  )
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const categories = [
  { name: 'Schwangerschaft', failures: 10, avgAnalytics: 0.5,  avgSim: 7.3, avgRatio: 14.7, topFailure: 'Übelkeit Schwangerschaft ohne Tabletten', topRatio: 18.4 },
  { name: 'Allergie',        failures: 10, avgAnalytics: 0.7,  avgSim: 7.3, avgRatio: 13.5, topFailure: 'Heuschnupfen ohne Antihistaminikum',      topRatio: 18.6 },
  { name: 'Haut',            failures: 10, avgAnalytics: 0.7,  avgSim: 6.7, avgRatio: 12.7, topFailure: 'Ekzem Juckreiz sofort lindern',           topRatio: 18.4 },
  { name: 'Baby',            failures: 10, avgAnalytics: 0.9,  avgSim: 6.7, avgRatio: 11.3, topFailure: 'Kleinkind hustet nachts stark',            topRatio: 18.0 },
  { name: 'Erkältung',       failures: 10, avgAnalytics: 1.2,  avgSim: 6.8, avgRatio: 11.0, topFailure: 'Husten ohne Codein Kinder',               topRatio: 17.8 },
  { name: 'Verdauung',       failures: 10, avgAnalytics: 1.7,  avgSim: 6.3, avgRatio: 10.2, topFailure: 'Durchfall Kind 2 Jahre sofort',           topRatio: 18.4 },
  { name: 'Stress',          failures: 10, avgAnalytics: 1.6,  avgSim: 6.8, avgRatio: 10.0, topFailure: 'Angst Tabletten ohne Rezept',             topRatio: 18.4 },
  { name: 'Abnehmen',        failures: 10, avgAnalytics: 0.9,  avgSim: 5.7, avgRatio: 10.0, topFailure: 'Fettverdauung natürlich Kapseln',         topRatio: 18.8 },
  { name: 'Vitamine',        failures: 10, avgAnalytics: 0.7,  avgSim: 5.4, avgRatio:  9.7, topFailure: 'Probiotika Baby 6 Monate',                topRatio: 14.0 },
  { name: 'Schmerzen',       failures: 10, avgAnalytics: 1.7,  avgSim: 5.4, avgRatio:  7.3, topFailure: 'Zahnschmerzen Kind 4 Jahre',              topRatio: 18.4 },
  { name: 'Sleep',           failures:  6, avgAnalytics: 2.8,  avgSim: 7.4, avgRatio:  7.2, topFailure: 'Schlaf verbessern ohne Tabletten',         topRatio: 18.8 },
  { name: 'Sponsored',       failures:  3, avgAnalytics: 2.5,  avgSim: 7.3, avgRatio:  2.9, topFailure: 'Baldrian',                                topRatio:  3.4 },
]

const top10 = [
  { rank: 1,  query: 'Schlaf verbessern ohne Tabletten',          category: 'Sleep',           type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.4, ratio: 18.8, note: 'Engine returned a prescription stimulant (Modafinil)' },
  { rank: 2,  query: 'Fettverdauung natürlich Kapseln',            category: 'Abnehmen',        type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.4, ratio: 18.8, note: 'Prescription thyroid hormone returned for "natural fat digestion"' },
  { rank: 3,  query: 'Heuschnupfen ohne Antihistaminikum',         category: 'Allergie',        type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.3, ratio: 18.6, note: 'Engine returned an antihistamine for query explicitly excluding them' },
  { rank: 4,  query: 'Zahnschmerzen Kind 4 Jahre',                 category: 'Schmerzen',       type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Adult-concentration Rx anaesthetic returned for a toddler query' },
  { rank: 5,  query: 'Übelkeit Schwangerschaft ohne Tabletten',    category: 'Schwangerschaft', type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Prescription antiemetic tablet returned as top result' },
  { rank: 6,  query: 'Verstopfung Schwangerschaft natürlich',      category: 'Schwangerschaft', type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Contraindicated stimulant laxative returned for pregnant user' },
  { rank: 7,  query: 'Ekzem Juckreiz sofort lindern',              category: 'Haut',            type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Prescription sedating antihistamine ranked #1' },
  { rank: 8,  query: 'Durchfall Kind 2 Jahre sofort',              category: 'Verdauung',       type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Pharmacy search returned a contraindicated antidiarrhoeal for toddlers' },
  { rank: 9,  query: 'Angst Tabletten ohne Rezept',                category: 'Stress',          type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Engine ignored "ohne Rezept" modifier — returned Rx benzodiazepine' },
  { rank: 10, query: 'Konzentration Kind Schule ADHS natürlich',   category: 'Stress',          type: 'EMBARRASSING' as const, analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Prescription controlled stimulant returned for "natürlich" query' },
]

const personas = [
  { name: 'Acute Self-Treater',          score: 0.77, pct: 77, color: '#E2001A', reason: 'Seeks immediate OTC relief; prescription returns destroy trust at moment of peak need' },
  { name: 'Chronic Condition Manager',   score: 0.73, pct: 73, color: '#d97706', reason: 'High medication literacy — wrong results signal platform incompetence, not just inconvenience' },
  { name: 'Wellness Optimizer',          score: 0.70, pct: 70, color: '#d97706', reason: 'Researches extensively; supplement + natural-remedy failures collide with core shopping intent' },
  { name: 'Alternative Medicine Seeker', score: 0.55, pct: 55, color: '#737373', reason: 'Expects natural alternatives — Rx results are the exact opposite of stated intent' },
  { name: 'Anxious Young Mother',        score: 0.51, pct: 51, color: '#737373', reason: 'Peaks on child + pregnancy queries at 18×; lower average because safe categories dilute score' },
]

const blindSpotBreakdown = [
  { label: 'INVISIBLE to analytics', count: 65, pct: 60, color: '#E2001A' },
  { label: 'PARTIAL visibility',     count: 44, pct: 40, color: '#d97706' },
  { label: 'VISIBLE to analytics',   count:  0, pct:  0, color: '#16a34a' },
]

const typeBreakdown = [
  { type: 'EMBARRASSING', count: 60, pct: 55, note: 'Engine actively returns wrong or dangerous results' },
  { type: 'ADJACENT',     count: 48, pct: 44, note: 'Off-intent results that superficially look plausible' },
  { type: 'IRRELEVANT',   count:  1, pct:  1, note: 'Entirely off-category' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UC7Page() {
  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <SharedNav activePage="use-cases" />

      {/* Hero */}
      <div style={{ background: '#0a0a0a', color: '#ffffff', padding: '72px 80px 60px' }}>
        <SectionLabel>Use Case 07 — Severity Illusion Mapping</SectionLabel>
        <h1 style={{ fontSize: '48px', fontWeight: 800, letterSpacing: '-1.5px', lineHeight: 1.05, margin: '20px 0 16px', color: '#ffffff' }}>
          Analytics Sees 1/10th<br />of the Real Damage
        </h1>
        <p style={{ fontSize: '18px', color: '#a3a3a3', lineHeight: 1.7, maxWidth: '640px', marginBottom: '40px' }}>
          Standard search analytics flags ~5% of these failures as problems. Persona simulation reveals the true user-perceived severity — a systematic 10× blind spot that compounds across every high-stakes pharmacy category.
        </p>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { value: '109', label: 'Failures mapped' },
            { value: '11', label: 'Categories' },
            { value: '10×', label: 'Avg illusion ratio' },
            { value: '18.8×', label: 'Peak illusion ratio' },
            { value: '60%', label: 'INVISIBLE to analytics' },
                      ].map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
              <div style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#737373', textTransform: 'uppercase', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* What is the illusion ratio */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <MetaLabel>Methodology</MetaLabel>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a0a0a', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              What is the Illusion Ratio?
            </h2>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: 1.7, marginBottom: '20px' }}>
              Most search quality teams measure failures using analytics signals: zero-result rate, click-through rate, reformulation rate. These metrics capture what happened — not how badly it hurt.
            </p>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: 1.7, marginBottom: '28px' }}>
              The <strong>illusion ratio</strong> is the gap between what analytics thinks a failure costs and what the affected persona actually experiences. A ratio of 10× means the user's real damage is ten times worse than the dashboards suggest.
            </p>
            <div style={{ background: '#f5f5f5', border: '1px solid #e5e5e5', padding: '20px 24px', fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
              <div style={{ fontSize: '12px', color: '#737373', marginBottom: '8px' }}>ILLUSION RATIO</div>
              <div style={{ fontSize: '18px', color: '#0a0a0a', fontWeight: 700 }}>
                simulation_score ÷ analytics_score
              </div>
              <div style={{ fontSize: '12px', color: '#737373', marginTop: '10px' }}>
                Higher = analytics is more blind to real user damage
              </div>
            </div>
          </div>
          <div>
            <MetaLabel>Scoring model</MetaLabel>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0a0a0a', marginBottom: '16px' }}>Analytics score (rule-based)</h3>
            <div style={{ fontSize: '13px', color: '#525252', lineHeight: 1.7, marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'baseline' }}>
                <code style={{ fontSize: '12px', fontFamily: "'SF Mono', monospace", background: '#fff5f5', border: '1px solid #fecaca', color: '#E2001A', padding: '2px 8px', whiteSpace: 'nowrap' }}>0–1</code>
                <span>Zero results or prescription mismatch — not logged by standard tooling</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'baseline' }}>
                <code style={{ fontSize: '12px', fontFamily: "'SF Mono', monospace", background: '#fffbeb', border: '1px solid #fde68a', color: '#d97706', padding: '2px 8px', whiteSpace: 'nowrap' }}>2–5</code>
                <span>Low CTR or high reformulation — marginal alert signal</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                <code style={{ fontSize: '12px', fontFamily: "'SF Mono', monospace", background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a', padding: '2px 8px', whiteSpace: 'nowrap' }}>6–10</code>
                <span>High confidence signal — visible in dashboards</span>
              </div>
            </div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0a0a0a', marginBottom: '16px' }}>Simulation score (Claude Haiku)</h3>
            <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.7 }}>
              Each failure is independently classified (type + blind spot) and scored against all 5 pharmacy personas using the Frustration Propagation Simulation trust decay framework. The simulation score is the worst-case persona severity — calibrated to real-world patient urgency, medical context, and trust dynamics.
            </p>
          </div>
        </div>
      </div>

      {/* Failure taxonomy */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
        <MetaLabel>Failure taxonomy</MetaLabel>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a0a0a', marginBottom: '32px', letterSpacing: '-0.5px' }}>
          How Failures Are Classified
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}>
          {[
            { type: 'EMBARRASSING', color: '#E2001A', bg: '#fff5f5', border: '#fecaca', desc: 'Engine actively returns the wrong thing — a prescription drug for an OTC query, a contraindicated product, or a direct negation of intent.' },
            { type: 'ADJACENT',     color: '#d97706', bg: '#fffbeb', border: '#fde68a', desc: 'Results are in the right ballpark but wrong intent. User gets Vitamin C when they searched for "Erkältung Kinder" — plausible but doesn\'t convert.' },
            { type: 'IRRELEVANT',   color: '#737373', bg: '#f5f5f5', border: '#e5e5e5', desc: 'Completely off-category. Rarest failure type — usually caught by zero-result monitoring or immediate bounce.' },
            { type: 'MISSING',      color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', desc: 'The right product exists in catalogue but the search engine doesn\'t surface it. A rankin failure, not a catalogue gap.' },
          ].map(t => (
            <div key={t.type} style={{ background: '#ffffff', padding: '24px' }}>
              <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: t.color, background: t.bg, border: `1px solid ${t.border}`, padding: '3px 8px', display: 'inline-block', marginBottom: '14px' }}>
                {t.type}
              </span>
              <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.65 }}>{t.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1px', background: '#e5e5e5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px' }}>
            {[
              { spot: 'INVISIBLE', color: '#E2001A', bg: '#fff5f5', border: '#fecaca', desc: 'Zero-result monitoring and CTR signals see nothing. The failure is completely hidden from standard dashboards.' },
              { spot: 'PARTIAL',   color: '#d97706', bg: '#fffbeb', border: '#fde68a', desc: 'Some downstream signal exists (elevated reformulation, low CTR) but doesn\'t surface root cause or severity.' },
              { spot: 'VISIBLE',   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', desc: 'Analytics flags the failure. Very rare — most failures that are visible are already being addressed.' },
            ].map(t => (
              <div key={t.spot} style={{ background: '#ffffff', padding: '24px' }}>
                <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: t.color, background: t.bg, border: `1px solid ${t.border}`, padding: '3px 8px', display: 'inline-block', marginBottom: '14px' }}>
                  BLIND SPOT — {t.spot}
                </span>
                <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key stats strip */}
      <div style={{ background: '#0a0a0a', padding: '32px 80px', display: 'flex', gap: '0', borderBottom: '1px solid #1a1a1a' }}>
        {[
          { value: '60', label: 'failures INVISIBLE to analytics', note: 'Zero-result monitoring catches nothing' },
          { value: '44', label: 'failures PARTIALLY visible', note: 'Some signal, no actionable root cause' },
          { value: '0', label: 'failures fully visible', note: 'Standard dashboards are effectively blind' },
        ].map((s, i) => (
          <div key={s.label} style={{ flex: 1, padding: '0 40px', borderLeft: i > 0 ? '1px solid #1a1a1a' : 'none' }}>
            <div style={{ fontSize: '40px', fontWeight: 800, color: i === 0 ? '#E2001A' : i === 1 ? '#d97706' : '#16a34a', letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
            <div style={{ fontSize: '12px', color: '#e5e5e5', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: '11px', color: '#737373', marginTop: '4px' }}>{s.note}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown table */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
        <MetaLabel>Results by category — 109 failures across 11 pharmacy domains</MetaLabel>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a0a0a', marginBottom: '32px', letterSpacing: '-0.5px' }}>
          Category Summary
        </h2>
        <div style={{ border: '1px solid #e5e5e5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 80px 110px 110px 110px 1fr', background: '#f5f5f5', borderBottom: '1px solid #e5e5e5', padding: '10px 20px' }}>
            {['CATEGORY', 'N', 'AVG ANALYTICS', 'AVG SIM', 'AVG RATIO', 'TOP ILLUSION FAILURE'].map(h => (
              <span key={h} className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>{h}</span>
            ))}
          </div>
          {[...categories].sort((a, b) => b.avgRatio - a.avgRatio).map((c, i) => (
            <div key={c.name} style={{
              display: 'grid',
              gridTemplateColumns: '160px 80px 110px 110px 110px 1fr',
              padding: '16px 20px',
              borderBottom: i < categories.length - 1 ? '1px solid #e5e5e5' : 'none',
              background: i % 2 === 0 ? '#ffffff' : '#fafafa',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a' }}>{c.name}</span>
              <span style={{ fontSize: '13px', color: '#525252', fontFamily: "'SF Mono', monospace" }}>{c.failures}</span>
              <span style={{ fontSize: '13px', color: '#737373', fontFamily: "'SF Mono', monospace" }}>{c.avgAnalytics.toFixed(1)}</span>
              <span style={{ fontSize: '13px', color: '#0a0a0a', fontFamily: "'SF Mono', monospace", fontWeight: 600 }}>{c.avgSim.toFixed(1)}</span>
              <RatioPill ratio={c.avgRatio} />
              <div>
                <div style={{ fontSize: '12px', color: '#525252', marginBottom: '2px' }}>&ldquo;{c.topFailure}&rdquo;</div>
                <span style={{ fontSize: '11px', fontFamily: "'SF Mono', monospace", color: '#E2001A', fontWeight: 700 }}>{c.topRatio.toFixed(1)}×</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 10 illusions */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
        <MetaLabel>Worst-case severity illusions</MetaLabel>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Top 10 Severity Illusions
        </h2>
        <p style={{ fontSize: '14px', color: '#737373', marginBottom: '32px', lineHeight: 1.6 }}>
          Analytics score for all 10 is 0.5 — below any alert threshold. Simulation score ranges 9.2–9.4. These failures are completely invisible to standard tooling.
        </p>
        <div style={{ border: '1px solid #e5e5e5' }}>
          {top10.map((f, i) => (
            <div key={f.rank} style={{
              borderLeft: '4px solid #E2001A',
              borderBottom: i < top10.length - 1 ? '1px solid #e5e5e5' : 'none',
              background: i % 2 === 0 ? '#ffffff' : '#fafafa',
              padding: '20px 28px',
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '11px', color: '#737373', fontWeight: 700, minWidth: '24px' }}>#{f.rank}</span>
                <code style={{ fontSize: '14px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '3px 10px', border: '1px solid #e5e5e5' }}>
                  &ldquo;{f.query}&rdquo;
                </code>
                <TypeBadge type={f.type} />
                <Tag>{f.category}</Tag>
                <RatioPill ratio={f.ratio} />
                <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px', fontFamily: "'SF Mono', monospace", fontSize: '11px' }}>
                  <span style={{ color: '#16a34a' }}>analytics: {f.analytics}</span>
                  <span style={{ color: '#E2001A' }}>sim: {f.sim}</span>
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.6, paddingLeft: '36px' }}>{f.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown bars */}
      <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>

          {/* Failure types */}
          <div>
            <MetaLabel>Failure type distribution — 109 failures</MetaLabel>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a0a0a', marginBottom: '28px', letterSpacing: '-0.3px' }}>What the engine is doing wrong</h3>
            {typeBreakdown.map(t => {
              const colors: Record<string, string> = { EMBARRASSING: '#E2001A', ADJACENT: '#d97706', IRRELEVANT: '#737373' }
              const bgs: Record<string, string>    = { EMBARRASSING: '#fff5f5', ADJACENT: '#fffbeb', IRRELEVANT: '#f5f5f5' }
              const borders: Record<string, string>= { EMBARRASSING: '#fecaca', ADJACENT: '#fde68a', IRRELEVANT: '#e5e5e5' }
              return (
                <div key={t.type} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: colors[t.type], background: bgs[t.type], border: `1px solid ${borders[t.type]}`, padding: '3px 8px' }}>
                      {t.type}
                    </span>
                    <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '13px', fontWeight: 700, color: colors[t.type] }}>
                      {t.count} &nbsp;<span style={{ fontSize: '11px', color: '#737373' }}>({t.pct}%)</span>
                    </span>
                  </div>
                  <div style={{ background: '#f5f5f5', height: '8px', width: '100%', border: '1px solid #e5e5e5' }}>
                    <div style={{ background: colors[t.type], height: '100%', width: `${t.pct}%`, opacity: 0.7 }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#737373', marginTop: '6px', lineHeight: 1.5 }}>{t.note}</p>
                </div>
              )
            })}
          </div>

          {/* Blind spots */}
          <div>
            <MetaLabel>Analytics blind spot coverage — all 109 failures</MetaLabel>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0a0a0a', marginBottom: '28px', letterSpacing: '-0.3px' }}>What standard dashboards see</h3>
            {blindSpotBreakdown.map(b => (
              <div key={b.label} style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a0a0a' }}>{b.label}</span>
                  <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '13px', fontWeight: 700, color: b.color }}>
                    {b.count} &nbsp;<span style={{ fontSize: '11px', color: '#737373' }}>({b.pct}%)</span>
                  </span>
                </div>
                <div style={{ background: '#f5f5f5', height: '8px', width: '100%', border: '1px solid #e5e5e5' }}>
                  <div style={{ background: b.color, height: '100%', width: `${b.pct}%`, opacity: 0.7 }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: '32px', background: '#fff5f5', border: '1px solid #fecaca', padding: '16px 20px' }}>
              <p style={{ fontSize: '13px', color: '#E2001A', fontWeight: 600, marginBottom: '6px' }}>The implication</p>
              <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.6 }}>
                Zero-result rate, click-through rate, and session reformulation rate — the three standard signals — flag <strong>0 of 65 invisible failures</strong>. You would need persona simulation to discover them.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Persona vulnerability */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
        <MetaLabel>Persona vulnerability — avg severity across all 109 failures</MetaLabel>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          Who Gets Hurt Most
        </h2>
        <p style={{ fontSize: '14px', color: '#737373', marginBottom: '36px', lineHeight: 1.6 }}>
          Severity is scored 0–1 per persona per failure, averaged across all 109. The Acute Self-Treater is most exposed — not just occasionally, but structurally across all categories.
        </p>
        <div style={{ border: '1px solid #e5e5e5', background: '#ffffff' }}>
          {personas.map((p, i) => (
            <div key={p.name} style={{
              display: 'grid',
              gridTemplateColumns: '240px 80px 1fr 360px',
              gap: '24px',
              padding: '20px 28px',
              borderBottom: i < personas.length - 1 ? '1px solid #e5e5e5' : 'none',
              background: i % 2 === 0 ? '#ffffff' : '#fafafa',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a' }}>{p.name}</span>
              <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '16px', fontWeight: 800, color: p.color }}>{p.score.toFixed(2)}</span>
              <div style={{ background: '#f5f5f5', height: '8px', border: '1px solid #e5e5e5' }}>
                <div style={{ background: p.color, height: '100%', width: `${p.pct}%`, opacity: 0.75 }} />
              </div>
              <p style={{ fontSize: '12px', color: '#737373', lineHeight: 1.5 }}>{p.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Synthesis */}
      <div style={{ background: '#0a0a0a', padding: '56px 80px', borderBottom: '1px solid #1a1a1a' }}>
        <SectionLabel>Synthesis</SectionLabel>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginBottom: '32px', letterSpacing: '-0.8px', marginTop: '16px' }}>
          Four Structural Findings
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {[
            {
              n: '01',
              title: 'The 10× blind spot is consistent, not an outlier',
              body: '9 out of 12 categories show an average illusion ratio above 7×. This is not a bad-luck cluster of queries — it is a systematic measurement gap that affects every major pharmacy category on the platform.',
            },
            {
              n: '02',
              title: 'EMBARRASSING failures dominate (55%) and are fully invisible',
              body: 'The engine returns prescription drugs for OTC queries, contraindicated products for pregnancy searches, adult-dose medicines for toddler queries. None of these trip zero-result alerts. They look like successful sessions.',
            },
            {
              n: '03',
              title: 'Schwangerschaft and Allergie are the highest-risk categories',
              body: 'Both average above 13× illusion ratio. Pregnant users and allergy sufferers are sending safety-critical queries. The combination of high emotional stakes, medication constraints, and engine unawareness creates maximum trust damage.',
            },
            {
              n: '04',
              title: 'Persona simulation cannot be replaced by threshold tuning',
              body: 'Lowering the zero-result alert threshold to 0.1% will not surface these failures — there are results, they\'re just wrong. The only path to catching these is semantic intent modeling combined with persona-specific consequence scoring.',
            },
          ].map(f => (
            <div key={f.n} style={{ background: '#111111', border: '1px solid #1a1a1a', padding: '28px 32px' }}>
              <div style={{ fontFamily: "'SF Mono', monospace", fontSize: '11px', color: '#E2001A', marginBottom: '12px', fontWeight: 700 }}>{f.n}</div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', lineHeight: 1.4 }}>{f.title}</h3>
              <p style={{ fontSize: '13px', color: '#a3a3a3', lineHeight: 1.7 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* What needs to happen */}
      <div style={{ background: '#ffffff', padding: '48px 80px', borderBottom: '1px solid #e5e5e5' }}>
        <MetaLabel>Recommended actions</MetaLabel>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0a0a0a', marginBottom: '32px', letterSpacing: '-0.5px' }}>
          What Needs to Happen
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}>
          {[
            {
              priority: 'P0 — Safety',
              color: '#E2001A',
              bg: '#fff5f5',
              border: '#fecaca',
              title: 'Prescription drug filter on OTC queries',
              body: 'Block Rx-only products from surfacing on queries marked OTC intent. 60 EMBARRASSING failures are caused by this single gap. Affects all 11 categories.',
              impact: 'Fixes 55% of dataset immediately',
            },
            {
              priority: 'P1 — Intent',
              color: '#d97706',
              bg: '#fffbeb',
              border: '#fde68a',
              title: 'Negation modifier parsing',
              body: '"ohne X" and "ohne Antibiotika" patterns are structurally ignored. Query intent is inverted. 38 failures trace to negation blindness across Sleep, Stress, Allergie, Erkältung.',
              impact: 'Fixes ~35% of adjacent failures',
            },
            {
              priority: 'P2 — Context',
              color: '#3b82f6',
              bg: '#eff6ff',
              border: '#bfdbfe',
              title: 'Safety-constraint indexing',
              body: 'Schwangerschaft, Baby, and Kinder queries require constraint-aware ranking. Products contraindicated in pregnancy must not surface at #1. Catalogue metadata exists — ranking model ignores it.',
              impact: 'Fixes highest-ratio category (14.7×)',
            },
          ].map(a => (
            <div key={a.priority} style={{ background: '#ffffff', padding: '28px 28px' }}>
              <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: a.color, background: a.bg, border: `1px solid ${a.border}`, padding: '3px 8px', display: 'inline-block', marginBottom: '16px' }}>
                {a.priority}
              </span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0a0a0a', marginBottom: '10px', lineHeight: 1.4 }}>{a.title}</h3>
              <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.65, marginBottom: '16px' }}>{a.body}</p>
              <div style={{ fontSize: '11px', fontWeight: 700, color: a.color, background: a.bg, border: `1px solid ${a.border}`, padding: '6px 12px', display: 'inline-block', letterSpacing: '0.5px' }}>
                {a.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta strip */}
      <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '24px 80px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Tag>Severity Illusion Simulation</Tag>
        <Tag>109 failures</Tag>
        <Tag>Claude Haiku 4.5 · 218 calls</Tag>
        <Tag green>$0.218 total cost</Tag>
        <Tag>11 categories</Tag>
        <Tag red>60% INVISIBLE to analytics</Tag>
        <Tag>Frustration Propagation Simulation trust decay framework</Tag>
        <div style={{ marginLeft: 'auto' }}>
          <Link href="/use-cases" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid #e5e5e5', paddingBottom: '2px' }}>
            ← All Use Cases
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
