# UX Audit: Shop-Apotheke.com — Zero Results in Search Suggester/Autocomplete Dropdown
**Screenshot:** 06_zero-results-suggester.png
**Pipeline:** Stage 1 Haiku → Stage 2 Sonnet 4.6

---

## 1. Critical Issues

### 🔴 CRITICAL

**ID: ZR-001**
**Title:** Complete absence of zero-results feedback in the dropdown
**Problem:** When a user types a nonsense query ("xyzqwerty999"), the autocomplete dropdown simply does not appear — there is no message, no visual cue, no fallback state. The search field looks identical to an *untouched* field. The user has no indication whether the system is still processing, has failed silently, or genuinely found nothing.
**Impact:** In a pharmacy context, this is acutely dangerous. A user who misspells a medication name (e.g., "Ibupropen" → zero results) receives no feedback to self-correct. They may assume the product is not stocked and abandon — leading to potential non-adherence to medication. Alternatively, a confused or less digitally literate user (a significant segment of pharmacy shoppers: elderly, non-native speakers) may assume the website is broken.
**Severity:** 🔴 CRITICAL — combines health outcome risk, conversion loss, and complete information vacuum

---

**ID: ZR-002**
**Title:** No spell-check, fuzzy matching, or "Did you mean?" intervention at the autocomplete layer
**Problem:** The system makes no attempt to interpret the intent behind the query. Even basic edit-distance algorithms (Levenshtein) would allow the suggester to surface "did you mean: [closest match]?" for plausible misspellings of drug names. Currently, a single-character typo in a complex pharmaceutical name produces the same null experience as a totally nonsense string.
**Impact:** Drug names are notoriously difficult to spell correctly (e.g., "Pantoprazol," "Metamizol," "Acetylsalicylsäure"). A pharmacy search that cannot tolerate typos places an unreasonable cognitive burden on vulnerable users — the elderly, those in pain, those managing multiple medications. Mistyped queries will silently drop to zero results, suppressing findability for legitimate products that are actually in stock.
**Severity:** 🔴 CRITICAL — directly undermines the core transactional function of the site

---

### 🟠 HIGH

**ID: ZR-003**
**Title:** No fallback suggestions (popular products, categories, editorial picks) during zero-results state
**Problem:** When the dropdown is empty, there is a missed opportunity to surface contextually useful content: top-selling OTC products, popular categories (Arzneimittel, Vitamine, Nasenspray), or seasonal recommendations. The entire dropdown area is simply absent — a blank modal overlay with no navigational scaffold.
**Impact:** Users who arrive at a zero-results state are at high abandonment risk. Without an escape hatch — something to click, explore, or be redirected toward — the only rational action is to modify the query (which requires knowing *how* to modify it) or to close the modal entirely. Fallback content would retain engagement, reduce bounce, and surface discoverability pathways.
**Severity:** 🟠 HIGH — significant conversion and engagement impact

---

**ID: ZR-004**
**Title:** The "Suchen" button as the sole recovery path is not adequately signalled
**Problem:** Clicking the red "Suchen" button after a zero-results autocomplete is the only explicit user action available — it proceeds to the full SERP (Search Engine Results Page). However, there is no visual or textual cue that prompts the user to do this. No microcopy says "Press Search for all results" or "Try a broader search." For users who interpret the empty dropdown as a final dead end, the button's role as a recovery mechanism is invisible.
**Impact:** Users conditioned by Google-style autocomplete may interpret an empty dropdown as a final negative signal and abandon before ever pressing "Suchen." This inflates zero-result *session abandonment* rates beyond what the product catalogue would technically warrant.
**Severity:** 🟠 HIGH — creates a conversion cliff-edge immediately before the user reaches the SERP

---

**ID: ZR-005**
**Title:** No loading/processing state visible during query evaluation
**Problem:** There is no spinner, skeleton UI, or typing-debounce indicator to communicate that the system is actively evaluating the query. From the user's perspective, the transition from "typing" to "no results" is instantaneous and silent — indistinguishable from a timeout, a connectivity issue, or a rendering failure.
**Impact:** Users with slower connections or in contexts where the API call genuinely takes time may receive a frozen, blank dropdown for a perceptible interval with no feedback. In a healthcare context, ambiguity about system state erodes trust — a critical factor for a regulated online pharmacy.
**Severity:** 🟠 HIGH — trust and perceived reliability impact, amplified in healthcare vertical

---

## 2. Medium & Low Issues

### 🟡 MEDIUM

**ID: ZR-006**
**Title:** No recent search history shown in the zero-results dropdown state
**Problem:** Many mature e-commerce search implementations surface the user's recent searches when the autocomplete yields nothing, giving the user a quick path back to a previous successful query. Shop-Apotheke shows nothing, leaving the search field contextually orphaned.
**Impact:** Returning users managing repeat prescriptions (a core pharmacy use case) who mistype a previously successful search have no recovery affordance short of retyping from memory.
**Severity:** 🟡 MEDIUM

---

**ID: ZR-007**
**Title:** The X (clear) button's affordance overlaps with query abandonment — no distinction between "clear and retry" vs. "cancel search"
**Problem:** The X icon inside the input field clears the query but keeps the modal open. This is correct behaviour, but there is no tooltip, label, or visual distinction communicating this to the user. In a zero-results state, users may hesitate: does pressing X abandon the entire search session, or just clear the text?
**Impact:** Hesitation at this micro-interaction point is a small but real friction cost. Some users will close the modal entirely (via background click or ESC) when they intended only to clear and retype.
**Severity:** 🟡 MEDIUM

---

**ID: ZR-008**
**Title:** Search modal does not restrict visual focus — background content is distracting and semi-readable
**Problem:** The background is dimmed but not sufficiently obscured. Navigation items, banners, and promotional content remain partially legible. In a zero-results state, this visual noise may attract user attention away from the search field, encouraging premature modal dismissal via nav clicks.
**Impact:** Minor but measurable distraction effect, particularly on mobile viewports (not assessed here but predictable from desktop layout).
**Severity:** 🟡 MEDIUM

---

### 🔵 LOW

**ID: ZR-009**
**Title:** No keyboard shortcut or ARIA live region announcement for zero-results state
**Problem:** Screen reader users typing into the search field will receive no programmatic announcement that zero suggestions were returned. A simple `aria-live="polite"` region stating "Keine Ergebnisse gefunden" would satisfy WCAG 2.1 AA criterion 4.1.3 (Status Messages).
**Impact:** Accessibility compliance gap; low user volume impact but regulatory/legal exposure in German market (BITV 2.0 / EN 301 549).
**Severity:** 🔵 LOW (compliance)

---

**ID: ZR-010**
**Title:** Input placeholder text disappears on typing — no persistent label
**Problem:** "Finden Sie Ihr Produkt" is a placeholder-only label. Once the user types, no persistent label remains above or beside the field. In the zero-results state, this is a minor disorientation: the user has lost the contextual framing of what the field is for, at the precise moment they need to re-evaluate their input.
**Impact:** Minor cognitive friction; more significant on return visits or multi-step correction loops.
**Severity:** 🔵 LOW

---

## 3. Missing Features

| Feature | Present on Comparable Sites |
|---|---|
| "Did you mean?" / fuzzy spell correction in dropdown | Docmorris.de, Apothekenumschau, Amazon Pharmacy (US) |
| Zero-results explicit message ("Keine Ergebnisse für…") | Zalando.de, Otto.de, DM.de |
| Fallback: popular/trending product suggestions in dropdown | Douglas.de, Notino.de, Boots.com (UK) |
| Recent search history shown in dropdown | DocMorris, Medpex.de, Google Shopping |
| Category-level suggestions when product match fails | Aponeo.de, Redcare Pharmacy |
| Search query correction with original query preserved | Google, Bing, nearly all Tier-1 e-commerce |
| Loading/skeleton state during API call | DM.de, Rossmann.de |
| "Browse categories instead" CTA in zero-results state | BENU Apotheke, Vitalsana |
| Voice search input | Aponeo.de, Amazon |
| Barcode / package scan search (mobile) | DocMorris app, MyPharmacy app |

---

## 4. Information Architecture Problems

**4.1 The search modal exists in an informational vacuum**
The autocomplete layer is architecturally disconnected from the site's category taxonomy. When a user's query fails to match a product, there is no pathway from the search modal *back into* the IA — no "Browse Arzneimittel," no "Explore Vitamine & Nahrungsergänzung." The modal is a dead end rather than a navigational hub. For a site with a complex pharmaceutical taxonomy (PZN codes, INN names, brand names, indication clusters), this represents a fundamental IA failure: search and browse are siloed, with no graceful degradation from one to the other.

**4.2 Query intent is not classified or redirected**
A well-architected pharmacy search would classify query intent at the autocomplete stage: *product name* (route to PDP), *symptom* ("Kopfschmerzen" → route to OTC pain category), *active ingredient* ("Ibuprofen" → ingredient cluster), *brand* ("Aspirin" → brand results), *condition* ("Erkältung" → indication landing page). The current implementation appears to perform only literal string matching against product names/SKUs. When that matching fails, no intent-based redirect is available.

**4.3 Promotional and clinical content is architecturally absent from search**
The site visibly carries content beyond products: E-Rezept service information, Online-Arzt, Newsletter. None of this content appears to be indexed by the search layer. A user typing "Rezept einlösen" into search would likely receive zero or irrelevant results, despite the site having a dedicated, prominent E-Rezept service. Search and content architecture are not unified.

**4.4 Navigation hierarchy not surfaced as search fallback**
The top navigation (Arzneimittel, Familie, Beauty & Pflege, Sanitätshaus) represents a mature, usable IA. Yet this hierarchy is invisible to the search experience. When search fails, the IA does not step in. The two wayfinding systems (search and navigation) operate as parallel, non-communicating structures — a significant structural inefficiency.

---

## 5. Quick Wins

| # | Win | Effort | Impact |
|---|---|---|---|
| 1 | Add explicit zero-results microcopy: *"Keine Vorschläge für 'xyzqwerty999' — drücken Sie Suchen für alle Ergebnisse"* | Low (frontend copy + CSS) | 🔴 High — directly addresses ZR-001, ZR-004 |
| 2 | Surface 4–6 static "Beliebte Produkte" / top-selling SKUs as fallback content when autocomplete returns zero | Low–Medium (static config or CMS-driven) | 🟠 High — addresses ZR-003, reduces abandonment |
| 3 | Add `aria-live="polite"` region announcing zero-results state to screen readers | Low (2–4 dev hours) | 🔵 Medium — addresses ZR-009, BITV compliance |
| 4 | Add tooltip/label to X button: *"Eingabe löschen"* on hover/focus | Low (1–2 dev hours) | 🟡 Low–Medium — addresses ZR-007 |
| 5 | Add visual loading indicator (spinner or pulsing dots) during API call debounce window | Low (CSS animation) | 🟠 Medium — addresses ZR-005, improves perceived reliability |
| 6 | Persist recent searches (localStorage) and show in dropdown during zero-results state | Medium (frontend dev, ~1 sprint) | 🟡 Medium — addresses ZR-006 |
| 7 | Add "Kategorien durchsuchen" CTA links (Arzneimittel / Beauty / Familie) at bottom of zero-results dropdown | Low (static links) | 🟠 High — addresses IA problem 4.1 |
| 8 | Increase modal background overlay opacity to better suppress background content | Low (1-line CSS change) | 🟡 Low — addresses ZR-008 |

---

## 6. Bigger Bets

**6.1 Implement NLP-powered intent classification in the search layer**
Move beyond literal string matching to a query understanding layer that classifies user intent: product, brand, active ingredient, symptom/indication, service. Route each intent class to an appropriate results experience. For a pharmacy, this is commercially and clinically meaningful — a user typing "Rückenschmerzen" is expressing a symptom, not a product name, and deserves to land on a curated OTC pain category with pharmacist-recommended products, not a zero-results page. Integration with a search platform such as Algolia (NeuralSearch), Elasticsearch with ML ranking, or a pharmacy-specific semantic layer (e.g., trained on ATC/INN/PZN ontologies) would underpin this capability. Estimated scope: 2–4 quarters, cross-functional.

**6.2 Unify search index across products, content, and services**
Index the full site into a single search layer: product catalogue (with PZN, INN, brand aliases), editorial/health advice content, service pages (E-Rezept, Online-Arzt), and promotional landing pages. This transforms search from a product-lookup tool into a genuine service gateway. Users asking "wie funktioniert E-Rezept" or "Beratung Blutdruck" should find meaningful results, not silence. Competitive differentiation opportunity in the German online pharmacy market, where health literacy content is increasingly a trust signal. Estimated scope: 3–6 quarters depending on content architecture maturity.

**6.3 Introduce a personalised "rescue" layer for zero-results queries**
Use purchase history, browse history, and saved medications (for logged-in users) to surface personalised fallback content when search fails. A user who regularly buys a specific blood pressure medication and misspells it should see that medication as a "Did you mean your saved product?" suggestion. This requires a personalisation data layer and recommendation engine integration but directly serves the high-value repeat-purchaser segment that pharmacy e-commerce depends on. Estimated scope: 2–3 quarters, requires data infrastructure investment.

**6.4 Build a pharmacy-specific query expansion dictionary**
Construct a synonym/alias expansion layer trained on: brand ↔ INN mappings (Aspirin → Acetylsalicylsäure), indication ↔ product category mappings (Erkältung → Kältemittel, Nasenspray, Vitamin C), and common German misspellings of pharmaceutical terms. This is a lower-tech alternative to full NLP (Bet 6.1) and delivers meaningful search recall improvement with lower engineering investment. Can be maintained by pharmacist-curated editorial input. Estimated scope: 1–2 quarters for initial dictionary, ongoing maintenance cadence.

---

*Pipeline cost estimate: Stage 1 (Claude Haiku, perception extraction) ≈ \$0.003–0.005 per image; Stage 2 (Claude Sonnet 4.6, audit generation) ≈ \$0.018–0.024 per audit at this output length. Estimated total per screenshot: ~\$0.02–0.03. At 50 screenshots/audit cycle: ~\$1.00–1.50.*