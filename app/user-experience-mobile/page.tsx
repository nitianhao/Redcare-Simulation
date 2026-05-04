import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'


// ── shared primitives ────────────────────────────────────────────────────────

function IssueBlock({ id, title, severity, children }: { id: string; title: string; severity: 'critical' | 'high' | 'medium' | 'low'; children: React.ReactNode }) {
  const colors = {
    critical: { border: '#fecaca', bg: '#fff5f5', label: 'CRITICAL', color: '#991b1b' },
    high: { border: '#fde68a', bg: '#fffbeb', label: 'HIGH', color: '#92400e' },
    medium: { border: '#e9d5ff', bg: '#faf5ff', label: 'MEDIUM', color: '#6b21a8' },
    low: { border: '#bfdbfe', bg: '#eff6ff', label: 'LOW', color: '#1e40af' },
  }
  const c = colors[severity]
  return (
    <div style={{ border: `1px solid ${c.border}`, background: c.bg, padding: '16px', marginBottom: '12px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', marginBottom: '8px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color: c.color, background: 'rgba(0,0,0,0.05)', padding: '2px 6px' }}>{c.label}</span>
        <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '1px', color: '#737373' }}>{id}</span>
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
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, letterSpacing: '0.5px' }}>Present on Mobile Competitors</th>
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

function QuickWinsTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, width: '50%' }}>Win</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, width: '20%' }}>Effort</th>
          <th style={{ textAlign: 'left', padding: '8px 10px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700 }}>Impact</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([win, effort, impact], i) => (
          <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: '8px 10px', color: '#0a0a0a' }}>{win}</td>
            <td style={{ padding: '8px 10px', color: '#525252' }}>{effort}</td>
            <td style={{ padding: '8px 10px', color: '#525252' }}>{impact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function BiggerBet({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: '3px solid #E2001A', paddingLeft: '16px', marginBottom: '20px' }}>
      <p style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px' }}>{title}</p>
      <div style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}>{children}</div>
    </div>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '36px' }}>
      <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '12px', borderBottom: '1px solid #f5f5f5', paddingBottom: '8px' }}>{title}</div>
      {children}
    </div>
  )
}

// ── Mobile ScreenCard: screenshot left, text right ───────────────────────────

function MobileScreenCard({ screenNum, title, badge, imgSrc, children }: {
  screenNum: string
  title: string
  badge: string
  imgSrc: string
  children: React.ReactNode
}) {
  return (
    <section id={`screen-${screenNum}`} style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '48px' }}>
      {/* Card header */}
      <div style={{ borderBottom: '1px solid #f0f0f0', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#737373', background: '#f5f5f5', padding: '4px 10px' }}>SCREEN {screenNum}</span>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0a0a0a', letterSpacing: '0px', margin: 0 }}>{title}</h2>
        <span style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: 600, letterSpacing: '1px', color: '#737373', background: '#f5f5f5', padding: '4px 10px' }}>{badge}</span>
      </div>

      {/* Two-column: screenshot left, analysis right */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>
        {/* Left: sticky screenshot column */}
        <div style={{ flexShrink: 0, width: '300px', position: 'sticky', top: '16px', alignSelf: 'flex-start', padding: '24px 20px 24px 32px', borderRight: '1px solid #f0f0f0' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color: '#737373', textTransform: 'uppercase', marginBottom: '10px' }}>Mobile Screenshot</div>
          <img
            src={imgSrc}
            alt={`Screen ${screenNum}: ${title}`}
            style={{ width: '100%', border: '1px solid #e5e5e5', display: 'block' }}
          />
          <div style={{ fontSize: '16px', color: '#9ca3af', marginTop: '8px', textAlign: 'center' }}>390×844 viewport</div>
        </div>

        {/* Right: analysis content */}
        <div style={{ flex: 1, padding: '32px 40px', minWidth: 0 }}>
          {children}
        </div>
      </div>
    </section>
  )
}

// ── Page ────────────────────────────────────────────────────────────────────

export default function UserExperienceMobilePage() {
  return (
    <>
      <SharedNav activePage="user-experience-mobile" />
      <main style={{ background: '#fafafa', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', padding: '40px 80px 36px', display: 'flex', gap: '80px', alignItems: 'center' }}>
          <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
            <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '10px' }}>Automated UX Audit — Mobile</p>
            <h1 style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '0px', color: '#0a0a0a', lineHeight: 1, marginBottom: '14px' }}>
              MOBILE UX AUDIT.<br />
              <em style={{ fontStyle: 'italic', color: '#E2001A' }}>SHOP-APOTHEKE.COM</em>
            </h1>
            <p style={{ fontSize: '16px', color: '#525252', maxWidth: '600px', lineHeight: 1.7, margin: 0 }}>
              This page presents a focused mobile UX audit of key search journey moments, built to uncover usability friction,
              trust-breaking details, and conversion blockers that impact real customer decisions. For Redcare teams, it offers
              a practical, evidence-based roadmap to improve findability, reduce drop-off, and prioritize changes that can raise
              both customer confidence and business performance.
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <img src="/hero-web-ux.webp" alt="shop-apotheke.com autocomplete search interface" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }} />
          </div>
        </div>

        {/* ── Screen index ─────────────────────────────────────────────────── */}
        <div style={{ background: '#fafafa', borderBottom: '2px solid #0a0a0a', padding: '32px 80px' }}>
          <p style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '3px', color: '#737373', textTransform: 'uppercase', marginBottom: '12px' }}>
            JUMP TO SCREEN
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {[
              { n: '07', name: 'Search Bar Focused — Empty State', sub: 'Zero-input overlay · product tiles · recent searches', anchor: '#screen-07' },
              { n: '08', name: 'Autocomplete — Searching', sub: 'Truncated product names · dosage absent · capped suggestions', anchor: '#screen-08' },
              { n: '09', name: 'Mobile Search Results Page', sub: 'Sponsored ranking · filter discoverability · card density', anchor: '#screen-09' },
              { n: '10', name: 'Filter Panel — Full-Screen Overlay', sub: 'Overlay UX · intent mismatch · apply/reset behavior', anchor: '#screen-10' },
              { n: '11', name: 'Zero Results — Search Results Page', sub: 'Null SERP on mobile · recovery CTAs · sponsored contradiction', anchor: '#screen-11' },
              { n: '12', name: 'Zero Results — Autocomplete Overlay', sub: 'Silent dropdown failure · no fuzzy match · no fallback', anchor: '#screen-12' },
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
        </div>

        {/* Screens */}
        <div style={{ padding: '48px 80px' }}>

          {/* ── Screen 07 ── */}
          <MobileScreenCard
            screenNum="07"
            title="Search Bar Focused — Empty State"
            badge="07 / 12"
            imgSrc="/ux-audit/07_mobile-search-bar-focused-empty.png"
          >
            <SubSection title="Critical Issues">
              <IssueBlock id="CRIT-02" title="Product Name Truncation in Autocomplete Cards" severity="critical">
                Product names in the autocomplete cards are truncated mid-compound-word on mobile (e.g., "Dextromethorphan..." where the active ingredient is the most safety-critical text). Pharmaceutical product names frequently encode dosage, form, and active ingredient in the name string. Truncating before the user can read the full name removes the minimum information required for safe product identification. This is not merely a UX friction issue — it is a patient safety concern unique to pharmaceutical retail.
              </IssueBlock>
              <IssueBlock id="CRIT-03" title="No 'Recently Viewed Products' in focused empty-state search" severity="critical">
                When users focus the mobile search field, the interface does not surface recently viewed products, despite this being one of the strongest high-intent shortcuts for repeat visits. In pharmacy journeys, users often return to re-find the same item quickly (refill, comparison, or checkout completion). Missing this module increases rework, slows time-to-product, and creates avoidable friction at the highest-intent entry point.
              </IssueBlock>
            </SubSection>

            <SubSection title="High Issues">
              <IssueBlock id="HIGH-01" title="No Personalisation or Contextual Surfacing in Focused Empty State" severity="high">
                When the search bar is focused but empty, the interface shows a generic placeholder. A mature mobile pharmacy search would surface: recently searched medications, recently viewed products, saved/bookmarked medications, or contextual seasonal recommendations. The focused-empty state is a high-intent moment — the user has explicitly entered a search intent — yet the interface provides no assistance.
              </IssueBlock>
              <IssueBlock id="HIGH-02" title="Keyboard Dismiss Behaviour Conflicts with Autocomplete Scroll" severity="high">
                On mobile, when the soft keyboard is raised, the autocomplete dropdown occupies the visible viewport above the keyboard. Scrolling within the dropdown can trigger the keyboard to dismiss — a gesture conflict that interrupts the autocomplete interaction. No scroll-locking or keyboard management behaviour is evidenced in the UI.
              </IssueBlock>
              <IssueBlock id="HIGH-03" title="Two-Column Product Layout Ambiguous on Narrow Viewport" severity="high">
                The autocomplete shows product cards in what appears to be a two-column layout at 390px. At this width, product name text, pricing, and ratings compete for space. The column boundary is unclear — users may not perceive two distinct products per row and may tap the wrong card.
              </IssueBlock>
              <IssueBlock id="HIGH-04" title="Product suggestions capped at 3 despite available viewport space" severity="high">
                The empty-state overlay surfaces only three product cards even though the visible area can accommodate more items (or a clearer scroll affordance). This early cap limits discoverability and forces extra navigation steps for users who could otherwise select a relevant product directly from the overlay.
              </IssueBlock>
            </SubSection>

            <SubSection title="Medium & Low Issues">
              <IssueBlock id="MED-02" title="Section hierarchy in overlay is visually flat" severity="medium">
                Recents, popular searches, brands, and products are presented with similar visual weight, making scan order less obvious in a constrained viewport. Stronger hierarchy would reduce decision time in this high-intent moment.
              </IssueBlock>
              <IssueBlock id="LOW-01" title="Empty-state helper copy is minimal for uncertain users" severity="low">
                The focused-empty state lacks concise guidance such as what users can type (symptom, brand, active ingredient). Small helper microcopy can reduce hesitation and improve first-query quality.
              </IssueBlock>
            </SubSection>

            <SubSection title="Missing Features">
              <MissingFeaturesTable rows={[
                ['Recent search history (persistent across sessions)', 'DocMorris mobile, Amazon mobile, Zalando mobile'],
                ['Personalised suggestions based on purchase history', 'Amazon mobile, dm.de, Medpex'],
                ['Voice search input in search bar', 'DocMorris app, Medpex mobile, Amazon mobile'],
                ['Category shortcut chips in empty focused state', 'dm.de mobile, Rossmann mobile'],
                ['Barcode scan entry point', 'DocMorris app, MyPharmacy app'],
                ['Trending / seasonal search suggestions', 'Amazon mobile, DM.de mobile'],
              ]} />
            </SubSection>

            <SubSection title="Quick Wins">
              <QuickWinsTable rows={[
                ['Surface 4–6 recent searches on focused-empty state', 'Low (localStorage)', 'High — converts empty state to useful scaffold'],
                ['Add voice search microphone icon to search input', 'Medium', 'High — directly addresses accessibility and usability for medication names'],
                ['Show 3–4 category shortcut chips below input when empty', 'Low (static)', 'Medium — provides browse escape hatch'],
                ['Truncate product names at word boundaries only', 'Low (CSS)', 'High — patient safety improvement'],
                ['Lock keyboard during autocomplete card scroll', 'Medium (JS)', 'Medium — eliminates gesture conflict'],
                ['Add "Alle Kategorien" link at bottom of empty overlay', 'Low', 'Medium — IA escape route'],
              ]} />
            </SubSection>

            <SubSection title="Bigger Bets">
              <BiggerBet title="BB-01 — Symptom-First Search Layer">
                Build a symptom classification layer at the search entry point. When a user types a symptom (&quot;Rückenschmerzen&quot;, &quot;Erkältung&quot;), route them to a curated OTC category with pharmacist-recommended products rather than literal string-matched results. Requires NLP intent classification trained on ATC/INN/PZN ontologies.
              </BiggerBet>
              <BiggerBet title="BB-02 — E-Rezept Deep Integration">
                Surface the E-Rezept prescription service directly within the search overlay for users who may be searching by prescription number or drug name for a dispensed medication. Transforms search from product-lookup into service gateway.
              </BiggerBet>
              <BiggerBet title="BB-03 — Voice Search on Mobile Web">
                Implement Web Speech API voice input in the mobile search bar — particularly impactful for elderly users and users who cannot spell complex pharmaceutical names. DocMorris has partial implementation in their app; mobile web parity is a strategic gap.
              </BiggerBet>
            </SubSection>
          </MobileScreenCard>

          {/* ── Screen 08 ── */}
          <MobileScreenCard
            screenNum="08"
            title="Autocomplete - Searching"
            badge="08 / 12"
            imgSrc="/ux-audit/08_mobile-search-typing-husten.png"
          >
            <SubSection title="Critical Issues">
              <IssueBlock id="CRIT-01" title="Product Name Truncation Removes Clinical Safety Information" severity="critical">
                Autocomplete cards truncate product names mid-compound-word (&quot;Dextromethorphan...&quot;, &quot;Honig bietet...&quot;). The active ingredient — the most safety-critical identifier — is cut before the user can read it. On a 390px mobile viewport, pharmaceutical naming conventions that encode drug name + dosage + form in a single string are fundamentally incompatible with a two-column card layout at this scale. Single-column cards with 2-line name display would resolve this without changing the product density significantly.
              </IssueBlock>
              <IssueBlock id="CRIT-02" title="Package Size / Dosage Absent from Autocomplete Cards" severity="critical">
                Autocomplete result cards show product name, price, and star rating — but not package size or dosage form (10 St | Kapseln vs 180ml | Sirup). For OTC medications, dosage and form are primary decision criteria before price. A user looking for cough drops vs a cough syrup cannot distinguish between products in the autocomplete layer — they must tap through to each PDP to determine form. This forces unnecessary navigation steps and increases the risk of wrong-product selection.
              </IssueBlock>
              <IssueBlock id="CRIT-03" title="Autocomplete product list is capped at 4 despite available space for deeper browsing" severity="critical">
                The overlay exposes only four products even though the layout can support a longer in-context list with scroll (for example, 20+ items) before forcing page transition. This hard cap suppresses discoverability, increases unnecessary taps into the full results page, and breaks fast re-finding behavior for users expecting to select directly from autocomplete.
              </IssueBlock>
            </SubSection>

            <SubSection title="High Issues">
              <IssueBlock id="HIGH-01" title="Asterisk Pricing (*) Lacks Accessible Explanation" severity="high">
                Prices shown with an asterisk (&quot;* 3,95 €&quot;) reference a footnote that is not visible within the autocomplete overlay. In a fullscreen mobile overlay, there is no visible footnote, reference, or tooltip explaining what the asterisk signifies. German price transparency law (PAngV) may require price qualifications to be clearly associated with the displayed price. The asterisk without explanation is both a UX failure and a potential compliance risk.
              </IssueBlock>
              <IssueBlock id="HIGH-02" title="Dual-Zone Autocomplete Hierarchy Ambiguous" severity="high">
                The autocomplete dropdown appears to show two distinct zones: a text-suggestion zone (search query completions) and a product card zone. On mobile at 390px, the visual boundary between these zones is unclear — both appear as scrollable content in the same vertical flow. Users may not understand that the text suggestions are query completions while the cards are actual products. The interaction model for each zone differs (tap text → refine query; tap card → go to PDP) but the visual treatment does not communicate this distinction.
              </IssueBlock>
              <IssueBlock id="HIGH-03" title="No Symptom-Based Filtering in Autocomplete for 'Husten'" severity="high">
                &quot;Husten&quot; (cough) is a symptom, not a product name. A symptom query on a pharmacy platform should ideally route the user to a curated OTC category or surface sub-filters (&quot;dry cough&quot;, &quot;productive cough&quot;, &quot;children&quot;). Instead, the autocomplete shows raw product cards for whatever literal matches &quot;Husten&quot; in the product name field. This misses the clinical intent of the query entirely.
              </IssueBlock>
              <IssueBlock id="HIGH-04" title="Autocomplete lacks richer content types beyond query suggestions and products" severity="high">
                The search state does not surface broader exploratory content types such as relevant categories, guidance articles, or FAQ/help entries where applicable. For pharmacy queries, these content types can reduce ambiguity and support safer decision-making, especially when users do not know exact product names.
              </IssueBlock>
            </SubSection>

            <SubSection title="Medium & Low Issues">
              <IssueBlock id="MED-01" title="Result-count context is not prominent inside autocomplete state" severity="medium">
                Users can see suggestions and cards, but there is limited in-context guidance about the scale of matching results before moving to the full results page. A clearer count cue in this state would improve navigation confidence and reduce trial-and-error taps.
              </IssueBlock>
              <IssueBlock id="LOW-01" title="Asterisk explanation discoverability is weak in fast-scroll usage" severity="low">
                Even when pricing logic is technically present elsewhere, users in a rapid autocomplete flow may not discover the qualifying explanation. A lightweight inline hint would reduce ambiguity without adding significant UI weight.
              </IssueBlock>
            </SubSection>

            <SubSection title="Quick Wins">
              <QuickWinsTable rows={[
                ['Switch to single-column product cards at 390px', 'Low–Medium (layout)', 'Critical — resolves truncation and density issues'],
                ['Add dosage/form line to autocomplete cards', 'Low (template)', 'Critical — restores clinical decision information'],
                ['Add visible footnote or tooltip explaining asterisk pricing', 'Low (copy)', 'High — resolves compliance risk'],
                ['Add visual divider + labels between query suggestions and product cards', 'Low (CSS)', 'High — disambiguates interaction zones'],
                ['Add "Erkältung & Husten" category chip at top of Husten results', 'Low (static)', 'High — surfaces category context for symptom query'],
                ['Show result count: "12 Produkte für Husten"', 'Low', 'Medium — sets expectation before full results'],
                ['Implement ARIA listbox structure on suggestion container', 'Medium (dev)', 'High — accessibility compliance'],
                ['Fix product name truncation to word-boundary only', 'Low (CSS)', 'High — patient safety'],
                ['Add "Alle Husten-Produkte" link at bottom of overlay', 'Low', 'Medium — escape hatch to full results'],
                ['Add loading skeleton during debounce window', 'Low (CSS)', 'Medium — prevents blank flash between keystrokes'],
              ]} />
            </SubSection>

            <SubSection title="Bigger Bets">
              <BiggerBet title="BB-01 — Symptom-to-Category Routing">
                NLP classification layer that detects symptom queries (&quot;Husten&quot;, &quot;Kopfschmerzen&quot;, &quot;Rückenschmerzen&quot;) and routes them to curated indication landing pages with pharmacist-recommended products, rather than literal string matching against product names. Estimated: 2–4 quarters.
              </BiggerBet>
              <BiggerBet title="BB-02 — Mobile-Optimised Autocomplete Card Template">
                Separate product card template for mobile autocomplete context: single-column, 2-line name (word-boundary truncation), dosage/form on line 2, price large and clear, star rating deprioritised, no discount badge in autocomplete layer. Requires design system update but no backend changes.
              </BiggerBet>
              <BiggerBet title="BB-03 — Pharmacy-Specific Query Expansion Dictionary">
                Synonym/alias expansion: brand ↔ INN mappings, indication ↔ category mappings, common German misspellings of drug names. Lower-tech alternative to full NLP. Estimated: 1–2 quarters initial build, ongoing pharmacist-curated maintenance.
              </BiggerBet>
              <BiggerBet title="BB-04 — ATC/INN Ontology Integration">
                Index products by WHO ATC code and INN (International Nonproprietary Name) in addition to brand name. Enables ingredient-led search (&quot;Ibuprofen 400mg&quot;) to return all matching products across brands, and symptom queries to map to ATC therapeutic category clusters.
              </BiggerBet>
              <BiggerBet title="BB-05 — Mobile Compliance Audit for Price Display">
                Commission a PAngV compliance review specifically for mobile autocomplete price display. The asterisk pricing pattern in a fullscreen overlay without visible footnotes may not satisfy the &quot;eindeutig zuzuordnen&quot; (clearly attributable) requirement. Legal exposure on mobile is separate from desktop.
              </BiggerBet>
            </SubSection>
          </MobileScreenCard>

          {/* ── Screen 09 ── */}
          <MobileScreenCard
            screenNum="09"
            title="Mobile Search Results Page"
            badge="09 / 12"
            imgSrc="/ux-audit/09_mobile-search-results-husten.png"
          >
            <SubSection title="Critical Issues">
              <IssueBlock id="CRIT-01" title="Sponsored Product Labelling Insufficient on Mobile" severity="critical">
                Sponsored products appear in the search results without sufficiently prominent disclosure on the mobile viewport. The &quot;Gesponsert&quot; label, if present, renders at a font size and contrast level that is difficult to distinguish from editorial content at arm&apos;s length on a 390px screen. German advertising law (UWG) and EU Digital Services Act requirements mandate that sponsored content be &quot;clearly distinguishable&quot; from organic results. On mobile, where users scroll rapidly with reduced attention span, insufficient sponsored labelling creates both a consumer trust risk and a regulatory compliance risk.
              </IssueBlock>
              <IssueBlock id="CRIT-02" title="GrinTuss Banner Dark Pattern — Full-Width Interruption" severity="critical">
                A full-width branded banner for GrinTuss appears mid-results, styled to resemble a section header or editorial recommendation. On mobile, full-width elements carry implicit authority — they read as page structure rather than advertising. This banner interrupts the results scan flow without clear commercial disclosure, creating a dark pattern that may constitute hidden advertising under German UWG § 5a (misleading omissions).
              </IssueBlock>
            </SubSection>

            <SubSection title="High Issues">
              <IssueBlock id="HIGH-01" title="Filter Strip Inadequate for Pharmaceutical Filtering Needs" severity="high">
                The horizontal filter chip strip below the search bar shows generic sort/filter options but does not surface pharmaceutical-specific filter dimensions: Darreichungsform (tablet/liquid/drops), Wirkstoff (active ingredient), Altersgruppe (adult/child), or prescription status (OTC/Rx). For a cough medication search, these are the primary decision criteria. The mobile filter strip is a prime position for quick-access pharmaceutical filters that could reduce clicks to the correct product by 2–3 steps.
              </IssueBlock>
              <IssueBlock id="HIGH-02" title="Product Name Hierarchy Inconsistent — Dosage Buried" severity="high">
                In mobile product cards, the dosage and package information (e.g., &quot;20 Stück | Tabletten&quot;) appears as small grey text below the product name. On mobile at 390px, this text renders at ~11px — below the recommended minimum of 14px for mobile body copy. Clinical decision information is being rendered at a size that creates unnecessary reading difficulty, particularly for older users who represent a significant segment of pharmacy customers.
              </IssueBlock>
              <IssueBlock id="HIGH-03" title="Dual Promotional Banners Consume 30%+ of Viewport" severity="high">
                The E-Rezept discount banner at top and the newsletter signup strip below the nav together consume approximately 30% of the visible mobile viewport before any product results appear. On a device with 844px height, this leaves only ~590px for content — and with the sticky search bar and filter strip, the first product card may not be visible above the fold on initial load. This severely degrades the &quot;time to first product&quot; metric on mobile.
              </IssueBlock>
            </SubSection>

            <SubSection title="Medium & Low Issues">
              <IssueBlock id="MED-01" title="Two-Column Product Grid Too Dense at 390px" severity="medium">
                The two-column product grid on mobile renders product cards at approximately 170px wide. At this width, product name (multi-word pharmaceutical name), dosage, price, rating, and discount badge all compete for space. The information hierarchy collapses — discount badges (high contrast, red) dominate while clinically relevant information (name, dosage) is subordinated. Single-column for pharmaceutical products would be the clinically appropriate choice.
              </IssueBlock>
              <IssueBlock id="MED-02" title="Discount Percentage Badges Disproportionately Prominent" severity="medium">
                &quot;-39%&quot; and &quot;-24%&quot; discount badges are the highest-contrast elements in the product card. For pharmaceutical products, price discount is a secondary decision factor after therapeutic appropriateness. The current visual hierarchy inverts clinical priority — the user&apos;s eye goes to the discount before the product name.
              </IssueBlock>
              <IssueBlock id="MED-04" title="No Pagination or Infinite Scroll Indicator" severity="medium">
                Users have no indication of how many total results exist or whether more are loading. No result count (&quot;744 Ergebnisse&quot;) is prominently displayed on mobile.
              </IssueBlock>
              <IssueBlock id="MED-05" title="Trust Badges Below the Fold — Not Visible at Point of Decision" severity="medium">
                Trusted Shops, TÜV, and ISO certification badges are positioned in the pre-footer area, well below where purchase decisions are made. On mobile, users rarely scroll to footer. Trust signals should be near the product cards.
              </IssueBlock>
            </SubSection>

            <SubSection title="Missing Features">
              <MissingFeaturesTable rows={[
                ['Pharmaceutical-specific filter chips (Darreichungsform, Wirkstoff)', 'DocMorris mobile, Redcare app'],
                ['Result count displayed prominently ("744 Ergebnisse")', 'Amazon mobile, Zalando mobile'],
                ['Single-column card option for pharmaceutical search', 'DocMorris mobile'],
                ['"Sponsored" label high-contrast, minimum 12px', 'Google Shopping mobile, Amazon mobile'],
                ['Prescription status filter (OTC / Rx)', 'DocMorris, Zur Rose'],
                ['Sort controls persistent (not hidden in filter overlay)', 'Zalando, Amazon, Flaconi mobile'],
                ['In-results pharmacist recommendation tile', 'Boots.com mobile'],
                ['Age group filter (Adult / Child / Infant)', 'DocMorris, Medpex'],
              ]} />
            </SubSection>

            <SubSection title="IA Problems">
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>5.1 Filter and Sort Separation</strong> — Sort controls buried inside filter overlay (same issue as Screen 10). On the results page, sort should be a persistent dropdown visible without entering the filter modal.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>5.2 No Breadcrumb or Context Header</strong> — The results page shows the search query in the input field but no explicit &quot;Results for: Husten&quot; H1 or breadcrumb. On mobile, after scrolling down, the search query scrolls out of view and the user loses context.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>5.3 Sponsored and Organic Results Not Architecturally Separated</strong> — The IA does not create a clear structural boundary between paid and organic results. Interleaving creates confusion and potential regulatory risk.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>5.4 Category Taxonomy Not Surfaced on Results</strong> — No left-rail or top-of-results category refinement path exists on mobile. Users who realise they want to narrow by category must open the full filter overlay.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}><strong>5.5 Promotional Content Architecturally Undifferentiated</strong> — GrinTuss banner reads as page structure. Advertising must be architecturally distinct — different container, explicit label, clear visual boundary.</p>
            </SubSection>

            <SubSection title="Quick Wins">
              <QuickWinsTable rows={[
                ['Increase "Gesponsert" label size to 12px minimum, darken contrast', 'Low (CSS)', 'Critical — compliance risk'],
                ['Add explicit border/label to GrinTuss banner: "Anzeige"', 'Low (copy + CSS)', 'Critical — dark pattern removal'],
                ['Add persistent result count below search bar ("744 Ergebnisse für Husten")', 'Low', 'High — context anchor on scroll'],
                ['Add pharmaceutical filter chips: Tabletten | Sirup | Tropfen | Kapseln', 'Medium', 'High — reduces clicks to correct product'],
                ['Increase dosage/form text to 13px minimum', 'Low (CSS)', 'High — readability and safety'],
                ['Move sort control to persistent dropdown on results page', 'Medium', 'High — removes filter-overlay dependency for sort'],
                ['Reduce promotional banner height or make collapsible', 'Medium', 'High — improves time-to-first-product'],
                ['Add "Alle Kategorien" breadcrumb link below search bar', 'Low', 'Medium — navigation context on scroll'],
                ['Move trust badges to below first product grid section', 'Low (layout)', 'Medium — visibility at decision point'],
                ['Add scroll position indicator or page count', 'Low', 'Medium — reduces infinite scroll uncertainty'],
              ]} />
            </SubSection>

            <SubSection title="Bigger Bets">
              <BiggerBet title="BB-01 — Pharmaceutical-Grade Mobile Card Template">
                Redesign mobile product cards for pharmaceutical context: single-column, name 2 lines (word-boundary truncation), dosage + form on line 3 (minimum 13px), price prominent, discount badge secondary, rating below price. Requires design system update. Estimated: 1 quarter.
              </BiggerBet>
              <BiggerBet title="BB-02 — Sponsored Content Architecture Review">
                Commission a UWG/DSA compliance review of sponsored product disclosure on mobile. Define minimum label standards, structural separation requirements, and audit cadence. Implement as a design system primitive (SponsroedCard component) rather than per-page implementation.
              </BiggerBet>
              <BiggerBet title="BB-03 — Mobile Filter System Redesign">
                Restructure filter architecture: sort as persistent results-page control; pharmaceutical filter chips (Darreichungsform, Wirkstoff, age group, OTC/Rx) as inline chips below search bar; full filter overlay reduced to edge-case complex filtering only. Estimated: 2 quarters.
              </BiggerBet>
              <BiggerBet title="BB-04 — NLP-Powered Results Ranking for Symptom Queries">
                When a query is classified as a symptom (&quot;Husten&quot;), re-rank results to surface pharmacist-recommended first-line OTC products above generic brand results. Requires intent classification + editorial ranking layer. Estimated: 2–3 quarters.
              </BiggerBet>
              <BiggerBet title="BB-05 — Promotional Banner Governance Framework">
                Define clear rules for promotional content placement on mobile SRPs: maximum viewport percentage, mandatory label requirements, structural container constraints. Implement as a CMS/editorial governance policy backed by design system enforcement.
              </BiggerBet>
            </SubSection>
          </MobileScreenCard>

          {/* ── Screen 10 ── */}
          <MobileScreenCard
            screenNum="10"
            title="Filter Panel — Full-Screen Overlay"
            badge="10 / 12"
            imgSrc="/ux-audit/10_mobile-filters-open.png"
          >
            <SubSection title="Critical Issues">
              <IssueBlock id="F-01" title="Sort Controls Misplaced Inside Filter Panel" severity="critical">
                Sort chips (&quot;Relevanz&quot;, &quot;Topseller&quot;, &quot;Preis aufsteigend&quot;) are embedded inside the &quot;Filter wählen&quot; overlay. Sorting and filtering are fundamentally distinct operations — sorting reorders an existing result set; filtering constrains it. On mobile, where screen real estate is scarce and overlays are cognitively expensive to open, conflating both functions forces users into unnecessary overhead to perform a simple sort change. A user who only wants to sort must open the full filter overlay, locate the sort chips, interact, then close — three extra taps versus a persistent sort control on the results page.
              </IssueBlock>
              <IssueBlock id="F-02" title="Primary CTA 'Schließen' is Semantically and Functionally Wrong" severity="critical">
                The primary action button reads &quot;Schließen&quot; (Close). In standard mobile filter UX — followed by Zalando, Amazon DE, About You, DocMorris — the primary CTA applies and closes, labelled &quot;Ergebnisse anzeigen (N)&quot; or equivalent. &quot;Schließen&quot; is semantically a dismissal action, not an apply action. Users cannot see how many results their filter selection will yield before committing, and it is ambiguous whether tapping &quot;Schließen&quot; applies or discards filters.
              </IssueBlock>
              <IssueBlock id="F-03" title="No Active Filter State Visible — Panel Opens Blind" severity="critical">
                When the filter panel opens, no category is highlighted to show the current active filter state. The panel header shows &quot;Filter wählen&quot; with no indication of how many filters are currently active. If a user has previously applied a filter and reopens the panel, they cannot tell which filters are active — all chevron rows appear identical. This breaks the filter management loop and causes users to re-apply or accidentally remove existing filters.
              </IssueBlock>
            </SubSection>

            <SubSection title="High Issues">
              <IssueBlock id="F-04" title="Sort Chip 'Preis aufsteigend' Truncated — Hidden Options Not Signalled" severity="high">
                The third sort chip is visually cut off at the right edge with no scroll affordance (no fade gradient, no partial reveal). Users have no signal that additional sort options exist. A typical pharmacy sort set includes &quot;Preis absteigend&quot;, &quot;Neu eingetroffen&quot;, &quot;Bewertungen&quot; — all hidden behind an invisible scroll interaction.
              </IssueBlock>
              <IssueBlock id="F-05" title="Kategorien Fully Expanded by Default — No Progressive Disclosure" severity="high">
                All 9 category items are fully expanded on panel open, occupying the majority of the viewport and requiring scroll to reach Darreichungsform and Preis. On mobile, this suppresses engagement with non-Kategorie filter dimensions. Darreichungsform (dosage form) is clinically critical — distinguishing tablets from drops from creams is essential for patient-appropriate product selection — but it is pushed below the fold.
              </IssueBlock>
            </SubSection>

            <SubSection title="Medium & Low Issues">
              <IssueBlock id="F-06" title="Result Counts Not Query-Scoped" severity="medium">
                Counts shown per category (&quot;264&quot;, &quot;86&quot;) represent total products in catalogue, not filtered results relative to the current search query. If a user has searched for &quot;Magnesium&quot;, seeing &quot;Arzneimittel & Gesundheit (264)&quot; is misleading — there may only be 12 magnesium products in that category. False precision creates incorrect filter confidence.
              </IssueBlock>
              <IssueBlock id="F-07" title="'Alle Filter zurücksetzen' Always Visible, No Confirmation" severity="medium">
                The reset button is full-width and permanently visible regardless of whether any filters are active. A single tap removes all filters with no undo and no confirmation — high-risk on touch interfaces where accidental taps occur during scroll.
              </IssueBlock>
              <IssueBlock id="F-08" title="Darreichungsform and Preis Collapsed with No Value Preview" severity="medium">
                Both sections show only their title with a chevron. No sub-values, no &quot;3 selected&quot; indicators, no value ranges. For pharmaceutical users, Darreichungsform is a primary filter dimension — hiding all context until expansion increases tap cost and reduces discoverability.
              </IssueBlock>
              <IssueBlock id="F-09" title="Full-Screen Overlay Prevents Context Retention" severity="medium">
                The filter panel completely hides the underlying product results. A bottom-sheet pattern with partial results visible above (as used by Zalando, Amazon Mobile) maintains context — users can see products updating in real time. Full-screen overlay severs this feedback loop entirely.
              </IssueBlock>
            </SubSection>

            <SubSection title="Missing Features">
              <MissingFeaturesTable rows={[
                ['Live result count on apply CTA ("Ergebnisse anzeigen (N)")', 'Zalando, About You, DocMorris, Amazon DE'],
                ['Active filter count badge on filter entry button', 'Zalando, Flaconi, Amazon Mobile'],
                ['Horizontal fade gradient to indicate chip row overflow', 'About You, Flaconi, Google Shopping'],
                ['Inline price range slider (not hidden behind collapse)', 'DocMorris, Amazon, Idealo Mobile'],
                ['Active filter chips shown at top of panel (removable)', 'Zalando, About You, ASOS'],
                ['Real-time result preview (bottom sheet with results peeking)', 'Zalando, H&M Mobile, MediaMarkt'],
                ['Dosage/Darreichungsform quick-select icons (visual pills, drops)', 'DocMorris, Redcare'],
                ['Wirkstoff / active ingredient filter dimension', 'DocMorris, Zur Rose, Aponeo'],
                ['Marke / brand filter dimension', 'Amazon DE, DocMorris'],
                ['Search within filter categories', 'Amazon DE (for large filter sets)'],
              ]} />
            </SubSection>

            <SubSection title="IA Problems">
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.1 Sort ≠ Filter — Structural Conflation</strong> — The deepest IA problem is housing sort controls within a filter panel. Standard mobile pattern: Sort and Filter as separate controls on the results page, Filter overlay contains only filter dimensions.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.2 Category Hierarchy Not Surfaced</strong> — Categories presented as a flat list. The chevron implies sub-navigation exists but the IA does not surface it progressively. Users must commit to a category to discover its depth — explore-then-backtrack penalty on mobile.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.3 Filter Dimension Priority Misaligned with Pharmaceutical Goals</strong> — Current order: Kategorien → Darreichungsform → Preis. Clinically appropriate order: Darreichungsform → Wirkstoff → Kategorie → Marke → Preis. Placing Kategorien first occupies prime real estate for the filter dimension users least need (they arrived from search with category intent already formed).</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}><strong>4.4 Bottom Action Buttons Create IA Dead Ends</strong> — Only &quot;Schließen&quot; and &quot;Alle Filter zurücksetzen&quot; available. No &quot;Vorherige Filter&quot;, no progressive back navigation within the panel. Binary IA: stay and filter, or leave entirely.</p>
            </SubSection>

            <SubSection title="Quick Wins">
              <QuickWinsTable rows={[
                ['Rename CTA from "Schließen" to "Ergebnisse anzeigen (N)"', 'Low (copy + count API)', 'Critical — resolves F-02'],
                ['Add right-edge fade gradient to sort chip row', 'Low (CSS)', 'High — resolves hidden options (F-04)'],
                ['Add "Sortierung:" label above sort chips', 'Low (copy)', 'Low — separates sort from filters (F-01 partial)'],
                ['Disable "Alle Filter zurücksetzen" when no filters active', 'Low (conditional)', 'Medium — reduces destructive exposure (F-07)'],
                ['Add active filter count badge: "Filter wählen (2)"', 'Low–Medium', 'High — addresses F-03 partial'],
                ['Add checkmark / highlight to selected category items', 'Low (state styling)', 'Critical — resolves F-03 active state visibility'],
                ['Collapse Kategorien to show top 5 + "Alle anzeigen (9)"', 'Low–Medium', 'High — surfaces Darreichungsform (F-05)'],
                ['Show selected value summary in collapsed sections ("3 ausgewählt")', 'Medium', 'Medium — resolves F-08'],
                ['Add confirmation dialog to "Alle Filter zurücksetzen"', 'Low–Medium', 'Medium — safety net (F-07)'],
                ['Move sort controls to persistent toolbar on results page', 'Medium (layout)', 'Critical — resolves F-01 architectural mismatch'],
              ]} />
            </SubSection>
          </MobileScreenCard>

          {/* ── Screen 11 ── */}
          <MobileScreenCard
            screenNum="11"
            title="Zero Results — Search Results Page"
            badge="11 / 12"
            imgSrc="/ux-audit/11_mobile-zero-results-srp.png"
          >
            <SubSection title="Critical Issues">
              <IssueBlock id="CRIT-01" title="Redundant and Contradictory Zero-State Messaging" severity="critical">
                The page declares failure twice with different framing — first as &quot;Kein Suchergebnis gefunden&quot; (H1) and again as &quot;Ihr Suchergebnis: 0 passende Produkte gefunden&quot; roughly 600–700px below (after the full recommendation carousel). On mobile, where vertical scroll distance amplifies cognitive fragmentation, the lower section reads as a second search results section mid-page. That section even includes an active &quot;Suchergebnisse filtern&quot; button — an affordance that is logically incoherent when zero results exist. A user who scrolls past the carousel may genuinely attempt to apply filters to 0 items, creating a dead-end loop.
              </IssueBlock>
              <IssueBlock id="CRIT-02" title="'Suchergebnisse filtern' Button Active on Zero Results" severity="critical">
                The filter CTA is fully rendered and tappable despite 0 results. On mobile, touch targets are hit casually during scroll; a user who taps this expecting to refine results will land in a filter UI that has nothing to act upon. This is a broken affordance — an interactive element that promises utility it cannot deliver. The button should be hidden or disabled when result count is 0.
              </IssueBlock>
            </SubSection>

            <SubSection title="High Issues">
              <IssueBlock id="HIGH-01" title="Zero Recovery Pathways for the Actual User Need" severity="high">
                The error message (&quot;Überprüfen Sie die Schreibweise&quot;) offers only one recovery action: retype the query. There is no fuzzy match suggestion, no category browse shortcut, no popular search shortcuts, no typeahead refinement. The only assisted path is the Kontaktformular — an asynchronous, high-friction channel requiring the user to leave the search flow. Mobile users are more likely to be searching via voice input errors or partial drug names, making &quot;check your spelling&quot; particularly unhelpful.
              </IssueBlock>
              <IssueBlock id="HIGH-02" title="Recommendation Carousel Contextually Irrelevant and Trust-Damaging" severity="high">
                &quot;Das könnte Sie interessieren&quot; surfaces algorithmically default products (cough suppressants) for query &quot;xyzqwerty999&quot; — clearly not contextual. In a pharmaceutical context, random product suggestions after a failed search risk being perceived as the platform redirecting the user toward products they didn&apos;t request. On mobile, the carousel occupies ~35% of the visible viewport during scroll, making it feel like the primary response to the failed search rather than a supplementary element.
              </IssueBlock>
              <IssueBlock id="HIGH-03" title="Promotional Banners Persist Incongruously in Failure State" severity="high">
                The E-Rezept discount banner and newsletter strip persist unchanged on the zero-results page. Together they consume approximately 20% of the initial viewport, potentially causing users to miss the H1 error message entirely if they scroll past the banners. The commercial tone is jarring in a healthcare failure-state context.
              </IssueBlock>
            </SubSection>

            <SubSection title="Medium & Low Issues">
              <IssueBlock id="MED-01" title="Search Field Retains Query Without Active Correction Prompt" severity="medium">
                The nonsense query persists with only a small × button. The field is not focused and keyboard is not raised. A user who wants to correct must notice the × button, tap into the field, then retype. Auto-focusing the search field with text selected on zero-results load would reduce correction steps from 3 to 1.
              </IssueBlock>
              <IssueBlock id="MED-03" title="Contact Form Styled as Secondary Action Despite Being Primary Support Path" severity="medium">
                Kontaktformular is rendered identically to a secondary button — no chat option, no estimated response time, no phone alternative. For a customer who genuinely cannot find a medication they need, this is the platform&apos;s only assisted help path and it is visually and functionally understated.
              </IssueBlock>
              <IssueBlock id="MED-04" title="Trust Badges Below the Fold at Point of Maximum Friction" severity="medium">
                Trust signals (Trusted Shops, TÜV, ISO) appear in the pre-footer zone — below informational boxes, well below where the user is focused. In a zero-results state the user has reduced confidence in the platform; trust signals should move upward to reinforce credibility at the friction moment.
              </IssueBlock>
            </SubSection>

            <SubSection title="Missing Features">
              <MissingFeaturesTable rows={[
                ['"Did you mean...?" / Spell-check suggestion', 'DocMorris, Amazon, Zur Rose'],
                ['Symptom/category browse tiles on zero results', 'DocMorris, Boots.com'],
                ['Search query auto-selected on zero-results load', 'Amazon, eBay'],
                ['Live chat / callback option in zero-results support block', 'Boots.com, Lloyds Pharmacy'],
                ['Popular searches / trending products shortcut', 'Amazon, DM.de'],
                ['Recently viewed products as recovery path', 'Zalando, DM.de'],
                ['Scan barcode alternative input on mobile', 'DocMorris, mySugr'],
                ['Haptic or micro-animation feedback on failed search submit', 'Amazon app'],
              ]} />
            </SubSection>

            <SubSection title="IA Problems">
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.1 Vertical Hierarchy Fragments the Zero-State Narrative</strong> — The mobile page presents the zero-results story across 5 distinct zones separated by unrelated content including a full product carousel. Users must scroll through a shopping experience before receiving the second confirmation of zero results, disrupting the mental model.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.2 Navigation Effectively Hidden</strong> — Category browsing requires 2 taps (hamburger → select category) with no visual affordance on the page pointing users toward that path. The single &quot;Alle Produkte anzeigen&quot; text link is buried as a carousel sub-label.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.3 Page Pretends Results Exist</strong> — The results-count section and active filter button architecturally imply results exist to be interacted with. The page scaffolding was designed for the results state and has not been adapted for zero results. On mobile, each section occupies the full viewport width, lending it full page-section authority.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}><strong>4.4 E-Rezept and Shipping Information Contextually Orphaned</strong> — Three static informational boxes appear below the filter section. They consume significant scroll depth and push trust badges further below on a page where the user&apos;s only goal is to find what they came for.</p>
            </SubSection>

            <SubSection title="Quick Wins">
              <QuickWinsTable rows={[
                ['Disable / hide "Suchergebnisse filtern" button when result count = 0', 'Low (1 conditional render)', 'High — removes broken affordance'],
                ['Remove or grey out "Ihr Suchergebnis: 0" section — consolidate into single H1 zone', 'Low (CSS/template)', 'High — eliminates contradictory structure'],
                ['Auto-focus search input with query text selected on zero-results load', 'Low (1 line JS)', 'Medium — reduces correction friction'],
                ['Upgrade "Alle Produkte anzeigen" to button-weight CTA', 'Low (CSS variant)', 'Medium — surfaces most useful recovery path'],
                ['Suppress E-Rezept/shipping info boxes on zero-results template', 'Low (template condition)', 'Medium — reduces scroll depth'],
                ['Add response time expectation to Kontaktformular block', 'Low (copy change)', 'Medium — reduces abandonment'],
                ['Move trust badges immediately below error message', 'Low–Medium (layout reorder)', 'Medium — reinforces credibility at friction point'],
                ['Replace generic recommendations with category browse tiles', 'Medium (logic change)', 'High — relevant recovery for pharmaceutical users'],
              ]} />
            </SubSection>

            <SubSection title="Bigger Bets">
              <BiggerBet title="BB-01 — Pharmaceutical-Grade Fuzzy Search with Mobile-Optimised Suggestion UX">
                Fuzzy matching / phonetic search layer (Levenshtein distance, SoundEx for German drug names) at the search layer, surfacing &quot;Did you mean: [product name]?&quot; directly below the error message. On mobile, render suggestions as tappable chips — sized to 44px minimum — appearing above the keyboard when the corrected field is focused. Pharmaceutical product names are long and frequently misspelled; fuzzy search is table stakes for a pharmacy with 200,000+ SKUs.
              </BiggerBet>
              <BiggerBet title="BB-02 — Symptom-First Browse Layer (Three-Tier Intervention)">
                Tier 1: Inline symptom chips below failed search input (Schmerzen · Erkältung · Schlaf · Verdauung · Haut · Augen · Allergie · Kinder), each routing to a pre-filtered category page. Tier 2: A guided 3-step symptom quiz card (&quot;Nicht sicher, welches Produkt Sie brauchen?&quot; → symptom → profile → filtered list). Tier 3: Restructure hamburger menu to dual-entry: symptom-first and product-first in parallel. Estimated: 2–3 quarters.
              </BiggerBet>
              <BiggerBet title="BB-03 — Zero-Result State Monitoring Dashboard">
                Dedicated zero-result query monitoring feeding back to search infrastructure (synonym/fuzzy tuning) and catalogue team (gap identification). Quarterly sprint cycle reviewing top-50 zero-result queries for synonym table patches, redirects, or catalogue additions. Every zero-result event on mobile is a data signal; operationalising it systematically erodes the zero-result rate over time.
              </BiggerBet>
            </SubSection>
          </MobileScreenCard>

          {/* ── Screen 12 ── */}
          <MobileScreenCard
            screenNum="12"
            title="Zero Results — Search Autocomplete Overlay"
            badge="12 / 12"
            imgSrc="/ux-audit/12_mobile-zero-results-suggester.png"
          >
            <SubSection title="Critical Issues">
              <IssueBlock id="C1" title="Zero Feedback on Search Failure — Informational Void" severity="critical">
                The interface shows two section headers (&quot;Suchen&quot;, &quot;Beliebte Produkte&quot;) with completely empty content beneath them. There is no message stating &quot;Keine Ergebnisse für &apos;xyzqwerty999&apos;&quot; or equivalent. On mobile in a fullscreen overlay, the user cannot distinguish between: (a) search still loading, (b) a network error, or (c) a genuine zero-result state. Desktop equivalents always display explicit inline text within the dropdown. Mobile users in fragmented attention contexts (commuting, in a pharmacy queue) are particularly harmed by silent failures.
              </IssueBlock>
              <IssueBlock id="C2" title="'Beliebte Produkte' Section Renders as Empty Shell" severity="critical">
                The &quot;Beliebte Produkte&quot; section header appears but has zero product tiles beneath it. This is the one recovery mechanism that could redirect a lost user — yet it renders nothing. The presence of an empty header creates a broken affordance: the heading implies content follows, but nothing does. On mobile in a fullscreen overlay, the broken section is the entire visible interface. The double-empty state (no suggestions + no popular products) is worse than a pure zero-result page with honest messaging — it creates compounding cognitive dissonance.
              </IssueBlock>
            </SubSection>

            <SubSection title="High Issues">
              <IssueBlock id="H1" title="No Spell-Check or 'Did You Mean?' Suggestion" severity="high">
                Mobile soft keyboards introduce significantly higher error rates than physical keyboards (3–5% higher). Common pharmacy search errors — &quot;ibuprofem&quot;, &quot;voltaern&quot;, &quot;paracetamol 50mg&quot; (wrong dosage) — would all produce the same silent failure. A pharmaceutical search engine has a professional obligation to surface spelling corrections. The absence at the autocomplete layer is especially damaging as intervention here prevents the user from even reaching the zero-results SRP.
              </IssueBlock>
              <IssueBlock id="H2" title="Fullscreen Overlay Traps User with No Escape Signposting" severity="high">
                The overlay presents a back arrow (←) and close (×) button — adequately sized but with no contextual label indicating whether &quot;back&quot; returns to a previous state or exits entirely. In zero-result state, neither button is labelled to say &quot;clear search and try again&quot; or &quot;browse categories instead.&quot; On desktop, surrounding page chrome gives passive escape routes. On mobile fullscreen overlay, the user is cognitively isolated — the only interface is the broken search — creating a perceived dead-end even though exits technically exist.
              </IssueBlock>
            </SubSection>

            <SubSection title="Medium & Low Issues">
              <IssueBlock id="M1" title="Section Header 'Suchen' Redundant and Confusing" severity="medium">
                &quot;Suchen&quot; (Search) as a heading above empty results is semantically circular. In zero-result state it reads as a category heading with no items. It should be replaced with actionable copy (&quot;Neu suchen&quot; or &quot;Suchvorschläge&quot;) or hidden conditionally.
              </IssueBlock>
              <IssueBlock id="M2" title="No Category Browse Shortcut in Zero-Result Overlay" severity="medium">
                Standard practice on Zalando mobile, dm.de mobile, and Rossmann mobile: &quot;Alle Kategorien anzeigen&quot; CTA when search fails. The current fullscreen overlay becomes a sealed room with no category escape route.
              </IssueBlock>
              <IssueBlock id="M3" title="Search Input Not Highlighted for Easy Re-entry" severity="medium">
                After a zero-result query, best practice is to keep the text input focused with text selected for immediate retyping. The current state retains the query but shows no cursor or selection. On mobile, clearing and retyping requires deliberate tap + select-all + delete — 3–4 touch interactions versus the 1-touch correction a focused-selected input would enable.
              </IssueBlock>
              <IssueBlock id="M4" title="No Visual State Differentiation for Zero-Result Overlay" severity="medium">
                The overlay uses the same visual treatment in active-results and zero-results states. No subtle grey wash, warning accent, or animated empty state signals the failure. On mobile, micro-visual feedback is critical because users cannot rely on peripheral page context to understand state change.
              </IssueBlock>
            </SubSection>

            <SubSection title="Missing Features">
              <MissingFeaturesTable rows={[
                ['Explicit "no results" empty state message with query name', 'DocMorris mobile, Medpex mobile, Rossmann mobile'],
                ['"Did you mean?" / spell correction in autocomplete', 'Amazon.de mobile, DocMorris mobile web'],
                ['Populated "Popular Products" fallback (always-on, query-independent)', 'Zur Rose mobile, Medpex mobile, dm.de mobile'],
                ['Category browse shortcut in zero-result overlay', 'Zalando mobile, dm.de mobile, Rossmann mobile'],
                ['Voice search input in search bar', 'DocMorris app, Medpex mobile'],
                ['Recent search history on clear/empty', 'Amazon mobile, iOS App Store, Zalando mobile'],
                ['Illustrated / animated empty state visual', 'Zalando mobile, About You mobile, Flaconi mobile'],
                ['"Search instead for [query]" link to full results page', 'Amazon mobile, Google Shopping mobile'],
                ['Input auto-select on zero-result return for easy re-entry', 'Google Search mobile, Amazon mobile'],
              ]} />
            </SubSection>

            <SubSection title="IA Problems">
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.1 Hierarchy Communicates Content That Doesn&apos;t Exist</strong> — The two-section structure (Suchen → Beliebte Produkte) implies a populated hierarchy. Empty headers create a false information architecture — the user&apos;s mental model is violated. The IA should collapse or transform in zero-result state, not persist as ghost scaffolding.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.2 Overlay Architecture Removes All Navigation Context</strong> — The fullscreen overlay eliminates every IA landmark except the broken search. On desktop, header, category mega-nav, and breadcrumbs remain visible as passive wayfinding. The IA should include a persistent &quot;emergency exit&quot; into top-level categories, rendered as a clear CTA within the overlay during failure states.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75, marginBottom: '10px' }}><strong>4.3 Circular Navigation Signal</strong> — &quot;Suchen&quot; header above empty space instructs users to search when they already searched. In content-populated states this section lists autocomplete suggestions; in zero-result state it should be replaced with recovery-oriented copy or hidden.</p>
              <p style={{ fontSize: '16px', color: '#374151', lineHeight: 1.75 }}><strong>4.4 No Progressive Disclosure Path from Specific to General</strong> — Good mobile search IA provides: failed exact search → spell suggestions → category suggestions → full catalogue browse. The current IA provides none of these intermediate steps. The user goes from specific failed query directly to nothing.</p>
            </SubSection>

            <SubSection title="Quick Wins">
              <QuickWinsTable rows={[
                ['Add explicit "Keine Ergebnisse für \'[query]\'" message in zero-result state', 'Low (1–2 days frontend)', 'Critical — eliminates ambiguity (C1)'],
                ['Populate "Beliebte Produkte" with static curated bestsellers unconditionally', 'Low–Medium (static list)', 'Critical — gives user onward journey (C2)'],
                ['Hide empty section headers when no content to show', 'Low (<1 day conditional render)', 'Medium — removes ghost UI'],
                ['Auto-select search input text on zero-result return', 'Low (1–2 lines JS)', 'Medium — reduces re-entry friction'],
                ['Add "Alle Kategorien" CTA link within overlay zero-result state', 'Low (1 day)', 'Medium — resolves IA dead-end'],
                ['"Search instead for [query]" link routing to full results page', 'Low (1 day)', 'High — escape hatch beyond autocomplete'],
                ['Subtle visual differentiation for zero-result overlay state', 'Low (CSS class toggle)', 'Low–Medium — improves state comprehension'],
              ]} />
            </SubSection>

            <SubSection title="Bigger Bets">
              <BiggerBet title="BB-01 — Fuzzy Matching + Phonetic Search at Autocomplete Layer">
                Pharmacy search is uniquely prone to misspelling because medication names are Latin, polysyllabic, and unfamiliar to lay users. Fuzzy matching (Levenshtein ≤2) and phonetic algorithms (Soundex/Metaphone adapted for German/INN drug names) at the autocomplete query layer — not just on the full results page — would intercept failure before it becomes a zero-result dead end. Expected impact: 15–25% reduction in zero-result autocomplete events based on benchmarks from comparable pharmacy implementations. Estimated: 3–6 sprint weeks.
              </BiggerBet>
              <BiggerBet title="BB-02 — Contextually Intelligent Zero-Result Recovery Engine">
                A dedicated zero-result state UX component that dynamically surfaces: (a) spell-corrected suggestions, (b) semantically related product categories, (c) most-searched products in the apparent category cluster, (d) a direct link to pharmacist chat/consultation. Transforms the zero-result state from a dead end into a guided recovery journey. The pharmacist escalation is a differentiator — connecting a user to a pharmacist directly from the failed search moment is trust-building, conversion-saving, and patient-safety-serving. Estimated: 2–3 quarters.
              </BiggerBet>
              <BiggerBet title="BB-03 — Voice and Image Search Integration">
                A significant segment of pharmacy users are elderly or have reduced dexterity — the exact population that struggles most with typed mobile search. Voice search (especially for long medication names) and image search (scan a medication package to identify/reorder) are mobile-native capabilities that dramatically reduce search failure rates in this demographic. Shop-Apotheke&apos;s own iOS app reportedly supports voice search but it is absent in mobile web — parity is a strategic gap. Estimated: 4–8 sprint weeks.
              </BiggerBet>
              <BiggerBet title="BB-04 — Zero-Result Query Analytics Dashboard">
                Dedicated monitoring of zero-result queries feeding back to search infrastructure (synonym/fuzzy tuning) and content/catalogue team (catalogue gap identification). A quarterly sprint cycle reviewing top-50 zero-result queries and patching via synonym tables, redirects, or catalogue additions systematically erodes the zero-result rate over time. This is an operational capability bet — but every zero-result event on mobile is a data signal that should be captured and acted on.
              </BiggerBet>
            </SubSection>
          </MobileScreenCard>

        </div>
      </main>
      <Footer />
    </>
  )
}
