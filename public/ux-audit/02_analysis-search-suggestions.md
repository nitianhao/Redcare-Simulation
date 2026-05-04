# UX Audit: Shop-Apotheke.com — User typed 'husten' (cough) in search bar — autocomplete/suggestions dropdown visible
**Screenshot:** 02_search-bar-typing-husten.png
**Pipeline:** Stage 1 Haiku (perception) → Stage 2 Claude Sonnet 4.6 (analysis)

---

## 1. Critical Issues

---

### 🔴 CRIT-01 — No Symptom-Based Search Path; Query Treated as Pure Keyword

**What's visible:** The user typed "husten" (cough) — a *symptom*, not a product name. The autocomplete responds with product-name completions only ("Hustensaft", "Hustenstiller") and product listings. There is zero acknowledgment that "husten" is a symptom that could map to multiple therapeutic categories (dry cough, productive cough, children vs. adults, acute vs. chronic).

**Impact:** In a pharmacy context, this is a safety-adjacent conversion problem. A user with a dry irritant cough (*Reizhusten*) needs a cough suppressant (Dextromethorphan); one with a productive wet cough needs an expectorant (ACC, Ambroxol) — the *opposite* treatment. The search surface pushes four products without any disambiguation. Users who don't already know the product category may select the wrong therapeutic class, leading to:
- Medication misuse risk (low-probability but non-zero in OTC pharmacy)
- Abandonment by users who feel overwhelmed or uncertain
- Returns and trust erosion

**Severity:** 🔴 CRITICAL — Unique to pharmaceutical e-commerce; not merely a UX inconvenience

---

### 🔴 CRIT-02 — "Beliebte Produkte" Label is Commercially Misleading in a Medical Context

**What's visible:** The four products shown under "Beliebte Produkte" include the retailer's own **Redcare private label** in positions 1 and 2, followed by generic and branded third-party products. No labeling distinguishes own-brand from third-party. The word "beliebt" (popular) implies organic popularity/social proof.

**Impact:** In pharmaceutical retail, presenting house-brand products as organically "popular" without disclosure is a dark pattern with regulatory implications (EU P2B Regulation 2019/1150 requires transparency about ranking parameters in marketplace contexts). Users in medical need contexts place higher trust in "popular" signals — this misplaced trust could lead to suboptimal product selection. Conversion may be artificially inflated on lower-margin SKUs while eroding long-term trust.

**Severity:** 🔴 CRITICAL — Regulatory exposure + medical trust issue

---

### 🟠 HIGH-01 — No Visible Scroll Affordance; Product List Appears Truncated

**What's visible:** Four products are shown with no scroll indicator, no "Alle Ergebnisse anzeigen" (show all results) count, and the dropdown appears to end after the 4th product — yet a search for "husten" on a major pharmacy platform likely returns 100+ SKUs. The dropdown gives no signal of total result count or that scrolling is possible.

**Impact:** Users satisficed with what's visible may click through on suboptimal products or — critically — assume the store has poor stock depth. Power users (chronic patients, caregivers) who don't see their known brand will abandon to competitor. Estimated impact: 15–25% of users who don't see their target product in 4 results will exit.

**Severity:** 🟠 HIGH

---

### 🟠 HIGH-02 — Search Suggestions ("Suchen" section) Lack Categorical Context

**What's visible:** "Husten", "Hustensaft", "Hustenstiller" appear as plain text links. No visual hierarchy differentiates "this is the category" from "this is a product type." No icons, no result counts, no type labels (Kategorie / Produkt / Marke).

**Impact:** Users cannot predict what clicking "Hustenstiller" will show them vs. clicking "Hustensaft." In competitor implementations (DocMorris, dm.de, Amazon), suggestion items include type labels and result counts ("Hustenstiller — 47 Produkte"). Absence of this context increases cognitive load and mis-clicks, adding unnecessary steps to the funnel.

**Severity:** 🟠 HIGH

---

### 🟠 HIGH-03 — Price Display Shows Discounts Without Anchoring the Discount Mechanism

**What's visible:** All four products show a red current price and a struck-through "original" price. For example, Hustenstiller-ratiopharm® shows €4.69 vs. €7.89 — a **41% discount**. No label explains *why* (sale? subscription? member price? voucher?). The 12% Gutschein badge in the background is unrelated context that may confuse.

**Impact:** In pharmaceutical contexts, unexplained steep discounts (41% on a prescription-adjacent OTC product) trigger credibility questions rather than purchase urgency — especially for first-time pharmacy users. This is inverse to general e-commerce where discounts accelerate conversion. Without explanation, users question product authenticity, expiry date proximity, or legitimacy of the site.

**Severity:** 🟠 HIGH

---

## 2. Medium & Low Issues

---

### 🟡 MED-01 — Keyword Highlighting Uses Same Red as Price/CTA — Visual Hierarchy Collision

**What's visible:** The word "Husten" is highlighted in red within product names AND prices are shown in red AND the Search button is red. Three semantically different elements share one color signal. The red keyword highlight in "Redcare **Husten**saft" visually competes with "ab €13,49" (the action-driving price).

**Impact:** Eye-tracking research consistently shows users scan prices first in search dropdowns. When keyword highlights use the same hue, fixation patterns break down. Medium conversion impact; high polish/trust impact for a medical brand.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-02 — Product Thumbnails Are Too Small to Be Differentiating

**What's visible:** Product images are ~40×50px thumbnails. For pharmaceutical products where packaging color and logo are primary brand identifiers (especially for returning patients who recognize their medication by box), these thumbnails are below recognition threshold.

**Impact:** Returning customers who rely on visual package recognition — a common behavior in older demographic pharmacy users — cannot use images as navigation aids. This slows selection and reduces confidence.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-03 — No Dosage Form or Pack Size Information in Dropdown

**What's visible:** "Hustenstiller-ratiopharm® Dextromethorphan Kapseln" shows only name and price. No pack size (e.g., 20 Kapseln vs. 50 Kapseln), no dosage strength. The "ab €" prefix on one product (Redcare Hustensaft) implies multiple variants exist — but no variant selector or count is shown.

**Impact:** Pharmaceutical purchasers are highly price-per-unit sensitive. Without pack size, the price comparison in the dropdown is meaningless or actively misleading (€4.69 vs €7.89 could be same product, different pack sizes). This forces a click-through to PDP just to get basic information, adding funnel friction.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-04 — Background Dimming is Partial/Inconsistent; Top Nav Remains Fully Visible

**What's visible:** The background is dimmed but the top navigation bar (Anmelden, E-Rezept, Warenkorb) remains fully visible and apparently interactive. The newsletter banner and page content are dimmed but nav is not.

**Impact:** This creates an inconsistent modal affordance — users may attempt to click nav items thinking the dropdown is not a true modal, causing accidental navigation away from the search session. The modal contract is broken.

**Severity:** 🟡 MEDIUM

---

### 🟡 MED-05 — "ab €" Prefix Only Applied to One Product Without Explanation

**What's visible:** Only Redcare Hustensaft uses "ab € 13,49" ("from €13.49"). The other three products show flat prices. No tooltip or indicator explains what the "ab" threshold means (minimum quantity? smallest pack?).

**Impact:** Inconsistent pricing language within the same list creates confusion about what price the user will actually pay. May reduce add-to-cart confidence.

**Severity:** 🟡 MEDIUM

---

### 🔵 LOW-01 — Clear (X) Button Position Non-Standard

**What's visible:** The X/clear button is inside the search field on the right but left of the Search button. In most German e-commerce implementations the X is flush-right inside the field boundary.

**Impact:** Minor motor friction; low severity.

**Severity:** 🔵 LOW

---

### 🔵 LOW-02 — No Keyboard Navigation Indicators Visible

**What's visible:** No visible focus ring or highlight state on any dropdown suggestion. Screenshot is static but design shows no provision for keyboard-navigable states.

**Impact:** Accessibility gap (WCAG 2.1 SC 2.4.7 Focus Visible); affects keyboard-only users and users with motor disabilities. Legal exposure in German market under BFSG (Barrierefreiheitsstärkungsgesetz, effective 2025).

**Severity:** 🔵 LOW (isolated screenshot; full audit needed)

---

### 🔵 LOW-03 — "Keine Aktion oder Rabatte mehr verpassen" Banner Competes for Attention During Search

**What's visible:** Newsletter sign-up banner remains in the dimmed background but its copy is large and bold enough to read through the overlay.

**Impact:** Minimal; the dim reduces legibility sufficiently. Small cognitive distraction only.

**Severity:** 🔵 LOW

---

## 3. Missing Features

| Feature | Present on Competitors |
|---|---|
| **Symptom-to-category routing** ("Cough → Dry vs. Productive?") | Zur Rose (CH), Boots.com, CVS.com |
| **Result count per suggestion** ("Hustenstiller — 47 Produkte") | DocMorris, Amazon, Notino |
| **Suggestion type labels** (Kategorie / Marke / Wirkstoff) | DocMorris, Medpex, idealo |
| **Active ingredient (Wirkstoff) search suggestions** | Medpex.de, DocMorris |
| **Filter chips inside dropdown** (e.g., Für Kinder / Für Erwachsene) | Boots.com, Walgreens |
| **Recently searched terms** | Amazon, dm.de, DocMorris |
| **"Sponsored" / "Own Brand" label on private-label products** | Amazon, Zalando, idealo |
| **Rating/review count on dropdown products** | DocMorris, Amazon, Notino |
| **Stock/availability signal** ("Sofort lieferbar") | DocMorris, aponeo |
| **Prescription indicator (OTC vs. Rx badge)** | DocMorris, Redcare.com |
| **Voice search input option** | Boots.com, CVS.com |
| **Scroll/count affordance** ("Alle 120 Ergebnisse anzeigen") | DocMorris, Amazon, Zalando |
| **Keyboard navigation with visible focus states** | Most WCAG-compliant implementations |

---

## 4. Information Architecture Problems

**1. Flat taxonomy presentation for a hierarchical medical domain.**
"Husten" as a search term sits at the symptom level, but the IA jumps immediately to product level, bypassing the therapeutic category level (Reizhusten / produktiver Husten / Erkältungshusten / Keuchhusten). The IA does not reflect the actual decision tree a pharmacist would use.

**2. Two-section dropdown structure ("Suchen" + "Beliebte Produkte") creates a false choice architecture.**
Users don't know whether clicking "Hustenstiller" (in Suchen section) vs. clicking the Hustenstiller-ratiopharm product (in Beliebte Produkte section) leads to the same or different destination. One presumably leads to a category SERP, the other to a PDP — but the visual language doesn't communicate this distinction.

**3. "Beliebte Produkte" placement prioritizes commercial conversion over informational need.**
Best practice for pharmaceutical search IA places educational/category content (symptom guides, indication categories) before product listings. Showing products before the user has oriented themselves in the therapeutic landscape inverts the natural decision sequence.

**4. Brand name and generic name (INN) are not distinguished in IA.**
"SILOMAT Hustenstiller Dextromethorphan" buries the active ingredient (Dextromethorphan) after the brand name. Pharmacists and informed patients search by INN; the IA structure prioritizes brand over substance, which conflicts with German pharmacy usage norms and the ApBetrO (Apothekenbetriebsordnung) ethos of substance-first dispensing.

**5. Price architecture in dropdown cannot support purchase decision without pack/dose context.**
The IA presents price as the primary differentiator between products, but without unit pricing (€ per dose, € per 100ml), prices are incomparable. The IA should either suppress prices until the user reaches a listing page or enrich them with normalization units.

**6. The "Suchen" section header is redundant and adds no navigational value.**
Labeling text suggestions with "Suchen" (Search) inside a search dropdown is tautological. This section should be labeled by its semantic function: "Kategorien", "Verwandte Begriffe", or "Vorschläge."

---

## 5. Quick Wins

| # | Win | Effort | Impact |
|---|---|---|---|
| 1 | Add result count to each suggestion ("Hustenstiller — 52 Produkte") | Low (frontend label from existing API data) | High — sets expectations, reduces pogo-sticking |
| 2 | Rename "Suchen" section header to "Vorschläge" or "Kategorien" | Trivial (copy change) | Low-Medium — reduces cognitive noise |
| 3 | Add "Sponsored" / "Eigenmarke" (own brand) disclosure label to Redcare products | Low (data tag + CSS label) | High — regulatory compliance + trust |
| 4 | Add suggestion type chips: [Kategorie] [Produkt] [Wirkstoff] next to each suggestion | Low-Medium | Medium — improves scanability and predictability |
| 5 | Show pack size in product name within dropdown | Low (append field from PIM) | High — makes price comparison meaningful |
| 6 | Change keyword highlight color from red to a secondary brand color (e.g., dark teal/blue) to eliminate collision with price red | Trivial (CSS) | Medium — reduces visual hierarchy confusion |
| 7 | Extend dim overlay to cover top navigation bar consistently | Low (CSS z-index adjustment) | Medium — fixes broken modal contract |
| 8 | Add "Alle Ergebnisse anzeigen →" CTA with total count at dropdown bottom | Low | High — captures users who don't see their product in top 4 |
| 9 | Add OTC/Rx badge to each product in dropdown | Low-Medium (data already exists) | High — safety-critical disambiguation |
| 10 | Increase thumbnail size to minimum 56×56px | Trivial (CSS) | Medium — aids visual brand recognition for returning users |

---

## 6. Bigger Bets

**1. Implement Symptom-First Search with Guided Disambiguation Layer**
Before or alongside product suggestions, introduce a lightweight symptom funnel triggered by symptom-class queries ("husten", "kopfschmerzen", "erkältung"). A 2–3 question flow ("Ist es ein trockener oder produktiver Husten?" / "Für Erwachsene oder Kinder?") routes users to a pre-filtered SERP. Reference: Boots.com's "Symptom Checker" integration in search. This would directly address the most critical patient safety gap and differentiate from pure-retail competitors.

**2. Active Ingredient (Wirkstoff) Search Intelligence**
Build INN (International Nonproprietary Name) recognition into the search index so that typing "husten" surfaces a "Wirkstoffe gegen Husten" section: Dextromethorphan (trocken), Ambroxol/ACC (produktiv), Codein (stark). This reframes the platform as a clinical tool, not just a shop — a major trust and retention driver for the informed patient segment.

**3. Personalized Search Suggestions Based on Purchase/Rx History**
For logged-in users, de-prioritize "Beliebte Produkte" (generic popularity) and replace with ""Zuletzt von Ihnen gekauft" or "Passend zu Ihrer Gesundheitsakte" recommendations. A returning patient searching "husten" who previously purchased Ambroxol should see their prior product surfaced first, reducing re-purchase friction to a single tap. This is table-stakes personalization that pharmacy loyalty programs depend on — the current generic popularity ranking treats a first-time visitor and a five-year customer identically, which is a significant retention failure.

---

### Bigger Bets (6–18 Month Horizon)

**4. Symptom-to-Product NLP Layer**
Invest in a lightweight NLP intent classifier that maps colloquial symptom descriptions to therapeutic categories. A user typing "nachts nicht schlafen wegen husten" should trigger a night-cough filter (dextromethorphan-based suppressants) rather than a generic "Husten" SERP. This moves the search experience from keyword-matching to clinical intent resolution — a defensible moat that general e-commerce search engines cannot easily replicate without pharmacy domain data.

**5. Contraindication & Interaction Warnings in Search Results**
Surface inline pharmacist flags at the search results level (not just on PDP) for high-interaction-risk substances. For example, a user with a documented Rx for MAO inhibitors (inferable from E-Rezept history) searching "Hustenstiller" should see a soft warning before they ever reach the product page. This positions Shop Apotheke as an active safety layer, directly leveraging the E-Rezept infrastructure already visible in the navigation — an asset currently being left clinically dormant.

**6. Voice & Conversational Search Entry Point**
Given the demographically older patient base common to pharmacy channels, a microphone input integrated into the search bar with dialect-tolerant ASR (automatic speech recognition) tuned to German pharmaceutical vocabulary would materially lower access barriers. "Was hilft gegen trockenen Husten?" should resolve identically to typing "Hustenstiller Dextromethorphan" — the semantic bridge is achievable with existing LLM-based query expansion techniques applied against the existing product catalog.

---

### Pipeline & Implementation Cost Footnote

Priorities 1–3 are predominantly front-end and search-index configuration changes. Estimated engineering effort: 3–6 weeks per item assuming an existing Elasticsearch or Solr stack with standard pharmacy catalog metadata. No regulatory re-classification is triggered by autocomplete UI changes.

Priorities 4–6 carry higher investment profiles. The NLP classifier (Item 4) requires a curated German-language symptom-to-INN training dataset — estimated 3–4 months of data annotation plus model validation against AMG (Arzneimittelgesetz) safe-harbor boundaries. Item 5 (contraindication surfacing) requires formal sign-off from the responsible Apothekenleiter under §7 ApoBetrO and integration with the existing E-Rezept data pipeline, placing it firmly in a compliance-gated workstream. Item 6 is infrastructure-independent but requires ASR licensing or an in-house fine-tuning cycle on pharmaceutical German — budget accordingly as a 6–9 month initiative.

Combined, these six interventions represent a coherent escalation path from quick UX polish to genuine clinical intelligence — converting the search bar from a commodity navigation widget into Shop Apotheke's primary trust-building interface.