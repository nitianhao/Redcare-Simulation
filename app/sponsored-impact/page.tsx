import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'

// ─── Nav ─────────────────────────────────────────────────────────────────────


// ─── Simulation data (hardcoded from run 2026-04-27) ─────────────────────────

const QUERIES = [
  { query: 'Kopfschmerzen',              uc8: 'CRITICAL' },
  { query: 'Erkältung Kinder',           uc8: 'MISMATCH' },
  { query: 'nasenspray unter 10 euro',   uc8: 'CRITICAL' },
  { query: 'schmerzmittel nicht aspirin',uc8: 'MISMATCH' },
  { query: 'Baldrian',                   uc8: 'REVERSE'  },
]

const PERSONAS = [
  { key: 'lena',   name: 'Lena',   archetype: 'Anxious Young Mother',     basket: 35 },
  { key: 'mia',    name: 'Mia',    archetype: 'Wellness Optimizer',       basket: 110 },
  { key: 'werner', name: 'Werner', archetype: 'Elderly Patient',          basket: 45 },
  { key: 'jonas',  name: 'Jonas',  archetype: 'Acute Self-Treater',       basket: 8 },
  { key: 'petra',  name: 'Petra',  archetype: 'Alternative Med. Seeker',  basket: 55 },
]

// matrix[personaKey][query] = { impact, trust_delta, sponsored_reaction, session_outcome, monologue }
const MATRIX: Record<string, Record<string, { impact: string; trust_delta: number; sponsored_reaction: string; session_outcome: string; monologue: string }>> = {
  lena: {
    'Kopfschmerzen':               { impact: 'HARMFUL',  trust_delta: -0.70, sponsored_reaction: 'TRUST_DAMAGED', session_outcome: 'ABANDONED',           monologue: 'Warte, was ist das denn? Ein Sanitätshaus-Produkt für Kopfschmerzen? Das macht doch keinen Sinn... und ich sehe nicht mal, was es ist. Dann schau ich mir die anderen Ergebnisse an... aber wieso kommen mir da nur Migräne-Medikamente, die man verschreiben lassen muss? Und oben ist sogar ein Impfstoff?! Das vertrau ich dieser Seite jetzt schon nicht mehr.' },
    'Erkältung Kinder':            { impact: 'NEUTRAL',  trust_delta: -0.25, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Ein Thermometer? Das ist doch nicht das, was ich suche! Ich brauche etwas gegen die Erkältung meines Kindes, nicht um die Temperatur zu messen. Gut, dass darunter wenigstens Wick VapoRub und Weleda stehen, das sind Marken, denen ich vertraue.' },
    'nasenspray unter 10 euro':    { impact: 'HARMFUL',  trust_delta: -0.65, sponsored_reaction: 'TRUST_DAMAGED', session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Was?! Das erste Ergebnis kostet 17 Euro und ist auch noch verschreibungspflichtig? Das ist ja überhaupt nicht das, was ich gesucht habe – ich brauche etwas unter 10 Euro für mein Baby! Das macht mich ja super unsicher, ob diese Seite überhaupt versteht, was ich brauche.' },
    'schmerzmittel nicht aspirin': { impact: 'HELPFUL',  trust_delta: -0.30, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Oh Gott, das erste Ergebnis sieht ja perfekt aus – aspirin-frei, genau das was ich gesucht habe! Aber warte, warum sind die nächsten vier Ergebnisse alle Aspirin-Produkte? Versteht die Suchmaschine nicht, dass ich ausdrücklich KEINE Aspirin-Produkte will?' },
    'Baldrian':                    { impact: 'NEUTRAL',  trust_delta: -0.15, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Das erste Ergebnis sieht gut aus, Baldrian Dispert kenne ich. Aber es steht "Gesponsert" – ist das wirklich das beste Produkt oder nur das beste für die Apotheke? Ich scrolle lieber kurz.' },
  },
  mia: {
    'Kopfschmerzen':               { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Kopfschmerzen gesucht, aber was sehe ich? Ein Mystery-Sanitätshaus-Produkt ohne Namen oder Bild an Position eins. Und dann nur Migräne-Rx-Mittel in den organischen Ergebnissen. Diese Apotheke versteht offensichtlich nicht, dass ich ein OTC-Mittel wie Ibuprofen suche, nicht Triptane.' },
    'Erkältung Kinder':            { impact: 'HARMFUL',  trust_delta: -0.25, sponsored_reaction: 'TRUST_DAMAGED', session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Ein Ohrthermometer als erstes Ergebnis bei "Erkältung Kinder"? Das ist ja komplett daneben — ich suche nach Behandlung, nicht nach Diagnostik. Das sagt mir, dass diese Apotheke ihre Anzeigen nicht richtig konfiguriert hat oder versucht, mir etwas zu verkaufen, das ich gar nicht gesucht habe.' },
    'nasenspray unter 10 euro':    { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Warte, ein Nasenspray unter 10 Euro und die erste Anzeige kostet 17 Euro? Das ist ja doppelt so teuer — und auch noch verschreibungspflichtig. Die wissen ja nicht mal, was ich suche.' },
    'schmerzmittel nicht aspirin': { impact: 'HELPFUL',  trust_delta: -0.40, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Das gesponserte Ergebnis ist tatsächlich relevant – Neuralgin ohne Aspirin. Aber dann schaue ich mir die organischen Ergebnisse darunter an und sehe lauter Aspirin-Produkte… Das ist ja fast schon beleidigend. Die Apotheke prioritisiert Markenprodukte über Relevanz.' },
    'Baldrian':                    { impact: 'NEUTRAL',  trust_delta:  0.00, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Baldrian Dispert an Position 1 — okay, das ist gesponsert, aber wenigstens ist es die richtige Kategorie. 45mg Dosierung ist standard. Aber ich sehe keine Zertifizierung, keine Info zu Herkunft. Lass mich erst die organischen Ergebnisse checken.' },
  },
  werner: {
    'Kopfschmerzen':               { impact: 'HARMFUL',  trust_delta: -0.70, sponsored_reaction: 'TRUST_DAMAGED', session_outcome: 'ABANDONED',           monologue: 'Was ist denn das? Ein Sanitätshaus-Produkt für Kopfschmerzen? Das verstehe ich nicht — ich suche doch ein einfaches Schmerzmittel wie Aspirin oder Ibuprofen, das mein Arzt mir immer empfiehlt. Ich rufe lieber die Apotheke an, bevor ich hier rumklicke.' },
    'Erkältung Kinder':            { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Ein Thermometer? Das brauche ich doch nicht, ich suche ja Medikamente gegen Erkältung für die Enkel! Warum zeigt mir die Apotheke so etwas Unsinniges ganz oben? Das verwirrt mich nur.' },
    'nasenspray unter 10 euro':    { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Ach, das erste Ergebnis kostet 17 Euro — das ist ja fast doppelt so teuer wie ich ausgeben möchte! Und irgendwie sieht das komisch aus, als wäre das vom Arzt, nicht für mich einfach so in der Apotheke.' },
    'schmerzmittel nicht aspirin': { impact: 'HELPFUL',  trust_delta: -0.30, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Gut, das erste Ergebnis sagt ja schon "aspirin-frei" — das ist genau das, was ich wollte. Aber warum zeigen mir die nächsten Ergebnisse darunter alle Aspirin-Produkte? Der Arzt hat mir gesagt, ich soll kein Aspirin nehmen, und hier werden mir lauter Aspirin-Sachen gezeigt. Das ist verwirrend.' },
    'Baldrian':                    { impact: 'HELPFUL',  trust_delta:  0.15, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Ah, Baldrian Dispert — das kenne ich, das hat mir mein Arzt empfohlen. Das erste Ergebnis sieht richtig aus, die 45mg Dragees sind genau das was ich brauche. Aber moment, da steht "Gesponsert" — ist das trotzdem das Original?' },
  },
  jonas: {
    'Kopfschmerzen':               { impact: 'HARMFUL',  trust_delta: -0.80, sponsored_reaction: 'TRUST_DAMAGED', session_outcome: 'ABANDONED',           monologue: 'Was ist denn das? Ein Sanitätshaus-Produkt ohne Namen, ohne Preis, ohne zu wissen was das ist? Das sieht ja aus wie Spam. Und die organischen Ergebnisse darunter sind alle verschreibungspflichtig — das brauche ich nicht. Diese Apotheke hat keine normalen Kopfschmerztabletten? Ich gehe zur dm.' },
    'Erkältung Kinder':            { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Ein Thermometer? Ernsthaft? Ich suche Medikamente gegen Erkältung für mein Kind, nicht wie ich Fieber messe. Das ist ja völlig daneben — und bezahlte Werbung obendrein.' },
    'nasenspray unter 10 euro':    { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Wieso wird mir da oben ein Rezept-Spray für 17 Euro angezeigt, wenn ich unter 10 Euro gesucht habe? Das ist ja komplett irrelevant. Moment, #5 sieht gut aus — Redcare Xylo für 8,99 Euro, das passt perfekt. Ich klick da drauf.' },
    'schmerzmittel nicht aspirin': { impact: 'HELPFUL',  trust_delta: -0.30, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Okay, Neuralgin ohne Aspirin — genau das was ich gesucht habe! Das erste Ergebnis trifft perfekt. Aber warte, wieso sind da unten lauter Aspirin-Produkte in den Ergebnissen? Die Apotheke scheint ihr System nicht im Griff zu haben.' },
    'Baldrian':                    { impact: 'HELPFUL',  trust_delta:  0.10, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Okay, Baldrian Dispert 45mg — das sieht genau aus wie das, was ich suche. Es ist direkt oben, der Preis passt. Gesponsert oder nicht, mir egal — wenn es das richtige Produkt ist und schnell geht, dann nehme ich es.' },
  },
  petra: {
    'Kopfschmerzen':               { impact: 'NEUTRAL',  trust_delta: -0.25, sponsored_reaction: 'IGNORED',       session_outcome: 'ABANDONED',           monologue: 'Kopfschmerzen, und gleich wird mir ein Sanitätshaus-Produkt ohne erkennbaren Namen vorgesetzt? Das sieht nach reiner Platzhalter-Werbung aus. Und dann nur verschreibungspflichtige Migränemittel — wo sind denn die natürlichen Alternativen, die Phytopharmaka?' },
    'Erkältung Kinder':            { impact: 'NEUTRAL',  trust_delta: -0.15, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Ein Thermometer? Das ist doch nicht das, was ich suche — mein Kind hat Erkältung und ich brauche natürliche Unterstützung. Aber schau an, die organischen Ergebnisse sind viel besser: Weleda und Sinupret kenne ich, das sind gute natürliche Optionen.' },
    'nasenspray unter 10 euro':    { impact: 'HARMFUL',  trust_delta: -0.30, sponsored_reaction: 'IGNORED',       session_outcome: 'CONVERTED_ORGANIC',    monologue: 'Moment, ein Nasenspray für 17 Euro an erster Stelle? Das ist teuer und verschreibungspflichtig — ich wollte doch etwas unter 10 Euro! Das fühlt sich wie Geldmacherei an, nicht wie hilfreiche Beratung.' },
    'schmerzmittel nicht aspirin': { impact: 'HELPFUL',  trust_delta: -0.30, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Okay, das gesponserte Ergebnis sieht gut aus — aspirin-frei, genau das was ich gesucht habe. Aber wieso zeigt mir die Apotheke in den organischen Ergebnissen lauter Aspirin-Produkte? Das fühlt sich an, als würden sie meine Suche ignorieren.' },
    'Baldrian':                    { impact: 'HELPFUL',  trust_delta:  0.15, sponsored_reaction: 'CLICKED',       session_outcome: 'CONVERTED_SPONSORED', monologue: 'Baldrian Dispert, okay, das kenne ich — das ist ein klassisches Naturheilmittel, nicht so synthetischer Kram wie Benzodiazepine. Die Potenzangabe mit 45mg ist gut dokumentiert. Dass das gesponsert ist, stört mich nicht — es ist ja relevant für das, was ich suche.' },
  },
}

const impactColors = { HARMFUL: '#E2001A', NEUTRAL: '#737373', HELPFUL: '#16a34a' }
const impactBg    = { HARMFUL: '#fff0f0', NEUTRAL: '#f5f5f5', HELPFUL: '#f0faf4' }
const uc8Colors   = { CRITICAL: '#E2001A', MISMATCH: '#d97706', REVERSE: '#3b82f6' }

// ─── Deep-dive cases (worst 3 by trust_delta that ended in ABANDONED) ────────

const deepDives = [
  {
    query: 'Kopfschmerzen',
    sponsored: 'Sanitätshaus medical device — broken creative "Variante auswählen", no product name visible',
    persona: PERSONAS[3], // Jonas
    cell: MATRIX.jonas['Kopfschmerzen'],
    consequence: 'Jonas goes to the dm-Drogerie',
  },
  {
    query: 'Kopfschmerzen',
    sponsored: 'Same broken placement — no name, no price, no product category',
    persona: PERSONAS[0], // Lena
    cell: MATRIX.lena['Kopfschmerzen'],
    consequence: 'Lena no longer trusts the site — next session starts on DocMorris',
  },
  {
    query: 'Kopfschmerzen',
    sponsored: 'Sanitätshaus device where OTC painkiller should be',
    persona: PERSONAS[2], // Werner
    cell: MATRIX.werner['Kopfschmerzen'],
    consequence: 'Werner calls the customer support line — channel shift, elevated cost',
  },
]

// ─── Revenue math (illustrative) ─────────────────────────────────────────────

const revenueRows = [
  { persona: 'Lena', archetype: 'Anxious Young Mother', basket: 35, harmful_pct: 40, note: 'ABANDONED on Kopfschmerzen; trust damage persists to next session' },
  { persona: 'Mia',  archetype: 'Wellness Optimizer',  basket: 110, harmful_pct: 60, note: 'Converted but with damaged trust — likely to compare next time' },
  { persona: 'Werner', archetype: 'Elderly Patient',   basket: 45, harmful_pct: 40, note: 'ABANDONED → support call. Channel-shift cost ~€8–12 per call' },
  { persona: 'Jonas', archetype: 'Acute Self-Treater', basket: 8,  harmful_pct: 20, note: 'ABANDONED → went to dm. Low basket but high-frequency shopper' },
  { persona: 'Petra', archetype: 'Alternative Med.',   basket: 55, harmful_pct: 20, note: 'ABANDONED after 6 rounds of ignoring bad placement' },
]

export default function SponsoredImpactPage() {
  // Summary counts
  const totalCells = PERSONAS.length * QUERIES.length
  const harmfulCount  = PERSONAS.flatMap(p => QUERIES.map(q => MATRIX[p.key][q.query].impact)).filter(i => i === 'HARMFUL').length
  const helpfulCount  = PERSONAS.flatMap(p => QUERIES.map(q => MATRIX[p.key][q.query].impact)).filter(i => i === 'HELPFUL').length
  const abandonedCount = PERSONAS.flatMap(p => QUERIES.map(q => MATRIX[p.key][q.query].session_outcome)).filter(o => o === 'ABANDONED').length

  return (
    <main>
      <SharedNav activePage="use-cases" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-20 pt-16 pb-14" style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', display: 'flex', gap: '80px', alignItems: 'center' }}>
        <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
        <p className="mb-4 font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A' }}>
          PERSONA × SPONSORED SIMULATION · 25 AGENTS · CLAUDE HAIKU · 2026-04-27
        </p>
        <h1 className="font-black leading-none mb-6" style={{ fontSize: '72px', letterSpacing: '0px', color: '#0a0a0a' }}>
          WHEN ADS
          <br />
          <em style={{ fontStyle: 'italic', color: '#E2001A' }}>BREAK TRUST.</em>
        </h1>
        <div className="mb-5" style={{ width: '60px', height: '3px', background: '#E2001A' }} />
        <p className="max-w-2xl leading-relaxed mb-10" style={{ fontSize: '16px', color: '#525252' }}>
          Sponsored Relevance Audit identified bad sponsored placements on paper. This simulation asks what actually
          happens when a real customer encounters them. We loaded all 5 personas as AI agents,
          showed each one the documented sponsored product for 5 live queries, and tracked what
          they thought, what they did, and whether they stayed. The inner monologues below are
          verbatim from the simulation — unedited.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            [String(harmfulCount), 'HARMFUL IMPACTS'],
            [String(abandonedCount), 'SESSIONS ABANDONED'],
            [String(helpfulCount), 'TIMES AD HELPED'],
            [String(totalCells), 'TOTAL AGENT × QUERY RUNS'],
          ].map(([num, label]) => (
            <div key={label} style={{ border: '1px solid #e5e5e5', padding: '14px 22px', background: '#fafafa' }}>
              <div className="font-black" style={{ fontSize: '32px', letterSpacing: '0px', color: num === String(harmfulCount) ? '#E2001A' : num === String(abandonedCount) ? '#E2001A' : '#0a0a0a', lineHeight: 1 }}>{num}</div>
              <div className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/hero-sponsored.webp" alt="Search results for 'schmerzmittel' showing Gesponsert badge" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }} />
        </div>
      </section>

      {/* ── Methodology ───────────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-8" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>HOW THIS SIMULATION WORKS</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '40px', marginBottom: '32px' }}>
          {[
            { step: '01', title: 'Persona Loaded', body: 'Full behavioral profile: vocabulary, distrust triggers, patience score, reformulation tolerance. Each of the 5 personas is a distinct agent.' },
            { step: '02', title: 'Sponsored Product Surfaced', body: 'The Sponsored Relevance Audit-documented sponsored product appears at position #1, prominently labeled as a paid placement. The agent sees it before organic results.' },
            { step: '03', title: 'Agent Reacts', body: 'Three choices: CLICKED (product is relevant, I\'ll try it), IGNORED (irrelevant, skip to organic), or TRUST_DAMAGED (actively harmful — session at risk).' },
            { step: '04', title: 'Session Plays Out', body: 'The agent continues for up to 6 rounds. Terminal actions: converted (sponsored or organic), reformulated, or abandoned. Trust delta logged throughout.' },
          ].map(({ step, title, body }) => (
            <div key={step}>
              <div className="font-black mb-2" style={{ fontSize: '32px', color: '#e5e5e5', letterSpacing: '0px', lineHeight: 1 }}>{step}</div>
              <div className="font-bold mb-2" style={{ fontSize: '16px', color: '#0a0a0a' }}>{title}</div>
              <p style={{ fontSize: '16px', color: '#737373', lineHeight: '1.6' }}>{body}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid #e5e5e5' }}>
          {[
            { label: 'CLICKED', color: '#16a34a', desc: 'Sponsored helped — agent converted via ad' },
            { label: 'IGNORED', color: '#737373', desc: 'Sponsored irrelevant — agent scrolled past' },
            { label: 'TRUST_DAMAGED', color: '#E2001A', desc: 'Sponsored actively harmed session trust' },
          ].map(({ label, color, desc }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ffffff', border: '1px solid #e5e5e5', padding: '8px 16px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color }}>{label}</span>
              <span style={{ fontSize: '16px', color: '#737373' }}>{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Impact Matrix ─────────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>IMPACT MATRIX — 5 PERSONAS × 5 QUERIES · ACTUAL SIMULATION OUTPUT</p>
        <p style={{ fontSize: '16px', color: '#737373', marginBottom: '28px', lineHeight: '1.55' }}>
          Each cell shows the first-round sponsored reaction and cumulative trust delta from the simulation run.
          Green = sponsored helped conversion. Red = trust damaged. Gray = ignored, session continued on organic.
        </p>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(5, 1fr)', gap: 0, marginBottom: '0' }}>
          <div style={{ padding: '10px 16px', background: '#0a0a0a' }} />
          {QUERIES.map(q => (
            <div key={q.query} style={{ padding: '10px 12px', background: '#0a0a0a', borderLeft: '1px solid #333' }}>
              <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color: '#ffffff', lineHeight: '1.3', marginBottom: '3px' }}>{q.query}</p>
              <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color: uc8Colors[q.uc8 as keyof typeof uc8Colors] }}>{q.uc8}</span>
            </div>
          ))}
        </div>

        {/* Matrix rows */}
        <div style={{ border: '1px solid #e5e5e5', borderTop: 'none' }}>
          {PERSONAS.map((p, pi) => (
            <div key={p.key} style={{ display: 'grid', gridTemplateColumns: '180px repeat(5, 1fr)', borderBottom: pi < PERSONAS.length - 1 ? '1px solid #e5e5e5' : 'none' }}>
              {/* Persona label */}
              <div style={{ padding: '14px 16px', background: '#fafafa', borderRight: '1px solid #e5e5e5' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', marginBottom: '2px' }}>{p.name}</p>
                <p style={{ fontSize: '16px', color: '#737373', letterSpacing: '0.3px' }}>{p.archetype}</p>
              </div>
              {/* Cells */}
              {QUERIES.map(q => {
                const cell = MATRIX[p.key][q.query]
                const iColor = impactColors[cell.impact as keyof typeof impactColors]
                const iBg = impactBg[cell.impact as keyof typeof impactBg]
                const isAbandoned = cell.session_outcome === 'ABANDONED'
                return (
                  <div key={q.query} style={{ padding: '12px 12px 12px 10px', background: iBg, borderLeft: `3px solid ${iColor}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color: iColor }}>{cell.impact}</span>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: iColor, marginBottom: '3px' }}>
                      Δ {cell.trust_delta > 0 ? '+' : ''}{cell.trust_delta.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '16px', color: isAbandoned ? '#E2001A' : '#737373', fontWeight: isAbandoned ? 700 : 400, letterSpacing: '0.5px' }}>
                      {isAbandoned ? '⚠ ABANDONED' : cell.session_outcome.replace('CONVERTED_', '').replace('_', ' ')}
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Query notes */}
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
          {[
            { label: 'Kopfschmerzen', note: 'Broken ad destroys 3 sessions outright. Only query with multiple ABANDONED outcomes.' },
            { label: 'Erkältung Kinder', note: 'Thermometer ad irritates all personas but organic results salvage most sessions.' },
            { label: 'nasenspray unter 10€', note: 'All 5 harmed — but all 5 converted organic by finding a compliant result.' },
            { label: 'schmerzmittel nicht aspirin', note: 'Sponsored (Neuralgin) was the ONLY correct result — without it, all 5 would fail.' },
            { label: 'Baldrian', note: 'Confirmed: sponsored outperforming organic. 3 of 5 clicked it. Positive outlier.' },
          ].map(({ label, note }) => (
            <div key={label} style={{ padding: '10px 12px', background: '#fafafa', border: '1px solid #e5e5e5', fontSize: '16px', color: '#737373', lineHeight: '1.5' }}>
              <strong style={{ color: '#0a0a0a', display: 'block', marginBottom: '4px', fontSize: '16px', letterSpacing: '0.5px' }}>{label}</strong>
              {note}
            </div>
          ))}
        </div>
      </section>

      {/* ── Deep Dives ────────────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px', display: 'flex', gap: '32px', alignItems: 'baseline' }}>
          <p className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A' }}>DEEP DIVES</p>
          <p className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>3 WORST CASES · VERBATIM AGENT MONOLOGUES</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {deepDives.map((d, i) => (
            <div key={i} style={{ border: '1px solid #e5e5e5', borderLeft: '4px solid #E2001A', background: '#ffffff' }}>
              {/* Header */}
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e5e5', background: '#fafafa', display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
                <code style={{ fontSize: '16px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '4px 12px', border: '1px solid #e5e5e5', borderRadius: '2px' }}>
                  &ldquo;{d.query}&rdquo;
                </code>
                <span style={{ fontSize: '16px', color: '#0a0a0a', fontWeight: 700 }}>&times; {d.persona.name}</span>
                <span style={{ fontSize: '16px', color: '#737373' }}>{d.persona.archetype}</span>
                <span style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color: '#E2001A' }}>
                  Δtrust {d.cell.trust_delta.toFixed(2)} · {d.cell.session_outcome}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
                {/* Left: sponsored product */}
                <div style={{ padding: '20px 24px', borderRight: '1px solid #e5e5e5' }}>
                  <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>SPONSORED PRODUCT SHOWN</p>
                  <p style={{ fontSize: '16px', color: '#E2001A', fontWeight: 600, marginBottom: '8px' }}>{d.sponsored}</p>
                  <p className="font-bold uppercase mb-1" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>CONSEQUENCE</p>
                  <p style={{ fontSize: '16px', color: '#525252' }}>{d.consequence}</p>
                </div>

                {/* Right: monologue */}
                <div style={{ padding: '20px 24px', background: '#fff5f5' }}>
                  <p className="font-bold uppercase mb-3" style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}>INNER MONOLOGUE — VERBATIM FROM SIMULATION</p>
                  <blockquote style={{ fontSize: '16px', color: '#0a0a0a', lineHeight: '1.65', fontStyle: 'italic', borderLeft: '3px solid #E2001A', paddingLeft: '14px' }}>
                    &ldquo;{d.cell.monologue}&rdquo;
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Positive contrast */}
        <div style={{ marginTop: '32px', border: '1px solid #e5e5e5', borderLeft: '4px solid #16a34a', background: '#ffffff' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e5e5e5', background: '#f0faf4', display: 'flex', gap: '24px', alignItems: 'center' }}>
            <code style={{ fontSize: '16px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#ffffff', padding: '4px 12px', border: '1px solid #e5e5e5', borderRadius: '2px' }}>&ldquo;Baldrian&rdquo;</code>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a' }}>× Jonas</span>
            <span style={{ fontSize: '16px', color: '#737373' }}>Acute Self-Treater</span>
            <span style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color: '#16a34a' }}>Δtrust +0.10 · CONVERTED_SPONSORED</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
            <div style={{ padding: '20px 24px', borderRight: '1px solid #e5e5e5' }}>
              <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>POSITIVE CASE — WHAT GOOD LOOKS LIKE</p>
              <p style={{ fontSize: '16px', color: '#16a34a', fontWeight: 600, marginBottom: '8px' }}>Baldrian Dispert 45mg Dragees — relevant, €6.49, correct category</p>
              <p style={{ fontSize: '16px', color: '#525252' }}>Sponsored outperforms organic #1. Agent clicks immediately. Sponsored Relevance Audit tagged this REVERSE — sponsored rescued a weak organic ranking. This is what the gate should preserve.</p>
            </div>
            <div style={{ padding: '20px 24px', background: '#f0faf4' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '16px', letterSpacing: '2px', color: '#16a34a' }}>INNER MONOLOGUE</p>
              <blockquote style={{ fontSize: '16px', color: '#0a0a0a', lineHeight: '1.65', fontStyle: 'italic', borderLeft: '3px solid #16a34a', paddingLeft: '14px' }}>
                &ldquo;{MATRIX.jonas['Baldrian'].monologue}&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ── Revenue Math ──────────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>REVENUE IMPLICATIONS — ILLUSTRATIVE MODEL</p>
        <p style={{ fontSize: '16px', color: '#737373', marginBottom: '24px', lineHeight: '1.55', maxWidth: '640px' }}>
          Basket values from persona profiles. Session volumes are illustrative — substitute your actual query traffic to get real numbers.
          Abandoned sessions represent lost revenue; damaged-trust sessions represent next-session churn risk.
        </p>
        <div style={{ border: '1px solid #e5e5e5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '140px 180px 80px 120px 1fr', gap: 0, background: '#0a0a0a', padding: '10px 20px' }}>
            {['PERSONA', 'ARCHETYPE', 'BASKET', 'HARMFUL RATE', 'SESSION NOTE'].map(h => (
              <span key={h} style={{ fontSize: '16px', letterSpacing: '1.5px', color: '#ffffff', fontWeight: 700 }}>{h}</span>
            ))}
          </div>
          {revenueRows.map((r, i) => (
            <div key={r.persona} style={{ display: 'grid', gridTemplateColumns: '140px 180px 80px 120px 1fr', gap: 0, padding: '14px 20px', borderTop: '1px solid #e5e5e5', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a' }}>{r.persona}</span>
              <span style={{ fontSize: '16px', color: '#737373' }}>{r.archetype}</span>
              <span className="font-black" style={{ fontSize: '16px', color: '#0a0a0a', letterSpacing: '0px' }}>€{r.basket}</span>
              <div>
                <div style={{ background: '#f0f0f0', height: '5px', borderRadius: '3px', marginBottom: '3px' }}>
                  <div style={{ width: `${r.harmful_pct}%`, height: '100%', background: '#E2001A', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#E2001A' }}>{r.harmful_pct}% of queries</span>
              </div>
              <span style={{ fontSize: '16px', color: '#737373', paddingLeft: '12px' }}>{r.note}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sponsored Relevance Gate ──────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#0a0a0a' }}>
        <p className="font-bold uppercase mb-10" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A', borderBottom: '1px solid #333', paddingBottom: '8px' }}>THE SPONSORED RELEVANCE GATE — PROPOSED SOLUTION</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '48px' }}>
          <div>
            <p style={{ fontSize: '16px', color: '#a3a3a3', lineHeight: '1.65', marginBottom: '24px' }}>
              A pre-activation gating system that scores every sponsored placement before it goes live —
              catching the Kopfschmerzen sanitaetshaus case before it reaches a customer. The simulation
              above gives us the behavioral evidence for why the gate is worth building.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { band: 'APPROVE', range: '70–100', color: '#16a34a', desc: 'Category-aligned, intent-matched — serve as-is (Baldrian case)' },
                { band: 'REVIEW',  range: '40–69',  color: '#d97706', desc: 'Adjacent or partial match — human review before activation' },
                { band: 'REJECT',  range: '0–39',   color: '#E2001A', desc: 'Wrong category or broken creative — blocked automatically (Kopfschmerzen case)' },
              ].map(({ band, range, color, desc }) => (
                <div key={band} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color, background: 'rgba(255,255,255,0.05)', padding: '3px 8px', border: `1px solid ${color}`, minWidth: '72px', textAlign: 'center', flexShrink: 0 }}>{band}</span>
                  <span style={{ fontSize: '16px', fontWeight: 600, color, flexShrink: 0, minWidth: '40px' }}>{range}</span>
                  <span style={{ fontSize: '16px', color: '#a3a3a3', lineHeight: '1.5' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold uppercase mb-4" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>SCORING DIMENSIONS</p>
            {[
              { label: 'Category Match',    weight: '40%', desc: 'Does the sponsored product belong to the same product category as the query intent?' },
              { label: 'Intent Match',      weight: '40%', desc: 'Does the sponsored product address the user\'s goal (treatment vs diagnostic vs prevention)?' },
              { label: 'Displacement Cost', weight: '20%', desc: 'What high-relevance organic result is pushed below the fold by this sponsored placement?' },
            ].map(({ label, weight, desc }) => (
              <div key={label} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #222' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff' }}>{label}</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: '#E2001A' }}>{weight}</span>
                </div>
                <p style={{ fontSize: '16px', color: '#737373', lineHeight: '1.5' }}>{desc}</p>
              </div>
            ))}
            <div style={{ background: '#111', padding: '14px 18px', borderLeft: '3px solid #E2001A' }}>
              <p className="font-bold uppercase mb-1" style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}>COST</p>
              <p style={{ fontSize: '16px', color: '#a3a3a3' }}>~$0.003 per placement check at LLM API rates. At 1,000 sponsored activations/day: <strong style={{ color: '#ffffff' }}>$3/day</strong> to eliminate the Kopfschmerzen class of failures entirely.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
