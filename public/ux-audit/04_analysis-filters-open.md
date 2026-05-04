# UX Audit: Shop-Apotheke.com — Filters/Facets Panel (Kategorien Expanded) — 'husten' Search Results

**Screenshot:** 04_filters-open.png
**Pipeline:** Stage 1 Haiku → Stage 2 Sonnet 4.6

---

## 1. Critical Issues

### 🔴 CRIT-01 — Category Filter Creates Semantic Mismatch: "Ernährung & Abnehmen" (266) Outranks Core Medication Use Case

**Problem:** A user searching "husten" (cough) sees *Ernährung & Abnehmen* (Nutrition & Weight Loss, 266 results) listed as a major category refinement — with a *higher* product count than *Arzneimittel & Gesundheit* (264). This is a fundamental relevance failure in the facet taxonomy. The category structure reflects the site's catalog architecture, not the user's intent model. A sick user looking to filter to medications is confronted with weight-loss products as an apparently equal or superior refinement path.

**Impact:** Erodes trust in the search system. Creates cognitive dissonance: "Why would cough products include diet content?" Risks users abandoning refinement entirely and scrolling raw results — increasing cognitive load and time-to-purchase. Particularly damaging for elderly or unwell users who need fast, confident navigation.

**Severity:** 🔴 CRITICAL — directly undermines the primary job-to-be-done of a pharmacy search.

---

### 🔴 CRIT-02 — "Homöopathie & Naturheilkunde" Category Label Truncated — Count Hidden

**Problem:** The last visible category in the expanded Kategorien filter is "Homöopathie &" — the label is cut off mid-word and no product count is shown. This is not a graceful ellipsis treatment; the count badge is entirely absent. For a pharmacy context, where homeopathy vs. conventional medicine is a *clinically meaningful* distinction for many users, hiding this option behind a truncation is a significant filtering failure.

**Impact:** Users who specifically want (or want to *avoid*) homeopathic products cannot use this filter reliably. The missing count also breaks the visual scanning rhythm established by every other category row. Likely affects a non-trivial user segment — German-speaking markets have among Europe's highest homeopathy usage rates.

**Severity:** 🔴 CRITICAL — functional filter failure with clinically relevant consequences in a pharma context.

---

### 🟠 HIGH-01 — No "Arzneimittel & Gesundheit" Pre-selection or Prominence Signal Despite Being the Primary Intent Bucket

**Problem:** For a query like "husten," the overwhelming majority of users are seeking OTC medications. Yet *Arzneimittel & Gesundheit* (264) is displayed with identical visual weight to *Bücher* (16 — books) and *Beauty & Pflege* (2). There is no intent-matching logic that visually promotes the most relevant category, no pre-applied filter, and no recommendation affordance ("Did you mean to browse medications?"). The system treats all facet values as equally probable next steps.

**Impact:** Increases time-to-filter. Users with low digital literacy or health anxiety may not identify the correct refinement path without additional effort. In a therapeutic context, delay has real-world consequences beyond cart abandonment.

**Severity:** 🟠 HIGH

---

### 🟠 HIGH-02 — Filter Panel Occupies Persistent Sidebar but Provides No "Apply" Confirmation Mechanism

**Problem:** The filter interaction model is unclear from the UI state: it is not evident whether clicking a category immediately applies as a live filter (instant update) or requires a confirmation action. No "Anwenden" (Apply) button is visible, yet no loading/update indicator is present either. In the context of 1,668 results, users cannot predict the consequence of a tap/click — will the page reload? Will results narrow immediately? This ambiguity is amplified on mobile where the filter panel likely overlays content.

**Impact:** Filter interaction anxiety. Users may hesitate to explore facets for fear of losing their current result set. Particularly problematic for older demographics common in pharmacy e-commerce.

**Severity:** 🟠 HIGH

---

## 2. Medium & Low Issues

### 🟡 MED-01 — "Bücher" (Books, 16) as a Category Filter for a Cough Query Is Signal Noise

**Problem:** Surfacing "Books" as a filterable category for "husten" adds irrelevant cognitive load to the filter panel. While technically correct (health books may mention coughs), it occupies scarce filter real estate and dilutes the scent of relevant refinements. There is no suppression logic for low-relevance, low-count categories.

**Impact:** Increases scanning time; undermines confidence in the system's intelligence.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-02 — "Filter löschen" (Clear Filters) Button Positioned Below Filter Groups — Low Discoverability

**Problem:** The "Clear filters" action is placed at the bottom of the sidebar, below all expanded filter groups. In its current position it is below the fold for users with smaller screens or when multiple filter groups are expanded. It also has no visual differentiation from surrounding UI elements — rendered as a small text+icon link rather than a visually distinct button.

**Impact:** Users who have misapplied filters will struggle to reset. Likely increases support friction and pogo-sticking back to search.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-03 — Product Cards in Main Content Show "Gesponsert" (Sponsored) Badges Without Clear Visual Hierarchy Separating Paid from Organic Results

**Problem:** Multiple product cards carry "Now! Produkt" and "Gesponsert" (Sponsored) labels alongside "Arzneimittel" (Medication) and "apothekenpflichtig" (Pharmacy-only) badges. The badge system conflates commercial status (sponsored, promoted) with regulatory status (prescription-required, OTC classification). A user scanning badges for clinical decision-making cannot quickly distinguish "this is a paid placement" from "this requires a prescription."

**Impact:** Potential regulatory/compliance risk in a pharma context. User trust degradation when commercial intent and health information are visually co-mingled.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-04 — Discount Percentage Displayed More Prominently Than Clinical Relevance Information

**Problem:** Price discounts (-39%, -48%, -24%) are rendered in large red typography as the dominant visual anchor on product cards — more visually prominent than the product's therapeutic indication. For medication searches, clinical appropriateness ("for dry cough," "for children from age 0") should compete with, or outrank, promotional messaging.

**Impact:** Optimizes for impulse-purchase behavior over informed therapeutic decision-making. Inconsistent with best-practice pharma UX and potentially at odds with German pharmaceutical advertising regulations (HWG).

**Severity:** 🟡 MEDIUM

---

### 🔵 LOW-01 — "Sortieren nach" (Sort By) Collapsed by Default — No Indication of Current Sort Order

**Problem:** The Sort By control is collapsed and gives no indication of what ordering is currently applied to 1,668 results. Users cannot tell if they are seeing relevance-ranked, popularity-ranked, or price-ranked results.

**Severity:** 🔵 LOW

---

### 🔵 LOW-02 — Star Ratings Use Identical Visual Format (27 reviews shown as superscript) Across All Products — Footnote Reference Unclear

**Problem:** The "27" superscript appearing next to all star ratings appears to reference a footnote, not a review count. This is confusing — actual review counts are shown in parentheses (e.g., "(536)", "(65)"). The footnote system is not explained inline.

**Severity:** 🔵 LOW

---

### 🔵 LOW-03 — "Darreichungsform" (Dosage Form) and "Preis" (Price) Filters Collapsed — No Indication of Range/Options Available

**Problem:** Collapsed filter groups give no preview of what's inside (e.g., "Tablets, Syrup, Capsules" or "€0–€50"). Users must expand each to assess relevance, increasing interaction cost.

**Severity:** 🔵 LOW

---

## 3. Missing Features

| Feature | Present on Comparable Sites |
|---|---|
| **Intent-aware category pre-selection** (auto-highlight "Arzneimittel" for drug queries) | DocMorris, Aponeo |
| **Symptom/indication filter** (e.g., "dry cough," "productive cough," "child/adult") | Boots.com, Chemist Warehouse |
| **Age suitability filter** (critical for OTC cough — adult vs. pediatric) | Boots.com, dm.de |
| **Active ingredient filter** (Ambroxol, Dextromethorphan, ACC) | DocMorris |
| **"Prescription-free only" toggle** (quick OTC filter) | Aponeo, DocMorris |
| **Filter result count preview** (show how many results each filter value will yield before click) | Amazon, Zalando |
| **Selected filters summary bar** (persistent "chips" showing active filters above results) | Amazon, Zalando, DocMorris |
| **Filter search/typeahead within facets** (for large category lists) | Amazon, eBay |
| **"Compare products" functionality** for similar medications | Boots.com |
| **Dosage strength as a filterable facet** (200mg vs. 600mg ACC visible in results) | DocMorris |
| **Interaction/contraindication notice at category level** | Specialist pharma sites |
| **"Frequently bought together" in filter context** | Amazon |

---

## 4. Information Architecture Problems

### 4.1 — Catalog Taxonomy Mismatch with User Intent Model
The Kategorien facet exposes the *site's internal catalog taxonomy* rather than a *user-intent-derived facet set*. A user searching "husten" has an intent model organised around: **symptom type → patient profile → treatment modality → format preference**. The current taxonomy organises around: **product department → regulatory class → commercial category**. These two models are orthogonal. The result is that the most clinically useful refinements (symptom type, age group, active ingredient) are entirely absent, while irrelevant refinements (books, beauty, diet products) consume filter space.

### 4.2 — Regulatory Classification Mixed with Editorial/Commercial Labels
"Apothekenpflichtig" (pharmacy-only), "Arzneimittel" (medication), "Gesponsert" (sponsored), and "Now! Produkt" (promotional label) are all rendered as visually equivalent badges on product cards. This conflates four distinct information types: **regulatory status**, **product classification**, **commercial placement**, and **promotional campaign**. Users cannot build a reliable mental model of what each badge signals.

### 4.3 — No Hierarchical Filter Path for Medication Queries
For a query with 1,668 results, the IA provides no guided narrowing path. Best practice for high-volume, high-stakes queries (medical products) is a progressive narrowing flow: **Symptom → Patient profile → Treatment type → Format → Brand/Price**. The current flat filter list (Categories, Dosage Form, Price) skips the first two and most important levels entirely.

### 4.4 — "Ernährung & Abnehmen" Count Inflation Suggests Tagging/Metadata Problem
266 results in "Nutrition & Weight Loss" for a cough query strongly suggests either: (a) over-broad product tagging in the catalog metadata, (b) a search algorithm that is matching on secondary product text rather than primary classification, or (c) cross-promotional content being surfaced inappropriately. This is an IA/data governance issue upstream of the UI.

### 4.5 — Filter Panel Scroll Architecture Buries Lower Filters
With Kategorien expanded to show 6+ items, the "Darreichungsform" and "Preis" filters are pushed below the visible fold in the sidebar. For a cough medication query, dosage form (syrup vs. tablet vs. capsule) is frequently a top-3 filtering decision for users — particularly for parents selecting for children. Burying it below a category list that includes "Books" is a significant IA priority error.

---

## 5. Quick Wins

| # | Win | Effort | Impact |
|---|---|---|---|
| 1 | **Add persistent "active filters" chip bar** above product grid showing applied filters with × removal | Low | High — reduces filter-state confusion |
| 2 | **Show current sort order** in collapsed "Sortieren nach" label (e.g., "Sortieren nach: Relevanz") | Very Low | Medium — eliminates sort ambiguity |
| 3 | **Suppress categories with <5 results** (or <1% of total) from facet display for query-specific relevance | Low | High — removes Books/Beauty noise |
| 4 | **Promote "Arzneimittel & Gesundheit"** to top of Kategorien list for drug-intent queries | Very Low | High — aligns facet order with intent probability |
| 5 | **Fix Homöopathie truncation** — enforce minimum row height or horizontal scroll within facet | Very Low | High — restores functional filter |
| 6 | **Visually separate "Gesponsert" badge** from regulatory badges (different color/shape system) | Low | Medium — reduces trust/compliance risk |
| 7 | **Add result count preview** to collapsed filter groups ("Darreichungsform: 8 options") | Low | Medium — reduces expand-to-assess friction |
| 8 | **Move "Filter löschen" to top of sidebar**, sticky on scroll | Very Low | Medium — reset discoverability |
| 9 | **Clarify "27" superscript** on star ratings — replace footnote reference with inline tooltip | Very Low | Low–Medium — removes rating confusion |
| 10 | **Add "Rezeptfrei" (OTC only) toggle** as a prominent binary filter above category list | Low | High — top user need for self-medication queries |

---

## 6. Bigger Bets

### BB-01 — Intent-Aware Filter System: Symptom-First Navigation Architecture
**Vision:** Replace the catalog-taxonomy facet set with a query-intent-aware filter panel. For "husten," the system should detect therapeutic intent and surface a dynamically assembled filter panel: **Symptom type** (dry/productive cough) → **Patient** (adult/child/infant) → **Treatment preference** (conventional/homeopathic) → **Format** (syrup/tablet/capsule) → **Price/Brand**. This requires investment in: NLP intent classification, catalog metadata enrichment (symptom tagging), and dynamic facet assembly logic. Comparable to how Boots.com surfaces "suitable for" and "symptom" filters for health queries.

**Expected impact:** Significant reduction in time-to-add-to-cart for therapeutic queries; measurable improvement in filter engagement rate; reduction in zero-result or low-conversion filter paths.

---

### BB-02 — Pharma-Appropriate Product Card Redesign: Clinical Relevance Before Promotional Signals
**Vision:** Redesign product card hierarchy for medication categories to lead with: **therapeutic indication** ("for dry cough, from age 12"), **key differentiator** (active ingredient, format, age suitability), **regulatory status** (OTC/prescription), then **price/discount**. Promotional badges ("Now! Produkt," discount %) should be present but visually subordinate to clinical information. Requires design system changes and stakeholder alignment with regulatory/marketing teams. Potentially requires HWG (Heilmittelwerbegesetz) compliance review.

**Expected impact:** Improved informed purchase decisions; reduced returns/adverse reactions from mis-selected products; stronger brand trust positioning vs. pure-price competitors.

---

### BB-03 — Unified Badge/Label Taxonomy and Design System Audit
**Vision:** Conduct a full audit and redesign of the badge system across product cards to create a *semantically coherent* label architecture with distinct visual languages for: (1) Regulatory/legal status — blue, institutional; (2) Commercial/promotional — amber, distinct shape; (3) Product classification — grey, neutral; (4) Platform program labels ("Now! Produkt") — clearly separate from product attributes. Requires cross-functional governance between regulatory, marketing, and design teams.

**Expected impact:** Reduced user confusion in a high-stakes purchase context; compliance risk reduction; foundation for scalable product labeling as catalog grows.

---

### BB-04 — AI-Assisted Guided Selling for OTC Medication Queries
**Vision:** For ambiguous high-volume queries like "husten," introduce a lightweight guided selling flow (3–4 questions: Who is it for? What type of cough? Any contraindications/allergies?) that dynamically narrows results and surfaces a recommended shortlist. Positioned as an...optional "Help me choose" entry point above the results grid, not a mandatory gate.

**UX Pattern:** Progressive disclosure wizard with inline result preview that updates in real-time as users answer questions. Each question uses visual iconography (adult/child silhouettes, dry cough/productive cough illustration) to reduce cognitive load and support lower-literacy users. Final output is a ranked shortlist of 3–5 products with a plain-language rationale ("Based on your answers, this is suitable for children under 6 with a dry cough").

**Technical dependencies:** Requires NLP classification layer to map query intent to question tree; integration with product attribute taxonomy (indication, age suitability, formulation type); A/B testing infrastructure to measure conversion lift against standard results.

**Regulatory consideration:** Guided selling logic must be reviewed to ensure no outputs constitute medical advice under German Heilmittelwerbegesetz (HWG). Framing must remain informational ("helps you filter") rather than diagnostic ("you have X, therefore take Y"). Legal sign-off required before launch.

**Expected impact:** Significant reduction in pogo-sticking from ambiguous query results; measurable improvement in add-to-cart rate for first-session visitors; reduced support contact volume related to product selection uncertainty.

---

### BB-05 — Persistent Comparison Tray for Category-Level Decision Making
**Vision:** Users evaluating multiple cough products face a fragmented experience: they must open individual PDPs, mentally retain information, navigate back, and repeat. Introduce a floating comparison tray (max 3 products) that persists across scroll and pagination, enabling side-by-side evaluation of key attributes without leaving the results page.

**UX Pattern:** A collapsed bottom-of-viewport tray activated on first "Add to compare" action. Tray displays product thumbnails with remove controls; expands on CTA click to a full-width overlay comparison table. Comparison dimensions prioritized by healthcare relevance: active ingredient, dosage form, age suitability, pack size, price per unit, rating. Non-applicable cells display "—" rather than blank space to prevent misinterpretation.

**Accessibility requirement:** Tray must not obscure primary navigation or product cards on mobile viewports. Keyboard navigation and screen reader labeling of comparison state ("3 of 3 products selected") required at launch.

**Expected impact:** Increased confidence at point of decision; reduced return rate attributable to product mismatch; measurable session depth improvement among multi-product viewers.

---

### BB-06 — Contextual Cross-Sell via Symptom Cluster Logic
**Vision:** Cough remedies exist within a broader symptom context — users purchasing a mucolytic frequently also need a nasal decongestant, throat lozenge, or immune support product. Current cross-sell logic (where present) appears catalog-generic rather than clinically coherent. Introduce symptom-cluster-based cross-sell modules at both PDP and cart stages.

**UX Pattern:** A "Complete your recovery" module surfacing 2–3 complementary products grouped by symptom logic rather than commercial affinity. Copy frames the recommendation in user benefit terms ("Cough often comes with congestion — here's what pairs well") rather than upsell language. Module displays after primary product content on PDP, and as a non-blocking interstitial at cart entry.

**Governance note:** Cluster logic must be defined and maintained by a pharmacist-reviewed taxonomy. Algorithmic personalization may supplement but must not override clinically validated groupings.

**Expected impact:** Basket size increase; improved perceived service quality ("the pharmacy understood my situation"); reduction in return visits for forgotten complementary products.

---

## Section 5: Metrics & Measurement Framework

A UX audit without a tied measurement framework risks producing improvements that cannot be validated, prioritized by impact, or defended in roadmap conversations. The following framework maps each finding category to observable signals across three layers: behavioral analytics, qualitative feedback, and business outcomes.

### 5.1 Behavioral Signals

| Metric | Baseline Proxy | Target Direction | Linked Finding |
|---|---|---|---|
| Pogo-stick rate from results page | Bounce-back within 10s of PDP entry | Decrease | BB-01, BB-04 |
| Filter engagement rate | % sessions using any filter | Increase | QF-01, QF-02 |
| Filter abandonment rate | Filter applied then removed without result interaction | Decrease | QF-02 |
| Scroll depth on results page | % users reaching position 5+ | Increase | BB-01 |
| Comparison feature engagement | % sessions using compare tray (post-launch) | Establish baseline | BB-05 |
| Add-to-cart rate from results | Direct ATC without PDP visit | Monitor for quality | BB-01 |
| Guided selling completion rate | % users completing full question flow (post-launch) | Establish baseline | BB-04 |
| Cart abandonment rate | % sessions adding product without purchasing | Decrease | BB-06 |

### 5.2 Qualitative Signals

Behavioral data will indicate *what* changes but not *why*. Qualitative methods required to validate directional hypotheses:

**Moderated usability testing** (6–8 participants, mixed health literacy levels, German-speaking) focused on task completion for a "find a cough remedy for a child under 6" scenario. Measures: time-on-task, error rate, verbal confidence indicators, unprompted filter usage.

**Unmoderated remote testing** via platform such as Maze or UserTesting for higher-volume signal on specific UI patterns (filter panel, trust badge placement, comparison tray) — 40–60 participants, benchmark against pre-change recordings.

**Exit survey intercept** (3-question, mobile-optimized) triggered on results page exit without conversion: "Did you find what you were looking for? If not, what was missing?" Provides qualitative vocabulary for iterative copy and filter taxonomy improvements.

**Pharmacist advisory review** — qualitative structured interviews with 3–5 qualified pharmacists to validate symptom cluster logic (BB-06), guided selling question trees (BB-04), and indication copy (BB-03). This is a governance input, not a UX input, but essential for launch readiness of those features.

### 5.3 Business Outcome Metrics

| Outcome | Metric | Timeframe |
|---|---|---|
| Conversion rate | Sessions with purchase / total sessions, segmented by query type | 4-week rolling post-launch |
| Average order value | Basket value for OTC medication categories | 8-week rolling |
| Return/refund rate | Returns citing wrong product selection | Quarterly |
| Support contact rate | Contacts per 1,000 sessions related to product selection | Monthly |
| Regulatory incident rate | Customer complaints or regulatory queries related to labeling/claims | Ongoing |
| NPS / CSAT (pharmacy category) | Post-purchase survey, OTC medication purchasers | Monthly |

---

## Section 6: Prioritization Matrix

Findings and recommendations mapped across implementation effort and expected user/business impact to support roadmap sequencing.

```
HIGH IMPACT
    │
    │    [BB-04]          [QF-01]
    │    Guided           Filter
    │    Selling          Architecture
    │
    │         [BB-03]          [QF-02]
    │         Trust &          Filter UX
    │         Labeling         Mechanics
    │
    │    [BB-06]     [BB-05]
    │    Cross-sell  Comparison
    │    Clusters    Tray
    │
    │              [BB-01]  [BB-02]
    │              Card     Mobile
    │              Density  Parity
    │
LOW IMPACT
    └─────────────────────────────────
         LOW EFFORT          HIGH EFFORT
```

**Immediate actions (low effort, high impact):**
- QF-02: Filter UX mechanics — label truncation, mobile collapse behavior, applied state visibility. Primarily CSS/component-level changes. Can ship within a single sprint.
- BB-02: Mobile layout parity fixes — spacing, tap target sizing, information hierarchy. Frontend implementation with no backend dependency.
- BB-01: Results card density — progressive disclosure of secondary attributes. Component-level change, no data model changes required.

**Short-term roadmap (medium effort, high impact):**
- QF-01: Filter architecture redesign — requires taxonomy work and possible backend attribute enrichment, but high leverage across entire catalog, not just this query.
- BB-03: Trust and labeling system — requires cross-functional coordination but high compliance and conversion value. Initiate regulatory workstream in parallel with design.

**Strategic investments (high effort, high impact):**
- BB-04: Guided selling — requires NLP, question tree logic, regulatory review, and