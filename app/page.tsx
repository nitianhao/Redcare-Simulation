import Hero from '@/components/Hero'
import HeroCarousel from '@/components/HeroCarousel'
import Footer from '@/components/Footer'
import Link from 'next/link'

type Chip = { label: string; red?: boolean }

type Subsection = { label: string; description: string }

type Section = {
  href: string
  label: string
  tag: string
  intro: string
  how: string
  outcome: string
  chips: Chip[]
  subsections?: Subsection[]
}

const sections: Section[] = [
  {
    href: '/personas',
    label: 'Synthetic Personas',
    tag: 'Behavioral Modeling',
    intro:
      'Five AI-powered shopper agents built from German pharmacy market data, observed search failure patterns, and behavioral research — not fictional archetypes.',
    how:
      'Each persona encodes a cognitive baseline (urgency, anxiety, cognitive load, trust sensitivity), a search behavior engine (vocabulary, scroll depth, patience, reformulation strategy), and a decision model (click priorities, abandon conditions, competitor exits). Stress-tested against known relevance and ranking failure modes before any simulation was run.',
    outcome:
      'The personas serve as the evaluation layer for every other simulation. They make it possible to say not just "this query fails" but "this query fails a parent buying for a sick child, triggers three reformulations, and ends in abandonment at round 4."',
    chips: [
      { label: '5 personas' },
      { label: 'Claude Haiku 4.5', red: true },
      { label: 'Python · personas.py' },
      { label: 'Anthropic SDK' },
    ],
  },
  {
    href: '/user-experience',
    label: 'Web UX Audit',
    tag: 'Desktop Search',
    intro:
      'A systematic simulation of the desktop search experience on shop-apotheke.com — covering query-to-result flows, relevance failures, autocomplete behavior, and zero-result handling.',
    how:
      'Browser sessions were captured using the Kapture browser automation tool. Each query flow was recorded as a screenshot sequence, then analyzed by Claude Sonnet 4.6 against the five persona behavioral profiles. Findings were classified by type (wrong intent, wrong category, zero results, misleading ranking) and cross-referenced against persona severity.',
    outcome:
      'Critical relevance failures across core pharmacy categories: OTC sleep aids, children\'s cold remedies, and symptom-based queries. Zero-result rates for common German OTC terms (e.g. "Schnupfen Kind") exceeded 20% — queries the platform should handle fluently.',
    chips: [
      { label: 'Kapture browser automation', red: true },
      { label: 'Claude Sonnet 4.6', red: true },
      { label: '5 personas evaluated' },
      { label: '30+ queries tested' },
    ],
  },
  {
    href: '/user-experience-mobile',
    label: 'Mobile UX Audit',
    tag: 'Mobile Search',
    intro:
      'The same simulation framework applied to the mobile experience, surfacing friction invisible on desktop: filter panel usability, tap target sizing, and scroll depth before abandonment.',
    how:
      'Mobile sessions captured via Kapture at 390px viewport, with modified patience thresholds and scroll constraints reflecting real mobile behavior. Filter and refinement interactions were tested explicitly, since mobile users face a higher cost-per-action for each additional step.',
    outcome:
      'Mobile-specific failures compound desktop relevance issues. Personas with high cognitive load (e.g. the Anxious Young Mother) abandoned significantly earlier on mobile — often before reaching content that would have led to conversion on desktop.',
    chips: [
      { label: 'Kapture browser automation', red: true },
      { label: 'Claude Sonnet 4.6', red: true },
      { label: '390px viewport' },
      { label: '5 personas evaluated' },
    ],
  },
  {
    href: '/report',
    label: 'Audit Report',
    tag: 'Executive Summary',
    intro:
      'A consolidated view of all findings across personas and simulations, ranked by severity and mapped to estimated revenue impact.',
    how:
      'Findings from all six simulation use cases were aggregated and rescored using a unified severity model: CRITICAL (immediate session exit risk), HIGH (conversion degradation), MEDIUM (trust erosion over time). Claude Sonnet 4.6 synthesized cross-simulation signals into a single ranked finding set, with each finding linked to its source simulation and most-affected personas.',
    outcome:
      'A short list of high-confidence, high-impact interventions: negation handling in intent parsing, autocomplete coverage gaps, sponsored placement mismatch, and structured data completeness. Each backed by multiple independent simulation signals.',
    chips: [
      { label: 'Claude Sonnet 4.6', red: true },
      { label: '6 simulations aggregated' },
      { label: '5 personas' },
      { label: 'CRITICAL / HIGH / MEDIUM scoring' },
    ],
  },
  {
    href: '/use-cases',
    label: 'Simulation Use Cases',
    tag: 'Scenario Library',
    intro:
      'Six structured simulation scenarios, each testing a specific failure mode in Redcare\'s search experience. Reproducible, data-linked, and evaluated against all five personas.',
    how: '',
    outcome: '',
    chips: [
      { label: '6 simulations', red: true },
      { label: '5 personas per run' },
      { label: 'Claude Haiku 4.5 (agents)' },
      { label: 'Claude Sonnet 4.6 (analysis)' },
      { label: 'Python · Playwright' },
      { label: 'Anthropic SDK' },
    ],
    subsections: [
      {
        label: 'Shopper Behavior Simulation — Shopper Behavior & Intent Variability · 5 agents · 1 SERP',
        description:
          'All five persona agents run the same SERP simultaneously. Each agent independently scores results, revealing how a single ranking decision produces radically different outcomes depending on who is searching. A result that converts the Price-Conscious Bulk Buyer triggers abandonment from the Acute Self-Treater. Model: Claude Haiku 4.5 per agent, Claude Sonnet 4.6 for cross-agent synthesis.',
      },
      {
        label: 'Frustration Propagation Simulation — Frustration Propagation & Trust Decay · 5 agents · up to 6 rounds each',
        description:
          'A deliberately weak SERP is shown to each persona. Trust levels are tracked across reformulation rounds using a decay model (frustration_agent.py). The finding: analytics records the abandon at round 6, but Frustration Propagation Simulation shows trust collapsed at round 3. Three rounds of apparent engagement were already lost sessions. One persona "converted" by stripping "Kinder" from a pediatric query and settling for an adult product — logged as a success, actually a failure.',
      },
      {
        label: 'Reformulation Burden Simulation — Reformulation Burden & Query Tree Analysis · 5 agents · full session trees',
        description:
          'Maps the complete query journey a persona takes inside a single session — from initial query through reformulations to final outcome. Visualizes the full decision tree: which branches lead to conversion, which to split basket, which to dropout. Python scraper.py fetches live SERP results; Claude Haiku 4.5 agents navigate; Claude Sonnet 4.6 generates the tree analysis.',
      },
      {
        label: 'Severity Illusion Simulation — Severity Illusion & Analytics Blind Spots · 109 failures · 5 personas scored each',
        description:
          '109 documented search failures classified by type, then each scored against all five personas using the Frustration Propagation Simulation trust decay framework. Worst-case persona severity score surfaces the gap between what standard analytics see (result count, click rate) and what actually happens to real customers. Structural finding: persona simulation cannot be replaced by threshold tuning alone.',
      },
      {
        label: 'Sponsored Relevance Audit — Sponsored vs Organic Relevance Audit · 5 queries · 5 persona agents',
        description:
          'Tests whether sponsored placements match the query\'s intent space. Finds systematic mismatch (e.g. a thermometer in a children\'s cold query). A follow-on pass loaded all five persona agents to track inner monologue and trust delta for each sponsored placement. Output: a specification for a pre-activation placement gate scored on intent alignment.',
      },
      {
        label: 'Synthetic Query Generation — Synthetic Query Generation & Gap Detection · Playwright scraper · Claude query gen',
        description:
          'Uses Claude to produce the full vocabulary space a German pharmacy customer might use for a given category — then tests each query via a Playwright-based scraper (autocomplete_scraper.py) that intercepts Algolia API responses character-by-character. Identifies autocomplete coverage gaps and terms present in products but absent from search indexing. Finding: 0% of audited PDPs have a synonym array.',
      },
    ],
  },
  {
    href: '/uc10',
    label: 'Stakeholder Simulation',
    tag: 'Organisational Dynamics',
    intro:
      'Three real search failures. Seven internal stakeholder agents. Four rounds of meeting simulation each — testing what organisational dynamic prevents findings from getting fixed.',
    how:
      'AI agents (Claude Sonnet 4.6) were given role-specific goals, incentive structures, and blocking behaviors derived from typical e-commerce org dynamics: Head of Ecommerce, Product Manager, Merchandiser, Support Lead, Legal, Vendor Rep, CEO. Three separate meetings were run for three different findings. Each agent has a private reasoning layer visible in the transcript.',
    outcome:
      'Accountability diffusion masquerading as procedural rigor: every stakeholder can demand pre-evidence for action while ensuring evidence-gathering has no owner. The Head of Ecommerce is the fulcrum in all three runs. Regulatory exposure (BtMG classification) was the only input that produced immediate, same-day action — revenue projections alone never moved the room.',
    chips: [
      { label: '7 stakeholder agents', red: true },
      { label: '3 meetings · 4 rounds each', red: true },
      { label: 'Claude Sonnet 4.6', red: true },
      { label: 'Anthropic SDK' },
      { label: 'Python orchestrator' },
    ],
  },
  {
    href: '/uc14',
    label: 'Data Quality Audit',
    tag: 'PDP Field Coverage',
    intro:
      'An automated audit of product detail page data completeness across 35 sampled PDPs from three categories: OTC medicines, cosmetics, and mother & child.',
    how:
      'Python script (uc14_pdp_data_audit.py) fetches PDP HTML via requests + BeautifulSoup, extracts JSON-LD structured data, then passes each PDP to Claude Sonnet 4.5 for an LLM field extraction pass. Fields audited: active ingredient (PZN-linked), INCI ingredient arrays, skin type, age restriction, dosage form, health claims, synonym arrays, and schema.org markup. Two-pass design: JSON-LD extraction first, LLM gap-fill second.',
    outcome:
      '0 of 35 PDPs have a synonym array — the highest-volume gap, affecting every customer who uses a layperson term not verbatim in the product title. Ingredient data exists in prose but is not machine-readable. Age restrictions appear in dosage text but are never extracted as filterable structured fields. The audit produces a prioritized remediation roadmap.',
    chips: [
      { label: '35 PDPs audited', red: true },
      { label: '3 product categories' },
      { label: 'Claude Sonnet 4.5', red: true },
      { label: 'Python · requests · BeautifulSoup' },
      { label: 'JSON-LD extraction + LLM pass' },
      { label: 'Anthropic SDK' },
    ],
  },
]

function TechChip({ label, red }: Chip) {
  return (
    <span
      style={{
        fontSize: '16px',
        fontFamily: "'SF Mono', 'Fira Code', monospace",
        padding: '3px 10px',
        background: red ? '#fff5f5' : '#f5f5f5',
        border: `1px solid ${red ? '#fecaca' : '#e5e5e5'}`,
        color: red ? '#E2001A' : '#525252',
        display: 'inline-block',
        marginRight: '6px',
        marginBottom: '6px',
        letterSpacing: '0.2px',
      }}
    >
      {label}
    </span>
  )
}

export default function HomePage() {
  return (
    <main>
      <Hero
        activePage="home"
        headline={
          <>
            SEARCH.
            <br />
            <em style={{ fontStyle: 'italic', color: '#E2001A' }}>SIMULATED.</em>
            <br />
            FINDINGS.
          </>
        }
        tagline="An AI-powered research framework that runs synthetic shoppers through real search journeys — uncovering relevance failures, UX friction, and data gaps before they cost conversions."
        rightContent={<HeroCarousel />}
      />

      {/* Author — top of page */}
      <section
        className="px-20 py-12"
        style={{ background: '#0a0a0a', borderBottom: '3px solid #E2001A' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', maxWidth: '1100px' }}>
          <div>
            <p
              className="mb-3 font-bold uppercase"
              style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}
            >
              Author
            </p>
            <h2
              className="mb-1 font-black"
              style={{ fontSize: '32px', letterSpacing: '0px', color: '#ffffff' }}
            >
              Michal Pekarcik
            </h2>
            <p style={{ fontSize: '16px', color: '#737373', marginBottom: '20px' }}>
              Search &amp; Discovery · Experimentation · AI Simulations &amp; Automations
            </p>
            <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
              <a
                href="mailto:michal.pekarcik@gmail.com"
                style={{ fontSize: '16px', color: '#a3a3a3', textDecoration: 'none', borderBottom: '1px solid #333', paddingBottom: '3px' }}
              >
                michal.pekarcik@gmail.com
              </a>
              <span style={{ color: '#404040' }}>·</span>
              <a
                href="https://www.linkedin.com/in/michalpekarcik/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '16px', color: '#a3a3a3', textDecoration: 'none', borderBottom: '1px solid #333', paddingBottom: '3px' }}
              >
                linkedin.com/in/michalpekarcik
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section
        className="px-20 py-16"
        style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}
      >
        <p
          className="mb-4 font-bold uppercase"
          style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}
        >
          About This Project
        </p>
        <h2
          className="mb-8 font-black"
          style={{ fontSize: '48px', lineHeight: 1.05, letterSpacing: '0px', color: '#0a0a0a' }}
        >
          What Is the Search Simulation Lab?
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '56px',
            maxWidth: '1100px',
          }}
        >
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#404040' }}>
            Traditional search audits rely on expert judgment and manual spot-checks. This lab takes
            a different approach: synthetic users — built from behavioral research and real market
            data — run structured sessions through Redcare's search experience, exposing friction
            that manual review misses.
          </p>
          <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#404040' }}>
            The output is a set of reproducible, evidence-backed findings mapped to real business
            impact. Every section corresponds to a distinct layer of that analysis — from persona
            construction through data quality — so findings can be traced back to their source.
          </p>
        </div>
      </section>

      {/* Why it matters */}
      <section
        className="px-20 py-16"
        style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}
      >
        <p
          className="mb-4 font-bold uppercase"
          style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}
        >
          Findings at a Glance
        </p>
        <h2
          className="mb-12 font-black"
          style={{ fontSize: '36px', lineHeight: 1.1, letterSpacing: '0px', color: '#0a0a0a' }}
        >
          What the Simulations Actually Found
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '1100px',
          }}
        >
          {[
            {
              stat: '40%',
              label: 'Abandon rate on a SERP with 8 results and no errors — measured in Shopper Behavior Simulation across 5 personas. Standard monitoring flagged no failure.',
            },
            {
              stat: '1 of 9',
              label: 'Shopping-context queries passed in the Audit Report. Price constraints ("unter 10 euro", "bis 20 euro") were silently dropped — up to 11 of 14 results violated the stated limit.',
            },
            {
              stat: '0 of 7',
              label: 'Symptom-phrased queries returned relevant results in Cold, Pain & Nasal care — the highest-intent category on a pharmacy platform.',
            },
            {
              stat: 'Round 3',
              label: 'Trust collapsed in Frustration Propagation Simulation — but analytics recorded the abandon at round 6. Three rounds of reformulation that looked like engagement were already a lost customer.',
            },
            {
              stat: '14×',
              label: 'CTR gap between a mismatched sponsored slot (0.3%) and the category baseline (4.2%) — while the broken placement actively suppressed organic results below it.',
            },
          ].map(({ stat, label }) => (
            <div key={stat} style={{ borderTop: '3px solid #E2001A', paddingTop: '20px' }}>
              <p
                className="font-black mb-3"
                style={{ fontSize: '42px', letterSpacing: '0px', color: '#0a0a0a' }}
              >
                {stat}
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: '#525252' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section index */}
      <section
        className="px-20 py-16"
        style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}
      >
        <p
          className="mb-4 font-bold uppercase"
          style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}
        >
          Contents
        </p>
        <h2
          className="mb-12 font-black"
          style={{ fontSize: '36px', lineHeight: 1.1, letterSpacing: '0px', color: '#0a0a0a' }}
        >
          What's Inside
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', maxWidth: '1200px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}>
          {sections.map(({ href, label, tag, intro, how, outcome, chips, subsections }) => (
            <div key={href} style={{ background: '#ffffff' }}>
              <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ padding: '32px 36px 24px', borderBottom: subsections ? '1px solid #f0f0f0' : 'none' }}>
                  <p
                    className="mb-2 font-bold uppercase"
                    style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}
                  >
                    {tag}
                  </p>
                  <p
                    className="font-black mb-4"
                    style={{ fontSize: '22px', letterSpacing: '0px', color: '#0a0a0a' }}
                  >
                    {label} →
                  </p>
                  <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#404040', marginBottom: '16px' }}>
                    {intro}
                  </p>

                  {/* Tech chips */}
                  <div style={{ marginBottom: how ? '20px' : '0' }}>
                    {chips.map(c => <TechChip key={c.label} {...c} />)}
                  </div>

                  {how && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '32px',
                        paddingTop: '20px',
                        borderTop: '1px solid #f0f0f0',
                      }}
                    >
                      <div>
                        <p
                          className="font-bold uppercase mb-2"
                          style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}
                        >
                          How it was done
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#525252' }}>{how}</p>
                      </div>
                      <div>
                        <p
                          className="font-bold uppercase mb-2"
                          style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}
                        >
                          Key findings
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#525252' }}>{outcome}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Link>

              {/* Subsections */}
              {subsections && (
                <div style={{ padding: '0 36px 28px' }}>
                  <p
                    className="font-bold uppercase mb-4"
                    style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373', paddingTop: '24px' }}
                  >
                    Simulations included
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e5e5' }}>
                    {subsections.map((sub, i) => (
                      <div
                        key={sub.label}
                        style={{
                          padding: '18px 22px',
                          borderBottom: i < subsections.length - 1 ? '1px solid #e5e5e5' : 'none',
                          background: i % 2 === 0 ? '#ffffff' : '#fafafa',
                        }}
                      >
                        <p
                          className="font-bold mb-2"
                          style={{ fontSize: '16px', color: '#0a0a0a', letterSpacing: '0px' }}
                        >
                          {sub.label}
                        </p>
                        <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#525252' }}>
                          {sub.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: '16px', fontSize: '16px', color: '#a3a3a3' }}>
                    <Link href={href} style={{ color: '#E2001A', textDecoration: 'none', fontWeight: 600 }}>
                      View all simulations →
                    </Link>
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
