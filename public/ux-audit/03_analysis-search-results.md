# UX Audit: Shop-Apotheke.com — "Husten" Search Results
**Screenshot:** 03_search-results-husten.png  
**Query:** husten (cough) · 1,668 results  
**Pipeline:** Stage 1 Haiku (perception) → Stage 2 Claude Sonnet 4.6 (analysis)

---

## 1. Critical Issues

### 🔴 CRITICAL

**C1: No Symptom-Based Navigation / Clinical Triage Layer**  
The query "husten" is inherently ambiguous — dry cough, productive cough, children vs. adults, acute vs. chronic, with fever or without. The page dumps 1,668 products directly without any disambiguation step. Compare: Boots.com surfaces a "What are you looking for?" guided filter at the top of ambiguous health queries.  
- **Conversion impact:** Users who don't already know a brand name (ACC, Mucosolvan) face immediate cognitive overload and are likely to abandon or make a suboptimal choice.  
- **Severity: CRITICAL**

---

**C2: Sponsored Content Not Visually Differentiated from Organic Results**  
All 6 visible products carry "Now! Produkt" + "Gesponsert" tags, but these tags are rendered in the same visual weight and color family as "Arzneimittel" or "pflanzlich" classification tags. The "Gesponsert" label is small, low-contrast, and easily overlooked.  
- **Conversion impact:** Regulatory risk (German UWG, EU Digital Services Act transparency requirements). Trust erosion when users later realize top results are all paid placements. In pharma specifically, this creates a patient safety concern — a user with a specific clinical need may receive commercially-prioritized results rather than clinically optimal ones.  
- **Severity: CRITICAL**

---

### 🟠 HIGH

**H1: Zero Pagination / Infinite Scroll Controls Visible**  
1,668 results with no visible pagination, no results-per-page selector, and no infinite scroll trigger visible. Users have no sense of result set depth or how to navigate it.  
- **Severity: HIGH**

**H2: All Filters Are Collapsed by Default — None Pre-Applied for an Ambiguous Query**  
The left sidebar shows Kategorien, Darreichungsform, Preis, and Sortieren nach — all collapsed, all empty. For a query returning 1,668 results, shipping users into an unfiltered state is a missed opportunity.  
- **Note:** Baymard Institute data shows 42% of users won't use faceted filters if they require multiple click-to-open interactions.  
- **Severity: HIGH**

**H3: Price Discount Presentation Creates Anchoring Confusion**  
Each card shows: discount badge (e.g., "-39%²"), current price ("ab €7,79"), unit price ("0,78 €/1 St"), crossed-out AVP/UVP price ("€12,82"), AND a footnote superscript ("²"). That's 5 price-related data points per card — and the "²" footnote isn't visible in the viewport.  
- **Severity: HIGH**

**H4: "Verfügbar" CTA Is Functionally Ambiguous**  
The green "Verfügbar" (Available) button looks like a CTA but functions as a status indicator. There is no "In den Warenkorb" (Add to Cart) button visible on the cards at all.  
- **Severity: HIGH**

---

### 🟡 MEDIUM

**M1: "apothekenpflichtig" Tag Applied Without Explanation**  
Shown on nearly every card but never explained — does this mean prescription required? (No — it means OTC but pharmacy-only.) This creates anxiety without resolution.

**M2: Product Images Are Inconsistent in Size and Crop**  
The syrup bottle image is notably larger than tablet box images, creating an uneven visual rhythm.

**M3: Star Ratings Show Inconsistent Data Sources**  
Some cards show a "27" superscript alongside a rating count (e.g. 536 reviews) — it's unclear whether "27" is a different metric or a display threshold. Undermines rating credibility.

**M4: No "For Children" / "For Adults" Quick Filter**  
Cough treatments are heavily age-segmented in German pharma (Mucosolvan: "ab 0 Jahre", WICK: "ab 14 Jahren", ACC: "ab 2 Jahren") — yet no age-group filter is surfaced.

---

### 🔵 LOW

**L1: Breadcrumb Navigation Missing**  
No breadcrumb trail from homepage to search results.

**L2: Newsletter Banner + 12% Badge Compete for Top-of-Page Attention**  
Two promotional elements above the navigation increase time-to-first-result in a task-oriented health query context.

---

## 2. Missing Features

| Feature | Present on |
|---|---|
| Symptom/indication guided filter chips ("Reizhusten · Schleimhusten · Für Kinder") | Redcare, Boots UK, CVS |
| "Frequently Bought Together" / complementary products | iHerb, Boots |
| Product comparison checkbox | Redcare, DocMorris |
| "Our Pharmacist Recommends" editorial widget | Boots UK, Lloyds Pharmacy |
| Real-time delivery promise ("Heute bestellen, morgen geliefert bis 14:00") | Amazon Pharmacy, Redcare |
| List vs Grid view toggle | iHerb, Vitacost |
| Recently Viewed / Search History context bar | CVS, Walgreens |
| PZN Search fast lane (users arriving with a specific Pharmazentralnummer) | — |

---

## 3. Information Architecture Problems

**3a. Tag Taxonomy Is Inconsistently Applied**  
Cards 1, 3, 5 show "Gesponsert" — Cards 2, 4 do not. Users cannot distinguish paid placements from organic. "Gesponsert" sits at the same visual weight as regulatory labels like "apothekenpflichtig."

**3b. Dosage Disambiguation Is Buried**  
ACC akut appears twice (600mg Card 1, 200mg Card 4) — both look nearly identical. The dosage only appears in the product title in small text. A user could add both to cart without realizing they bought two variants of the same product.

**3c. "Weitere Packungsgrößen" Link Is Visually Misleading**  
Appears on some cards but not others. Rendered in small red text below pricing, it looks like an error or footnote rather than a meaningful navigation action.

**3d. PZN/EAN Data Shown to All Users by Default**  
Pharmacy article numbers (e.g., "PZN/EAN: 06197481/...") are pharmacist-facing metadata irrelevant to 95%+ of consumers. No progressive disclosure applied. Adds cognitive load to every card.

**3e. Manufacturer Shown Inconsistently**  
Some cards show manufacturer (Hexal AG, ratiopharm GmbH, WICK Pharma) occupying a full line — meaningful only to a small subset of users.

---

## 4. Quick Wins
*(Ranked by highest impact ÷ lowest effort)*

| # | Win | Effort | Impact |
|---|---|---|---|
| QW1 | Visually distinguish "Gesponsert" from classification tags (yellow bg + Ad icon) | Low | High |
| QW2 | Expand top 3–4 filter values by default (Darreichungsform: Sirup, Tabletten, Kapseln) | Low | High |
| QW3 | Add symptom chips below search bar: "Reizhusten · Schleimhusten · Für Kinder · Pflanzlich" | Low–Med | High |
| QW4 | Standardize discount badge + add "Sie sparen €X" line (math is available, just not shown) | Low | Med–High |
| QW5 | Move PZN/EAN behind a "Details" toggle to reduce card density | Low | Med |
| QW6 | Replace "Verfügbar" with "In den Warenkorb" CTA + separate green status indicator | Low–Med | High |
| QW7 | Add "Auch erhältlich als: ACC 600mg →" cross-link on duplicate-brand cards | Low | Med |

---

## 5. Bigger Bets

**BB1 — Symptom-First Search Triage Layer**  
Before showing 1668 results, present a guided triage step: *"Welche Art von Husten haben Sie?"* with selectable symptom cards. Competitors (DocMorris, Amazon OTC) are moving toward this model. Dramatically reduces cognitive overload; increases conversion from ambiguous health queries.

**BB2 — Product Card Redesign: Scannable 3-Column Layout**  
The current card has a de facto 3-zone layout (image | details | price) but it's inconsistently applied. Formalize into a proper 3-column structure with image (left, larger), core info + claim (center), pricing + Add-to-Cart (right, always visible). Enables faster scanning without increasing card height.

**BB3 — Variant Grouping**  
Products differing only by strength, pack size, or dosage form (ACC 600mg vs 200mg; 10-count vs 50-count) are listed as separate cards, inflating result count and forcing manual comparison. Group variants under an expandable swatch/dropdown — as done on Amazon and Zalando — to surface the most relevant SKU first.

**BB4 — Contextual Filtering by Symptom or Use Case**  
The current filter panel exposes pharmaceutical categories (Darreichungsform, Wirkstoff) that presuppose clinical knowledge most OTC shoppers don't have. Add a symptom/intent-driven filter layer ("dry cough," "chesty cough," "for children," "night-time relief") that maps to users' mental model at the point of search. Reference: Boots.com.

**BB5 — Sponsored & Organic Result Disambiguation**  
Sponsored listings are marked with a small, low-contrast label visually indistinguishable from organic results. Under HWG (Heilmittelwerbegesetz) context, German users have heightened expectations of transparency around health product promotion. Add increased label contrast, subtle background tint to sponsored cards, and bounded grouping — both a trust and compliance improvement.

---

*Pipeline cost: ~$0.10 | Haiku (perception): 1,737 in / 874 out | Sonnet (analysis): ~7k in / ~5.3k out*
