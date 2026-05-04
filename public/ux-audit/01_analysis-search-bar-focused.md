# UX Audit: Shop-Apotheke.com — Search Bar Focused, No Input Yet
**Screenshot:** 01_search-bar-focused-empty.png
**Pipeline:** Stage 1 Haiku (perception) → Stage 2 Claude Sonnet 4.6 (analysis)

---

## 1. Critical Issues

### 🔴 CRIT-01 — Product Review Count is Suspiciously Identical Across All Three "Popular Products"
**What's visible:** All three recommended products (ELASTEN®, Magnesium Verla® 400, Vitamin D3 VIGANTOLVIT) display exactly **27 reviews** each. This is a statistically implausible coincidence for independently popular products with different price points and categories.
**Impact:** If this is a rendering bug (the count is hardcoded or incorrectly mapped), it actively **erodes trust** at the most critical moment — first impression before any purchase intent. A user familiar with e-commerce will recognize this as data corruption and question the integrity of the entire review system. For a pharmacy platform where product credibility is safety-relevant, this is particularly damaging.
**Severity:** 🔴 CRITICAL — Trust-destroying data error at zero-input state, visible to every user who focuses the search bar.

---

### 🔴 CRIT-02 — Dropdown Overlay Completely Obscures Primary Content Without Dimming
**What's visible:** The search dropdown expands as a white card overlaying the homepage hero area, including the promotional carousel, "Die Online-Apotheke" branding, and discount badges (€10 savings, 12% badge). There is **no backdrop dim or scrim** behind the dropdown.
**Impact:** Users cannot perceive the boundary between dropdown and background content. Elements like the "Jetzt entdecken" CTA button and carousel navigation arrows (‹ ›) remain partially visible behind the dropdown, creating **visual noise** and potential accidental taps on background elements on touch devices. This also fragments the user's focus — the dropdown competes with live promotional content rather than commanding full attention.
**Severity:** 🔴 CRITICAL on mobile (misclick rate), 🟠 HIGH on desktop.

---

### 🟠 HIGH-01 — "Beliebte Produkte" Are Editorially Curated, Not Personalized, But Presented as if Relevant
**What's visible:** Three products (collagen drinks, magnesium, Vitamin D3) are shown under "Beliebte Produkte" with no context label indicating these are generic bestsellers vs. personalized recommendations. The cart shows **0 items** and there is no logged-in state, yet the section implies relevance.
**Impact:** A user searching for, say, wound care or baby formula (both in the recent searches shown) will see completely unrelated products occupying ~40% of the dropdown real estate. This is **wasted discovery surface**. Worse, it may confuse users into thinking the site already "knows" something about them, raising **implicit privacy concerns** without delivering personalization value.
**Severity:** 🟠 HIGH — Relevance failure at the highest-traffic UI state.

---

### 🟠 HIGH-02 — "Zuletzt Gesucht" (Recently Searched) Exposed Without Authentication Gate
**What's visible:** Recent searches ("Sport Verletzung Behandeln", "Baby Erstausstattung", "Schlaf") are displayed to what appears to be an unauthenticated user (cart = 0, no login indicator active).
**Impact:** In a **pharmaceutical context**, search history is sensitive health data. Displaying it without confirming session ownership is a **GDPR and health-data privacy concern**. On shared devices (family computers, library kiosks), this exposes health-seeking behavior. The "Löschen" (delete) affordance helps but is not a substitute for proper session-scoped storage handling. There is also no explanation of where this data is stored (local vs. server-side).
**Severity:** 🟠 HIGH — Regulatory exposure risk + health data sensitivity.

---

### 🟠 HIGH-03 — Search Bar Has No Input Yet But Dropdown Fires Immediately on Focus
**What's visible:** The full dropdown — including 3 columns and 3 product cards — appears with **zero characters typed**. There is no progressive disclosure.
**Impact:** This is cognitively overwhelming at the zero-input state. The user has expressed intent to search but has provided **no signal** about what they want. Surfacing 9+ items (3 recent, 3 popular searches, 3 brands, 3 products) creates **choice overload** before the user has even begun forming a query. This is particularly harmful for older demographics or health-anxious users who are already under cognitive load.
**Severity:** 🟠 HIGH — Cognitive overload at the earliest moment of search intent.

---

## 2. Medium & Low Issues

### 🟡 MED-01 — "Löschen" (Delete) Has No Confirmation Step and Unclear Scope
**What's visible:** A red "Löschen" link sits below the 3 recent search items. It is styled in red (matching the brand's action color) with no secondary label.
**Problem:** Does clicking "Löschen" delete all history, or just the last entry? There is no tooltip, no confirmation dialog, and the destructive action is styled identically to a navigation link. Users may accidentally clear their search history while intending to navigate elsewhere.
**Severity:** 🟡 MEDIUM

---

### 🟡 MED-02 — Three-Column Layout Creates Unequal Visual Hierarchy with No Clear Primary Path
**What's visible:** "Zuletzt Gesucht," "Beliebte Suchen," and "Beliebte Marken" are rendered in three equal-width columns with identical typographic weight for their headers.
**Problem:** There is no visual hierarchy signaling which column the user should engage with first. For a returning user, recent searches should dominate. For a new user, popular searches are more useful. The equal-weight treatment forces the eye to scan all three simultaneously, increasing time-to-first-click.
**Severity:** 🟡 MEDIUM

---

### 🟡 MED-03 — Product Prices Shown as "ab €" (from) Without Variant Context
**What's visible:** Prices are prefixed with "ab €" (from €) — e.g., "ab € 29,50" — with no indication of what the base variant is or why there are multiple prices.
**Problem:** "From" pricing in a zero-input state with no product context creates anchoring confusion. Users don't know if the shown price requires a subscription, specific pack size, or loyalty condition. This is especially problematic for the €29.50 collagen product which is the highest-priced recommendation.
**Severity:** 🟡 MEDIUM

---

### 🟡 MED-04 — No Keyboard Navigation Indicators on Dropdown Items
**What's visible:** The dropdown contains multiple interactive elements (links, product cards, delete button) with no visible focus states shown.
**Problem:** Accessibility failure for keyboard-only users and screen readers. In a pharmaceutical context, a significant portion of users may have motor impairments or rely on assistive technology. WCAG 2.1 AA requires visible focus indicators.
**Severity:** 🟡 MEDIUM — Accessibility compliance gap

---

### 🔵 LOW-01 — Close Button (×) is Ambiguous in Its Target
**What's visible:** An × button appears at the bottom-right of the dropdown overlay.
**Problem:** Standard pattern would be to close the dropdown by clicking outside or pressing Escape. The × button's position at the bottom-right is unconventional (typically top-right for modals) and is far from the search bar that triggered it, creating unnecessary reach distance.
**Severity:** 🔵 LOW

---

### 🔵 LOW-02 — Newsletter Banner Competes With Search Focus State
**What's visible:** The 12% newsletter banner remains fully visible at the top even when the search dropdown is open.
**Problem:** Two simultaneous conversion moments (newsletter signup + product search) are fighting for attention. The banner's red "Zum Newsletter anmelden" button visually competes with the red "Suchen" button.
**Severity:** 🔵 LOW — Minor distraction, not blocking

---

### 🔵 LOW-03 — Star Ratings Show No Half-Stars or Decimal Score
**What's visible:** All three products appear to show 4.5-star ratings (visually) but no numeric score (e.g., "4.5/5") is displayed — only the count (27).
**Problem:** Without a numeric average, users cannot differentiate between a 4.1 and a 4.9 product. Combined with CRIT-01 (identical review counts), this further undermines rating credibility.
**Severity:** 🔵 LOW (compounding with CRIT-01)

---

## 3. Missing Features

| Feature | Present On Competitors |
|---|---|
| **Search query autocomplete / typeahead** (suggestions that appear *as you type*) | DocMorris, Amazon Pharmacy, Boots.com |
| **Category filter scoping before search** ("Search in: Vitamins / Skincare / OTC") | Chemist Warehouse, Walgreens.com |
| **Symptom-based search entry point** ("I have a headache → show me options") | Pharmacy2U, Boots Health Hub |
| **Barcode / QR scanner** for prescription or product reorder | DocMorris app, Zur Rose |
| **Voice search input** | Walgreens, CVS |
| **"New arrivals" or "Trending now" section** in empty search state | ASOS, Zalando (adapted for pharma: seasonal wellness) |
| **Login nudge in search dropdown** ("Log in to see your order history & saved searches") | Amazon, Apotek Hjärtat |
| **Drug interaction or safety search path** | Drugs.com, NHS search |
| **Estimated delivery date in product cards** | DocMorris ("Lieferung morgen"), Amazon |
| **Prescription (E-Rezept) fast-track search entry** | Emerging on DocMorris |
| **Search filters pre-populated in dropdown** (e.g., OTC vs. prescription, brand vs. generic) | Walgreens, CVS |
| **"Previously purchased" products** in returning-user search state | Amazon, Boots |

---

## 4. Information Architecture Problems

**1. Temporal vs. Contextual Mismatch in Column Organization**
"Zuletzt Gesucht" (past behavior) and "Beliebte Suchen" (aggregate behavior) are placed at the same hierarchical level despite serving fundamentally different user needs. A user's own search history is high-intent personal signal; aggregate popular searches are discovery prompts. Mixing them at equal visual weight in adjacent columns trains users to treat their own history as one option among many, rather than the primary navigation shortcut it should be.

**2. "Beliebte Marken" Column Creates a Navigation Dead-End Risk**
Listing brand names (Eucerin, La Roche Posay, Redcare) in a search dropdown implies these are search queries. However, clicking a brand name likely navigates to a brand page, not a search results page. The IA conflates search behavior with brand browsing — two distinct navigation paradigms — without signaling the distinction. Users expecting search results will be disoriented by landing on a brand hub.

**3. "Beliebte Produkte" Section Has No IA Connection to the Columns Above It**
The three product cards below the column section feel appended rather than integrated. There is no logical IA relationship between "Popular Brands" (column 3) and the product cards below — the products don't appear to belong to those brands (Elasten, Magnesium Verla, Vigantolvit vs. Eucerin, La Roche Posay, Redcare). This creates a **broken semantic chain**: browsing the dropdown feels like encountering three unrelated modules stacked vertically.

**4. E-Rezept is a Header-Level Feature But Absent from Search Dropdown IA**
The E-Rezept icon in the header is a primary feature for a German online pharmacy. Yet the search dropdown — the highest-engagement surface on the page — contains no E-Rezept entry point. A user who opens search to find their prescription medication has no fast path to the E-Rezept flow from within the search experience. The IA forces them to abandon the search interaction and navigate via the header icon instead.

**5. "Beliebte Produkte" Label is Too Generic for a Pharmaceutical Context**
Labeling health products as "popular" without clinical or categorical context (e.g., "Popular for Immunity," "Bestsellers in Vitamins") strips them of the trust scaffolding users need when making health purchasing decisions. The IA treats pharmaceutical products like consumer goods (à la Amazon bestsellers), which is a category-inappropriate pattern for a regulated health commerce environment.

**6. Recent Searches Mix Health Categories Without Grouping**
The three recent searches span very different health domains: "Sport Verletzung Behandeln" (sports injury), "Baby Erstausstattung" (baby supplies), "Schlaf" (sleep). On a shared family device, these likely represent different household members. The IA makes no attempt to group, timestamp, or contextualize these — presenting them as a flat list that obscures their diversity and usefulness.

---

## 5. Quick Wins

| # | Win | Effort | Impact |
|---|---|---|---|
| 1 | **Fix the identical "27 reviews" bug** — audit review count rendering in product card component | Low (1–2 dev hours) | 🔴 Critical trust restoration |
| 2 | **Add backdrop scrim/dim** when dropdown is open to create clear focus boundary | Low (CSS, ~1 hour) | 🟠 High — focus clarity, misclick prevention |
| 3 | **Add confirmation on "Löschen"** — simple "Are you sure?" inline prompt or undo toast | Low (2–3 hours) | 🟡 Prevents accidental data loss |
| 4 | **Display numeric star average** alongside count (e.g., "4.8 ★ (27)") in product cards | Low (template change) | 🟡 Credibility improvement |
| 5 | **Label "Beliebte Produkte" contextually** — e.g., "Saisonale Bestseller" or "Bestseller im Winter" | Low (copy change) | 🟡 Relevance signaling without personalization |
| 6 | **Add a subtle privacy note under "Zuletzt Gesucht"** — "Nur auf diesem Gerät gespeichert" | Low (copy, 1 hour) | 🟠 Reduces GDPR anxiety, builds trust |
| 7 | **Visually differentiate column headers** — make "Zuletzt Gesucht" bold/primary, demote others | Low (CSS) | 🟡 Faster time-to-click for returning users |
| 8 | **Add estimated delivery callout** to product cards in dropdown (e.g., "Lieferung morgen") | Medium (requires logic hookup) | 🟠 High — conversion nudge at zero-input |
| 9 | **Add keyboard focus styles** to all dropdown interactive elements | Low (CSS/ARIA, ~4 hours) | 🟡 WCAG 2.1 AA compliance |
| 10 | **Collapse newsletter banner** when search dropdown is open | Low (JS event listener) | 🔵 Reduces attention competition |

---

## 6. Bigger Bets

**1. Build a Progressive Disclosure Search Experience**
Replace the immediate full-dropdown with a staged reveal: focus → show only recent searches; 1 char typed → add autocomplete; 3+ chars → show predictive results with category badges. This reduces zero-input cognitive overload while making the search feel intelligent and responsive. Reference: Google Search's progressive suggestion model adapted for health commerce.

**2. Introduce Intent-Aware Empty Search State**
Use time-of-day, session context, and (with consent) behavioral signals to dynamically change what the dropdown shows. Morning sessions could surface vitamins/supplements; cold/flu season could surface relevant OTC categories; returning users see their last order for restock. This transforms the dropdown from a static editorial block into a dynamic first-touch personalization surface.

**3. Develop a "Search by Symptom" Entry Mode**
Introduce a secondary search mode (accessible via a toggle or chip: "Suche nach Produkt / Symptom") that routes users through a structured symptom → category → product recommendation flow. This addresses a fundamental gap: many pharmacy users don't know the product name, only what they're experiencing. This is a significant competitive differentiator vs. DocMorris and creates a unique consultation-like experience.

**4. Integrate E-Rezept Fast Track Directly Into Search**
Add an E-Rezept upload or scan CTA as a persistent element within the search dropdown (e.g., a highlighted card: "Haben Sie ein Rezept?Scannnen Sie es hier ein."). This collapses the journey from prescription receipt to product fulfillment into a single interaction, reducing the current multi-step friction where users must navigate away from search entirely. Given that E-Rezept adoption is accelerating in Germany, positioning this touchpoint at the highest-intent moment in the UI is strategically sound and operationally differentiated.

**5. Introduce Search Analytics-Driven "Trending Now" Module**
Replace or augment the static "Beliebte Suchen" list with a dynamically updated "Gerade gesucht" or "Trending diese Woche" chip row, surfaced from real-time or rolling 7-day search volume data. Static popular search lists decay in relevance quickly (seasonal shifts, e.g., hay fever vs. flu season) and risk creating a false sense of personalisation. A live-trending module signals platform vitality, aids discovery, and can be segmented by region or user cohort for future personalisation layers.

---

### Bigger Bets (6–12 Month Horizon)

**6. Federated Search Architecture with Intent Classification**
Invest in a backend intent classification layer that pre-categorises each query before it reaches the product index — distinguishing between navigational (brand/product name), informational (symptom/condition), and transactional (refill/reorder) queries. Each intent class should route to a differently structured results page: transactional queries surface reorder shortcuts and dosage history; informational queries lead with editorial content and a pharmacist-verified summary before product listings; navigational queries go directly to PDPs. This is the foundational infrastructure change that unlocks the majority of the higher-priority UX improvements above and aligns with how users actually approach a pharmacy context versus a general retailer.

**7. Conversational Search / AI Pharmacy Assistant**
Pilot a conversational search interface — a persistent chat-style entry point labelled something like "Fragen Sie unsere Apotheke" — powered by a constrained LLM fine-tuned on pharmacy-safe content and governed by BfArM-compliant guardrails. This is not a replacement for licensed pharmacist consultation but a triage and discovery layer: it narrows ambiguous queries ("something for my child's cough, she's 4") into safe, age-appropriate product sets with flagged contraindications. The interface can progressively disclose regulatory caveats inline rather than via friction-heavy interstitials, improving both compliance posture and user trust. Competitive precedent exists internationally (e.g., Chemist Warehouse AU pilots, Amazon Pharmacy US guidance tools), and the German regulatory environment, while requiring careful scoping, does not preclude advisory-mode digital tools at this layer.

---

*Pipeline cost note: Recommendations 1–3 are estimated at low-to-medium front-end implementation cost (1–3 sprint cycles, minimal backend dependency assuming existing tagging infrastructure). Recommendation 4 requires coordination with the E-Rezept processing pipeline but no new infrastructure if a deep-link handoff pattern is used. Recommendation 5 requires a lightweight data pipeline from search logs to a CMS-consumable API endpoint — moderate effort, high ROI given the seasonal relevance gains. Recommendations 6 and 7 are platform-level investments requiring product, data, and compliance alignment and should be scoped as separate discovery workstreams before sprint commitment.*