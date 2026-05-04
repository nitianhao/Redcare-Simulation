import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'

// ─── Nav ─────────────────────────────────────────────────────────────────────


// ─── Shared sub-components ────────────────────────────────────────────────────

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

function Tag({ children, red }: { children: string; red?: boolean }) {
  return (
    <span style={{
      fontSize: '10px',
      fontFamily: "'SF Mono', 'Fira Code', monospace",
      padding: '3px 10px',
      background: red ? '#fff5f5' : '#f5f5f5',
      border: `1px solid ${red ? '#fecaca' : '#e5e5e5'}`,
      color: red ? '#E2001A' : '#525252',
      display: 'inline-block',
      marginRight: '6px',
      marginBottom: '6px',
    }}>
      {children}
    </span>
  )
}

function OutputChip({ children }: { children: string }) {
  return (
    <div style={{ fontSize: '11px', color: '#525252', background: '#ffffff', border: '1px solid #e5e5e5', padding: '6px 14px', letterSpacing: '0.3px', display: 'inline-block', marginRight: '8px', marginBottom: '8px' }}>
      {children}
    </div>
  )
}

function FindingRow({ severity, query, resultCount, topResult, rootCause, fixPath, idx }: {
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM'
  query: string
  resultCount: number
  topResult: string
  rootCause: string
  fixPath: string
  idx: number
}) {
  const colors = { CRITICAL: '#E2001A', HIGH: '#d97706', MEDIUM: '#737373' }
  const color = colors[severity]
  return (
    <div style={{
      borderLeft: `4px solid ${color}`,
      borderBottom: idx < 999 ? '1px solid #e5e5e5' : 'none',
      background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
      padding: '24px 28px',
    }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
        <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color, background: color === '#E2001A' ? '#fff5f5' : color === '#d97706' ? '#fffbeb' : '#f5f5f5', padding: '3px 8px', border: `1px solid ${color}` }}>
          {severity}
        </span>
        <code style={{ fontSize: '14px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '3px 10px', border: '1px solid #e5e5e5' }}>
          &ldquo;{query}&rdquo;
        </code>
        <span className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '1.5px', color: '#737373', marginLeft: 'auto' }}>
          {resultCount} results
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>TOP RESULT</p>
          <p style={{ fontSize: '13px', color: '#E2001A', fontWeight: 600 }}>{topResult}</p>
        </div>
        <div>
          <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>ROOT CAUSE</p>
          <p style={{ fontSize: '13px', color: '#525252', lineHeight: '1.55' }}>{rootCause}</p>
        </div>
      </div>
      <div style={{ marginTop: '14px', padding: '10px 14px', background: '#f5f5f5', borderLeft: '3px solid #e5e5e5', fontSize: '12px', color: '#737373', lineHeight: '1.5' }}>
        <strong style={{ color: '#525252' }}>Fix path: </strong>{fixPath}
      </div>
    </div>
  )
}

// ─── UC3 reformulation tree nodes ─────────────────────────────────────────────

function TreeNode({ query, state, note, isEnd, endType }: {
  query: string
  state: 'FOUND' | 'PARTIAL' | 'NOTHING'
  note: string
  isEnd?: boolean
  endType?: 'convert' | 'abandon' | 'split'
}) {
  const stateColors = { FOUND: '#16a34a', PARTIAL: '#d97706', NOTHING: '#E2001A' }
  const endColors = { convert: '#16a34a', abandon: '#E2001A', split: '#d97706' }
  return (
    <div style={{ paddingLeft: '20px', borderLeft: '2px solid #e5e5e5', marginBottom: '16px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '6px' }}>
        <code style={{ fontSize: '13px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '2px 8px', border: '1px solid #e5e5e5' }}>
          {query}
        </code>
        <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: stateColors[state] }}>
          {state}
        </span>
      </div>
      <p style={{ fontSize: '12px', color: '#737373', lineHeight: '1.5', marginBottom: isEnd ? '8px' : '0' }}>
        {note}
      </p>
      {isEnd && endType && (
        <div style={{
          marginTop: '8px',
          padding: '6px 12px',
          background: endType === 'convert' ? '#f0fdf4' : endType === 'abandon' ? '#fff5f5' : '#fffbeb',
          border: `1px solid ${endType === 'convert' ? '#bbf7d0' : endType === 'abandon' ? '#fecaca' : '#fde68a'}`,
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: endColors[endType],
          display: 'inline-block',
        }}>
          {endType === 'convert' ? '✓ CONVERTS' : endType === 'abandon' ? '✕ HARD ABANDON' : '~ SPLIT BASKET'}
        </div>
      )}
    </div>
  )
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const uc8Findings = [
  { query: 'Melatonin', sponsored: 'Avitale Melatonin 1mg (cat: arzneimittel)', verdict: 'OK' as const, detail: 'Category match confirmed. More intent-aligned than several organic results. No conflict.', organic1: 'lunalaif guter schlaf kombi depot', revenue: 'LOW' },
  { query: 'Ibuprofen', sponsored: 'Redcare Ibuprofen 400mg — €4.19 (own brand)', verdict: 'NOTABLE' as const, detail: 'Category match confirmed. Own-brand at lowest price (€4.19 vs €6.19 competitors). Deliberate business decision — legitimate, but disclosure consideration in third-party audits.', organic1: 'ibuhexal akut 400mg — €6.19', revenue: 'LOW' },
  { query: 'Erkältung Kinder', sponsored: 'Redcare Infrarot-Stirnthermometer — €29.99', verdict: 'MISMATCH' as const, detail: 'All 4 organic results are treatment products (cough syrup, throat pastilles, fever reducer). Thermometer is a diagnostic device — wrong intent. Price gap: 4–5× organic results. Possible cross-sell but requires conversion data to confirm.', organic1: 'mucosolvan kindersaft — €6.29', revenue: 'MEDIUM' },
  { query: 'Kopfschmerzen', sponsored: 'Sanitätshaus medical device + broken creative ("Variante auswählen")', verdict: 'CRITICAL' as const, detail: 'Two failures combined: (A) sanitaetshaus product on symptom query — definitively wrong category. (B) broken ad creative — no readable product name, only "Variante auswählen" visible. Displaces togal kopfschmerz brause from #3 to #4. Spend wasted, trust cost real.', organic1: 'nurofen weichkapseln 400mg ibuprofen', revenue: 'HIGH' },
  { query: 'Baldrian', sponsored: 'Baldrian-ratiopharm überzogene Tabletten — €6.99', verdict: 'REVERSE' as const, detail: 'Sponsored product is directly on-intent. However, #1 organic result is Serotalin Melatonin Spray — a melatonin product with no Baldrian content. The sponsored placement is compensating for an organic ranking failure. Fix organic separately.', organic1: 'serotalin melatonin spray — €15.99 (WRONG)', revenue: 'LOW' },
  { query: 'Vitamin C', sponsored: 'WEPA Vitamin C+Zink Kapseln — €6.45 (own brand)', verdict: 'NOTABLE' as const, detail: 'Category match confirmed. Beyond the sponsored slot, positions #3 and #4 organic are also own-brand (Redcare). Platform controls 3 of 5 visible positions for a high-volume supplement query via both paid and organic levers simultaneously.', organic1: 'true nature vitamin c gepuffert — €19.99', revenue: 'LOW' },
  { query: 'Schlaf', sponsored: 'Schlafsterne + CBD Vital CBD Sleep (cat: homoeopathie)', verdict: 'OK' as const, detail: 'Both sponsored products are sleep-related. CBD in homoeopathie is a minor category mismatch but intent is met. No meaningful conflict.', organic1: 'alluna schlaf — €25.29', revenue: 'LOW' },
]

const verdictConfig = {
  OK:       { color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  NOTABLE:  { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  MISMATCH: { color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  CRITICAL: { color: '#E2001A', bg: '#fff5f5', border: '#fecaca' },
  REVERSE:  { color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UseCasesPage() {
  return (
    <main>
      <SharedNav activePage="use-cases" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-20 pt-16 pb-14" style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', display: 'flex', gap: '80px', alignItems: 'center' }}>
        <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
        <p className="mb-4 font-bold uppercase" style={{ fontSize: '11px', letterSpacing: '3px', color: '#E2001A' }}>
          SEARCH SIMULATION LAB — EXECUTED USE CASES
        </p>
        <h1 className="font-black leading-none mb-6" style={{ fontSize: '72px', letterSpacing: '-3px', color: '#0a0a0a' }}>
          6 USE CASES.
          <br />
          <em style={{ fontStyle: 'italic', color: '#E2001A' }}>EXECUTED.</em>
        </h1>
        <div className="mb-5" style={{ width: '60px', height: '3px', background: '#E2001A' }} />
        <p className="max-w-2xl leading-relaxed mb-10" style={{ fontSize: '16px', color: '#525252' }}>
          Every use case on this page has been fully built and run — not mocked, not
          specced. Each one produced real findings against live search data. This is the
          complete record of methodology, outputs, and what each experiment proved.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            ['6', 'USE CASES RUN'],
            ['5', 'PERSONAS BUILT'],
            ['136+', 'QUERIES SIMULATED'],
            ['123', 'FAILURES MAPPED'],
            ['10×', 'AVG ILLUSION RATIO'],
          ].map(([num, label]) => (
            <div key={label} style={{ border: '1px solid #e5e5e5', padding: '14px 22px', background: '#fafafa' }}>
              <div className="font-black" style={{ fontSize: '32px', letterSpacing: '-1.5px', color: '#0a0a0a', lineHeight: 1 }}>{num}</div>
              <div className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '2px', color: '#737373', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/hero-simulations.webp" alt="Search results for 'husten' showing 1675 results" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }} />
        </div>
      </section>

      {/* ── Index ──────────────────────────────────────────────────────────── */}
      <section className="px-20 py-10" style={{ background: '#fafafa', borderBottom: '2px solid #0a0a0a' }}>
        <p className="font-bold uppercase mb-6" style={{ fontSize: '10px', letterSpacing: '3px', color: '#737373' }}>
          JUMP TO SIMULATION
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { n: '01', name: 'Shopper Behavior Simulation', sub: 'Intent Variability across persona types', status: 'EXECUTED', anchor: '#uc01' },
            { n: '02', name: 'Frustration Propagation Simulation', sub: 'Trust Decay under repeated failures', status: 'EXECUTED', anchor: '#uc02' },
            { n: '03', name: 'Reformulation Burden Simulation', sub: 'Query Tree Analysis & rewrite cost', status: 'EXECUTED', anchor: '#uc03' },
            { n: '07', name: 'Severity Illusion Simulation', sub: 'Analytics Blind Spots in ranking', status: '109 FAILURES', anchor: '#uc07' },
            { n: '08', name: 'Sponsored vs Organic Audit', sub: 'Relevance parity across listing types', status: 'EXECUTED', anchor: '#uc08' },
            { n: '13', name: 'Synthetic Query Generation', sub: 'Gap Detection via LLM query synthesis', status: 'EXECUTED', anchor: '#uc13' },
          ].map(({ n, name, sub, status, anchor }) => (
            <a
              key={n}
              href={anchor}
              className="uc-index-row"
              style={{
                textDecoration: 'none',
                background: '#ffffff',
                border: '1px solid #e5e5e5',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '14px 20px',
              }}
            >
              {/* Number badge */}
              <span style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#E2001A',
                letterSpacing: '1px',
                minWidth: '24px',
                flexShrink: 0,
              }}>{n}</span>

              {/* Divider */}
              <span style={{ width: '1px', height: '32px', background: '#e5e5e5', flexShrink: 0 }} />

              {/* Name + sub */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.2 }}>{name}</div>
                <div style={{ fontSize: '11px', color: '#737373', marginTop: '2px' }}>{sub}</div>
              </div>

              {/* Status badge */}
              <span style={{
                fontSize: '9px',
                letterSpacing: '1px',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                color: status === 'EXECUTED' ? '#16a34a' : '#d97706',
                background: status === 'EXECUTED' ? '#f0fdf4' : '#fffbeb',
                padding: '3px 8px',
                border: `1px solid ${status === 'EXECUTED' ? '#bbf7d0' : '#fde68a'}`,
                flexShrink: 0,
              }}>{status}</span>

              {/* Arrow */}
              <span style={{ fontSize: '16px', color: '#737373', flexShrink: 0, marginLeft: '4px' }}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Shopper Behavior Simulation — Shopper Behavior                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="uc01" className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px' }}>
          <SectionLabel>SHOPPER BEHAVIOR SIMULATION — INTENT VARIABILITY</SectionLabel>
        </div>

        {/* The blind spot callout */}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #d97706', padding: '16px 24px', marginBottom: '40px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '20px', flexShrink: 0 }}>⚠️</span>
          <div>
            <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '2px', color: '#92400e' }}>THE ANALYTICS BLIND SPOT THIS EXPOSES</p>
            <p style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.6' }}>
              <strong>What monitoring sees for &ldquo;Baby Husten Mittel&rdquo;:</strong> 8 results returned · 0 error events · healthy CTR on position 1 · no alert triggered.&nbsp;
              <strong>What simulation reveals:</strong> 2 of 5 pharmacy personas exhausted their full reformulation budget and abandoned. No clicks. No session data. Neither failure is visible in any standard metric.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '48px' }}>
          {/* Left: results + headline */}
          <div>
            <h2 className="font-black leading-none mb-5" style={{ fontSize: '42px', letterSpacing: '-2px', color: '#0a0a0a' }}>
              ONE QUERY.
              <br />
              FIVE USERS.
              <br />
              <span style={{ color: '#E2001A' }}>TWO GAVE UP.</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65', marginBottom: '14px' }}>
              Shopper Behavior Simulation runs every pharmacy persona against the same SERP simultaneously. Each agent
              reads results through its own behavioral lens — trust signals, reformulation triggers,
              patience thresholds — and independently decides to click, scroll, reformulate, or abandon.
            </p>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65', marginBottom: '28px' }}>
              The aggregate reveals which intent segments the current ranking serves and which
              it structurally fails — before a single user session is lost.
            </p>

            {/* Stat row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5', marginBottom: '28px' }}>
              {[
                { value: '5', label: 'Personas run', warn: false },
                { value: '60%', label: 'Click rate', warn: false },
                { value: '40%', label: 'Abandon rate', warn: true },
                { value: 'Medium', label: 'Max satisfaction', warn: true },
              ].map(s => (
                <div key={s.label} style={{ background: '#ffffff', padding: '16px 12px', textAlign: 'center' }}>
                  <div className="font-black" style={{ fontSize: '24px', letterSpacing: '-1px', color: s.warn ? '#E2001A' : '#0a0a0a', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                  <div className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#737373' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* The SERP */}
            <MetaLabel>SERP PRESENTED TO ALL 5 PERSONAS</MetaLabel>
            <div style={{ background: '#fafafa', border: '1px solid #e5e5e5', padding: '14px 16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', padding: '7px 10px', background: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '4px', marginBottom: '10px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>🔍</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#374151', fontFamily: "'SF Mono', monospace" }}>Baby Husten Mittel</span>
                <span style={{ fontSize: '10px', color: '#9ca3af', marginLeft: 'auto' }}>8 results</span>
              </div>
              {[
                { pos: 1, title: 'Prospan Hustensaft für Kinder', price: '€8.99', tag: null },
                { pos: 2, title: 'Monapax Hustensaft — 150ml', price: '€12.49', tag: null },
                { pos: 3, title: 'Umckaloabo Hustensaft', price: '€11.99', tag: 'RX' },
                { pos: 4, title: 'Aspecton Hustentropfen — Kinder', price: '€9.99', tag: null },
                { pos: 5, title: 'Babys Gesundheit — Das große Buch', price: '€19.99', tag: 'BOOK' },
                { pos: 6, title: 'Weleda Hustensirup — natürlich', price: '€10.49', tag: null },
                { pos: 7, title: 'Bromhexin Hustentabletten 8mg', price: '€6.99', tag: 'ADULT' },
                { pos: 8, title: 'Neo-Angin Benzocain Lutschpastillen', price: '€5.99', tag: 'ADULT' },
              ].map(item => {
                const tagColor: Record<string, string> = { RX: '#dc2626', BOOK: '#6b7280', ADULT: '#d97706' }
                const tagLabel: Record<string, string> = { RX: 'PRESCRIPTION', BOOK: 'WRONG CAT.', ADULT: 'ADULT DOSE' }
                return (
                  <div key={item.pos} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '12px' }}>
                    <span style={{ color: '#9ca3af', fontWeight: 600, width: '16px', textAlign: 'right', flexShrink: 0 }}>{item.pos}</span>
                    <span style={{ color: '#0a0a0a', flex: 1 }}>{item.title}</span>
                    <span style={{ color: '#6b7280' }}>{item.price}</span>
                    {item.tag && (
                      <span style={{ fontSize: '9px', fontWeight: 700, color: tagColor[item.tag], background: tagColor[item.tag] + '15', border: `1px solid ${tagColor[item.tag]}40`, borderRadius: '3px', padding: '2px 5px', flexShrink: 0 }}>
                        {tagLabel[item.tag]}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: persona traces */}
          <div>
            <MetaLabel>PER-PERSONA JOURNEY — ACTUAL AGENT OUTPUT</MetaLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  icon: '👩', label: 'Anxious Young Mother', outcome: 'CLICKED #1', sat: 'MEDIUM SAT.', abandoned: false,
                  monologue: '"Prospan ist bekannt und für Kinder — aber Position 3 sagt Rx, das ist Rezept, absolut nein."',
                  note: 'Clicked Prospan. Rx result at #3 dented trust before click landed. No reformulation.',
                  reformulations: [],
                },
                {
                  icon: '🔬', label: 'Wellness Optimizer', outcome: 'CLICKED #1', sat: 'LOW SAT.', abandoned: false,
                  monologue: '"Nothing tells me the active ingredient or dosage — for a baby product, I need to know what\'s actually in there."',
                  note: 'Clicked Prospan as most clinically referenced option. Explicitly stated she would reformulate if PDP lacks ingredient detail.',
                  reformulations: [],
                },
                {
                  icon: '👴', label: 'Elderly Caregiver', outcome: 'ABANDONED', sat: null, abandoned: true,
                  monologue: '"Ich sehe Saftflaschen ohne Altersangabe, Tabletten für Babys zu stark, und sogar ein Buch."',
                  note: 'Needed age suitability (ab 6 Monaten) + volume (100ml). Reformed twice — swapped word order on attempt 2. No structural improvement. Abandoned.',
                  reformulations: ['Baby Hustensaft ab 6 Monaten 100ml', 'Hustensaft Baby 100ml 6 Monate'],
                },
                {
                  icon: '🏃', label: 'Acute Self-Treater', outcome: 'CLICKED #1', sat: 'MEDIUM SAT.', abandoned: false,
                  monologue: '"Is #3 prescription-only? That\'s confusing and makes me nervous, and I\'m too tired to figure this out."',
                  note: 'Grabbed Prospan under time pressure. Trust already eroded by Rx result before clicking.',
                  reformulations: [],
                },
                {
                  icon: '🌿', label: 'Alternative Medicine Seeker', outcome: 'ABANDONED', sat: null, abandoned: true,
                  monologue: '"Die Shop-Apotheke hat offensichtlich nicht verstanden, was ich suche."',
                  note: 'Escalated: generic intent → product category → exact INN+potency. Never found Globuli across 3 reformulations. Likely a catalog gap.',
                  reformulations: ['Baby Husten Globuli homöopathisch', 'Aconitum napellus D12 Globuli Husten Kinder', 'Aconitum napellus D12 Globuli'],
                },
              ].map(p => (
                <div key={p.label} style={{ background: p.abandoned ? '#fef2f2' : '#fafafa', border: `1px solid ${p.abandoned ? '#fca5a5' : '#e5e5e5'}`, borderRadius: '6px', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 14px', borderBottom: '1px solid #f3f4f6' }}>
                    <span style={{ fontSize: '18px' }}>{p.icon}</span>
                    <span className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a', flex: 1 }}>{p.label}</span>
                    <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '0.5px', padding: '2px 8px', borderRadius: '3px', background: p.abandoned ? '#dc2626' : p.sat === 'LOW SAT.' ? '#d97706' : '#16a34a', color: '#ffffff' }}>
                      {p.abandoned ? 'ABANDONED' : `${p.outcome} — ${p.sat}`}
                    </span>
                  </div>
                  <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', fontStyle: 'italic', borderLeft: '3px solid #e5e5e5', paddingLeft: '10px', lineHeight: '1.6', margin: 0 }}>{p.monologue}</p>
                    {p.reformulations.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
                        {p.reformulations.map((q, i) => (
                          <span key={i} style={{ fontSize: '10px', background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '3px', padding: '2px 6px', color: '#92400e', fontFamily: 'monospace' }}>{q}</span>
                        ))}
                        <span style={{ fontSize: '10px', background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '3px', padding: '2px 6px', color: '#991b1b', fontWeight: 700 }}>GAVE UP</span>
                      </div>
                    )}
                    <p style={{ fontSize: '11px', color: '#374151', lineHeight: '1.5', margin: 0 }}>{p.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ranked findings */}
        <MetaLabel>RANKED FINDINGS FROM SIMULATION</MetaLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e5e5', marginBottom: '40px' }}>
          {[
            {
              rank: 'P0', color: '#E2001A',
              title: 'Homeopathic catalog gap',
              description: 'Alternative Medicine Seeker escalated through 3 progressively specific queries — generic intent → product category → exact INN+potency (Aconitum napellus D12). Never found Globuli. Either products are absent from catalog or not associated with the Husten/Baby taxonomy.',
              affected: 'Alternative Medicine Seeker — complete failure, zero results',
              fix: 'Audit homeopathic SKU taxonomy. Map Globuli to symptom + age-band facets. Confirm catalog coverage for potency-specific queries.',
            },
            {
              rank: 'P1', color: '#d97706',
              title: 'Missing age-band and volume facets',
              description: 'Elderly Caregiver added "ab 6 Monaten" and "100ml" constraints over two reformulations — even swapping word order on round 2, signalling she suspected a tokenisation issue. Full-text search cannot compensate for missing structured facets on pediatric age range and package size.',
              affected: 'Elderly Caregiver — complete failure, zero results',
              fix: 'Add age_suitability and volume_ml as filterable facets. Surface them in SERP snippets. Index "ab 6 Monaten" as an age-band attribute, not a freetext match.',
            },
            {
              rank: 'P2', color: '#525252',
              title: 'Click satisfaction ceiling at medium — Rx result eroding trust',
              description: 'All 3 clicks landed on position 1 (Prospan) — yet no persona rated satisfaction higher than medium. The Rx product at position 3 reduced trust before any click. Wellness Optimizer additionally flagged missing ingredient/dosage data on the PDP as a secondary conversion risk.',
              affected: 'Anxious Young Mother, Wellness Optimizer, Acute Self-Treater',
              fix: 'Add clear PRESCRIPTION badge to Rx items in SERP. Demote below fold for OTC-intent queries. Add active ingredient callout and age-range safety label to result snippets.',
            },
          ].map(({ rank, color, title, description, affected, fix }, i) => (
            <div key={rank} style={{ display: 'grid', gridTemplateColumns: '48px 200px 1fr 1fr', gap: '24px', padding: '20px 24px', borderBottom: i < 2 ? '1px solid #e5e5e5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'start' }}>
              <span className="font-black" style={{ fontSize: '20px', color }}>{rank}</span>
              <p className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a', margin: 0 }}>{title}</p>
              <div>
                <p style={{ fontSize: '12px', color: '#525252', lineHeight: '1.55', marginBottom: '8px' }}>{description}</p>
                <p style={{ fontSize: '11px', color, fontWeight: 600 }}>↳ {affected}</p>
              </div>
              <div>
                <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#737373' }}>Fix</p>
                <p style={{ fontSize: '12px', color: '#525252', lineHeight: '1.5' }}>{fix}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Before / After */}
        <MetaLabel>BEFORE vs. AFTER — SAME QUERY, FIXED SERP</MetaLabel>
        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '13px', color: '#525252', lineHeight: '1.6', marginBottom: '20px', maxWidth: '760px' }}>
            The three findings above map directly to three SERP changes: Rx result demoted and labeled,
            age-range now visible in product titles (simulating a facet fix), and two Globuli products
            added at positions 5–6 (simulating a catalog taxonomy fix). Re-running the identical simulation
            against the fixed SERP shows the exact recovery — same personas, same query, same cost.
          </p>

          {/* Delta bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5', marginBottom: '24px' }}>
            {[
              { metric: 'Click rate', before: '60%', after: '100%', up: true },
              { metric: 'Abandon rate', before: '40%', after: '0%', up: false },
              { metric: 'Reformulations', before: '5 (all failed)', after: '1 (succeeded)', up: false },
              { metric: 'Max satisfaction', before: 'Medium', after: 'High', up: true },
            ].map(s => (
              <div key={s.metric} style={{ background: '#ffffff', padding: '16px 14px' }}>
                <div className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#9ca3af', marginBottom: '10px' }}>{s.metric}</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '2px' }}>BEFORE</div>
                    <div className="font-black" style={{ fontSize: '18px', color: '#E2001A', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.before}</div>
                  </div>
                  <div style={{ fontSize: '16px', color: '#9ca3af' }}>→</div>
                  <div>
                    <div style={{ fontSize: '9px', color: '#9ca3af', marginBottom: '2px' }}>AFTER</div>
                    <div className="font-black" style={{ fontSize: '18px', color: '#16a34a', letterSpacing: '-0.5px', lineHeight: 1 }}>{s.after}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Side-by-side agent outcomes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            {/* Before column */}
            <div>
              <div style={{ background: '#E2001A', color: '#ffffff', padding: '8px 14px', marginBottom: '1px' }}>
                <span className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '2px' }}>BEFORE — original SERP</span>
              </div>
              {[
                { icon: '👩', label: 'Anxious Young Mother', result: 'Clicked #1 — medium sat.', color: '#d97706' },
                { icon: '🔬', label: 'Wellness Optimizer', result: 'Clicked #1 — low sat.', color: '#d97706' },
                { icon: '👴', label: 'Elderly Caregiver', result: 'ABANDONED after 2 reformulations', color: '#dc2626' },
                { icon: '🏃', label: 'Acute Self-Treater', result: 'Clicked #1 — medium sat.', color: '#d97706' },
                { icon: '🌿', label: 'Alternative Medicine Seeker', result: 'ABANDONED after 3 reformulations', color: '#dc2626' },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 14px', background: '#fafafa', borderBottom: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ fontSize: '12px', color: '#374151', flex: 1 }}>{p.label}</span>
                  <span className="font-bold" style={{ fontSize: '11px', color: p.color, textAlign: 'right' }}>{p.result}</span>
                </div>
              ))}
            </div>

            {/* After column */}
            <div>
              <div style={{ background: '#16a34a', color: '#ffffff', padding: '8px 14px', marginBottom: '1px' }}>
                <span className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '2px' }}>AFTER — fixed SERP</span>
              </div>
              {[
                { icon: '👩', label: 'Anxious Young Mother', result: 'Clicked #3 — medium sat.', note: 'Rx gone from top 3; age label visible', color: '#d97706' },
                { icon: '🔬', label: 'Wellness Optimizer', result: 'Clicked #1 — low sat.', note: 'Will check PDP for ingredient detail', color: '#d97706' },
                { icon: '👴', label: 'Elderly Caregiver', result: 'Reformulated once → clicked — HIGH sat.', note: 'Age + volume now in title; found exact match', color: '#16a34a' },
                { icon: '🏃', label: 'Acute Self-Treater', result: 'Clicked #1 — medium sat.', note: 'Slight irritation Rx still at #7', color: '#d97706' },
                { icon: '🌿', label: 'Alternative Medicine Seeker', result: 'Clicked #5 (Viburcol Globuli) — medium sat.', note: 'Catalog gap fixed; found homeopathic option', color: '#d97706' },
              ].map(p => (
                <div key={p.label} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', padding: '10px 14px', background: '#f0fdf4', borderBottom: '1px solid #dcfce7' }}>
                  <span style={{ fontSize: '16px', flexShrink: 0, paddingTop: '1px' }}>{p.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '12px', color: '#374151' }}>{p.label}</span>
                      <span className="font-bold" style={{ fontSize: '11px', color: p.color, textAlign: 'right', flexShrink: 0 }}>{p.result}</span>
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px', fontStyle: 'italic' }}>{p.note}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Cost callout */}
          <div style={{ marginTop: '16px', padding: '12px 16px', background: '#f9fafb', border: '1px solid #e5e5e5', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div>
              <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#9ca3af' }}>Total cost for both runs</span>
              <div className="font-black" style={{ fontSize: '22px', color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1.2 }}>~$0.20</div>
            </div>
            <div style={{ width: '1px', background: '#e5e5e5', alignSelf: 'stretch' }} />
            <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: '1.6', margin: 0 }}>
              Both simulations — before and after — ran for under $0.10 each using Claude Haiku for agent decisions and Claude Sonnet for synthesis.
              The same approach can sweep 50 high-volume queries overnight for under $10, producing a prioritised fix list with per-persona failure attribution.
            </p>
          </div>
        </div>

        <div style={{ borderLeft: '4px solid #0a0a0a', background: '#fafafa', padding: '20px 24px', maxWidth: '760px' }}>
          <p className="font-bold uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>WHAT THIS PROVES</p>
          <p style={{ fontSize: '14px', color: '#0a0a0a', lineHeight: '1.6', fontStyle: 'italic' }}>
            &ldquo;Standard monitoring sees 8 results and no errors. Shopper Behavior Simulation shows that 40% of distinct intent
            segments got nothing useful from those 8 results. The intent gap is not a ranking failure —
            it is a <em>measurement</em> failure. The right answer never existed for those users,
            and no dashboard would have caught it.&rdquo;
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Frustration Propagation Simulation — Frustration Propagation                                     */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="uc02" className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px' }}>
          <SectionLabel>FRUSTRATION PROPAGATION — TRUST DECAY</SectionLabel>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '48px' }}>
          <div>
            <h2 className="font-black leading-none mb-5" style={{ fontSize: '42px', letterSpacing: '-2px', color: '#0a0a0a' }}>
              TRUST
              <br />
              COLLAPSES
              <br />
              <span style={{ color: '#E2001A' }}>ROUND BY ROUND.</span>
            </h2>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65', marginBottom: '14px' }}>
              Frustration Propagation Simulation runs a deliberately weak SERP — one where results exist but are wrong in critical ways —
              and measures how trust decays with each failed action. Every reformulation, scroll past threshold,
              or back-click depletes trust by a calibrated amount. When trust hits zero the agent abandons,
              regardless of patience thresholds.
            </p>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65', marginBottom: '24px' }}>
              Query: <code style={{ fontFamily: 'monospace', background: '#f3f4f6', padding: '1px 6px', fontSize: '13px' }}>&ldquo;Halsschmerzen Kinder Mittel&rdquo;</code> — pediatric sore throat.
              SERP: Rx products dominate top 3, no age-appropriate OTC in first 5, a guidebook at position 4.
            </p>

            {/* Stat row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5', marginBottom: '24px' }}>
              {[
                { value: '75%', label: 'Abandon rate', red: true },
                { value: '0.20', label: 'Avg final trust', red: true },
                { value: '3.5', label: 'Avg reformulations', red: true },
                { value: '1 / 4', label: 'Personas survived', red: false },
              ].map(s => (
                <div key={s.label} style={{ background: '#ffffff', padding: '14px 12px', textAlign: 'center' }}>
                  <div className="font-black" style={{ fontSize: '22px', letterSpacing: '-1px', color: s.red ? '#E2001A' : '#16a34a', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                  <div className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#737373' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Trust decay mechanics */}
            <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', padding: '16px 18px' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>TRUST DECAY MECHANICS</p>
              {[
                { action: 'Click', decay: '−0.0', note: 'Neutral — persona is still engaged' },
                { action: 'Back (click → return)', decay: '−0.25', note: 'Strongest signal — PDP disappointed' },
                { action: 'Reformulate', decay: '−0.15 to −0.20', note: 'Explicit dissatisfaction' },
                { action: 'Scroll past threshold', decay: '−0.10', note: 'Nothing visible is good enough' },
                { action: 'Abandon', decay: 'Session ends', note: 'Trust ≤ 0' },
              ].map(({ action, decay, note }) => (
                <div key={action} style={{ display: 'flex', gap: '12px', alignItems: 'baseline', borderBottom: '1px solid #f0f0f0', paddingBottom: '7px', marginBottom: '7px' }}>
                  <span className="font-bold" style={{ fontSize: '11px', color: '#0a0a0a', minWidth: '120px', flexShrink: 0 }}>{action}</span>
                  <span className="font-black" style={{ fontSize: '12px', color: action === 'Abandon' ? '#737373' : '#E2001A', minWidth: '90px', fontFamily: 'monospace', flexShrink: 0 }}>{decay}</span>
                  <span style={{ fontSize: '11px', color: '#737373' }}>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Per-agent trace */}
          <div>
            <MetaLabel>ACTUAL AGENT TRACES — ROUND BY ROUND</MetaLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                {
                  icon: '👩', label: 'Anxious Young Mother', finalTrust: 0.00, abandoned: true,
                  trace: [
                    { action: 'reformulate', trust: 0.75, note: 'All top results Rx or adult-only' },
                    { action: 'reformulate', trust: 0.55, note: '"Baby Kleinkind" — still Rx dominated' },
                    { action: 'reformulate', trust: 0.35, note: '"ab 1 Jahr" — no improvement' },
                    { action: 'reformulate', trust: 0.15, note: '"1–3 Jahre sicher" — desperation drift' },
                    { action: 'reformulate', trust: 0.00, note: 'Pivots to Sterimar (nasal spray) — abandons original intent' },
                    { action: 'abandon', trust: 0.00, note: 'Trust depleted' },
                  ],
                },
                {
                  icon: '🏃', label: 'Acute Self-Treater', finalTrust: 0.80, abandoned: false,
                  trace: [
                    { action: 'reformulate', trust: 0.80, note: '"OTC Lutschtabletten sofort" — strips Kinder context' },
                    { action: 'click', trust: 0.80, note: 'Neo-Angin #5 — medium sat. (adult dose)' },
                    { action: 'click', trust: 0.80, note: 'Repeated clicks — stuck at medium' },
                  ],
                  note: 'Only survivor — but succeeded by abandoning pediatric intent entirely',
                },
                {
                  icon: '👴', label: 'Elderly Caregiver', finalTrust: 0.00, abandoned: true,
                  trace: [
                    { action: 'reformulate', trust: 0.80, note: 'Adds exact pack size: "20 Stück"' },
                    { action: 'reformulate', trust: 0.60, note: 'Adds known brand: "Isla Moos Kinder"' },
                    { action: 'reformulate', trust: 0.40, note: 'Tries brand + quantity together' },
                    { action: 'scroll', trust: 0.27, note: 'Right brand at #2 but wrong age group' },
                    { action: 'scroll', trust: 0.14, note: 'Still no 20-pack Kinder variant visible' },
                    { action: 'abandon', trust: 0.00, note: '"I\'ll call the Apotheke instead"' },
                  ],
                },
                {
                  icon: '🌿', label: 'Alternative Medicine Seeker', finalTrust: 0.00, abandoned: true,
                  trace: [
                    { action: 'reformulate', trust: 0.80, note: 'Homöopathische Nomenklatur — ignored' },
                    { action: 'scroll', trust: 0.67, note: 'Scans for any herbal product' },
                    { action: 'reformulate', trust: 0.47, note: 'Specific substance + potency query' },
                    { action: 'reformulate', trust: 0.27, note: 'Stricter homeopathic terms — zero matches' },
                    { action: 'scroll', trust: 0.14, note: 'Last scan before leaving' },
                    { action: 'abandon', trust: 0.00, note: '"Going to apo-rot instead"' },
                  ],
                },
              ].map(p => {
                const actionColors: Record<string, string> = {
                  reformulate: '#eab308', click: '#22c55e', scroll: '#3b82f6',
                  back: '#f97316', abandon: '#ef4444',
                }
                return (
                  <div key={p.label} style={{ background: p.abandoned ? '#fef2f2' : '#f0fdf4', border: `1px solid ${p.abandoned ? '#fca5a5' : '#bbf7d0'}`, borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderBottom: '1px solid #f3f4f6' }}>
                      <span style={{ fontSize: '16px' }}>{p.icon}</span>
                      <span className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a', flex: 1 }}>{p.label}</span>
                      <span className="font-bold" style={{ fontSize: '10px', color: p.abandoned ? '#dc2626' : '#16a34a' }}>
                        trust → {p.finalTrust.toFixed(2)} {p.abandoned ? '· ABANDONED' : '· SURVIVED'}
                      </span>
                    </div>
                    <div style={{ padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {p.trace.map((t, i) => (
                        <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'baseline', fontSize: '11px' }}>
                          <span style={{ fontWeight: 700, color: actionColors[t.action] ?? '#737373', minWidth: '80px', flexShrink: 0, fontFamily: 'monospace' }}>{t.action}</span>
                          <span style={{ color: '#6b7280' }}>{t.note}</span>
                          {t.action !== 'abandon' && <span style={{ color: '#9ca3af', marginLeft: 'auto', flexShrink: 0, fontFamily: 'monospace' }}>→ {t.trust.toFixed(2)}</span>}
                        </div>
                      ))}
                      {'note' in p && <div style={{ fontSize: '10px', color: '#16a34a', fontStyle: 'italic', marginTop: '4px' }}>{p.note as string}</div>}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Key insight grid */}
        <MetaLabel>WHAT TRUST DECAY REVEALS THAT ANALYTICS CANNOT</MetaLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
          {[
            {
              label: 'ABANDONMENT WAS INEVITABLE AT ROUND 3',
              body: 'The Anxious Young Mother\'s trust fell below the recovery threshold (0.40) by round 3 — two reformulations before she actually abandoned. Analytics records the abandon at round 6. Frustration Propagation Simulation shows it was already over at round 3. That\'s 3 wasted rounds the platform thought were engagement.',
            },
            {
              label: 'THE ONE SURVIVOR FAILED TOO',
              body: 'The Acute Self-Treater was the only persona who didn\'t abandon — but she did it by stripping "Kinder" from her query and settling for an adult-dose product. Analytics sees a session with clicks and no abandonment. Frustration Propagation Simulation sees a pediatric query that was never answered.',
            },
            {
              label: 'REFORMULATION PATTERNS PINPOINT ROOT CAUSES',
              body: 'Every reformulation query the agents produced reveals a specific system gap: age-band filtering, pack-size facets, OTC/Rx intent separation, homeopathic taxonomy. Five reformulations = five actionable engineering tickets.',
            },
            {
              label: 'PERSONA FRAGILITY RANKING',
              body: 'Anxious Young Mother: 6 rounds to collapse. Elderly Caregiver: 7 rounds. Alternative Medicine Seeker: 7 rounds. All hit zero. The Acute Self-Treater survived only because her intent is less specific. The same SERP failure hits different personas at different speeds.',
            },
          ].map(({ label, body }) => (
            <div key={label} style={{ borderLeft: '4px solid #0a0a0a', paddingLeft: '20px' }}>
              <p className="font-bold uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '2px', color: '#0a0a0a' }}>{label}</p>
              <p style={{ fontSize: '13px', color: '#737373', lineHeight: '1.65' }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div>
          <MetaLabel>TRUST DECAY CHART — GENERATED BY SIMULATION</MetaLabel>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uc2_frustration_chart.png"
            alt="Trust decay curves for Frustration Propagation Simulation — Halsschmerzen Kinder Mittel"
            style={{ width: '100%', border: '1px solid #e5e5e5', display: 'block' }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Reformulation Burden Simulation — Reformulation Burden                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="uc03" className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px' }}>
          <SectionLabel>REFORMULATION BURDEN ANALYSIS</SectionLabel>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '48px' }}>
          <div>
            <h2 className="font-black leading-none mb-5" style={{ fontSize: '42px', letterSpacing: '-2px', color: '#0a0a0a' }}>
              REFORMULATION
              <br />
              TREES
            </h2>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65' }}>
              Reformulation Burden Simulation maps the complete query journey a persona takes inside a single session —
              every query typed, every state hit (FOUND / PARTIAL / NOTHING), every
              decision point, and where the session ends. The output is a reformulation tree:
              a branching diagram of all possible paths from first query to conversion or abandonment.
            </p>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65', marginTop: '14px' }}>
              This run used two personas chosen specifically because they produce the most
              structurally different trees of the five-persona library — one hard failure
              (fully visible in analytics), one split-basket failure (structurally invisible).
            </p>
            <div style={{ marginTop: '24px', borderLeft: '4px solid #E2001A', background: '#fff5f5', padding: '16px 20px' }}>
              <p className="font-bold uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '2px', color: '#E2001A' }}>CORE QUESTION</p>
              <p style={{ fontSize: '14px', color: '#0a0a0a', lineHeight: '1.6', fontStyle: 'italic' }}>
                &ldquo;Is the revenue leak visible at all? Some personas don&rsquo;t abandon —
                they split their basket. That looks like retention in analytics but is
                systematic revenue erosion.&rdquo;
              </p>
            </div>
          </div>

          <div>
            <MetaLabel>PERSONA COMPARISON — WHY THESE TWO</MetaLabel>
            {[
              ['First query type', 'Broad symptom', 'Precise ingredient'],
              ['Reformulation tolerance', '2', '4'],
              ['Scroll threshold', '3 results', '7 results'],
              ['Cognitive state', 'Impaired — actually unwell', 'Clear — researching'],
              ['Tree shape', 'Wide and shallow', 'Narrow and deep'],
              ['Revenue leak type', 'Hard abandonment', 'Split-basket (invisible)'],
              ['Analytics visibility', 'Visible — session ends', '⚠ Invisible — partial basket recorded'],
            ].map(([dim, a, b], i) => (
              <div key={dim} style={{
                display: 'grid', gridTemplateColumns: '160px 1fr 1fr',
                gap: '12px', padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
                background: i % 2 === 0 ? 'transparent' : '#fafafa',
              }}>
                <span style={{ fontSize: '10px', color: '#737373', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', alignSelf: 'center' }}>{dim}</span>
                <span style={{ fontSize: '12px', color: '#0a0a0a' }}>{a}</span>
                <span style={{ fontSize: '12px', color: b.includes('invisible') || b.includes('⚠') ? '#E2001A' : '#0a0a0a' }}>{b}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              <div style={{ flex: 1, textAlign: 'center', color: '#525252', padding: '6px', background: '#f5f5f5', border: '1px solid #e5e5e5' }}>PERSONA 4<br /><span style={{ fontSize: '9px', color: '#737373', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>Acute Self-Treater</span></div>
              <div style={{ flex: 1, textAlign: 'center', color: '#525252', padding: '6px', background: '#f5f5f5', border: '1px solid #e5e5e5' }}>PERSONA 2<br /><span style={{ fontSize: '9px', color: '#737373', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>Wellness Optimizer</span></div>
            </div>
          </div>
        </div>

        {/* Acute Self-Treater — live run */}
        <div style={{ marginBottom: '48px' }}>
          <MetaLabel>ACUTE SELF-TREATER — ACTUAL AGENT OUTPUT</MetaLabel>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '20px 24px', marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🏃</span>
            <div>
              <p style={{ fontSize: '12px', color: '#737373', fontStyle: 'italic', marginBottom: '8px', lineHeight: '1.5' }}>
                Thursday evening. Has had a sore throat since this morning — Apotheke was closed on the way home. Opens shop-apotheke.com on mobile. Reformulation budget: 2. Scroll threshold: 3.
              </p>
              <p style={{ fontSize: '13px', color: '#166534', lineHeight: '1.6' }}>
                <strong>Outcome: CLICKED — medium satisfaction.</strong> Neo-Angin Benzocain at position 4 was the only clearly OTC, fast-acting option visible. Converted on round 1 without reformulating — but the Rx products at positions 1 and 2 nearly killed the session before it started.
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a', background: '#dcfce7', border: '1px solid #bbf7d0', padding: '3px 10px', borderRadius: '4px', flexShrink: 0 }}>SUCCESS · 0 REFORMULATIONS</span>
          </div>
          <TreeNode
            query='"Halsschmerzen schlucken schmerzt"'
            state="PARTIAL"
            note="Rx products at positions 1 and 2. Strepsils Intensiv and Dobendan are both prescription-only. Neo-Angin at position 4 is OTC but buried. Scroll threshold = 3 means most results are invisible."
          />
          <TreeNode
            query="→ clicked Neo-Angin Benzocain (position 4)"
            state="FOUND"
            note={"Agent monologue: \"Neo-Angin Benzocain is OTC, fast-acting topical anesthetic for sore throat pain, affordable — though I'm concerned about the mix of Rx items and would prefer a clearer OTC-only layout.\""}
            isEnd
            endType="convert"
          />
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #d97706', padding: '14px 18px', marginTop: '12px' }}>
            <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '2px', color: '#92400e' }}>THE NEAR MISS</p>
            <p style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.6' }}>
              This persona converted — but only because Neo-Angin happened to be at position 4, just inside the 3-result scroll threshold. If Rx products had taken 4 slots instead of 2, Neo-Angin would have been invisible. The conversion was a coin flip, not a design outcome.
            </p>
          </div>
        </div>

        {/* Wellness Optimizer — live run */}
        <div style={{ marginBottom: '48px' }}>
          <MetaLabel>WELLNESS OPTIMIZER — ACTUAL AGENT OUTPUT</MetaLabel>
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', padding: '20px 24px', marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>🔬</span>
            <div>
              <p style={{ fontSize: '12px', color: '#737373', fontStyle: 'italic', marginBottom: '8px', lineHeight: '1.5' }}>
                Searching for immune-support supplements. Knows exactly what attributes she needs: GMP-certified, ohne Magnesiumstearat, Zink + Vitamin C. Reformulation budget: 4. Scroll threshold: 7.
              </p>
              <p style={{ fontSize: '13px', color: '#991b1b', lineHeight: '1.6' }}>
                <strong>Outcome: ABANDONED after 4 reformulations.</strong> Every query hit the same pharmaceutical OTC symptom-relief products. The supplement-grade, excipient-filtered segment she was looking for does not exist in this search index — or is not reachable through any query formulation.
              </p>
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#dc2626', background: '#fee2e2', border: '1px solid #fca5a5', padding: '3px 10px', borderRadius: '4px', flexShrink: 0 }}>ABANDONED · 4 REFORMULATIONS</span>
          </div>
          <TreeNode
            query='"Halsschmerzen schlucken schmerzt"'
            state="NOTHING"
            note='Pharma OTC symptom relief — not supplement-grade immune support. Agent: "Current results show symptom relief products rather than ingredient-specific supplements with bioavailability focus."'
          />
          <TreeNode
            query='"Halstabletten Zink Vitamin C laborgeprüft ohne Zusätze"'
            state="NOTHING"
            note="Adds certification signal and excipient exclusion. Still returns pharma OTC (Lemocin, Neo-Angin). No supplement-native brands surfaced."
          />
          <TreeNode
            query='"Zink Vitamin C Lutschtabletten laborgeprüft GMP zertifiziert"'
            state="NOTHING"
            note="Explicit GMP certification qualifier. Results unchanged — pharmaceutical symptom-relief products dominate regardless of certification signals."
          />
          <TreeNode
            query='"Zink Vitamin C Lutschtabletten supplement laborgeprüft ohne Magnesiumstearat"'
            state="NOTHING"
            note='Specific excipient exclusion added. Agent: "The system repeatedly failed to match on any of the filter combinations."'
          />
          <TreeNode
            query='"Zink Vitamin C Lutschtabletten vegan ohne Magnesiumstearat Supplements"'
            state="NOTHING"
            note="Final attempt — vegan as trust signal. Reformulation budget exhausted."
            isEnd
            endType="abandon"
          />
          <div style={{ borderLeft: '4px solid #E2001A', background: '#fff5f5', padding: '20px 24px', marginTop: '16px', maxWidth: '760px' }}>
            <p className="font-bold uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '2px', color: '#E2001A' }}>WHAT MAKES THIS FAILURE INVISIBLE</p>
            <p style={{ fontSize: '14px', color: '#0a0a0a', lineHeight: '1.6' }}>
              In the real session, this persona does not hard-abandon. She opens Amazon, finds the supplement she needs, buys it there — then <strong>returns to shop-apotheke to complete the rest of her basket</strong>. Analytics records a multi-item successful session. The primary item she came for is logged as an Amazon sale. The search failure is never attributed.
            </p>
          </div>
        </div>

        {/* Burden chart */}
        <div style={{ marginBottom: '40px' }}>
          <MetaLabel>REFORMULATION BURDEN CHART — GENERATED BY SIMULATION</MetaLabel>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/uc3_burden_chart.png"
            alt="Reformulation burden chart for Reformulation Burden Simulation"
            style={{ width: '100%', border: '1px solid #e5e5e5', display: 'block' }}
          />
        </div>

        {/* Optimisation priorities */}
        <MetaLabel>OPTIMISATION PRIORITIES DERIVED FROM Reformulation Burden Simulation</MetaLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e5e5' }}>
          {[
            {
              priority: 'P0',
              fix: 'Index supplement attributes as structured facets',
              fixes: 'Optimizer Q1–Q4 (root cause of entire cascade)',
              mechanism: 'Add certification_body (GMP, ISO), excipient_free (Magnesiumstearat, Titandioxid), and product_segment (pharma-OTC vs. supplement-grade) as product attributes in Algolia. Boost on query match.',
              impact: 'Q1 becomes PARTIAL → FOUND for supplement-intent queries. Eliminates the reason the Optimizer reformulates at all.',
            },
            {
              priority: 'P0',
              fix: 'Implement OTC intent classifier for symptom queries',
              fixes: 'Self-Treater Q1 result hierarchy — Rx in positions 1–2',
              mechanism: 'Detect symptom-led queries (Halsschmerzen, Fieber, Husten) and apply OTC-first ranking boost. Label and demote Rx products — do not hide.',
              impact: 'Neo-Angin surfaces in position 1–2 instead of 4. Converts without relying on scroll threshold luck.',
            },
            {
              priority: 'P1',
              fix: 'Bifurcate symptom queries into acute-care and prevention pathways',
              fixes: 'Wellness Optimizer Q1 — symptom query returns wrong intent track',
              mechanism: 'At query intake, detect "symptom + supplement-signal" combinations and offer a secondary track ("Looking for immune support instead?"). Prevents the Optimizer from entering the pharma OTC funnel entirely.',
              impact: 'Eliminates the 300% semantic distance jump the Optimizer currently does manually across 4 reformulations.',
            },
            {
              priority: 'P2',
              fix: 'Implement ohne / kein exclusion handling',
              fixes: 'Cross-persona — Optimizer, Anxious Mother, Alternative Medicine Seeker',
              mechanism: 'Parse ohne [X] and kein [X] as exclusion signals. Map to structured attributes where possible. Apply category demotion where mapping is unavailable.',
              impact: 'Excipient exclusion queries ("ohne Magnesiumstearat") become resolvable. Cross-persona benefit for 3 of 5 personas.',
            },
          ].map(({ priority, fix, fixes, mechanism, impact }, i) => (
            <div key={fix} style={{ display: 'grid', gridTemplateColumns: '60px 200px 1fr 1fr', gap: '24px', padding: '20px 24px', borderBottom: i < 3 ? '1px solid #e5e5e5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'start' }}>
              <span className="font-black" style={{ fontSize: '20px', color: priority === 'P0' ? '#E2001A' : priority === 'P1' ? '#d97706' : '#737373' }}>{priority}</span>
              <div>
                <p className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a', marginBottom: '4px' }}>{fix}</p>
                <p style={{ fontSize: '11px', color: '#E2001A' }}>{fixes}</p>
              </div>
              <div>
                <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#737373' }}>Mechanism</p>
                <p style={{ fontSize: '12px', color: '#525252', lineHeight: '1.5' }}>{mechanism}</p>
              </div>
              <div>
                <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#737373' }}>Impact</p>
                <p style={{ fontSize: '12px', color: '#525252', lineHeight: '1.5' }}>{impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Severity Illusion Simulation — Severity Illusion                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="uc07" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>

        {/* Hero */}
        <div style={{ background: '#0a0a0a', color: '#ffffff', padding: '72px 80px 60px' }}>
          <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline', borderBottom: '1px solid #1a1a1a', paddingBottom: '20px', marginBottom: '40px' }}>
            <span className="font-black" style={{ fontSize: '36px', color: '#333', letterSpacing: '-2px', lineHeight: 1 }}>Severity Illusion Simulation</span>
            <SectionLabel>SEVERITY ILLUSION MAPPING</SectionLabel>
          </div>
          <h2 className="font-black leading-none" style={{ fontSize: '42px', letterSpacing: '-2px', color: '#ffffff', marginBottom: '16px' }}>
            Analytics Sees 1/10th<br />of the Real Damage
          </h2>
          <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.7, maxWidth: '640px', marginBottom: '40px' }}>
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

        {/* Methodology + scoring */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <MetaLabel>METHODOLOGY</MetaLabel>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '16px', letterSpacing: '-0.3px' }}>What is the Illusion Ratio?</h3>
              <p style={{ fontSize: '14px', color: '#525252', lineHeight: 1.7, marginBottom: '16px' }}>
                Standard search quality teams measure failures using analytics signals: zero-result rate, click-through rate, reformulation rate. These metrics capture what happened — not how badly it hurt.
              </p>
              <p style={{ fontSize: '14px', color: '#525252', lineHeight: 1.7, marginBottom: '28px' }}>
                The <strong>illusion ratio</strong> is the gap between what analytics thinks a failure costs and what the affected persona actually experiences. A ratio of 10× means the real user damage is ten times worse than the dashboards suggest.
              </p>
              <div style={{ background: '#f5f5f5', border: '1px solid #e5e5e5', padding: '20px 24px', fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
                <div style={{ fontSize: '11px', color: '#737373', marginBottom: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>Illusion Ratio</div>
                <div style={{ fontSize: '16px', color: '#0a0a0a', fontWeight: 700 }}>simulation_score ÷ analytics_score</div>
                <div style={{ fontSize: '11px', color: '#737373', marginTop: '10px' }}>Higher = analytics is more blind to real user damage</div>
              </div>
            </div>
            <div>
              <MetaLabel>SCORING MODEL</MetaLabel>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a', marginBottom: '12px' }}>Analytics score (rule-based)</h4>
              <div style={{ fontSize: '13px', color: '#525252', lineHeight: 1.7, marginBottom: '24px' }}>
                {[
                  { range: '0–1', color: '#E2001A', bg: '#fff5f5', border: '#fecaca', desc: 'Zero results or prescription mismatch — not logged by standard tooling' },
                  { range: '2–5', color: '#d97706', bg: '#fffbeb', border: '#fde68a', desc: 'Low CTR or high reformulation — marginal alert signal' },
                  { range: '6–10', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', desc: 'High confidence signal — visible in dashboards' },
                ].map(r => (
                  <div key={r.range} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'baseline' }}>
                    <code style={{ fontSize: '12px', fontFamily: "'SF Mono', monospace", background: r.bg, border: `1px solid ${r.border}`, color: r.color, padding: '2px 8px', whiteSpace: 'nowrap' }}>{r.range}</code>
                    <span>{r.desc}</span>
                  </div>
                ))}
              </div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a', marginBottom: '12px' }}>Simulation score (Claude Haiku 4.5)</h4>
              <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.7 }}>
                Each failure independently classified (type + blind spot) and scored against all 5 pharmacy personas using the Frustration Propagation Simulation trust decay framework. Score is worst-case persona severity — calibrated to real-world patient urgency, medical context, and trust dynamics.
              </p>
            </div>
          </div>
        </div>

        {/* Failure taxonomy */}
        <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
          <MetaLabel>FAILURE TAXONOMY</MetaLabel>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '28px', letterSpacing: '-0.3px' }}>How Failures Are Classified</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5', marginBottom: '1px' }}>
            {[
              { type: 'EMBARRASSING', color: '#E2001A', bg: '#fff5f5', border: '#fecaca', desc: 'Engine actively returns the wrong thing — a prescription drug for an OTC query, a contraindicated product, or a direct negation of stated intent.' },
              { type: 'ADJACENT',     color: '#d97706', bg: '#fffbeb', border: '#fde68a', desc: "Results are in the right ballpark but wrong intent. User gets Vitamin C when they searched for 'Erkältung Kinder' — plausible but doesn't convert." },
              { type: 'IRRELEVANT',   color: '#737373', bg: '#f5f5f5', border: '#e5e5e5', desc: 'Completely off-category. Rarest failure type — usually caught by zero-result monitoring or immediate bounce.' },
              { type: 'MISSING',      color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe', desc: "The right product exists in catalogue but the engine doesn't surface it. A ranking failure, not a catalogue gap." },
            ].map(t => (
              <div key={t.type} style={{ background: '#ffffff', padding: '24px' }}>
                <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: t.color, background: t.bg, border: `1px solid ${t.border}`, padding: '3px 8px', display: 'inline-block', marginBottom: '14px' }}>{t.type}</span>
                <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}>
            {[
              { spot: 'BLIND SPOT — INVISIBLE', color: '#E2001A', bg: '#fff5f5', border: '#fecaca', desc: 'Zero-result monitoring and CTR signals see nothing. The failure is completely hidden from standard dashboards.' },
              { spot: 'BLIND SPOT — PARTIAL',   color: '#d97706', bg: '#fffbeb', border: '#fde68a', desc: "Some downstream signal exists (elevated reformulation, low CTR) but doesn't surface root cause or severity." },
              { spot: 'BLIND SPOT — VISIBLE',   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', desc: 'Analytics flags the failure. Very rare — most failures that are visible are already being addressed.' },
            ].map(t => (
              <div key={t.spot} style={{ background: '#ffffff', padding: '24px' }}>
                <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: t.color, background: t.bg, border: `1px solid ${t.border}`, padding: '3px 8px', display: 'inline-block', marginBottom: '14px' }}>{t.spot}</span>
                <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.65 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key stats strip */}
        <div style={{ background: '#0a0a0a', padding: '32px 80px', display: 'flex', gap: '0', borderBottom: '1px solid #1a1a1a' }}>
          {[
            { value: '60', label: 'failures INVISIBLE to analytics', note: 'Zero-result monitoring catches nothing', color: '#E2001A' },
            { value: '44', label: 'failures PARTIALLY visible',      note: 'Some signal, no actionable root cause', color: '#d97706' },
            { value: '0',  label: 'failures fully visible',          note: 'Standard dashboards are effectively blind', color: '#16a34a' },
          ].map((s, i) => (
            <div key={s.label} style={{ flex: 1, padding: '0 40px', borderLeft: i > 0 ? '1px solid #1a1a1a' : 'none' }}>
              <div style={{ fontSize: '40px', fontWeight: 800, color: s.color, letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#e5e5e5', marginTop: '4px', fontWeight: 600 }}>{s.label}</div>
              <div style={{ fontSize: '11px', color: '#737373', marginTop: '4px' }}>{s.note}</div>
            </div>
          ))}
        </div>

        {/* Category breakdown table */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
          <MetaLabel>RESULTS BY CATEGORY — 109 FAILURES ACROSS 11 PHARMACY DOMAINS</MetaLabel>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '28px', letterSpacing: '-0.3px' }}>Category Summary</h3>
          <div style={{ border: '1px solid #e5e5e5' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '160px 60px 110px 110px 110px 1fr', background: '#f5f5f5', borderBottom: '1px solid #e5e5e5', padding: '10px 20px' }}>
              {['CATEGORY', 'N', 'AVG ANALYTICS', 'AVG SIM', 'AVG RATIO', 'TOP ILLUSION FAILURE'].map(h => (
                <span key={h} className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>{h}</span>
              ))}
            </div>
            {[
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
            ].sort((a, b) => b.avgRatio - a.avgRatio).map((c, i, arr) => {
              const isExtreme = c.avgRatio >= 12
              const isHigh    = c.avgRatio >= 8
              const ratioColor  = isExtreme ? '#E2001A' : isHigh ? '#d97706' : '#525252'
              const ratioBg     = isExtreme ? '#fff5f5' : isHigh ? '#fffbeb' : '#f5f5f5'
              const ratioBorder = isExtreme ? '#fecaca' : isHigh ? '#fde68a' : '#e5e5e5'
              return (
                <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '160px 60px 110px 110px 110px 1fr', padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid #e5e5e5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a' }}>{c.name}</span>
                  <span style={{ fontSize: '13px', color: '#525252', fontFamily: "'SF Mono', monospace" }}>{c.failures}</span>
                  <span style={{ fontSize: '13px', color: '#737373', fontFamily: "'SF Mono', monospace" }}>{c.avgAnalytics.toFixed(1)}</span>
                  <span style={{ fontSize: '13px', color: '#0a0a0a', fontFamily: "'SF Mono', monospace", fontWeight: 600 }}>{c.avgSim.toFixed(1)}</span>
                  <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: '13px', fontWeight: 700, color: ratioColor, background: ratioBg, border: `1px solid ${ratioBorder}`, padding: '3px 10px', display: 'inline-block' }}>{c.avgRatio.toFixed(1)}×</span>
                  <div>
                    <div style={{ fontSize: '12px', color: '#525252', marginBottom: '2px' }}>&ldquo;{c.topFailure}&rdquo;</div>
                    <span style={{ fontSize: '11px', fontFamily: "'SF Mono', monospace", color: '#E2001A', fontWeight: 700 }}>{c.topRatio.toFixed(1)}×</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top 10 severity illusions */}
        <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
          <MetaLabel>WORST-CASE SEVERITY ILLUSIONS</MetaLabel>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', letterSpacing: '-0.3px' }}>Top 10 Severity Illusions</h3>
          <p style={{ fontSize: '14px', color: '#737373', marginBottom: '28px', lineHeight: 1.6 }}>
            Analytics score for all 10 is 0.5 — below any alert threshold. Simulation score ranges 9.2–9.4. These failures are completely invisible to standard tooling.
          </p>
          <div style={{ border: '1px solid #e5e5e5' }}>
            {[
              { rank: 1,  query: 'Schlaf verbessern ohne Tabletten',          category: 'Sleep',           type: 'EMBARRASSING', analytics: 0.5, sim: 9.4, ratio: 18.8, note: 'Engine returned a prescription stimulant (Modafinil) for a query explicitly asking to avoid tablets' },
              { rank: 2,  query: 'Fettverdauung natürlich Kapseln',            category: 'Abnehmen',        type: 'EMBARRASSING', analytics: 0.5, sim: 9.4, ratio: 18.8, note: 'Prescription thyroid hormone returned for a "natural fat digestion" query' },
              { rank: 3,  query: 'Heuschnupfen ohne Antihistaminikum',         category: 'Allergie',        type: 'EMBARRASSING', analytics: 0.5, sim: 9.3, ratio: 18.6, note: 'Engine returned an antihistamine for a query explicitly excluding them' },
              { rank: 4,  query: 'Zahnschmerzen Kind 4 Jahre',                 category: 'Schmerzen',       type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Adult-concentration Rx anaesthetic returned for a toddler query' },
              { rank: 5,  query: 'Übelkeit Schwangerschaft ohne Tabletten',    category: 'Schwangerschaft', type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Prescription antiemetic tablet returned as top result' },
              { rank: 6,  query: 'Verstopfung Schwangerschaft natürlich',      category: 'Schwangerschaft', type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Contraindicated stimulant laxative returned for a pregnant user' },
              { rank: 7,  query: 'Ekzem Juckreiz sofort lindern',              category: 'Haut',            type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Prescription sedating antihistamine ranked #1' },
              { rank: 8,  query: 'Durchfall Kind 2 Jahre sofort',              category: 'Verdauung',       type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Contraindicated antidiarrhoeal returned for a toddler query' },
              { rank: 9,  query: 'Angst Tabletten ohne Rezept',                category: 'Stress',          type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Engine ignored "ohne Rezept" modifier — returned Rx benzodiazepine' },
              { rank: 10, query: 'Konzentration Kind Schule ADHS natürlich',   category: 'Stress',          type: 'EMBARRASSING', analytics: 0.5, sim: 9.2, ratio: 18.4, note: 'Prescription controlled stimulant returned for a "natürlich" query' },
            ].map((f, i) => (
              <div key={f.rank} style={{ borderLeft: '4px solid #E2001A', borderBottom: i < 9 ? '1px solid #e5e5e5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa', padding: '20px 28px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '11px', color: '#737373', fontWeight: 700, minWidth: '24px' }}>#{f.rank}</span>
                  <code style={{ fontSize: '13px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '3px 10px', border: '1px solid #e5e5e5' }}>&ldquo;{f.query}&rdquo;</code>
                  <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#E2001A', background: '#fff5f5', border: '1px solid #fecaca', padding: '3px 8px' }}>{f.type}</span>
                  <span style={{ fontSize: '10px', fontFamily: "'SF Mono', monospace", padding: '3px 10px', background: '#f5f5f5', border: '1px solid #e5e5e5', color: '#525252' }}>{f.category}</span>
                  <span style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", fontSize: '13px', fontWeight: 700, color: '#E2001A', background: '#fff5f5', border: '1px solid #fecaca', padding: '3px 10px' }}>{f.ratio.toFixed(1)}×</span>
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
            <div>
              <MetaLabel>FAILURE TYPE DISTRIBUTION — 109 FAILURES</MetaLabel>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', marginBottom: '24px' }}>What the engine is doing wrong</h4>
              {[
                { type: 'EMBARRASSING', count: 60, pct: 55, color: '#E2001A', note: 'Engine actively returns wrong or dangerous results' },
                { type: 'ADJACENT',     count: 48, pct: 44, color: '#d97706', note: 'Off-intent results that superficially look plausible' },
                { type: 'IRRELEVANT',   count:  1, pct:  1, color: '#737373', note: 'Entirely off-category' },
              ].map(t => (
                <div key={t.type} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: t.color }}>{t.type}</span>
                    <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '13px', fontWeight: 700, color: t.color }}>{t.count} <span style={{ fontSize: '11px', color: '#737373' }}>({t.pct}%)</span></span>
                  </div>
                  <div style={{ background: '#f5f5f5', height: '8px', width: '100%', border: '1px solid #e5e5e5' }}>
                    <div style={{ background: t.color, height: '100%', width: `${t.pct}%`, opacity: 0.7 }} />
                  </div>
                  <p style={{ fontSize: '12px', color: '#737373', marginTop: '6px', lineHeight: 1.5 }}>{t.note}</p>
                </div>
              ))}
            </div>
            <div>
              <MetaLabel>ANALYTICS BLIND SPOT COVERAGE — ALL 109 FAILURES</MetaLabel>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', marginBottom: '24px' }}>What standard dashboards see</h4>
              {[
                { label: 'INVISIBLE to analytics', count: 65, pct: 60, color: '#E2001A' },
                { label: 'PARTIAL visibility',     count: 44, pct: 40, color: '#d97706' },
                { label: 'VISIBLE to analytics',   count:  0, pct:  0, color: '#16a34a' },
              ].map(b => (
                <div key={b.label} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#0a0a0a' }}>{b.label}</span>
                    <span style={{ fontFamily: "'SF Mono', monospace", fontSize: '13px', fontWeight: 700, color: b.color }}>{b.count} <span style={{ fontSize: '11px', color: '#737373' }}>({b.pct}%)</span></span>
                  </div>
                  <div style={{ background: '#f5f5f5', height: '8px', width: '100%', border: '1px solid #e5e5e5' }}>
                    <div style={{ background: b.color, height: '100%', width: `${b.pct > 0 ? b.pct : 0}%`, opacity: 0.7 }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '24px', background: '#fff5f5', border: '1px solid #fecaca', padding: '16px 20px' }}>
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
          <MetaLabel>PERSONA VULNERABILITY — AVG SEVERITY ACROSS ALL 109 FAILURES</MetaLabel>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px', letterSpacing: '-0.3px' }}>Who Gets Hurt Most</h3>
          <p style={{ fontSize: '14px', color: '#737373', marginBottom: '28px', lineHeight: 1.6 }}>
            Severity is scored 0–1 per persona per failure, averaged across all 109. The Acute Self-Treater is most exposed — not just occasionally, but structurally across all categories.
          </p>
          <div style={{ border: '1px solid #e5e5e5', background: '#ffffff' }}>
            {[
              { name: 'Acute Self-Treater',          score: 0.77, pct: 77, color: '#E2001A', reason: 'Seeks immediate OTC relief — prescription returns destroy trust at the moment of peak need' },
              { name: 'Chronic Condition Manager',   score: 0.73, pct: 73, color: '#d97706', reason: 'High medication literacy — wrong results signal platform incompetence, not just inconvenience' },
              { name: 'Wellness Optimizer',          score: 0.70, pct: 70, color: '#d97706', reason: 'Researches extensively — supplement + natural-remedy failures collide with core shopping intent' },
              { name: 'Alternative Medicine Seeker', score: 0.55, pct: 55, color: '#737373', reason: 'Expects natural alternatives — Rx results are the exact opposite of stated intent' },
              { name: 'Anxious Young Mother',        score: 0.51, pct: 51, color: '#737373', reason: 'Peaks on child + pregnancy queries at 18×; lower average because safe categories dilute the score' },
            ].map((p, i) => (
              <div key={p.name} style={{ display: 'grid', gridTemplateColumns: '240px 80px 1fr 360px', gap: '24px', padding: '20px 28px', borderBottom: i < 4 ? '1px solid #e5e5e5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'center' }}>
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
          <SectionLabel>SYNTHESIS</SectionLabel>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '28px', letterSpacing: '-0.8px', marginTop: '16px' }}>Four Structural Findings</h3>
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
                body: "Lowering the zero-result alert threshold to 0.1% will not surface these failures — there are results, they're just wrong. The only path to catching these is semantic intent modeling combined with persona-specific consequence scoring.",
              },
            ].map(f => (
              <div key={f.n} style={{ background: '#111111', border: '1px solid #1a1a1a', padding: '28px 32px' }}>
                <div style={{ fontFamily: "'SF Mono', monospace", fontSize: '11px', color: '#E2001A', marginBottom: '12px', fontWeight: 700 }}>{f.n}</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', marginBottom: '12px', lineHeight: 1.4 }}>{f.title}</h4>
                <p style={{ fontSize: '13px', color: '#a3a3a3', lineHeight: 1.7 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ background: '#ffffff', padding: '48px 80px', borderBottom: '1px solid #e5e5e5' }}>
          <MetaLabel>RECOMMENDED ACTIONS</MetaLabel>
          <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0a0a0a', marginBottom: '28px', letterSpacing: '-0.3px' }}>What Needs to Happen</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}>
            {[
              {
                priority: 'P0 — Safety',
                color: '#E2001A', bg: '#fff5f5', border: '#fecaca',
                title: 'Prescription drug filter on OTC queries',
                body: 'Block Rx-only products from surfacing on queries marked OTC intent. 60 EMBARRASSING failures are caused by this single gap. Affects all 11 categories.',
                impact: 'Fixes 55% of dataset immediately',
              },
              {
                priority: 'P1 — Intent',
                color: '#d97706', bg: '#fffbeb', border: '#fde68a',
                title: 'Negation modifier parsing',
                body: '"ohne X" and "ohne Antibiotika" patterns are structurally ignored. Query intent is inverted. 38 failures trace to negation blindness across Sleep, Stress, Allergie, Erkältung.',
                impact: 'Fixes ~35% of adjacent failures',
              },
              {
                priority: 'P2 — Context',
                color: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe',
                title: 'Safety-constraint indexing',
                body: 'Schwangerschaft, Baby, and Kinder queries require constraint-aware ranking. Products contraindicated in pregnancy must not surface at #1. Catalogue metadata exists — ranking model ignores it.',
                impact: 'Fixes highest-ratio category (14.7×)',
              },
            ].map(a => (
              <div key={a.priority} style={{ background: '#ffffff', padding: '28px' }}>
                <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1.5px', color: a.color, background: a.bg, border: `1px solid ${a.border}`, padding: '3px 8px', display: 'inline-block', marginBottom: '16px' }}>{a.priority}</span>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a', marginBottom: '10px', lineHeight: 1.4 }}>{a.title}</h4>
                <p style={{ fontSize: '13px', color: '#525252', lineHeight: 1.65, marginBottom: '16px' }}>{a.body}</p>
                <div style={{ fontSize: '11px', fontWeight: 700, color: a.color, background: a.bg, border: `1px solid ${a.border}`, padding: '6px 12px', display: 'inline-block', letterSpacing: '0.5px' }}>{a.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Meta strip */}
        <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '20px 80px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Severity Illusion Simulation', red: false }, { label: '109 failures', red: false },
            { label: 'Claude Haiku 4.5 · 218 calls', red: false },
            { label: '$0.22 total cost', red: false, green: true },
            { label: '11 categories', red: false },
            { label: '60% INVISIBLE to analytics', red: true },
            { label: 'Frustration Propagation Simulation trust decay framework', red: false },
          ].map(t => (
            <span key={t.label} style={{ fontSize: '10px', fontFamily: "'SF Mono', 'Fira Code', monospace", padding: '3px 10px', background: t.red ? '#fff5f5' : t.green ? '#f0fdf4' : '#f5f5f5', border: `1px solid ${t.red ? '#fecaca' : t.green ? '#bbf7d0' : '#e5e5e5'}`, color: t.red ? '#E2001A' : t.green ? '#16a34a' : '#525252', display: 'inline-block' }}>{t.label}</span>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Sponsored Relevance Audit — Sponsored vs Organic                                        */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="uc08" className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px' }}>
          <SectionLabel>SPONSORED VS ORGANIC RELEVANCE AUDIT</SectionLabel>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '48px' }}>
          <div>
            <h2 className="font-black leading-none mb-5" style={{ fontSize: '42px', letterSpacing: '-2px', color: '#0a0a0a' }}>
              SPONSORED
              <br />
              RELEVANCE GATE
            </h2>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65' }}>
              Sponsored Relevance Audit asks one question: are sponsored product placements in the right category
              for the query they appear on? A mismatched sponsored result displaces an organic
              result that may be more relevant, damages session trust, and inflates cost-per-click
              via Quality Score degradation over time.
            </p>
            <div style={{ marginTop: '20px', padding: '14px 18px', background: '#ffffff', border: '1px solid #e5e5e5' }}>
              <p className="font-bold uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>RELEVANCE FRAMEWORK — THREE LEVELS</p>
              {[
                { level: 'Category match', def: 'Sponsored URL category = dominant organic category', action: 'Low risk', color: '#16a34a' },
                { level: 'Adjacent mismatch', def: 'Related but not the same category as organic results', action: 'Requires conversion data check', color: '#d97706' },
                { level: 'Category mismatch', def: 'Unrelated to organic results', action: 'Flag for review', color: '#E2001A' },
              ].map(({ level, def, action, color }) => (
                <div key={level} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span className="font-bold" style={{ fontSize: '11px', color, minWidth: '140px', flexShrink: 0 }}>{level}</span>
                  <div>
                    <p style={{ fontSize: '11px', color: '#525252' }}>{def}</p>
                    <p style={{ fontSize: '10px', color: '#737373', fontStyle: 'italic' }}>{action}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>TECHNICAL APPROACH</p>
              {[
                'Playwright (Chromium, headless) — required for JS-rendered product data',
                'Product data extracted from JSON in script tags via variantDetails fields',
                'Category derived from URL path segment (/arzneimittel/, /sanitaetshaus/, etc.)',
                'Sponsored detection via JavaScript TreeWalker — CSS selectors do not work on this site',
                'Cookie consent auto-dismissed via data-testid="uc-accept-all-button"',
                'All results verified manually against live site before analysis',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: '8px', fontSize: '12px', color: '#525252', marginBottom: '6px', lineHeight: '1.4' }}>
                  <span style={{ color: '#E2001A', flexShrink: 0 }}>—</span>{item}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold uppercase mb-4" style={{ fontSize: '10px', letterSpacing: '2px', color: '#737373' }}>VERDICT SUMMARY — 7 QUERIES</p>
            {[
              { label: 'OK', count: 2, color: '#16a34a', bg: '#f0fdf4' },
              { label: 'NOTABLE (own-brand)', count: 2, color: '#d97706', bg: '#fffbeb' },
              { label: 'MISMATCH', count: 1, color: '#d97706', bg: '#fffbeb' },
              { label: 'REVERSE (sponsored rescues organic)', count: 1, color: '#3b82f6', bg: '#eff6ff' },
              { label: 'CRITICAL', count: 1, color: '#E2001A', bg: '#fff5f5' },
            ].map(({ label, count, color, bg }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ background: bg, border: `1px solid ${color}22`, padding: '3px 10px', minWidth: '200px' }}>
                  <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1px', color }}>{label}</span>
                </div>
                <div style={{ flex: 1, background: '#e5e5e5', height: '5px', borderRadius: '3px' }}>
                  <div style={{ width: `${(count / 7) * 100}%`, height: '100%', background: color, borderRadius: '3px' }} />
                </div>
                <span className="font-black" style={{ fontSize: '18px', color: '#0a0a0a', letterSpacing: '-1px', minWidth: '16px' }}>{count}</span>
              </div>
            ))}

            <div style={{ marginTop: '24px' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>FOUR RECURRING PATTERNS</p>
              {[
                { pattern: 'Own-brand promotion', queries: 'Ibuprofen, Vitamin C', note: 'Platform uses sponsored slots to promote own brands (Redcare, WEPA). Deliberate business strategy — surface to client for awareness, not correction.' },
                { pattern: 'Adjacent-category mismatch', queries: 'Erkältung Kinder', note: 'Thermometer on cold medicine query. Thematically related but not the specific intent. Requires conversion data before recommending removal.' },
                { pattern: 'Wrong category + broken creative', queries: 'Kopfschmerzen', note: 'Medical device on symptom query + broken ad showing "Variante auswählen" only. Clear actionable finding — fix regardless of conversion data.' },
                { pattern: 'Sponsored rescuing broken organic', queries: 'Baldrian', note: 'Sponsored product is more relevant than #1 organic result. Indicates underlying organic ranking failure that should be addressed independently.' },
              ].map(({ pattern, queries, note }) => (
                <div key={pattern} style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid #e5e5e5' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                    <p className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a' }}>{pattern}</p>
                    <Tag>{queries}</Tag>
                  </div>
                  <p style={{ fontSize: '12px', color: '#737373', lineHeight: '1.5' }}>{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Full findings table */}
        <MetaLabel>RAW FINDINGS — ALL 7 QUERIES</MetaLabel>
        <div style={{ border: '1px solid #e5e5e5', marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 1fr 80px', gap: '0', background: '#0a0a0a', padding: '10px 24px' }}>
            {['QUERY', 'SPONSORED PRODUCT', 'VERDICT', 'DETAIL', 'RISK'].map((h) => (
              <span key={h} className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '2px', color: '#ffffff' }}>{h}</span>
            ))}
          </div>
          {uc8Findings.map((f, i) => {
            const vc = verdictConfig[f.verdict]
            return (
              <div key={f.query} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 100px 1fr 80px', gap: '0', padding: '16px 24px', borderBottom: i < uc8Findings.length - 1 ? '1px solid #e5e5e5' : 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'start' }}>
                <code style={{ fontSize: '13px', fontFamily: "'SF Mono', monospace", color: '#0a0a0a', fontWeight: 600 }}>{f.query}</code>
                <span style={{ fontSize: '12px', color: '#525252', paddingRight: '16px' }}>{f.sponsored}</span>
                <div>
                  <span className="font-bold uppercase" style={{ fontSize: '9px', letterSpacing: '1px', color: vc.color, background: vc.bg, border: `1px solid ${vc.border}`, padding: '3px 8px', display: 'inline-block' }}>
                    {f.verdict}
                  </span>
                </div>
                <span style={{ fontSize: '12px', color: '#525252', lineHeight: '1.5', paddingRight: '16px' }}>{f.detail}</span>
                <span className="font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '1px', color: f.revenue === 'HIGH' ? '#E2001A' : f.revenue === 'MEDIUM' ? '#d97706' : '#16a34a' }}>{f.revenue}</span>
              </div>
            )
          })}
        </div>

        {/* Persona × Query impact simulation */}
        <MetaLabel>PERSONA × SPONSORED SIMULATION — 25 AGENTS · ACTUAL OUTPUT · 2026-04-27</MetaLabel>
        <p style={{ fontSize: '13px', color: '#737373', marginBottom: '20px', lineHeight: 1.6 }}>
          Sponsored Relevance Audit identified bad placements structurally. This follow-on simulation loaded all 5 pharmacy personas as AI agents, showed each one the documented sponsored product for 5 live queries, and tracked inner monologue, trust delta, and session outcome.
        </p>

        {/* Stats strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5', marginBottom: '28px' }}>
          {[
            { value: '14', label: 'HARMFUL IMPACTS',          color: '#E2001A' },
            { value: '5',  label: 'SESSIONS ABANDONED',       color: '#E2001A' },
            { value: '10', label: 'TIMES AD HELPED',          color: '#16a34a' },
            { value: '25', label: 'TOTAL AGENT × QUERY RUNS', color: '#0a0a0a' },
          ].map(s => (
            <div key={s.label} style={{ background: '#ffffff', padding: '20px 24px' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: s.color, letterSpacing: '-1.5px', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '2px', color: '#737373', marginTop: '6px', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Impact matrix */}
        {(() => {
          const qs = [
            { query: 'Kopfschmerzen',               uc8: 'CRITICAL' },
            { query: 'Erkältung Kinder',             uc8: 'MISMATCH' },
            { query: 'nasenspray unter 10 euro',     uc8: 'CRITICAL' },
            { query: 'schmerzmittel nicht aspirin',  uc8: 'MISMATCH' },
            { query: 'Baldrian',                     uc8: 'REVERSE'  },
          ]
          const ps = [
            { key: 'lena',   name: 'Lena',   archetype: 'Anxious Young Mother'    },
            { key: 'mia',    name: 'Mia',    archetype: 'Wellness Optimizer'      },
            { key: 'werner', name: 'Werner', archetype: 'Elderly Patient'         },
            { key: 'jonas',  name: 'Jonas',  archetype: 'Acute Self-Treater'      },
            { key: 'petra',  name: 'Petra',  archetype: 'Alternative Med. Seeker' },
          ]
          const mx: Record<string, Record<string, { impact: string; trust_delta: number; session_outcome: string }>> = {
            lena:   { 'Kopfschmerzen': { impact:'HARMFUL', trust_delta:-0.70, session_outcome:'ABANDONED' }, 'Erkältung Kinder': { impact:'NEUTRAL', trust_delta:-0.25, session_outcome:'CONVERTED_ORGANIC' }, 'nasenspray unter 10 euro': { impact:'HARMFUL', trust_delta:-0.65, session_outcome:'CONVERTED_ORGANIC' }, 'schmerzmittel nicht aspirin': { impact:'HELPFUL', trust_delta:-0.30, session_outcome:'CONVERTED_SPONSORED' }, 'Baldrian': { impact:'NEUTRAL', trust_delta:-0.15, session_outcome:'CONVERTED_SPONSORED' } },
            mia:    { 'Kopfschmerzen': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'Erkältung Kinder': { impact:'HARMFUL', trust_delta:-0.25, session_outcome:'CONVERTED_ORGANIC' }, 'nasenspray unter 10 euro': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'schmerzmittel nicht aspirin': { impact:'HELPFUL', trust_delta:-0.40, session_outcome:'CONVERTED_SPONSORED' }, 'Baldrian': { impact:'NEUTRAL', trust_delta:0.00, session_outcome:'CONVERTED_ORGANIC' } },
            werner: { 'Kopfschmerzen': { impact:'HARMFUL', trust_delta:-0.70, session_outcome:'ABANDONED' }, 'Erkältung Kinder': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'nasenspray unter 10 euro': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'schmerzmittel nicht aspirin': { impact:'HELPFUL', trust_delta:-0.30, session_outcome:'CONVERTED_SPONSORED' }, 'Baldrian': { impact:'HELPFUL', trust_delta:0.15, session_outcome:'CONVERTED_SPONSORED' } },
            jonas:  { 'Kopfschmerzen': { impact:'HARMFUL', trust_delta:-0.80, session_outcome:'ABANDONED' }, 'Erkältung Kinder': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'nasenspray unter 10 euro': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'schmerzmittel nicht aspirin': { impact:'HELPFUL', trust_delta:-0.30, session_outcome:'CONVERTED_SPONSORED' }, 'Baldrian': { impact:'HELPFUL', trust_delta:0.10, session_outcome:'CONVERTED_SPONSORED' } },
            petra:  { 'Kopfschmerzen': { impact:'NEUTRAL', trust_delta:-0.25, session_outcome:'ABANDONED' }, 'Erkältung Kinder': { impact:'NEUTRAL', trust_delta:-0.15, session_outcome:'CONVERTED_ORGANIC' }, 'nasenspray unter 10 euro': { impact:'HARMFUL', trust_delta:-0.30, session_outcome:'CONVERTED_ORGANIC' }, 'schmerzmittel nicht aspirin': { impact:'HELPFUL', trust_delta:-0.30, session_outcome:'CONVERTED_SPONSORED' }, 'Baldrian': { impact:'HELPFUL', trust_delta:0.15, session_outcome:'CONVERTED_SPONSORED' } },
          }
          const iColors: Record<string,string> = { HARMFUL:'#E2001A', NEUTRAL:'#737373', HELPFUL:'#16a34a' }
          const iBgs:    Record<string,string> = { HARMFUL:'#fff0f0', NEUTRAL:'#f5f5f5', HELPFUL:'#f0faf4' }
          const uc8C:    Record<string,string> = { CRITICAL:'#E2001A', MISMATCH:'#d97706', REVERSE:'#3b82f6' }
          return (
            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(5, 1fr)' }}>
                <div style={{ padding: '10px 16px', background: '#0a0a0a' }} />
                {qs.map(q => (
                  <div key={q.query} style={{ padding: '10px 12px', background: '#0a0a0a', borderLeft: '1px solid #333' }}>
                    <p style={{ fontSize: '10px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3, marginBottom: '3px' }}>{q.query}</p>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: uc8C[q.uc8] }}>{q.uc8}</span>
                  </div>
                ))}
              </div>
              <div style={{ border: '1px solid #e5e5e5', borderTop: 'none' }}>
                {ps.map((p, pi) => (
                  <div key={p.key} style={{ display: 'grid', gridTemplateColumns: '180px repeat(5, 1fr)', borderBottom: pi < ps.length - 1 ? '1px solid #e5e5e5' : 'none' }}>
                    <div style={{ padding: '14px 16px', background: '#fafafa', borderRight: '1px solid #e5e5e5' }}>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0a', marginBottom: '2px' }}>{p.name}</p>
                      <p style={{ fontSize: '10px', color: '#737373' }}>{p.archetype}</p>
                    </div>
                    {qs.map(q => {
                      const cell = mx[p.key][q.query]
                      const abandoned = cell.session_outcome === 'ABANDONED'
                      return (
                        <div key={q.query} style={{ padding: '12px 10px', background: iBgs[cell.impact], borderLeft: `3px solid ${iColors[cell.impact]}` }}>
                          <div style={{ fontSize: '10px', fontWeight: 700, color: iColors[cell.impact], marginBottom: '4px' }}>{cell.impact}</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: iColors[cell.impact], marginBottom: '3px' }}>Δ {cell.trust_delta > 0 ? '+' : ''}{cell.trust_delta.toFixed(2)}</div>
                          <div style={{ fontSize: '10px', color: abandoned ? '#E2001A' : '#737373', fontWeight: abandoned ? 700 : 400 }}>
                            {abandoned ? '⚠ ABANDONED' : cell.session_outcome.replace('CONVERTED_', '')}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                {[
                  { label: 'Kopfschmerzen',               note: 'Broken ad destroys 3 sessions outright. Only query with multiple ABANDONED outcomes.' },
                  { label: 'Erkältung Kinder',             note: 'Thermometer ad irritates all personas but organic results salvage most sessions.' },
                  { label: 'nasenspray unter 10€',         note: 'All 5 harmed — but all 5 converted organic by finding a compliant result.' },
                  { label: 'schmerzmittel nicht aspirin',  note: 'Sponsored (Neuralgin) was the ONLY correct result — without it all 5 would fail.' },
                  { label: 'Baldrian',                     note: 'Confirmed: sponsored outperforming organic. 3 of 5 clicked it. Positive outlier.' },
                ].map(({ label, note }) => (
                  <div key={label} style={{ padding: '10px 12px', background: '#fafafa', border: '1px solid #e5e5e5', fontSize: '11px', color: '#737373', lineHeight: 1.5 }}>
                    <strong style={{ color: '#0a0a0a', display: 'block', marginBottom: '4px', fontSize: '10px' }}>{label}</strong>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )
        })()}

        {/* Deep dives */}
        <MetaLabel>DEEP DIVES — 3 WORST CASES · VERBATIM AGENT MONOLOGUES</MetaLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
          {[
            { query: 'Kopfschmerzen', persona: 'Jonas', archetype: 'Acute Self-Treater', trustDelta: -0.80, outcome: 'ABANDONED', sponsored: 'Sanitätshaus medical device — broken creative "Variante auswählen", no product name visible', consequence: 'Jonas goes to the dm-Drogerie', monologue: 'Was ist denn das? Ein Sanitätshaus-Produkt ohne Namen, ohne Preis, ohne zu wissen was das ist? Das sieht ja aus wie Spam. Und die organischen Ergebnisse darunter sind alle verschreibungspflichtig — das brauche ich nicht. Diese Apotheke hat keine normalen Kopfschmerztabletten? Ich gehe zur dm.' },
            { query: 'Kopfschmerzen', persona: 'Lena', archetype: 'Anxious Young Mother', trustDelta: -0.70, outcome: 'ABANDONED', sponsored: 'Same broken placement — no name, no price, no product category', consequence: 'Lena no longer trusts the site — next session starts on DocMorris', monologue: 'Warte, was ist das denn? Ein Sanitätshaus-Produkt für Kopfschmerzen? Das macht doch keinen Sinn... und ich sehe nicht mal, was es ist. Dann schau ich mir die anderen Ergebnisse an... aber wieso kommen mir da nur Migräne-Medikamente, die man verschreiben lassen muss? Und oben ist sogar ein Impfstoff?! Das vertrau ich dieser Seite jetzt schon nicht mehr.' },
            { query: 'Kopfschmerzen', persona: 'Werner', archetype: 'Elderly Patient', trustDelta: -0.70, outcome: 'ABANDONED', sponsored: 'Sanitätshaus device where OTC painkiller should be', consequence: 'Werner calls customer support — channel shift, elevated cost ~€8–12 per call', monologue: 'Was ist denn das? Ein Sanitätshaus-Produkt für Kopfschmerzen? Das verstehe ich nicht — ich suche doch ein einfaches Schmerzmittel wie Aspirin oder Ibuprofen, das mein Arzt mir immer empfiehlt. Ich rufe lieber die Apotheke an, bevor ich hier rumklicke.' },
          ].map((d, i) => (
            <div key={i} style={{ border: '1px solid #e5e5e5', borderLeft: '4px solid #E2001A', background: '#ffffff' }}>
              <div style={{ padding: '14px 24px', borderBottom: '1px solid #e5e5e5', background: '#fafafa', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <code style={{ fontSize: '13px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '3px 10px', border: '1px solid #e5e5e5' }}>&ldquo;{d.query}&rdquo;</code>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a' }}>× {d.persona}</span>
                <span style={{ fontSize: '11px', color: '#737373' }}>{d.archetype}</span>
                <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 700, color: '#E2001A' }}>Δtrust {d.trustDelta.toFixed(2)} · {d.outcome}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ padding: '20px 24px', borderRight: '1px solid #e5e5e5' }}>
                  <p className="font-bold uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>SPONSORED PRODUCT SHOWN</p>
                  <p style={{ fontSize: '13px', color: '#E2001A', fontWeight: 600, marginBottom: '12px' }}>{d.sponsored}</p>
                  <p className="font-bold uppercase mb-1" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>CONSEQUENCE</p>
                  <p style={{ fontSize: '13px', color: '#525252' }}>{d.consequence}</p>
                </div>
                <div style={{ padding: '20px 24px', background: '#fff5f5' }}>
                  <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#E2001A' }}>INNER MONOLOGUE — VERBATIM FROM SIMULATION</p>
                  <blockquote style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: 1.65, fontStyle: 'italic', borderLeft: '3px solid #E2001A', paddingLeft: '14px' }}>
                    &ldquo;{d.monologue}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
          <div style={{ border: '1px solid #e5e5e5', borderLeft: '4px solid #16a34a', background: '#ffffff' }}>
            <div style={{ padding: '14px 24px', borderBottom: '1px solid #e5e5e5', background: '#f0faf4', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <code style={{ fontSize: '13px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#ffffff', padding: '3px 10px', border: '1px solid #e5e5e5' }}>&ldquo;Baldrian&rdquo;</code>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a' }}>× Jonas</span>
              <span style={{ fontSize: '11px', color: '#737373' }}>Acute Self-Treater</span>
              <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: 700, color: '#16a34a' }}>Δtrust +0.10 · CONVERTED_SPONSORED</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div style={{ padding: '20px 24px', borderRight: '1px solid #e5e5e5' }}>
                <p className="font-bold uppercase mb-2" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>POSITIVE CASE — WHAT GOOD LOOKS LIKE</p>
                <p style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600, marginBottom: '10px' }}>Baldrian Dispert 45mg Dragees — relevant, €6.49, correct category</p>
                <p style={{ fontSize: '13px', color: '#525252' }}>Sponsored outperforms organic #1. Agent clicks immediately. Sponsored Relevance Audit tagged this REVERSE — sponsored rescued a weak organic ranking.</p>
              </div>
              <div style={{ padding: '20px 24px', background: '#f0faf4' }}>
                <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#16a34a' }}>INNER MONOLOGUE</p>
                <blockquote style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: 1.65, fontStyle: 'italic', borderLeft: '3px solid #16a34a', paddingLeft: '14px' }}>
                  &ldquo;Okay, Baldrian Dispert 45mg — das sieht genau aus wie das, was ich suche. Es ist direkt oben, der Preis passt. Gesponsert oder nicht, mir egal — wenn es das richtige Produkt ist und schnell geht, dann nehme ich es.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue math */}
        <MetaLabel>REVENUE IMPLICATIONS — ILLUSTRATIVE MODEL</MetaLabel>
        <p style={{ fontSize: '13px', color: '#737373', marginBottom: '16px', lineHeight: 1.6 }}>
          Basket values from persona profiles. Session volumes are illustrative — substitute actual query traffic for real numbers.
        </p>
        <div style={{ border: '1px solid #e5e5e5', marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 200px 80px 120px 1fr', background: '#0a0a0a', padding: '10px 20px' }}>
            {['PERSONA', 'ARCHETYPE', 'BASKET', 'HARMFUL RATE', 'SESSION NOTE'].map(h => (
              <span key={h} style={{ fontSize: '9px', letterSpacing: '1.5px', color: '#ffffff', fontWeight: 700 }}>{h}</span>
            ))}
          </div>
          {[
            { persona: 'Lena',   archetype: 'Anxious Young Mother', basket: 35,  harmful_pct: 40, note: 'ABANDONED on Kopfschmerzen; trust damage persists to next session' },
            { persona: 'Mia',    archetype: 'Wellness Optimizer',   basket: 110, harmful_pct: 60, note: 'Converted but with damaged trust — likely to compare next time' },
            { persona: 'Werner', archetype: 'Elderly Patient',      basket: 45,  harmful_pct: 40, note: 'ABANDONED → support call. Channel-shift cost ~€8–12 per call' },
            { persona: 'Jonas',  archetype: 'Acute Self-Treater',   basket: 8,   harmful_pct: 20, note: 'ABANDONED → went to dm. Low basket but high-frequency shopper' },
            { persona: 'Petra',  archetype: 'Alternative Med.',     basket: 55,  harmful_pct: 20, note: 'ABANDONED after ignoring bad placement across multiple rounds' },
          ].map((r, i) => (
            <div key={r.persona} style={{ display: 'grid', gridTemplateColumns: '120px 200px 80px 120px 1fr', padding: '14px 20px', borderTop: '1px solid #e5e5e5', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0a' }}>{r.persona}</span>
              <span style={{ fontSize: '12px', color: '#737373' }}>{r.archetype}</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '-0.5px' }}>€{r.basket}</span>
              <div>
                <div style={{ background: '#f0f0f0', height: '5px', marginBottom: '3px' }}>
                  <div style={{ width: `${r.harmful_pct}%`, height: '100%', background: '#E2001A' }} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#E2001A' }}>{r.harmful_pct}% of queries</span>
              </div>
              <span style={{ fontSize: '12px', color: '#737373', paddingLeft: '12px' }}>{r.note}</span>
            </div>
          ))}
        </div>

        {/* Tool concept */}
        <div style={{ borderLeft: '4px solid #E2001A', background: '#fff5f5', padding: '24px 28px' }}>
          <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#E2001A' }}>TOOL CONCEPT THAT EMERGED — SPONSORED RELEVANCE GATE</p>
          <p style={{ fontSize: '14px', color: '#0a0a0a', lineHeight: '1.65', marginBottom: '16px' }}>
            Sponsored Relevance Audit produced a concrete tool specification: a pre-activation gate that scores every
            planned sponsored placement before it goes live. Input: PZN + target query. Output:
            APPROVE / REVIEW / REJECT with a scored explanation. The Kopfschmerzen finding
            is a ready-made case study — that placement would have scored 12/100 and been
            blocked before activation.
          </p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Tag>MVP: 2–3 days</Tag>
            <Tag>~$0.003 per check (Claude Haiku)</Tag>
            <Tag>Score: Category match (40%) + Intent match (40%) + Displacement cost (20%)</Tag>
            <Tag red>Kopfschmerzen/sanitaetshaus: 12/100 → REJECT</Tag>
            <Tag>Ibuprofen/Redcare: 87/100 → APPROVE with note</Tag>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* Synthetic Query Generation — Synthetic Query Generation                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <section id="uc13" className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'baseline', borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px' }}>
          <SectionLabel>SYNTHETIC QUERY GENERATION</SectionLabel>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', marginBottom: '48px' }}>
          <div>
            <h2 className="font-black leading-none mb-5" style={{ fontSize: '42px', letterSpacing: '-2px', color: '#0a0a0a' }}>
              HIDDEN DEMAND
              <br />
              GAP DETECTION
            </h2>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65' }}>
              Synthetic Query Generation generates synthetic query variations that real users type when they have
              a need — and maps them against what the search engine actually returns. The goal
              is to surface hidden demand gaps: queries with real user intent that the search
              engine mishandles silently.
            </p>
            <p style={{ fontSize: '14px', color: '#525252', lineHeight: '1.65', marginTop: '14px' }}>
              Unlike CTR or zero-result monitoring, Synthetic Query Generation catches failures where results exist
              but are wrong — the worst kind, because they look healthy in analytics. A query
              returning 55 results where the top result is a €487 prescription stimulant is
              not a zero-result failure. It is invisible to every standard monitoring tool.
            </p>
            <div style={{ marginTop: '24px' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '9px', letterSpacing: '2px', color: '#737373' }}>5 INTENT DIMENSIONS — HOW QUERIES WERE GENERATED</p>
              {[
                ['Symptom-based', '"kann nicht einschlafen", "nachts aufwachen"', '#E2001A'],
                ['Cause-based', '"Stress schlafen", "Jetlag Mittel"', '#d97706'],
                ['Life-stage', '"Schwangerschaft schlafen", "Baby schläft nicht"', '#0a0a0a'],
                ['Ingredient/mechanism', '"Melatonin kaufen", "Diphenhydramin"', '#525252'],
                ['Colloquial/typo', '"Schlafmitel", "Gedankenkarussell nachts"', '#737373'],
              ].map(([dim, examples, color]) => (
                <div key={dim} style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span className="font-bold" style={{ fontSize: '11px', color, minWidth: '160px', flexShrink: 0 }}>{dim}</span>
                  <code style={{ fontSize: '11px', color: '#737373', fontFamily: "'SF Mono', monospace" }}>{examples}</code>
                </div>
              ))}
            </div>
          </div>

          <div>
            <MetaLabel>METHODOLOGY — 5 STEPS</MetaLabel>
            {[
              { step: '01', title: 'Catalog reconnaissance', body: 'Fetched the live site to identify what products exist in the Sleep category. Mapped: melatonin, antihistamine sleep aids, herbal (Neurexan, Lasea, Schlafsterne, Baldrian), CBD/hemp.' },
              { step: '02', title: 'Query cluster generation ', body: 'Generated 20 synthetic query variations across the 5 intent dimensions using Claude natively — no API calls, no cost. Initial risk assessments (✅/⚠️/🔴) assigned based on catalog knowledge.' },
              { step: '03', title: 'Live scraping validation', body: 'Playwright-based scraper hit the live site for each query. Product data extracted from variantDetails JSON fields in page HTML. Result counts from "X passende Produkte gefunden".' },
              { step: '04', title: 'Manual client verification', body: 'All scraped results verified manually by user against live site before analysis proceeded. This step is mandatory — never write up findings against unverified data.' },
              { step: '05', title: 'Gap analysis + fix generation', body: 'Each confirmed failure assigned: severity (CRITICAL/HIGH/MEDIUM/OK), root cause, 2–3 specific fixes with implementation path.' },
            ].map(({ step, title, body }) => (
              <div key={step} style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <span className="font-black" style={{ fontSize: '20px', color: '#e5e5e5', letterSpacing: '-1px', lineHeight: 1, flexShrink: 0, marginTop: '2px' }}>{step}</span>
                <div>
                  <p className="font-bold mb-1" style={{ fontSize: '12px', color: '#0a0a0a' }}>{title}</p>
                  <p style={{ fontSize: '12px', color: '#737373', lineHeight: '1.5' }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Findings */}
        <MetaLabel>FINDINGS — SLEEP CATEGORY (6 FAILURES FROM 20 QUERIES)</MetaLabel>
        <div style={{ border: '1px solid #e5e5e5', marginBottom: '40px' }}>
          <FindingRow
            idx={0}
            severity="CRITICAL"
            query="Schlaf verbessern ohne Tabletten"
            resultCount={55}
            topResult="Modafinil 200mg — €487 (prescription stimulant for narcolepsy)"
            rootCause='No negation handling — "ohne Tabletten" is ignored. The engine returned the most-reviewed sleep supplement regardless of the negation. 55 results returned — no zero-result flag triggers.'
            fixPath='Implement ohne/kein exclusion token. Suppress Rx-class results when OTC intent detected. Boost herbal/non-pharma when query contains: ohne Tabletten, natürlich, ohne Medikamente.'
          />
          <FindingRow
            idx={1}
            severity="HIGH"
            query="Gedankenkarussell nachts"
            resultCount={4}
            topResult="Wick Medinait Erkältungssirup — €32.99 (cold/flu syrup)"
            rootCause='Colloquial German for "racing thoughts at night" has zero entry in the synonym index. The engine matched "nachts" only and returned a cold remedy. Users who do not know the clinical product name get actively wrong results.'
            fixPath='Add synonym entry: Gedankenkarussell → Beruhigung, Einschlafen, Angst, Grübeln. Enrich category copy with colloquial symptom language. Map low-result symptom queries to Beruhigung & Schlaf category as fallback.'
          />
          <FindingRow
            idx={2}
            severity="HIGH"
            query="morgens nicht ausgeschlafen"
            resultCount={2}
            topResult='Book titled "Ausgeschlafen" — €14.99'
            rootCause='Literal keyword match pulled the word "ausgeschlafen" from a book title. Books category bleeds into health-intent queries throughout the sleep cluster — affects 4 of 6 failures.'
            fixPath='Suppress Books category from queries with health/symptom intent signals. Intent classifier upstream of ranking. Add synonym cluster: ausgeschlafen → Schlafqualität, erholsamer Schlaf, Tiefschlaf.'
          />
          <FindingRow
            idx={3}
            severity="HIGH"
            query="Baby schläft nicht"
            resultCount={12}
            topResult="3 of top 3 results: children's picture books"
            rootCause='No life-stage routing. A parental sleep distress query is treated identically to a general sleep query. Books category captures the literal words "schläft nicht" from story titles.'
            fixPath='Detect "Baby" co-occurring with sleep terms → route to /baby-und-familie/ health section. Suppress books when query contains Baby + health/symptom signals.'
          />
          <FindingRow
            idx={4}
            severity="HIGH"
            query="Schwangerschaft schlafen"
            resultCount={33}
            topResult="Newborn sleep books + Femibion prenatal vitamins — zero pregnancy-safe sleep aids"
            rootCause='Missing life-stage × category routing. Pregnancy detected (prenatal vitamins surface) but the sleep-intent dimension is not resolved to safe OTC options. Books bleed in again.'
            fixPath='Tag products with pregnancy-safe flag. Boost in Schwangerschaft + sleep queries. Create Schwangerschaft intent landing page (Magnesium, lavender, positional aids). Suppress books from health-symptom queries.'
          />
          <FindingRow
            idx={5}
            severity="MEDIUM"
            query="zu früh aufwachen"
            resultCount={7}
            topResult="Zopiclon 7.5mg — €15.26 (prescription sleeping pill)"
            rootCause='Rx/OTC ranking not calibrated to query specificity. A non-specific symptom query should default to OTC options. Prescription sleeping pills are for a clinical context this query does not signal.'
            fixPath='Demote Rx products in non-specific symptom queries. Boost OTC melatonin/herbal for early-waking queries. Intent-based boosting: "zu früh aufwachen" → melatonin, sleep phase support.'
          />
        </div>

        {/* Root cause summary */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
          <div>
            <MetaLabel>ROOT CAUSE BREAKDOWN — 3 PROBLEMS EXPLAIN ALL 6 FAILURES</MetaLabel>
            {[
              { problem: 'Books category bleeding into health/symptom queries', count: 4, queries: 'Baby schläft nicht, Schwangerschaft schlafen, morgens nicht ausgeschlafen, Angst einschlafen' },
              { problem: 'No symptom/intent semantic layer', count: 3, queries: 'Gedankenkarussell nachts, morgens nicht ausgeschlafen, Angst einschlafen' },
              { problem: 'No life-stage context routing', count: 2, queries: 'Baby schläft nicht, Schwangerschaft schlafen' },
              { problem: 'Negation handling absent (standalone)', count: 1, queries: 'Schlaf verbessern ohne Tabletten' },
            ].map(({ problem, count, queries }) => (
              <div key={problem} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <p className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a' }}>{problem}</p>
                  <span className="font-black" style={{ fontSize: '22px', color: count >= 3 ? '#E2001A' : '#0a0a0a', letterSpacing: '-1px', marginLeft: '12px', flexShrink: 0 }}>{count}</span>
                </div>
                <div style={{ background: '#f0f0f0', height: '5px', borderRadius: '3px', marginBottom: '4px' }}>
                  <div style={{ width: `${(count / 4) * 100}%`, height: '100%', background: count >= 3 ? '#E2001A' : '#0a0a0a', borderRadius: '3px' }} />
                </div>
                <p style={{ fontSize: '11px', color: '#737373', fontFamily: "'SF Mono', monospace" }}>{queries}</p>
              </div>
            ))}
          </div>

          <div>
            <MetaLabel>FIX PRIORITY ROADMAP</MetaLabel>
            {[
              { pri: 'P0', fix: 'Suppress Books category from health/symptom queries', impact: 'Fixes 4 of 6 failures immediately', effort: 'Low — index config' },
              { pri: 'P0', fix: 'Implement ohne / kein negation handling', impact: 'Fixes Modafinil result', effort: 'Medium — query parser' },
              { pri: 'P1', fix: 'Life-stage routing: Baby/Schwangerschaft + sleep → correct section', impact: 'Fixes 2 HIGH failures', effort: 'Medium — intent rules' },
              { pri: 'P1', fix: 'Synonym map: colloquial symptoms → Beruhigung & Schlaf', impact: 'Fixes Gedankenkarussell, morgens', effort: 'Low — synonym config' },
              { pri: 'P2', fix: 'Demote Rx products in non-specific symptom queries', impact: 'Fixes zu früh aufwachen', effort: 'Medium — ranking rules' },
            ].map(({ pri, fix, impact, effort }, i) => (
              <div key={fix} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: '12px', paddingBottom: '12px', marginBottom: '12px', borderBottom: i < 4 ? '1px solid #f0f0f0' : 'none' }}>
                <span className="font-black" style={{ fontSize: '14px', color: pri === 'P0' ? '#E2001A' : pri === 'P1' ? '#d97706' : '#737373' }}>{pri}</span>
                <div>
                  <p className="font-bold" style={{ fontSize: '12px', color: '#0a0a0a', marginBottom: '3px' }}>{fix}</p>
                  <p style={{ fontSize: '11px', color: '#16a34a' }}>{impact}</p>
                  <p style={{ fontSize: '10px', color: '#737373', fontStyle: 'italic' }}>{effort}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── Cross-UC synthesis ──────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#0a0a0a' }}>
        <p className="font-bold uppercase mb-10" style={{ fontSize: '10px', letterSpacing: '3px', color: '#E2001A', borderBottom: '1px solid #333', paddingBottom: '8px' }}>
          CROSS-UC SYNTHESIS — WHAT THE FULL BODY OF WORK PROVES
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {[
            {
              label: 'SILENT FAILURES ARE THE REAL PROBLEM',
              body: 'Of all failures found across Reformulation Burden Simulation, Sponsored Relevance Audit, and Synthetic Query Generation, the vast majority produced results — sometimes 55 of them — and looked healthy in analytics. The search engine that returns a €487 prescription stimulant for "sleep help without tablets" has not failed by any standard metric. Simulation is the only method that catches this.',
            },
            {
              label: 'THE SAME ROOT CAUSES APPEAR ACROSS USE CASES',
              body: 'Books category contamination (Synthetic Query Generation), negation handling gaps (Reformulation Burden Simulation + Synthetic Query Generation), life-stage routing absent (Synthetic Query Generation), Rx/OTC ranking not calibrated (Reformulation Burden Simulation + Synthetic Query Generation) — these are not separate bugs. They are the same underlying architecture decisions encountered by different personas in different category experiments.',
            },
            {
              label: 'ANALYTICS VISIBILITY DETERMINES URGENCY — WRONGLY',
              body: 'The Wellness Optimizer\'s split-basket failure (Reformulation Burden Simulation) is commercially more damaging than the Acute Self-Treater\'s hard abandonment — but analytics marks the Optimizer session as a success. Revenue leak is systematically attributed to Amazon rather than to a search failure. Urgency should be driven by revenue impact, not visibility.',
            },
            {
              label: 'SPONSORED AND ORGANIC FAILURES COMPOUND',
              body: 'Sponsored Relevance Audit\'s "Kopfschmerzen" finding and Synthetic Query Generation\'s "Schlaf verbessern ohne Tabletten" finding are the same failure type seen from different angles: a user with a specific OTC intent landing on a completely wrong product. In one case it is organic; in the other it is sponsored. The trust damage is identical.',
            },
          ].map(({ label, body }) => (
            <div key={label} style={{ borderLeft: '4px solid #E2001A', paddingLeft: '20px' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '10px', letterSpacing: '2px', color: '#E2001A' }}>{label}</p>
              <p style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: '1.65' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
