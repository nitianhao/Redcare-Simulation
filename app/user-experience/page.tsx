import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'


// ── shared primitives ────────────────────────────────────────────────────────

function SeverityBadge({ label, color, bg, border }: { label: string; color: string; bg: string; border: string }) {
  return (
    <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color, background: bg, border: `1px solid ${border}`, padding: '3px 8px' }}>
      {label}
    </span>
  )
}

function IssueBlock({ title, severity, children }: { title: string; severity: 'critical' | 'high' | 'medium' | 'low'; children: React.ReactNode }) {
  const colors = {
    critical: { dot: '🔴', border: '#fecaca', bg: '#fff5f5', label: 'CRITICAL', color: '#991b1b' },
    high: { dot: '🟠', border: '#fde68a', bg: '#fffbeb', label: 'HIGH', color: '#92400e' },
    medium: { dot: '🟡', border: '#e9d5ff', bg: '#faf5ff', label: 'MEDIUM', color: '#6b21a8' },
    low: { dot: '🔵', border: '#bfdbfe', bg: '#eff6ff', label: 'LOW', color: '#1e40af' },
  }
  const c = colors[severity]
  return (
    <div style={{ border: `1px solid ${c.border}`, background: c.bg, padding: '16px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color: c.color, background: 'rgba(0,0,0,0.05)', padding: '2px 6px' }}>{c.label}</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a' }}>{title}</span>
      </div>
      <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#737373', marginBottom: '4px', textTransform: 'uppercase' }}>{label}</p>
      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '0px', margin: 0 }}>{title}</h3>
    </div>
  )
}

function MissingFeaturesTable({ rows }: { rows: [string, string][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, letterSpacing: '0.5px', width: '55%' }}>Feature</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, letterSpacing: '0.5px' }}>Present on Competitors</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([feature, competitors], i) => (
          <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: '8px 10px', color: '#0a0a0a', fontWeight: 600 }}>{feature}</td>
            <td style={{ padding: '8px 10px', color: '#525252' }}>{competitors}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ArchitectureProblemsTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#fef2f2', borderBottom: '2px solid #fecaca', fontWeight: 700, width: '8%' }}>#</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#fef2f2', borderBottom: '2px solid #fecaca', fontWeight: 700, width: '35%' }}>Problem</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#fef2f2', borderBottom: '2px solid #fecaca', fontWeight: 700 }}>Impact</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([n, problem, impact], i) => (
          <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: '8px 10px', color: '#991b1b', fontWeight: 700 }}>{n}</td>
            <td style={{ padding: '8px 10px', color: '#0a0a0a', fontWeight: 600 }}>{problem}</td>
            <td style={{ padding: '8px 10px', color: '#525252' }}>{impact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function QuickWinsTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f0fdf4', borderBottom: '2px solid #bbf7d0', fontWeight: 700, width: '4%' }}>#</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f0fdf4', borderBottom: '2px solid #bbf7d0', fontWeight: 700, width: '55%' }}>Win</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f0fdf4', borderBottom: '2px solid #bbf7d0', fontWeight: 700, width: '18%' }}>Effort</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f0fdf4', borderBottom: '2px solid #bbf7d0', fontWeight: 700 }}>Impact</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([n, win, effort, impact], i) => (
          <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: '8px 10px', color: '#737373', fontWeight: 700 }}>{n}</td>
            <td style={{ padding: '8px 10px', color: '#0a0a0a', fontWeight: 500 }}>{win}</td>
            <td style={{ padding: '8px 10px', color: '#525252' }}>{effort}</td>
            <td style={{ padding: '8px 10px', color: '#525252' }}>{impact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function ScreenshotBlock({ src, alt, label }: { src: string; alt: string; label: string }) {
  return (
    <div style={{ marginTop: '32px', border: '1px solid #e5e5e5' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid #e5e5e5', background: '#fafafa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', margin: 0 }}>{label}</p>
        <a href={src} target="_blank" rel="noreferrer" style={{ fontSize: '16px', fontWeight: 600, color: '#E2001A', textDecoration: 'none', letterSpacing: '0.5px' }}>Open full →</a>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </div>
  )
}

function ScreenCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <section style={{ background: '#ffffff', borderBottom: '2px solid #e5e5e5', padding: '48px 80px 56px' }}>
      <div style={{ marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #e5e5e5' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase' }}>Screen {num} of 06</span>
        <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '0px', color: '#0a0a0a', margin: '6px 0 0' }}>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: '32px' }}>
      <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '14px', borderLeft: '3px solid #E2001A', paddingLeft: '10px' }}>{title}</p>
      {children}
    </div>
  )
}

function BiggerBet({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: '1px solid #e5e5e5', padding: '16px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'baseline' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#E2001A', letterSpacing: '1px', background: '#fff5f5', border: '1px solid #fecaca', padding: '2px 6px' }}>BB-{n}</span>
        <span style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a' }}>{title}</span>
      </div>
      <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

// ── page ────────────────────────────────────────────────────────────────────

export default function UserExperiencePage() {
  return (
    <main style={{ background: '#fafafa' }}>
      <SharedNav activePage="user-experience" />

      {/* Hero */}
      <section style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', padding: '40px 80px 36px', display: 'flex', gap: '80px', alignItems: 'center' }}>
        <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
          <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '10px' }}>UX Audit Library — 6 Screens</p>
          <h1 style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '0px', color: '#0a0a0a', lineHeight: 1, marginBottom: '14px' }}>
            WEB UX AUDIT.<br />
            <em style={{ fontStyle: 'italic', color: '#E2001A' }}>SHOP-APOTHEKE.COM</em>
          </h1>
          <p style={{ fontSize: '16px', color: '#525252', lineHeight: 1.7, maxWidth: '680px', margin: 0 }}>
            This page presents a focused UX audit of key search journey moments, built to uncover usability friction,
            trust-breaking details, and conversion blockers that impact real customer decisions. For Redcare teams, it offers
            a practical, evidence-based roadmap to improve findability, reduce drop-off, and prioritize changes that can raise
            both customer confidence and business performance.
          </p>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/hero-web-ux.webp" alt="shop-apotheke.com autocomplete dropdown showing 'husten'" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }} />
        </div>
      </section>

      {/* ── Screen index ─────────────────────────────────────────────────── */}
      <section style={{ background: '#fafafa', borderBottom: '2px solid #0a0a0a', padding: '32px 80px' }}>
        <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '3px', color: '#737373', textTransform: 'uppercase', marginBottom: '12px' }}>
          JUMP TO SCREEN
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[
            { n: '01', name: 'Search Bar — Empty State', sub: 'Zero-input dropdown · recent searches · suggest hierarchy', anchor: '#screen-01' },
            { n: '02', name: 'Autocomplete — Searching', sub: 'Suggester behavior · keyword highlights · product tiles', anchor: '#screen-02' },
            { n: '03', name: 'Search Results Page', sub: '1,668 results for "husten" · sponsored ranking · filter state', anchor: '#screen-03' },
            { n: '04', name: 'Filters / Facets Panel', sub: 'Kategorien expanded · intent mismatch · filter UX', anchor: '#screen-04' },
            { n: '05', name: 'Zero Results — Search Results Page', sub: 'Null SERP state · recovery CTAs · sponsored contradiction', anchor: '#screen-05' },
            { n: '06', name: 'Zero Results — Suggester', sub: 'Silent dropdown failure · no fuzzy match · no fallback', anchor: '#screen-06' },
          ].map(({ n, name, sub, anchor }) => (
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
                padding: '12px 20px',
              }}
            >
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#E2001A', letterSpacing: '1px', minWidth: '24px', flexShrink: 0 }}>{n}</span>
              <span style={{ width: '1px', height: '32px', background: '#e5e5e5', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.2 }}>{name}</div>
                <div style={{ fontSize: '16px', color: '#737373', marginTop: '2px' }}>{sub}</div>
              </div>
              <span style={{ fontSize: '16px', color: '#737373', flexShrink: 0 }}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SCREEN 01 ──────────────────────────────────────────────────────── */}
      <div id="screen-01">
        <ScreenCard num="01" title="Search Bar Focused — Empty State">


          <ScreenshotBlock
            src="/ux-audit/01_search-bar-focused-empty.png"
            alt="Search bar focused, empty state"
            label="Screenshot 01 — Search Bar Focused, Empty State"
          />
          <SubSection title="High Issues">
            <IssueBlock title="Anonymous empty-state suggestions are poorly framed and over-prioritized" severity="high">
              Showing generic content before the user types is expected when no profile context is available. The UX problem is framing and hierarchy: product tiles are given prominent space without clearly signaling they are generic (not personalized or query-matched), while stronger zero-input helpers (top categories, common queries, care intents) are less emphasized. This increases the chance of low-relevance clicks and slows users from reaching task-specific results.
            </IssueBlock>
            <IssueBlock title="Recent search history exposed without authentication gate" severity="high">
              Recent searches ("Sport Verletzung Behandeln", "Baby Erstausstattung", "Schlaf") are displayed to what appears to be an unauthenticated user. In a pharmaceutical context, search history is sensitive health data. Displaying it on shared devices (family computers, kiosks) without session-scoped handling is a GDPR and health-data privacy concern.
            </IssueBlock>
            <IssueBlock title="No 'Recently viewed products' module in zero-input state" severity="high">
              The empty-state dropdown promotes generic &ldquo;Beliebte Produkte&rdquo; but does not surface recently viewed products, which are often a stronger predictor of immediate intent in repeat visits. For many users, re-finding a product they already considered is faster and more useful than browsing popularity-based items. This misses a high-value shortcut for returning users and increases time-to-product.
            </IssueBlock>
          </SubSection>

          <SubSection title="Medium & Low Issues">
            <IssueBlock title="'Löschen' (Delete) has no confirmation and unclear scope" severity="medium">
              A red &ldquo;Löschen&rdquo; link appears below recent searches. Does it delete all history or just the last entry? Styled identically to a nav link, with no tooltip or confirmation dialog. Users may accidentally clear their health search history.
            </IssueBlock>
            <IssueBlock title="Three-column layout has no clear primary navigation path" severity="medium">
              &ldquo;Zuletzt Gesucht,&rdquo; &ldquo;Beliebte Suchen,&rdquo; and &ldquo;Beliebte Marken&rdquo; are equal-weight columns with identical header typography. No hierarchy signals which the user should engage first — increasing time-to-first-click.
            </IssueBlock>
            <IssueBlock title="'ab €' pricing without variant context" severity="medium">
              &ldquo;From&rdquo; pricing with no indication of what the base variant is or why multiple prices exist. Users don&apos;t know if the shown price requires a subscription, specific pack size, or loyalty condition.
            </IssueBlock>
            <IssueBlock title="No keyboard navigation indicators on dropdown items" severity="medium">
              No visible focus states on any dropdown element. WCAG 2.1 AA compliance failure — significant in a pharmacy context where motor-impaired users are overrepresented.
            </IssueBlock>
            <IssueBlock title="Newsletter banner competes with search focus state" severity="low">
              Two simultaneous conversion moments (newsletter signup + product search) fight for attention. The banner&apos;s red &ldquo;Zum Newsletter anmelden&rdquo; button visually competes with the red &ldquo;Suchen&rdquo; button.
            </IssueBlock>
          </SubSection>

          <SubSection title="Missing Features">
            <MissingFeaturesTable rows={[
              ['Search query autocomplete / typeahead (as you type)', 'DocMorris, Amazon Pharmacy, Boots.com'],
              ['Barcode / QR scanner for prescription or product reorder', 'DocMorris app, Zur Rose'],
              ['Voice search input', 'Walgreens, CVS'],
              ['Login nudge in search dropdown', 'Amazon, Apotek Hjärtat'],
              ['Drug interaction / safety search path', 'Drugs.com, NHS search'],
              ['Estimated delivery date in product cards', 'DocMorris, Amazon'],
              ['E-Rezept fast-track search entry', 'Emerging on DocMorris'],
              ['"Previously purchased" products for returning users', 'Amazon, Boots'],
            ]} />
          </SubSection>
          <SubSection title="Quick Wins">
            <QuickWinsTable rows={[
              ['1', 'Add confirmation on "Löschen" — inline prompt or undo toast', 'Low (2–3 hours)', '🟡 Prevents accidental data loss'],
              ['2', 'Display numeric star average alongside count (e.g., "4.8 ★ (27)")', 'Low (template change)', '🟡 Credibility improvement'],
              ['3', 'Label "Beliebte Produkte" contextually — e.g., "Saisonale Bestseller"', 'Low (copy change)', '🟡 Relevance signaling'],
              ['4', 'Visually differentiate column headers — make "Zuletzt Gesucht" bold/primary', 'Low (CSS)', '🟡 Faster time-to-click for returning users'],
              ['5', 'Add delivery callout to product cards in dropdown ("Lieferung morgen")', 'Medium', '🟠 High — conversion nudge at zero-input'],
              ['6', 'Add keyboard focus styles to all dropdown interactive elements', 'Low (CSS/ARIA)', '🟡 WCAG 2.1 AA compliance'],
              ['7', 'Collapse newsletter banner when search dropdown is open', 'Low (JS event)', '🔵 Reduces attention competition'],
            ]} />
          </SubSection>

          <SubSection title="Bigger Bets">
            <BiggerBet n="01" title="Intent-Aware Empty Search State">
              Use time-of-day, session context, and behavioral signals to dynamically change dropdown content. Morning sessions surface vitamins; cold/flu season surfaces OTC categories; returning users see their last order for restock. Transforms the dropdown from a static editorial block into a dynamic first-touch personalization surface.
            </BiggerBet>
            <BiggerBet n="02" title="'Search by Symptom' Entry Mode">
              Secondary search mode (toggle: &ldquo;Suche nach Produkt / Symptom&rdquo;) routing users through a structured symptom → category → product recommendation flow. Significant competitive differentiator vs. DocMorris and creates a unique consultation-like experience for users who don&apos;t know the product name.
            </BiggerBet>
            <BiggerBet n="03" title="Integrate E-Rezept Fast Track Directly Into Search">
              Add an E-Rezept upload/scan CTA as a persistent element within the search dropdown. Collapses the journey from prescription receipt to product fulfillment into a single interaction. Strategically sound as E-Rezept adoption accelerates in Germany.
            </BiggerBet>
            <BiggerBet n="04" title="Federated Search Architecture with Intent Classification">
              Backend intent classification layer that pre-categorises each query — distinguishing navigational, informational, and transactional queries. Each routes to a differently structured results page. This is the foundational infrastructure change unlocking the majority of higher-priority UX improvements above.
            </BiggerBet>
          </SubSection>
        </ScreenCard>
      </div>

      {/* ── SCREEN 02 ──────────────────────────────────────────────────────── */}
      <div id="screen-02">
        <ScreenCard num="02" title="Autocomplete — Searching">


          <ScreenshotBlock
            src="/ux-audit/02_search-bar-typing-husten.png"
            alt="Autocomplete dropdown while typing husten"
            label="Screenshot 02 — Autocomplete / Suggester Active"
          />
          <SubSection title="Critical Issues">
            <IssueBlock title="No symptom-based path — 'husten' treated as pure keyword" severity="critical">
              &ldquo;Husten&rdquo; is a symptom, not a product name. The autocomplete responds with product-name completions only (&ldquo;Hustensaft,&rdquo; &ldquo;Hustenstiller&rdquo;) with zero acknowledgment of therapeutic ambiguity. A dry-cough user needs a suppressant (Dextromethorphan); a productive-cough user needs an expectorant (ACC, Ambroxol) — opposite treatments. This creates medication misuse risk, abandonment by uncertain users, and trust erosion.
            </IssueBlock>
            <IssueBlock title="'Beliebte Produkte' label is commercially misleading" severity="critical">
              The four products shown include the retailer&apos;s own Redcare private label in positions 1 and 2, without disclosure. In pharmaceutical retail, presenting house-brand products as organically &ldquo;popular&rdquo; is a dark pattern with regulatory implications (EU P2B Regulation 2019/1150 transparency requirements for ranking parameters).
            </IssueBlock>
            <IssueBlock title="Autocomplete product list is artificially capped despite available scroll space" severity="critical">
              The dropdown exposes only a very small number of products, even though the component can support a scrollable list and surface substantially more options in-place. For broad health queries, this early truncation suppresses discoverability and forces unnecessary progression to the next page for users who could have selected a relevant item directly from the suggester.
            </IssueBlock>
            <IssueBlock title="Primary search CTA does not indicate expected result volume" severity="critical">
              The CTA gives no preview of how many results await on the results page. Without a count signal (for example, &ldquo;Alle 1.668 Ergebnisse anzeigen&rdquo;), users cannot gauge whether they are entering a rich result set or a low-confidence path, which weakens click confidence and next-step clarity.
            </IssueBlock>
          </SubSection>

          <SubSection title="High Issues">
            <IssueBlock title="Search suggestions lack categorical context" severity="high">
              &ldquo;Husten,&rdquo; &ldquo;Hustensaft,&rdquo; &ldquo;Hustenstiller&rdquo; appear as plain text links with no type labels (Kategorie / Produkt / Marke) or result counts. Users cannot predict what clicking each will show. Competitors (DocMorris, dm.de, Amazon) include type labels and result counts.
            </IssueBlock>
            <IssueBlock title="Discounts shown without anchoring the discount mechanism" severity="high">
              All four products show struck-through original prices with 41% discounts and no explanation (sale? subscription? member price?). In pharmaceutical contexts, unexplained steep discounts trigger credibility questions rather than purchase urgency — inverse to general e-commerce behavior.
            </IssueBlock>
          </SubSection>

          <SubSection title="Medium & Low Issues">
            <IssueBlock title="Keyword highlight uses same red as price/CTA — visual hierarchy collision" severity="medium">
              &ldquo;Husten&rdquo; highlighted in red in product names, prices shown in red, Search button is red. Three semantically different elements share one color signal. Eye-tracking shows fixation patterns break down when keyword highlights use the same hue as prices.
            </IssueBlock>
            <IssueBlock title="Product thumbnails too small for brand recognition (~40×50px)" severity="medium">
              Below recognition threshold for pharmaceutical packaging color and logo identification. Returning patients who recognize their medication by box cannot use images as navigation aids.
            </IssueBlock>
            <IssueBlock title="No dosage form or pack size in dropdown" severity="medium">
              Without pack size, price comparison in the dropdown is meaningless or actively misleading (€4.69 vs €7.89 could be same product in different pack sizes). Forces unnecessary click-through to PDP.
            </IssueBlock>
            <IssueBlock title="No keyboard navigation indicators" severity="low">
              No visible focus ring on any dropdown suggestion. WCAG 2.1 SC 2.4.7 compliance failure. Legal exposure under BFSG (Barrierefreiheitsstärkungsgesetz, effective 2025).
            </IssueBlock>
          </SubSection>

          <SubSection title="Missing Features">
            <MissingFeaturesTable rows={[
              ['Symptom-to-category routing ("Cough → Dry vs. Productive?")', 'Zur Rose (CH), Boots.com, CVS.com'],
              ['Result count per suggestion ("Hustenstiller — 47 Produkte")', 'DocMorris, Amazon, Notino'],
              ['Suggestion type labels (Kategorie / Marke / Wirkstoff)', 'DocMorris, Medpex, idealo'],
              ['Active ingredient (Wirkstoff) search suggestions', 'Medpex.de, DocMorris'],
              ['Filter chips inside dropdown (Für Kinder / Für Erwachsene)', 'Boots.com, Walgreens'],
              ['Rating/review count on dropdown products', 'DocMorris, Amazon, Notino'],
              ['Stock/availability signal ("Sofort lieferbar")', 'DocMorris, aponeo'],
              ['Prescription indicator (OTC vs. Rx badge)', 'DocMorris, Redcare.com'],
              ['Scroll/count affordance ("Alle 120 Ergebnisse anzeigen")', 'DocMorris, Amazon, Zalando'],
            ]} />
          </SubSection>
          <SubSection title="Information Architecture Problems">
            <ArchitectureProblemsTable rows={[
              ['1', 'Flat taxonomy for a hierarchical medication intent', 'The flow jumps from a broad symptom query directly to products, skipping useful mid-steps like treatment type and audience.'],
              ['2', 'Mixed entity types without strong labels', 'Suggestions blend categories, terms, and products, which slows prediction of click outcome.'],
              ['3', 'Weak path from discovery to full-result exploration', 'Users do not get a strong structural handoff from dropdown exploration to complete result navigation.'],
            ]} />
          </SubSection>
          <SubSection title="Quick Wins">
            <QuickWinsTable rows={[
              ['1', 'Add result count to each suggestion ("Hustenstiller — 52 Produkte")', 'Low (frontend label from existing API)', 'High — sets expectations, reduces pogo-sticking'],
              ['2', 'Rename "Suchen" section header to "Vorschläge" or "Kategorien"', 'Trivial (copy change)', 'Low-Medium — reduces cognitive noise'],
              ['3', 'Add "Sponsored" / "Eigenmarke" disclosure label to Redcare products', 'Low (data tag + CSS)', 'High — regulatory compliance + trust'],
              ['4', 'Add suggestion type chips [Kategorie] [Produkt] [Wirkstoff]', 'Low-Medium', 'Medium — improves scanability'],
              ['5', 'Show pack size in product name within dropdown', 'Low (append field from PIM)', 'High — makes price comparison meaningful'],
              ['6', 'Change keyword highlight color from red to secondary brand color', 'Trivial (CSS)', 'Medium — fixes visual hierarchy collision'],
              ['8', 'Add "Alle Ergebnisse anzeigen →" CTA with total count at dropdown bottom', 'Low', 'High — captures users who don\'t see their product'],
              ['9', 'Add OTC/Rx badge to each dropdown product', 'Low-Medium', 'High — safety-critical disambiguation'],
              ['10', 'Increase thumbnail size to minimum 56×56px', 'Trivial (CSS)', 'Medium — aids visual brand recognition'],
            ]} />
          </SubSection>

          <SubSection title="Bigger Bets">
            <BiggerBet n="02" title="Active Ingredient (Wirkstoff) Search Intelligence">
              Build INN recognition into the search index so &ldquo;husten&rdquo; surfaces a &ldquo;Wirkstoffe gegen Husten&rdquo; section: Dextromethorphan (trocken), Ambroxol/ACC (produktiv), Codein (stark). Reframes the platform as a clinical tool — major trust and retention driver for the informed patient segment.
            </BiggerBet>
            <BiggerBet n="03" title="Personalized Suggestions Based on Purchase/Rx History">
              For logged-in users, de-prioritize generic &ldquo;Beliebte Produkte&rdquo; and replace with &ldquo;Zuletzt von Ihnen gekauft&rdquo; recommendations. A returning patient searching &ldquo;husten&rdquo; who previously purchased Ambroxol should see their prior product first. The current model treats a first-time visitor and a five-year customer identically — a significant retention failure.
            </BiggerBet>
            <BiggerBet n="04" title="Contraindication & Interaction Warnings in Search Results">
              Surface inline pharmacist flags at the search results level for high-interaction-risk substances. A user with documented Rx for MAO inhibitors searching &ldquo;Hustenstiller&rdquo; should see a soft warning before reaching the PDP. Positions Shop Apotheke as an active safety layer leveraging the E-Rezept infrastructure already in the navigation.
            </BiggerBet>
          </SubSection>
        </ScreenCard>
      </div>

      {/* ── SCREEN 03 ──────────────────────────────────────────────────────── */}
      <div id="screen-03">
        <ScreenCard num="03" title="Search Results Page — 'husten' (1,668 results)">


          <ScreenshotBlock
            src="/ux-audit/03_search-results-husten.png"
            alt="Search results page for query husten"
            label="Screenshot 03 — Search Results Page (husten, 1,668 results)"
          />
          <SubSection title="Critical Issues">
            <IssueBlock title="No symptom-based navigation / clinical triage layer" severity="critical">
              The query &ldquo;husten&rdquo; is inherently ambiguous — dry cough, productive cough, children vs. adults, acute vs. chronic, with fever or without. The page dumps 1,668 products directly without any disambiguation step. Compare: Boots.com surfaces a &ldquo;What are you looking for?&rdquo; guided filter at the top of ambiguous health queries. Users who don&apos;t already know a brand name (ACC, Mucosolvan) face immediate cognitive overload and are likely to abandon or make a suboptimal choice.
            </IssueBlock>
            <IssueBlock title="Sponsored content not visually differentiated from organic results" severity="critical">
              All 6 visible products carry &ldquo;Now! Produkt&rdquo; + &ldquo;Gesponsert&rdquo; tags, but these are rendered at the same visual weight as &ldquo;Arzneimittel&rdquo; or &ldquo;pflanzlich&rdquo; classification tags. Regulatory risk (German UWG, EU Digital Services Act). Trust erosion when users realize top results are all paid. In pharma, this creates a patient safety concern — commercially-prioritized over clinically optimal results.
            </IssueBlock>
            <IssueBlock title="Suggester-to-SERP result continuity is inconsistent, especially with sponsored ranking" severity="critical">
              The set and order of products shown in autocomplete do not clearly carry over to the full results page, which makes the journey feel unstable. Sponsored placements amplify this mismatch, so users cannot build a reliable expectation of what they will see after clicking through. This creates confusion, lowers trust in ranking logic, and increases back-and-forth behavior between search states.
            </IssueBlock>
          </SubSection>

          <SubSection title="High Issues">
            <IssueBlock title="Zero pagination / infinite scroll controls visible" severity="high">
              1,668 results with no visible pagination, no results-per-page selector, and no infinite scroll trigger. Users have no sense of result set depth or how to navigate it.
            </IssueBlock>
            <IssueBlock title="All filters collapsed by default — none pre-applied for ambiguous query" severity="high">
              Left sidebar shows Kategorien, Darreichungsform, Preis, Sortieren nach — all collapsed, all empty. Baymard Institute data shows 42% of users won&apos;t use faceted filters if they require multiple click-to-open interactions.
            </IssueBlock>
            <IssueBlock title="Price discount presentation creates anchoring confusion" severity="high">
              Each card shows: discount badge (-39%²), current price (ab €7,79), unit price (0,78 €/1 St), crossed-out AVP/UVP price (€12,82), AND a footnote superscript (²). That&apos;s 5 price-related data points per card — the ² footnote isn&apos;t even in the viewport.
            </IssueBlock>
            <IssueBlock title="'Verfügbar' CTA is functionally ambiguous" severity="high">
              The green &ldquo;Verfügbar&rdquo; (Available) button looks like a CTA but functions as a status indicator. There is no &ldquo;In den Warenkorb&rdquo; button visible on the cards at all.
            </IssueBlock>
          </SubSection>

          <SubSection title="Medium & Low Issues">
            <IssueBlock title="'apothekenpflichtig' tag applied without explanation" severity="medium">
              Shown on nearly every card but never explained — does this mean prescription required? (No — it means OTC but pharmacy-only.) Creates anxiety without resolution.
            </IssueBlock>
            <IssueBlock title="Results page title is generic and misses query context" severity="medium">
              The page headline communicates a results state but does not explicitly anchor the query (for example, &ldquo;Results for &lsquo;husten&rsquo;&rdquo;). This weakens orientation after transition from autocomplete and makes it harder for users to confirm they are viewing the intended result set.
            </IssueBlock>
            <IssueBlock title="No 'For Children' / 'For Adults' quick filter" severity="medium">
              Cough treatments are heavily age-segmented (Mucosolvan: &ldquo;ab 0 Jahre&rdquo;, WICK: &ldquo;ab 14 Jahren&rdquo;, ACC: &ldquo;ab 2 Jahren&rdquo;) yet no age-group filter is surfaced.
            </IssueBlock>
            <IssueBlock title="Breadcrumb navigation missing" severity="low">
              No breadcrumb trail from homepage to search results.
            </IssueBlock>
            <IssueBlock title="Newsletter banner + 12% badge compete for top-of-page attention" severity="low">
              Two promotional elements above the navigation increase time-to-first-result in a task-oriented health query context.
            </IssueBlock>
          </SubSection>

          <SubSection title="Missing Features">
            <MissingFeaturesTable rows={[
              ['Symptom/indication guided filter chips ("Reizhusten · Schleimhusten · Für Kinder")', 'Redcare, Boots UK, CVS'],
              ['"Frequently Bought Together" / complementary products', 'iHerb, Boots'],
              ['Product comparison checkbox', 'Redcare, DocMorris'],
              ['"Our Pharmacist Recommends" editorial widget', 'Boots UK, Lloyds Pharmacy'],
              ['Real-time delivery promise ("Heute bestellen, morgen geliefert bis 14:00")', 'Amazon Pharmacy, Redcare'],
              ['List vs Grid view toggle', 'iHerb, Vitacost'],
              ['Recently Viewed / Search History context bar', 'CVS, Walgreens'],
            ]} />
          </SubSection>
          <SubSection title="Information Architecture Problems">
            <ArchitectureProblemsTable rows={[
              ['1', 'Facet hierarchy does not match user decision flow', 'Users typically choose by symptom and patient profile first, but the page leads with catalog and commercial facets.'],
              ['2', 'Sponsored and organic signals share nearby visual territory', 'When ad markers sit close to functional badges, trust and wayfinding both decline.'],
              ['3', 'Duplicate-brand cards appear as separate options', 'Without structural grouping, users must manually infer equivalence across near-identical products.'],
            ]} />
          </SubSection>
          <SubSection title="Quick Wins">
            <QuickWinsTable rows={[
              ['QW1', 'Visually distinguish "Gesponsert" from classification tags (yellow bg + Ad icon)', 'Low', 'High'],
              ['QW2', 'Expand top 3–4 filter values by default (Darreichungsform: Sirup, Tabletten, Kapseln)', 'Low', 'High'],
              ['QW3', 'Add symptom chips below search bar: "Reizhusten · Schleimhusten · Für Kinder · Pflanzlich"', 'Low–Med', 'High'],
              ['QW4', 'Standardize discount badge + add "Sie sparen €X" line', 'Low', 'Med–High'],
              ['QW5', 'Move PZN/EAN behind a "Details" toggle to reduce card density', 'Low', 'Med'],
              ['QW6', 'Replace "Verfügbar" with "In den Warenkorb" CTA + separate green status indicator', 'Low–Med', 'High'],
              ['QW7', 'Add "Auch erhältlich als: ACC 600mg →" cross-link on duplicate-brand cards', 'Low', 'Med'],
            ]} />
          </SubSection>

          <SubSection title="Bigger Bets">
            <BiggerBet n="B1" title="Symptom-First Search Triage Layer">
              Before showing 1668 results, present a guided triage step: &ldquo;Welche Art von Husten haben Sie?&rdquo; with selectable symptom cards. Competitors (DocMorris, Amazon OTC) are moving toward this model. Dramatically reduces cognitive overload; increases conversion from ambiguous health queries.
            </BiggerBet>
            <BiggerBet n="B2" title="Product Card Redesign: Scannable 3-Column Layout">
              The current card has a de facto 3-zone layout (image | details | price) but inconsistently applied. Formalize into a proper 3-column structure: image (left, larger), core info + claim (center), pricing + Add-to-Cart (right, always visible). Enables faster scanning without increasing card height.
            </BiggerBet>
            <BiggerBet n="B3" title="Variant Grouping">
              Products differing only by strength, pack size, or dosage form (ACC 600mg vs 200mg; 10-count vs 50-count) listed as separate cards, inflating result count and forcing manual comparison. Group variants under expandable swatch/dropdown — as done on Amazon and Zalando.
            </BiggerBet>
            <BiggerBet n="B4" title="Contextual Filtering by Symptom or Use Case">
              Current filter panel exposes pharmaceutical categories (Darreichungsform, Wirkstoff) that presuppose clinical knowledge. Add a symptom/intent-driven filter layer (&ldquo;dry cough,&rdquo; &ldquo;chesty cough,&rdquo; &ldquo;for children,&rdquo; &ldquo;night-time relief&rdquo;) that maps to users&apos; mental model. Reference: Boots.com.
            </BiggerBet>
          </SubSection>

          <div style={{ marginTop: '32px' }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginBottom: '10px' }}>
              <a href="/ux-audit/03_prototype-improved-srp.html" target="_blank" rel="noreferrer" style={{ fontSize: '16px', fontWeight: 700, color: '#E2001A', textDecoration: 'none', letterSpacing: '0.3px', padding: '6px 12px', border: '1px solid #fecaca', background: '#fff5f5' }}>
                Open Improved Prototype →
              </a>
            </div>
          </div>
        </ScreenCard>
      </div>

      {/* ── SCREEN 04 ──────────────────────────────────────────────────────── */}
      <div id="screen-04">
        <ScreenCard num="04" title="Filters / Facets Panel — Kategorien Expanded">


          <ScreenshotBlock
            src="/ux-audit/04_filters-open.png"
            alt="Filters panel with Kategorien expanded"
            label="Screenshot 04 — Filters / Facets Panel Open"
          />
          <SubSection title="Critical Issues">
            <IssueBlock title="'Ernährung & Abnehmen' (266) outranks core medication use case in filter list" severity="critical">
              A user searching &ldquo;husten&rdquo; (cough) sees Ernährung &amp; Abnehmen (Nutrition &amp; Weight Loss, 266 results) listed as a major category refinement — with a higher product count than Arzneimittel &amp; Gesundheit (264). The category structure reflects the site&apos;s internal catalog architecture, not the user&apos;s intent model. A sick user looking to filter to medications is confronted with weight-loss products as an apparently equal refinement path. Particularly damaging for elderly or unwell users who need fast, confident navigation.
            </IssueBlock>
            <IssueBlock title="'Homöopathie & Naturheilkunde' label truncated — count hidden" severity="critical">
              The last visible category is &ldquo;Homöopathie &amp;&rdquo; — cut off mid-word with no product count. In German-speaking markets with among Europe&apos;s highest homeopathy usage rates, hiding this option behind a truncation is a significant filtering failure for users who specifically want or want to avoid homeopathic products.
            </IssueBlock>
          </SubSection>

          <SubSection title="High Issues">
            <IssueBlock title="No prominence signal for 'Arzneimittel & Gesundheit' despite being primary intent bucket" severity="high">
              Arzneimittel &amp; Gesundheit (264) is displayed with identical visual weight to Bücher (16 — books) and Beauty &amp; Pflege (2). No intent-matching logic visually promotes the most relevant category, no pre-applied filter, no recommendation affordance (&ldquo;Did you mean to browse medications?&rdquo;).
            </IssueBlock>
            <IssueBlock title="Filter panel provides no 'Apply' confirmation mechanism or live-filter signal" severity="high">
              It is not evident whether clicking a category immediately applies as a live filter or requires confirmation. No &ldquo;Anwenden&rdquo; button is visible, yet no loading indicator either. In the context of 1,668 results, users cannot predict the consequence of a tap/click. Filter interaction anxiety is particularly problematic for older demographics.
            </IssueBlock>
          </SubSection>

          <SubSection title="Medium & Low Issues">
            <IssueBlock title="'Bücher' (Books, 16) as a category filter for a cough query is signal noise" severity="medium">
              Surfacing &ldquo;Books&rdquo; as a filterable category for &ldquo;husten&rdquo; adds irrelevant cognitive load. No suppression logic for low-relevance, low-count categories.
            </IssueBlock>
            <IssueBlock title="'Filter löschen' positioned below fold — low discoverability" severity="medium">
              Clear-filters action is below all expanded filter groups, below the fold on smaller screens. Rendered as small text+icon link rather than a visually distinct button. Users who have misapplied filters will struggle to reset.
            </IssueBlock>
            <IssueBlock title="'Sortieren nach' collapsed with no indication of current sort order" severity="low">
              Users cannot tell if they are seeing relevance-ranked, popularity-ranked, or price-ranked results.
            </IssueBlock>
            <IssueBlock title="Collapsed filter groups give no preview of range or options" severity="low">
              No preview of what&apos;s inside collapsed groups (e.g., &ldquo;Tablets, Syrup, Capsules&rdquo; or &ldquo;€0–€50&rdquo;). Users must expand each to assess relevance.
            </IssueBlock>
          </SubSection>

          <SubSection title="Missing Features">
            <MissingFeaturesTable rows={[
              ['Intent-aware category pre-selection (auto-highlight "Arzneimittel" for drug queries)', 'DocMorris, Aponeo'],
              ['Symptom/indication filter (dry cough, productive cough, child/adult)', 'Boots.com, Chemist Warehouse'],
              ['Age suitability filter (adult vs. pediatric)', 'Boots.com, dm.de'],
              ['Active ingredient filter (Ambroxol, Dextromethorphan, ACC)', 'DocMorris'],
              ['"Prescription-free only" toggle', 'Aponeo, DocMorris'],
              ['Filter result count preview (before click)', 'Amazon, Zalando'],
              ['Selected filters summary bar (chips above results)', 'Amazon, Zalando, DocMorris'],
              ['Dosage strength as a filterable facet', 'DocMorris'],
              ['Comparison functionality for similar medications', 'Boots.com'],
              ['Filter search/typeahead within facets', 'Amazon, eBay'],
            ]} />
          </SubSection>
          <SubSection title="Information Architecture Problems">
            <ArchitectureProblemsTable rows={[
              ['4.1', 'Catalog taxonomy and user intent model are misaligned', 'Facet order reflects internal catalog structure more than the user’s problem-solving path.'],
              ['4.2', 'Primary medication branch lacks visual precedence', 'High-intent medical categories compete with low-intent branches, increasing filtering noise.'],
              ['4.3', 'No progressive narrowing sequence in filters', 'Without staged narrowing, users face a broad facet wall and slower path to relevant items.'],
            ]} />
          </SubSection>
          <SubSection title="Quick Wins">
            <QuickWinsTable rows={[
              ['1', 'Add persistent "active filters" chip bar above product grid', 'Low', 'High — reduces filter-state confusion'],
              ['2', 'Show current sort order in collapsed "Sortieren nach" label', 'Very Low', 'Medium — eliminates sort ambiguity'],
              ['3', 'Suppress categories with <5 results from facet display', 'Low', 'High — removes Books/Beauty noise'],
              ['4', 'Promote "Arzneimittel & Gesundheit" to top of Kategorien list for drug-intent queries', 'Very Low', 'High — aligns with intent probability'],
              ['5', 'Fix Homöopathie truncation — enforce minimum row height', 'Very Low', 'High — restores functional filter'],
              ['6', 'Visually separate "Gesponsert" badge from regulatory badges (different color/shape)', 'Low', 'Medium — reduces trust/compliance risk'],
              ['7', 'Add result count preview to collapsed filter groups', 'Low', 'Medium — reduces expand-to-assess friction'],
              ['8', 'Move "Filter löschen" to top of sidebar, sticky on scroll', 'Very Low', 'Medium — reset discoverability'],
              ['9', 'Add "Rezeptfrei" (OTC only) toggle as prominent binary filter', 'Low', 'High — top user need for self-medication queries'],
            ]} />
          </SubSection>

          <SubSection title="Bigger Bets">
            <BiggerBet n="01" title="Intent-Aware Filter System: Symptom-First Navigation Architecture">
              For &ldquo;husten,&rdquo; surface a dynamically assembled filter panel: Symptom type (dry/productive) → Patient (adult/child/infant) → Treatment preference (conventional/homeopathic) → Format (syrup/tablet/capsule) → Price/Brand. Requires NLP intent classification, catalog metadata enrichment, and dynamic facet assembly logic. Comparable to Boots.com&apos;s &ldquo;suitable for&rdquo; and &ldquo;symptom&rdquo; filters for health queries.
            </BiggerBet>
            <BiggerBet n="02" title="Pharma-Appropriate Product Card Redesign">
              Redesign card hierarchy for medication categories to lead with: therapeutic indication, key differentiator (active ingredient, format, age suitability), regulatory status (OTC/prescription), then price/discount. Promotional badges present but visually subordinate. Requires design system changes and HWG compliance review.
            </BiggerBet>
            <BiggerBet n="03" title="Unified Badge/Label Taxonomy and Design System Audit">
              Full audit and redesign of the badge system with semantically coherent visual languages for: (1) Regulatory/legal — blue, institutional; (2) Commercial/promotional — amber, distinct shape; (3) Product classification — grey, neutral; (4) Platform program labels — clearly separate from product attributes.
            </BiggerBet>
            <BiggerBet n="04" title="AI-Assisted Guided Selling for OTC Medication Queries">
              Optional &ldquo;Help me choose&rdquo; entry point above results. 3–4 questions: Who is it for? What type of cough? Any contraindications? Progressive disclosure wizard with inline result preview updating in real-time. Final output: ranked shortlist of 3–5 products with plain-language rationale. Requires regulatory review under HWG.
            </BiggerBet>
            <BiggerBet n="05" title="Persistent Comparison Tray for Category-Level Decision Making">
              Floating comparison tray (max 3 products) persisting across scroll and pagination. Side-by-side evaluation of: active ingredient, dosage form, age suitability, pack size, price per unit, rating. Non-applicable cells display &ldquo;—&rdquo; rather than blank space.
            </BiggerBet>
          </SubSection>
        </ScreenCard>
      </div>

      {/* ── SCREEN 05 ──────────────────────────────────────────────────────── */}
      <div id="screen-05">
        <ScreenCard num="05" title="Zero Results State — Search Results Page">


          <ScreenshotBlock
            src="/ux-audit/05_zero-results-srp.png"
            alt="Zero results page on the search results page"
            label="Screenshot 05 — Zero Results State (Search Results Page)"
          />
          <SubSection title="Critical Issues">
            <IssueBlock title="Search bar retains nonsense query — zero correction offered" severity="critical">
              The search field retains the verbatim string &ldquo;xyzqwerty999&rdquo; with zero attempt at spelling correction, fuzzy matching, or phonetic suggestion. In a pharmacy context, misspelled drug names (&ldquo;Ibuprofeen,&rdquo; &ldquo;Paracetamool&rdquo;) are extremely common among elderly users and non-native speakers. A user searching for a specific OTC medication by approximate spelling receives no medication at all — a clinical safety risk. German pharmacy users have lower e-commerce confidence than general retail users (GfK Health Digital 2023); friction here disproportionately ends sessions.
            </IssueBlock>
            <IssueBlock title="'0 passende Produkte' section simultaneously displays a sponsored product" severity="critical">
              Below the recommendation carousel, &ldquo;Ihr Suchergebnis&rdquo; reports &ldquo;0 passende Produkte gefunden&rdquo; yet immediately renders a sponsored product card (ilon Salbe classic) tagged &ldquo;Now! Produkt,&rdquo; &ldquo;Gesponsert,&rdquo; and &ldquo;apothekenpflichtig.&rdquo; Direct logical contradiction. Undermines trust in search system competence. A sponsored result appearing in a declared-empty result set may conflict with German UWG §5a (misleading by omission).
            </IssueBlock>
          </SubSection>

          <SubSection title="High Issues">
            <IssueBlock title="Recovery CTAs are passive and scattered — no dominant next step" severity="high">
              At least five recovery mechanisms with no clear hierarchy: re-type in search, Suchen button, Kontaktformular link, recommendation carousel, full category grid footer. The only primary-styled button (&ldquo;Suchen,&rdquo; red, full-width) prompts the user to search again with the same broken query — a circular UX trap. Nielsen Norman Group Healthcare UX 2022: users shown multiple equally-weighted recovery options choose none and leave at a 67% rate.
            </IssueBlock>
            <IssueBlock title="Product recommendation carousel has no contextual rationale" severity="high">
              &ldquo;Das könnte Sie interessieren&rdquo; displays six cough/cold products. For real near-miss queries (&ldquo;Ibuprufen,&rdquo; &ldquo;Voltaren Crem,&rdquo; &ldquo;Asprin&rdquo;), a cough-medication carousel is actively misleading. A user who misspelled a cardiovascular drug name is now looking at cough syrup. Zero recovery value for real misspelled queries; brand perceived as indifferent to user intent.
            </IssueBlock>
          </SubSection>

          <SubSection title="Medium & Low Issues">
            <IssueBlock title="Filter panel rendered on a zero-results page" severity="medium">
              &ldquo;Suchergebnisse filtern&rdquo; section with &ldquo;Mehr Filter&rdquo; and &ldquo;Alle löschen&rdquo; controls visible below the carousel. Presenting filter controls when there is nothing to filter implies the user could narrow results that do not exist. Confusion: &ldquo;If I remove filters, will more results appear?&rdquo;
            </IssueBlock>
            <IssueBlock title="Contact form link is the only help pathway — no live chat, pharmacist, or guided next step" severity="medium">
              &ldquo;Kontaktformular&rdquo; is the sole assistance pathway. In a healthcare context where the zero-results failure may reflect a genuine medication need, offering only a contact form (async, delayed response) falls significantly short of user need. No pharmacist chat, no symptom search alternative, no category browse prompt.
            </IssueBlock>
            <IssueBlock title="Zero-results headline ('Keine Ergebnisse') lacks empathy or actionability" severity="medium">
              The heading is purely declarative. No context (&ldquo;We couldn&apos;t find products matching your search&rdquo;), no suggested next step (&ldquo;Try fewer keywords&rdquo;), no reassurance (&ldquo;Our pharmacists can help&rdquo;). Functional minimum for a consumer pharmacy platform that aspires to clinical trust.
            </IssueBlock>
            <IssueBlock title="Newsletter signup CTA visible on a zero-results failure state" severity="low">
              Displaying a newsletter acquisition CTA on a page where the user has just experienced a complete failure is tonally misaligned. It signals platform indifference to the user&apos;s failure state.
            </IssueBlock>
          </SubSection>

          <SubSection title="Missing Features">
            <MissingFeaturesTable rows={[
              ['Spelling correction / "Did you mean?" on zero-results', 'Amazon, Google, DocMorris, Zalando'],
              ['Query-informed fallback recommendations (not generic bestsellers)', 'Amazon, Boots.com'],
              ['Live chat / pharmacist consultation entry point', 'Boots.com, Lloyds Pharmacy'],
              ['Contextual category browse ("Browse OTC Medications")', 'CVS, Walgreens'],
              ['Voice search or barcode scan as alternative input', 'DocMorris, Zur Rose'],
              ['E-Rezept upload as alternative path for prescription users', 'DocMorris'],
              ['Search history modification UI ("You searched for X — did you mean Y?")', 'Amazon, Google'],
              ['"No results but similar items" semantic matching', 'Amazon, Zalando, eBay'],
              ['Pharmacist callback / consultation request', 'Boots.com, Pharmacy2U'],
            ]} />
          </SubSection>
          <SubSection title="Information Architecture Problems">
            <ArchitectureProblemsTable rows={[
              ['1', 'Failure-state page mixes contradiction signals', 'Showing sponsored items next to a zero-results message breaks mental model and weakens trust.'],
              ['2', 'Recovery options are not prioritized as a clear sequence', 'Users do not get a strong first/second/third recovery path when the primary path fails.'],
              ['3', 'Support escalation is structurally hidden', 'Help paths exist but are not architected as primary recovery routes in a high-friction state.'],
            ]} />
          </SubSection>
          <SubSection title="Quick Wins">
            <QuickWinsTable rows={[
              ['1', 'Implement basic spell-check / fuzzy matching on zero-results queries', 'Medium (search config + frontend)', '🔴 Critical — highest single conversion recovery lever'],
              ['2', 'Separate "Ihr Suchergebnis: 0" from sponsored product display with clear visual boundary and label', 'Low (CSS + copy)', '🔴 Critical — fixes logical contradiction, reduces UWG risk'],
              ['3', 'Replace generic recommendation carousel with query-informed alternatives', 'Medium (requires intent API)', '🟠 High — recovery carousel becomes clinically relevant'],
              ['4', 'Add single dominant recovery CTA: clear the query + pre-populate symptom triage', 'Low-Medium', '🟠 High — addresses NNGroup 67% abandonment pattern'],
              ['5', 'Remove or collapse filter panel on confirmed zero-results state', 'Low (conditional render)', '🟡 Medium — removes confusing non-functional UI'],
              ['6', 'Add empathetic zero-results heading with actionable copy', 'Trivial (copy change)', '🟡 Medium — trust recovery, sets user expectations'],
              ['7', 'Add pharmacist live chat entry point to zero-results page', 'Medium (platform integration)', '🟠 High — clinical safety net, competitive differentiator'],
              ['8', 'Remove newsletter CTA from zero-results page', 'Trivial', '🔵 Low — tonal alignment with failure state'],
            ]} />
          </SubSection>

          <SubSection title="Bigger Bets">
            <BiggerBet n="01" title="Zero-Results Intelligence: Multi-State Recovery Architecture">
              Build a differentiated zero-results system with four states: (1) Misspelling detected → spelling correction with confidence score; (2) Plausible drug name with no catalog match → pharmacist guidance + similar OTC alternatives; (3) Symptom/condition query → redirect to symptom-first search flow; (4) Genuinely nonsense query → empathetic message + popular category browse. Each state served by a distinct template with appropriate recovery affordances.
            </BiggerBet>
            <BiggerBet n="02" title="Semantic / Fuzzy Search Infrastructure">
              Invest in semantic search capabilities (vector similarity, approximate string matching) to ensure near-miss queries never reach hard zero-results. Phonetic matching for German drug names (Levenshtein distance ≤2), synonym expansion for brand/generic pairs, and category-level fallback surfacing. Most pharmacy search queries that currently return zero results are plausible drug names with 1–2 character errors.
            </BiggerBet>
            <BiggerBet n="03" title="Pharmacist-in-the-Loop Zero Results Escalation">
              When a query returns zero results after fuzzy matching, offer an inline pharmacist consultation pathway: &ldquo;Our pharmacy team can help you find what you need — start a chat or leave your question.&rdquo; Positions the platform as a clinical safety layer rather than a commodity search engine. Directly addresses the patient safety gap created by the current null experience.
            </BiggerBet>
          </SubSection>
        </ScreenCard>
      </div>

      {/* ── SCREEN 06 ──────────────────────────────────────────────────────── */}
      <div id="screen-06">
        <ScreenCard num="06" title="Zero Results State — Search Suggester / Autocomplete">


          <ScreenshotBlock
            src="/ux-audit/06_zero-results-suggester.png"
            alt="Zero results in the search suggester dropdown"
            label="Screenshot 06 — Zero Results in Search Suggester"
          />
          <SubSection title="Critical Issues">
            <IssueBlock title="Complete absence of zero-results feedback in the dropdown" severity="critical">
              When a user types a nonsense query, the autocomplete dropdown simply does not appear — no message, no visual cue, no fallback state. The search field looks identical to an untouched field. The user has no indication whether the system is still processing, has failed silently, or genuinely found nothing. In a pharmacy context, a user who misspells a medication name receives no feedback to self-correct — leading to potential non-adherence. Less digitally literate users (elderly, non-native speakers) may assume the website is broken.
            </IssueBlock>
            <IssueBlock title="No spell-check, fuzzy matching, or 'Did you mean?' at the autocomplete layer" severity="critical">
              The system makes no attempt to interpret intent. Even basic edit-distance algorithms (Levenshtein) would allow the suggester to surface closest matches for plausible misspellings of drug names. Drug names are notoriously difficult to spell (Pantoprazol, Metamizol, Acetylsalicylsäure). A single-character typo in a complex pharmaceutical name produces the same null experience as a totally nonsense string.
            </IssueBlock>
          </SubSection>

          <SubSection title="High Issues">
            <IssueBlock title="No fallback suggestions during zero-results state" severity="high">
              When the dropdown is empty, there is a missed opportunity to surface: top-selling OTC products, popular categories (Arzneimittel, Vitamine, Nasenspray), or seasonal recommendations. Without an escape hatch, the only rational action is to modify the query (which requires knowing how) or close the modal entirely. Fallback content would retain engagement and surface discoverability pathways.
            </IssueBlock>
            <IssueBlock title="'Suchen' button as sole recovery path is not adequately signalled" severity="high">
              There is no microcopy prompting users to press Search after a zero-results autocomplete (&ldquo;Press Search for all results,&rdquo; &ldquo;Try a broader search&rdquo;). Users conditioned by Google-style autocomplete may interpret an empty dropdown as a final negative signal and abandon before pressing &ldquo;Suchen.&rdquo; This inflates zero-result session abandonment beyond what the catalog technically warrants.
            </IssueBlock>
            <IssueBlock title="No loading/processing state visible during query evaluation" severity="high">
              No spinner, skeleton UI, or typing-debounce indicator. The transition from &ldquo;typing&rdquo; to &ldquo;no results&rdquo; is instantaneous and silent — indistinguishable from a timeout, connectivity issue, or rendering failure. In a healthcare context, ambiguity about system state erodes trust.
            </IssueBlock>
          </SubSection>

          <SubSection title="Medium & Low Issues">
            <IssueBlock title="Existing dropdown content disappears entirely on zero-results transition" severity="medium">
              When the user types a query with no results, the previously visible dropdown (recent searches, popular searches, recommended products) disappears entirely. Best practice retains some persistent content — recent searches at minimum — so the user always has a navigation option even when autocomplete fails.
            </IssueBlock>
            <IssueBlock title="Search field gives no visual indication of 'no results found' state" severity="medium">
              The input field itself shows no change (no border color shift, no inline icon, no subtext). Contrast with DocMorris which adds a subtle &ldquo;Keine Vorschläge gefunden&rdquo; message directly below the input in the dropdown. This microcopy acknowledges the user&apos;s action, confirms the system is responsive, and prompts next steps.
            </IssueBlock>
            <IssueBlock title="No differentiation between 'zero autocomplete results' and 'zero product results'" severity="low">
              The autocomplete may return zero suggestions while the full SERP returns results (e.g., for less common but valid product names). Currently these two states are visually identical. Users may assume no products exist when in fact results would appear on the full SERP.
            </IssueBlock>
          </SubSection>

          <SubSection title="Missing Features">
            <MissingFeaturesTable rows={[
              ['"No suggestions found" inline microcopy in dropdown', 'DocMorris, dm.de, Amazon, Boots.com'],
              ['Fuzzy/phonetic matching for misspelled drug names', 'DocMorris, Amazon, Google'],
              ['"Did you mean X?" suggestion for near-miss queries', 'Amazon, Google, Zalando'],
              ['Persistent recent searches shown during zero-results state', 'Amazon, DocMorris, Boots.com'],
              ['Fallback popular categories / top-selling products in dropdown', 'Boots.com, CVS.com, Walgreens'],
              ['Loading indicator / debounce skeleton in dropdown', 'DocMorris, most modern implementations'],
              ['"Search for X anyway" CTA with result-count preview', 'Amazon, Zalando'],
              ['Alternative input method prompt (barcode scan, voice search)', 'DocMorris app, Zur Rose'],
              ['Pharmacist chat entry point in zero-results state', 'Boots.com, Lloyds Pharmacy'],
            ]} />
          </SubSection>
          <SubSection title="Information Architecture Problems">
            <ArchitectureProblemsTable rows={[
              ['1', 'Autocomplete failure is not treated as a distinct state', 'The system does not clearly separate "no suggestions" from other search states at the IA level.'],
              ['2', 'Fallback navigation lacks persistent anchors', 'When suggestions fail, users lose stable paths like recent history and high-confidence alternatives.'],
              ['3', 'State transitions are abrupt', 'Context disappears instead of evolving, forcing users to restart cognition after each failed query.'],
            ]} />
          </SubSection>
          <SubSection title="Quick Wins">
            <QuickWinsTable rows={[
              ['1', 'Add "Keine Vorschläge gefunden. Drücken Sie Enter für alle Ergebnisse." inline microcopy', 'Trivial (copy + conditional render)', '🔴 Critical — closes the complete information vacuum'],
              ['2', 'Retain recent searches section when autocomplete returns zero results', 'Low (conditional logic change)', '🟠 High — always gives the user somewhere to go'],
              ['3', 'Add a loading indicator / debounce skeleton to the dropdown', 'Low (CSS animation)', '🟠 High — system responsiveness signal, trust repair'],
              ['4', 'Show top 3 popular categories as fallback chips in empty dropdown', 'Low-Medium', '🟠 High — discoverability fallback for confused users'],
              ['5', 'Add "X" button on search input that clears and restores full default dropdown', 'Low', '🟡 Medium — lower friction query modification'],
              ['6', 'Surface microcopy below input field: "Tipp: Probieren Sie den Wirkstoff oder die Kategorie"', 'Trivial', '🟡 Medium — helps users self-correct without knowing the product name'],
              ['7', 'Add border/color change to input field on zero-results to signal state', 'Trivial (CSS)', '🟡 Medium — visual feedback on system state'],
              ['8', 'Implement minimum Levenshtein edit-distance matching for drug names (distance ≤ 2)', 'Medium (search config)', '🔴 Critical — eliminates most real-world misspelling zero-results cases'],
            ]} />
          </SubSection>

          <SubSection title="Bigger Bets">
            <BiggerBet n="01" title="Progressive Disclosure Autocomplete Architecture">
              Implement a full progressive disclosure cascade: 0 chars → recents + popular; 1–2 chars → trending + top categories; 3+ chars → full autocomplete with type labels; 0 autocomplete results → &ldquo;Did you mean?&rdquo; + top categories + pharmacist CTA. Eliminates the binary results/nothing behavior entirely.
            </BiggerBet>
            <BiggerBet n="02" title="Pharmaceutical-Grade Fuzzy Search Layer">
              Invest in a specialized fuzzy matching layer for drug names: Levenshtein edit-distance (≤2 for names ≥6 chars), phonetic matching (Soundex/Metaphone adapted for German), acronym expansion (ASS → Acetylsalicylsäure, IBU → Ibuprofen), and INN ↔ brand name cross-referencing. Eliminates the majority of real-world misspelling zero-results cases caused by complex pharmaceutical naming conventions.
            </BiggerBet>
            <BiggerBet n="03" title="Contextual Pharmacist Entry Point in Autocomplete">
              When autocomplete returns zero results after fuzzy matching, surface a persistent card: &ldquo;Können wir Ihnen helfen? — Sprechen Sie mit unserem Apotheken-Team.&rdquo; Integrates the live pharmacist consultation layer directly into the search experience at the point of failure. Positions Shop Apotheke as a health services platform, not a commodity search engine — a defensible differentiation from pure-retail competitors.
            </BiggerBet>
          </SubSection>
        </ScreenCard>
      </div>

      <Footer />
    </main>
  )
}
