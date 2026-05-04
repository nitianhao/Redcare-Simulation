import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'

// ── Nav ───────────────────────────────────────────────────────────────────────


// ── Data ──────────────────────────────────────────────────────────────────────

type Satisfiable = 'no' | 'keyword-only' | 'partial' | 'yes'

const QUERY_INTENTS: Array<{
  id: string
  label: string
  german_label: string
  description: string
  example_queries: string[]
  required_field: string
  required_form: string
  coverage_cosmetics: string
  coverage_mother_child: string
  satisfiable: Satisfiable
  gap_insight: string
  search_consequence: string
}> = [
  {
    id: 'ingredient_avoidance',
    label: 'Ingredient Avoidance',
    german_label: '"ohne X"',
    description: 'User wants to exclude a specific ingredient or substance class — paraben-free, alcohol-free, fragrance-free.',
    example_queries: ['ohne Parabene', 'alkoholfrei', 'ohne Duftstoffe', 'ohne Mineralöl', 'parabenfrei'],
    required_field: 'Structured INCI ingredient array with ingredient function tags (e.g. preservative, UV filter, paraben)',
    required_form: 'Structured array — each ingredient as a distinct indexed object, not prose text',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '0 / 18',
    satisfiable: 'no',
    gap_insight: '14 of 17 cosmetics PDPs have ingredient text — but as a prose block inside a div, not a machine-readable INCI array. The search engine cannot drive facet exclusion from unstructured text.',
    search_consequence: 'Any "ohne X" filter returns either zero results or falls back to the full catalog with no filtering applied.',
  },
  {
    id: 'active_ingredient',
    label: 'Active Ingredient Search',
    german_label: '"mit X"',
    description: 'User is seeking a specific active ingredient as the primary reason to buy — Hyaluronsäure, Zink, Panthenol.',
    example_queries: ['mit Hyaluronsäure', 'Vitamin C Serum', 'mit Zink', 'AHA Säure Peeling', 'mit Panthenol'],
    required_field: 'Active ingredient as a tagged, searchable attribute — distinct from full INCI list',
    required_form: 'Structured attribute: active_ingredients: ["Hyaluronsäure", "Niacinamid"] — not buried in description prose',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '0 / 18',
    satisfiable: 'keyword-only',
    gap_insight: 'Active ingredients appear in titles and descriptions for some products, but are not indexed as distinct facetable attributes. Keyword search catches exact-match queries; synonym variants ("Hyaluron" vs "Hyaluronsäure") miss relevant products entirely.',
    search_consequence: 'No facet filtering by active ingredient. Synonym queries fail. Products with active ingredients only in description text are invisible to structured queries.',
  },
  {
    id: 'certification_claim',
    label: 'Certification & Claim Filter',
    german_label: '"vegan", "dermatologisch getestet"',
    description: 'User filters by a quality signal or ethical certification — vegan, cruelty-free, dermatologically tested.',
    example_queries: ['vegan zertifiziert', 'dermatologisch getestet', 'ohne Tierversuche', 'NATRUE zertifiziert', 'für sensible Haut getestet'],
    required_field: 'Structured claim taxonomy: array of normalized claim objects with certification source',
    required_form: 'Structured array: claims: [{ "value": "vegan", "source": "Vegan Society" }, ...] — not freeform badge text in HTML',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '0 / 18',
    satisfiable: 'keyword-only',
    gap_insight: 'Claims like "dermatologisch getestet" appear as image badges or marketing copy on PDPs, but none are indexed as normalized claim objects. Keyword search matches the string but cannot power a facet filter.',
    search_consequence: 'A "vegan" filter returns products that happen to have the word "vegan" in their description — including products that mention vegan alternatives but are not certified vegan themselves.',
  },
  {
    id: 'skin_type_condition',
    label: 'Skin Type & Target Condition',
    german_label: '"für empfindliche Haut"',
    description: 'User describes their skin type or condition and expects matching products to surface.',
    example_queries: ['für empfindliche Haut', 'bei Neurodermitis', 'für trockene Haut', 'für fettige Haut Akne', 'bei Rötungen'],
    required_field: 'Skin type / indication taxonomy as a structured facet: skin_type: ["sensitive", "dry", "acne-prone"]',
    required_form: 'Controlled vocabulary taxonomy — not freeform description keywords',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '0 / 18',
    satisfiable: 'no',
    gap_insight: 'This field does not exist on any of the 35 audited PDPs. Skin type is sometimes mentioned in long_description prose but is never indexed as a structured, filterable attribute.',
    search_consequence: 'Skin-type queries are answered entirely by keyword coincidence. A product for "empfindliche Haut" ranks by text match quality, not because it is tagged to the condition.',
  },
  {
    id: 'age_target_group',
    label: 'Age / Target Group',
    german_label: '"für Kinder ab 2 Jahren"',
    description: 'User specifies an age group or life stage — baby, toddler, pregnant, for children 6+.',
    example_queries: ['Hustensaft Kinder ab 1 Jahr', 'Sonnencreme Baby', 'für Schwangere geeignet', 'Nasenspray ab 6 Jahren', 'für Neugeborene'],
    required_field: 'Age restriction / target group as structured attribute: target_age: { min: 1, max: 6, unit: "years" }',
    required_form: 'Structured numeric range or controlled vocabulary — not embedded in dosage instruction text',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '2 / 18',
    satisfiable: 'keyword-only',
    gap_insight: 'Age restrictions appear in dosage instruction text for OTC products ("für Kinder von 2-12 Jahren: 2 x täglich 5 ml") but are never extracted as a structured, range-queryable field. 2 of 18 M&C PDPs have any age-related structured attribute.',
    search_consequence: 'Age-specific queries match on text fragments. A search for "ab 1 Jahr" can surface products restricted to children 6+ if the text contains similar phrasing.',
  },
  {
    id: 'symptom_indication',
    label: 'Symptom / Indication',
    german_label: '"gegen Schnupfen"',
    description: 'User describes a symptom or medical indication and expects the right product category to surface.',
    example_queries: ['gegen Schnupfen', 'bei Husten mit Auswurf', 'Fiebersaft Kind', 'gegen Heuschnupfen', 'Erkältungsmittel Kleinkind'],
    required_field: 'Indication taxonomy: structured ICD-10 or proprietary indication codes mapped to product',
    required_form: 'Controlled vocabulary — not category hierarchy or product title keywords',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '0 / 18',
    satisfiable: 'keyword-only',
    gap_insight: 'Indications are derivable from product names and descriptions for OTC products (e.g. "Hustensaft" implies cough indication) but are never stored as structured indication taxonomy. The search engine treats "Husten" as a keyword, not as a medical indication that maps to a product class.',
    search_consequence: 'Symptom queries work only when the symptom word appears literally in the product title. Products whose indications differ from common symptom vocabulary (e.g. "Bronchitis" vs "Husten mit Schleim") are invisible.',
  },
  {
    id: 'layperson_synonyms',
    label: 'Layperson Synonyms',
    german_label: '"Hustenmittel" ≠ "Expectorans"',
    description: 'User uses everyday vocabulary; the catalog uses clinical or brand terminology. No bridge exists.',
    example_queries: ['Schnupfenmittel Baby', 'Sonnencreme ohne Weißeln', 'Hustenbonbon rezeptfrei', 'Schlaftropfen Kind', 'Erkältungsbad'],
    required_field: 'Synonym array: customer-vocabulary terms mapped to each product, generated from search logs + LLM enrichment',
    required_form: 'Indexed tag array: synonyms: ["Schnupfenmittel", "Nasentropfen", "Abschwellend"] — searchable alongside title',
    coverage_cosmetics: '0 / 17',
    coverage_mother_child: '0 / 18',
    satisfiable: 'no',
    gap_insight: '0 of 35 audited PDPs have any synonym array. This is the highest-volume gap: every single customer using a layperson term that does not appear verbatim in the product title or description gets a degraded result set.',
    search_consequence: 'The platform surfaces products based on manufacturer vocabulary. Any divergence between catalog language and customer language — which is systematic and predictable from search logs — produces zero-result or low-relevance results.',
  },
]

const GAP_REPORT = [
  {
    field: 'synonyms_related_terms',
    segment: 'both',
    prevalence_count: 35,
    prevalence_total: 35,
    search_impact: 'high',
    impact_rationale: 'Synonyms and related terms enable query expansion and variant matching, ensuring users find products regardless of terminology used (e.g., \'sunscreen\' vs \'sun cream\' vs \'SPF\').',
    data_source: 'Manual entry or NLP-based synonym generation from product titles/descriptions',
    automation_potential: 'semi-automated',
    automation_note: 'NLP models can extract and suggest synonyms from product text and search logs, requiring editorial review for domain-specific pharmacy terms.',
    affects_intents: ['layperson_synonyms', 'active_ingredient'],
  },
  {
    field: 'qa_section',
    segment: 'both',
    prevalence_count: 31,
    prevalence_total: 35,
    search_impact: 'high',
    impact_rationale: 'Q&A content surfaces long-tail queries and natural language questions, improving ranking for informational searches and voice queries.',
    data_source: 'User-generated content, customer service tickets, or manual entry',
    automation_potential: 'semi-automated',
    automation_note: 'Generate FAQ suggestions from customer service data and product reviews using NLP, with manual curation for accuracy and compliance.',
    affects_intents: ['symptom_indication', 'age_target_group'],
  },
  {
    field: 'ingredient_list',
    segment: 'cosmetics',
    prevalence_count: 1,
    prevalence_total: 16,
    search_impact: 'high',
    impact_rationale: 'Complete INCI lists enable ingredient-based search and filtering, critical for allergy avoidance, vegan/natural filters, and regulatory compliance displays.',
    data_source: 'INCI/CosIng EU database, Brand product feed, OCR from packaging',
    automation_potential: 'automated',
    automation_note: 'Match EAN to CosIng API or brand databases to pull complete INCI ingredient lists; fallback to OCR for packaging images.',
    affects_intents: ['ingredient_avoidance', 'active_ingredient'],
  },
  {
    field: 'ingredient_list',
    segment: 'mother_child',
    prevalence_count: 3,
    prevalence_total: 19,
    search_impact: 'high',
    impact_rationale: 'Ingredient lists support allergen filtering, dietary restriction searches (lactose-free, gluten-free), and active ingredient queries for supplements and medications.',
    data_source: 'Manufacturer datasheet, Brand product feed, Product packaging OCR',
    automation_potential: 'automated',
    automation_note: 'Extract from structured manufacturer data feeds or apply OCR to product packaging images with validation against pharmaceutical databases.',
    affects_intents: ['ingredient_avoidance', 'active_ingredient'],
  },
  {
    field: 'claims_certifications',
    segment: 'cosmetics',
    prevalence_count: 3,
    prevalence_total: 16,
    search_impact: 'high',
    impact_rationale: 'Certifications and claims enable high-value faceted navigation (vegan, organic, dermatologically tested) and support trust signals in search results.',
    data_source: 'Brand product feed, Certification body databases, Manual entry',
    automation_potential: 'semi-automated',
    automation_note: 'Parse structured brand data and cross-reference certification logos with databases (e.g., NATRUE, COSMOS); manual verification for compliance.',
    affects_intents: ['certification_claim', 'skin_type_condition'],
  },
  {
    field: 'dosage_usage',
    segment: 'mother_child',
    prevalence_count: 2,
    prevalence_total: 19,
    search_impact: 'medium',
    impact_rationale: 'Dosage instructions support query matching for age-specific searches (e.g., \'for children 2-6 years\') and use-case filtering.',
    data_source: 'Manufacturer datasheet, Product packaging, Regulatory submission documents',
    automation_potential: 'semi-automated',
    automation_note: 'Extract from manufacturer PDFs using NLP with pharmaceutical entity recognition; manual review required for medical accuracy and liability.',
    affects_intents: ['age_target_group', 'symptom_indication'],
  },
  {
    field: 'claims_certifications',
    segment: 'mother_child',
    prevalence_count: 2,
    prevalence_total: 19,
    search_impact: 'medium',
    impact_rationale: 'Claims like \'lactose-free\', \'for diabetics\', or \'clinically tested\' enable filtering and match queries for dietary/medical requirements.',
    data_source: 'Brand product feed, Clinical study databases, Manual entry',
    automation_potential: 'semi-automated',
    automation_note: 'Extract claims from structured product descriptions and validate against regulatory databases; requires medical compliance review.',
    affects_intents: ['certification_claim', 'skin_type_condition'],
  },
]

const DATA_SOURCES: Array<{
  name: string
  type: 'automated' | 'semi-automated'
  segments: string
  fields: string[]
  description: string
  how: string
  url?: string
}> = [
  {
    name: 'GS1 / GTIN Registry',
    type: 'automated',
    segments: 'Both',
    fields: ['brand', 'product_attributes', 'ean_sku', 'short_description'],
    description: 'Global product registry keyed by EAN barcode. Returns standardized brand name, product dimensions, weight, volume, and category classification. Coverage is near-universal for mass-market consumer goods.',
    how: 'Match existing EAN/PZN to GS1 Verified by GS1 API or Synccentric feed. Batch-process nightly. No editorial review needed for factual attributes.',
    url: 'https://www.gs1.org/services/verified-by-gs1',
  },
  {
    name: 'ABDA / Pharmnet (PZN database)',
    type: 'automated',
    segments: 'Mother & Child (OTC/Rx)',
    fields: ['ingredient_list', 'dosage_usage', 'claims_certifications', 'ean_sku'],
    description: 'German pharmacy master database. Every PZN maps to active ingredients, dosage form, contraindications, age restrictions, and regulatory category (OTC/Rx/Supplement). Authoritative source for pharmacy-grade structured data.',
    how: 'Pull from ABDA Datenbank via licensed feed (standard for German pharmacy platforms). PZN is already present on most PDPs — use it as the join key.',
    url: 'https://www.abda.de/themen/pharmazie/arzneimittel/datenbank/',
  },
  {
    name: 'CosIng EU Cosmetics Database',
    type: 'automated',
    segments: 'Cosmetics',
    fields: ['ingredient_list', 'claims_certifications'],
    description: 'Official EU Commission database of cosmetic ingredients. Provides standardized INCI names, ingredient functions (emollient, preservative, UV filter, etc.), and regulatory restrictions. Free public API.',
    how: 'For each cosmetics PDP: extract ingredient names from existing text → normalize to INCI via CosIng API → store structured ingredient array with function tags. EAN-to-INCI mapping also possible via OpenBeautyFacts.',
    url: 'https://cosing.ec.europa.eu/',
  },
  {
    name: 'OpenBeautyFacts',
    type: 'automated',
    segments: 'Cosmetics',
    fields: ['ingredient_list', 'claims_certifications', 'product_attributes'],
    description: 'Open crowd-sourced database of beauty and personal care products. Keyed by EAN barcode. Provides INCI ingredients, certifications (vegan, cruelty-free, natural), and product form (cream, gel, serum, etc.). Actively maintained, German products well-covered.',
    how: 'GET https://world.openbeautyifacts.org/api/v0/product/{EAN}.json. Free, no auth required. Run nightly batch against full product catalog.',
    url: 'https://world.openbeautyifacts.org/',
  },
  {
    name: 'OpenFoodFacts (Baby nutrition)',
    type: 'automated',
    segments: 'Mother & Child (nutrition)',
    fields: ['ingredient_list', 'claims_certifications', 'product_attributes'],
    description: 'Open database for food and nutrition products. Covers baby food, formula, and child nutrition products by EAN. Returns nutrient tables, allergen flags, labels (organic, BIO, halal), and ingredient lists.',
    how: 'GET https://world.openfoodfacts.org/api/v0/product/{EAN}.json. Free. Useful for baby food and nutritional supplement sub-categories.',
    url: 'https://world.openfoodfacts.org/',
  },
  {
    name: 'Manufacturer Brand Feeds (BMEcat / ETIM)',
    type: 'semi-automated',
    segments: 'Both',
    fields: ['long_description', 'product_attributes', 'claims_certifications', 'synonyms_related_terms'],
    description: 'Structured product catalogs supplied directly by manufacturers in standardized formats (BMEcat XML, ETIM classification, or custom CSV). Rich marketing copy, feature bullet points, and usage claims not available in public databases. Already negotiated for most top-100 brands.',
    how: 'Onboard suppliers to a standard feed spec (BMEcat 2005 or custom template). Ingest via automated ETL pipeline. Requires supplier outreach for smaller brands — prioritize top 50 by GMV.',
  },
  {
    name: 'LLM Synonym & Attribute Enrichment',
    type: 'semi-automated',
    segments: 'Both',
    fields: ['synonyms_related_terms', 'short_description', 'claims_certifications'],
    description: 'Use an LLM to generate search synonyms, regional variant terms, and layperson equivalents from existing product text. Example: "Xylometazolin" → ["Nasenspray", "Schnupfenmittel", "Abschwellend", "decongestant"]. Also extracts implicit claims ("alcohol-free", "for sensitive skin") from prose descriptions.',
    how: 'Batch-process all PDPs nightly. Prompt: "Given this product title and description, list 10 search terms a German customer might use to find it." Output stored as searchable tag array. Editorial spot-check on 5% sample — human review not required for each record.',
  },
  {
    name: 'Schema.org Product Markup (auto-generated)',
    type: 'automated',
    segments: 'Both',
    fields: ['schema_org_types'],
    description: 'Structured data for Google Rich Results, Google Merchant Center, and Bing Shopping. Currently inconsistent across PDPs. Full Product schema should include: name, brand, offers, aggregateRating, description, gtin, image, and category. Missing schema means lost SEO visibility in product carousels.',
    how: 'Auto-generate JSON-LD from existing PIM fields at render time — no new data required, just mapping. Add to page <head> server-side. Implement once as a template; all PDPs benefit automatically.',
  },
  {
    name: 'Search Log Query Mining',
    type: 'semi-automated',
    segments: 'Both',
    fields: ['synonyms_related_terms', 'qa_section'],
    description: 'Internal Algolia/site search logs contain real customer vocabulary: what terms people use to find (or fail to find) each product. These logs are the highest-signal source of missing synonyms and Q&A topics — they reflect actual user intent, not editorial assumptions.',
    how: 'Weekly ETL: pull top 50 zero-result and low-click queries per product → cluster by product association → surface as synonym candidates and FAQ seed questions. Requires analyst or automated pipeline. Data already exists in Algolia dashboard.',
  },
]

const PDP_EXTRACTIONS = [
  { url: 'https://www.shop-apotheke.com/baby/9927371/omni-biotic-panda.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/19105724/dr-till-kinder-notfallbox.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'missing', dosage_usage: 'missing', claims_certifications: 'partial', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/17592097/arnidol-gel-stick.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'partial', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/upmTDYZ73/das-boep-sonnencreme-sensitiv-lsf-50-maxi.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/arzneimittel/upmXG2ACC/eisen-gummibaerchen-fuer-kinder-gumtamin.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/8111829/paediprotect-lippenpflege.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/8111239/paediprotect-after-sun-lotion.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/BE03300654/mustela-pflegende-creme-mit-cold-cream.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'missing', dosage_usage: 'partial', claims_certifications: 'partial', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/upmLCH2R9/garnier-festes-aprikosen-und-baumwollblumen-shampoo-fuer-kinder.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/upmW4W27E/popolini-uv-schutzkleidung-swimwear-zweiteiler-ringel-marine-98-104.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'missing', dosage_usage: 'partial', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/10013239/orthomol-junior-c-plus-mit-vitamin-c-als-beitrag-zu-einer-normalen-funktion-des-immunsystems-waldfrucht-geschmack-kautabletten.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/8108671/nasenspray-ratiopharm-kinder.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'partial', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/8109601/nasenspray-al-0-05.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'present', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/8108695/olynth-k-0-05-schnupfen-dosierspray-fuer-kinder.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'partial', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'present', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/12521566/nasenduo-nasenspray-kinder.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/5566232/bronchipret-saft-te.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'present', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/8586005/prospan-hustensaft-fuer-kinder.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'present', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/baby/16538233/nurofen-junior-fieber-und-schmerzsaft-erdbeer-40-mg.htm', segment: 'mother_child', segment_label: 'Mother & Child', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/A8000532/ducray-kelual-ds-shampoo.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/10057900/avene-cleanance-hydra-beruhigende-feuchtigkeitspflege.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'present', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/16015570/eucerin-oil-control-body-sun-dry-touch-gel-creme-lsf-50-sehr-hoher-sonnenschutz-mit-ultra-leichter-textur-anti-sand-effekt-und-anti-glanz-effekt.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'partial', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/15308838/la-roche-posay-lipikar-dusch-und-badeoel-ap.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/6712983/vichy-deodorant-roll-on.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/19720613/cetaphil-feuchtigkeitslotion-fuer-empfindliche-und-trockene-haut.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'present', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20103759/la-roche-posay-anthelios-uv-air-serum-lsf-50.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20318135/eucerin-hyaluron-filler-elasticity-ultraleicht-tag-lsf-50-tagescreme-mildert-falten-und-altersflecken.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/14237272/cetaphil-sun-sensitive-gel-fluid-spf-50-extra-leichter-sonnenschutz-gesicht.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20115745/cerave-sonnenschutz-stick-spf-50.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/8115962/erborian-cc-creme-clair.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'missing', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20228952/weleda-fragrance-body-hair-mist-vanilla-cloud.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/upmFDHP2Z/skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum-spf-50-pa.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'partial', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20022713/vichy-kollagen-nahrungsergaenzungsmittel.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'partial', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20126631/weleda-pink-peach-duschgel-erfrischende-sommerpflege-mit-pfirsich-orange-jasmin.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/BE04994943/clinique-uv-solutions-hydrating-sunscreen-spf-50.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'present', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
  { url: 'https://www.shop-apotheke.com/beauty/20344204/heliocare-360-advanced-gel-spf-50.htm', segment: 'cosmetics', segment_label: 'Cosmetics', fields: { title: 'present', brand: 'present', ean_sku: 'present', short_description: 'present', long_description: 'present', ingredient_list: 'present', dosage_usage: 'present', claims_certifications: 'partial', product_attributes: 'present', schema_org_types: 'present', qa_section: 'missing', review_count: 'present', synonyms_related_terms: 'missing' } },
]

// ── Derived stats ─────────────────────────────────────────────────────────────

const FIELD_LABELS: Record<string, string> = {
  title: 'Title',
  brand: 'Brand',
  ean_sku: 'EAN / SKU',
  short_description: 'Short Description',
  long_description: 'Long Description',
  ingredient_list: 'Ingredient List',
  dosage_usage: 'Dosage / Usage',
  claims_certifications: 'Claims & Certifications',
  product_attributes: 'Product Attributes',
  schema_org_types: 'Schema.org Types',
  qa_section: 'Q&A Section',
  review_count: 'Review Count',
  synonyms_related_terms: 'Synonyms / Related Terms',
}

const INTENT_LABELS: Record<string, string> = {
  ingredient_avoidance: 'Ingredient Avoidance',
  active_ingredient: 'Active Ingredient',
  certification_claim: 'Certification / Claim',
  skin_type_condition: 'Skin Type / Condition',
  age_target_group: 'Age / Target Group',
  symptom_indication: 'Symptom / Indication',
  layperson_synonyms: 'Layperson Synonyms',
}

const SEGMENT_LABELS: Record<string, string> = {
  both: 'Both',
  mother_child: 'Mother & Child',
  cosmetics: 'Cosmetics',
}

const mcPdps = PDP_EXTRACTIONS.filter(p => p.segment === 'mother_child')
const cosPdps = PDP_EXTRACTIONS.filter(p => p.segment === 'cosmetics')

// ── Components ────────────────────────────────────────────────────────────────

function ImpactBadge({ impact }: { impact: string }) {
  const color = impact === 'high' ? '#E2001A' : impact === 'medium' ? '#d97706' : '#16a34a'
  const bg = impact === 'high' ? '#fff5f5' : impact === 'medium' ? '#fffbeb' : '#f0fdf4'
  return (
    <span style={{ display: 'inline-block', background: bg, border: `1px solid ${color}`, color, fontWeight: 700, fontSize: '10px', letterSpacing: '1px', padding: '3px 8px', textTransform: 'uppercase' }}>
      {impact}
    </span>
  )
}

function AutomationBadge({ potential }: { potential: string }) {
  const color = potential === 'automated' ? '#2563eb' : '#6b21a8'
  const bg = potential === 'automated' ? '#eff6ff' : '#faf5ff'
  return (
    <span style={{ display: 'inline-block', background: bg, border: `1px solid ${color}22`, color, fontWeight: 600, fontSize: '10px', letterSpacing: '0.5px', padding: '2px 7px' }}>
      {potential === 'automated' ? 'Automated' : 'Semi-auto'}
    </span>
  )
}

function SatisfiabilityBadge({ value }: { value: Satisfiable }) {
  const config: Record<Satisfiable, { label: string; color: string; bg: string }> = {
    'no':           { label: 'NOT SATISFIABLE',  color: '#E2001A', bg: '#fff5f5' },
    'keyword-only': { label: 'KEYWORD ONLY',      color: '#d97706', bg: '#fffbeb' },
    'partial':      { label: 'PARTIAL',           color: '#eab308', bg: '#fefce8' },
    'yes':          { label: 'SATISFIABLE',       color: '#16a34a', bg: '#f0fdf4' },
  }
  const c = config[value]
  return (
    <span style={{ display: 'inline-block', background: c.bg, border: `1px solid ${c.color}`, color: c.color, fontWeight: 700, fontSize: '9px', letterSpacing: '1px', padding: '3px 8px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {c.label}
    </span>
  )
}

function FieldTile({ field, status }: { field: string; status: string }) {
  const bg = status === 'present' ? '#f0fdf4' : status === 'partial' ? '#fffbeb' : '#fff5f5'
  const border = status === 'present' ? '#bbf7d0' : status === 'partial' ? '#fde68a' : '#fecaca'
  const color = status === 'present' ? '#166534' : status === 'partial' ? '#92400e' : '#991b1b'
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, padding: '8px 10px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, color, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '2px' }}>
        {status}
      </div>
      <div style={{ fontSize: '11px', color: '#374151', lineHeight: 1.3 }}>{FIELD_LABELS[field] || field}</div>
    </div>
  )
}

function ReframeStrip() {
  return (
    <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '40px 80px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '20px' }}>
        The Question This Audit Asks
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '900px' }}>
        <div style={{ border: '1px solid #e5e5e5', padding: '24px 28px', background: '#fafafa', position: 'relative' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '14px' }}>
            Catalog audit asks
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.4, margin: '0 0 16px' }}>
            Is the ingredient list present on the PDP?
          </p>
          <p style={{ fontSize: '13px', color: '#525252', margin: '0 0 12px', lineHeight: 1.6 }}>
            Answer: yes, for 14 of 17 cosmetics PDPs.
          </p>
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', padding: '10px 14px' }}>
            <p style={{ fontSize: '12px', color: '#991b1b', margin: 0, lineHeight: 1.6 }}>
              This answer is misleading. A prose ingredient paragraph is not the same as a machine-readable INCI array.
            </p>
          </div>
        </div>
        <div style={{ border: '2px solid #0a0a0a', padding: '24px 28px', background: '#ffffff', position: 'relative' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '14px' }}>
            Intent audit asks
          </div>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#0a0a0a', lineHeight: 1.4, margin: '0 0 16px' }}>
            Can a user searching <em style={{ fontStyle: 'italic' }}>"ohne Parabene"</em> find the right products via a facet filter?
          </p>
          <p style={{ fontSize: '13px', color: '#525252', margin: '0 0 12px', lineHeight: 1.6 }}>
            Answer: no — for any of the 35 PDPs audited.
          </p>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px' }}>
            <p style={{ fontSize: '12px', color: '#166534', margin: 0, lineHeight: 1.6 }}>
              This is the right question. It connects the catalog to actual customer behavior.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function QueryIntentCard({ intent }: { intent: typeof QUERY_INTENTS[0] }) {
  return (
    <div style={{ background: '#ffffff', border: '1px solid #e5e5e5', padding: '24px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0a', marginBottom: '4px' }}>{intent.label}</div>
          <div style={{ fontSize: '11px', fontWeight: 600, color: '#E2001A', fontStyle: 'italic', letterSpacing: '0.3px' }}>{intent.german_label}</div>
        </div>
        <SatisfiabilityBadge value={intent.satisfiable} />
      </div>

      <p style={{ fontSize: '12px', color: '#525252', lineHeight: 1.6, margin: '0 0 14px' }}>{intent.description}</p>

      {/* Example queries */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
        {intent.example_queries.map(q => (
          <span key={q} style={{ fontSize: '11px', fontWeight: 600, padding: '3px 10px', background: '#f5f5f5', border: '1px solid #e5e5e5', color: '#0a0a0a', fontFamily: 'monospace' }}>
            {q}
          </span>
        ))}
      </div>

      {/* Required field */}
      <div style={{ background: '#f9f9f9', borderLeft: '3px solid #0a0a0a', padding: '10px 14px', marginBottom: '14px' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>Search engine needs</div>
        <p style={{ fontSize: '12px', color: '#0a0a0a', margin: 0, lineHeight: 1.5 }}>{intent.required_field}</p>
      </div>

      {/* Gap insight */}
      <p style={{ fontSize: '12px', color: '#737373', lineHeight: 1.6, margin: '0 0 14px', borderLeft: '2px solid #E2001A', paddingLeft: '10px' }}>
        {intent.gap_insight}
      </p>

      {/* Coverage */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div style={{ background: '#fafafa', border: '1px solid #f0f0f0', padding: '8px 12px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: '#737373', textTransform: 'uppercase', marginBottom: '2px' }}>Cosmetics</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: intent.coverage_cosmetics === '0 / 17' ? '#E2001A' : '#d97706', letterSpacing: '-0.5px' }}>{intent.coverage_cosmetics}</div>
          <div style={{ fontSize: '10px', color: '#a3a3a3' }}>structured coverage</div>
        </div>
        <div style={{ background: '#fafafa', border: '1px solid #f0f0f0', padding: '8px 12px' }}>
          <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: '#737373', textTransform: 'uppercase', marginBottom: '2px' }}>Mother &amp; Child</div>
          <div style={{ fontSize: '16px', fontWeight: 900, color: intent.coverage_mother_child === '0 / 18' ? '#E2001A' : '#d97706', letterSpacing: '-0.5px' }}>{intent.coverage_mother_child}</div>
          <div style={{ fontSize: '10px', color: '#a3a3a3' }}>structured coverage</div>
        </div>
      </div>
    </div>
  )
}

function GapMatrix() {
  return (
    <section style={{ background: '#0a0a0a', padding: '36px 48px', marginBottom: '0' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '6px' }}>Intent × Coverage Matrix</div>
      <p style={{ fontSize: '13px', color: '#737373', margin: '0 0 24px' }}>Can a user searching by this intent type find the right product? — structured coverage across 35 PDPs</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
            <tr>
              {['Query intent', 'Cosmetics (17 PDPs)', 'Mother & Child (18 PDPs)', 'Satisfiable?', 'Search consequence'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid #262626', fontWeight: 700, fontSize: '10px', letterSpacing: '0.5px', color: '#737373', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {QUERY_INTENTS.map((intent, i) => (
              <tr key={intent.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '12px', marginBottom: '2px' }}>{intent.label}</div>
                  <div style={{ color: '#E2001A', fontSize: '11px', fontStyle: 'italic' }}>{intent.german_label}</div>
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: intent.coverage_cosmetics === '0 / 17' ? '#E2001A' : '#d97706', fontSize: '14px', letterSpacing: '-0.5px' }}>
                  {intent.coverage_cosmetics}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: intent.coverage_mother_child === '0 / 18' ? '#E2001A' : '#d97706', fontSize: '14px', letterSpacing: '-0.5px' }}>
                  {intent.coverage_mother_child}
                </td>
                <td style={{ padding: '12px 14px' }}><SatisfiabilityBadge value={intent.satisfiable} /></td>
                <td style={{ padding: '12px 14px', color: '#a3a3a3', fontSize: '12px', lineHeight: 1.5, maxWidth: '280px' }}>{intent.search_consequence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ProseVsStructured() {
  return (
    <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '48px' }}>
      <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>
          Why "Present" Does Not Mean "Searchable"
        </div>
        <p style={{ fontSize: '13px', color: '#525252', margin: 0 }}>
          The raw field audit marks ingredient_list as "present" for 14 of 17 cosmetics PDPs. Zero of those enable ingredient-based facet filtering.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
        {/* LEFT: Prose */}
        <div style={{ padding: '28px 32px', borderRight: '1px solid #e5e5e5' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#d97706', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />
            What the PDP has — ingredient_list: "present"
          </div>
          <div style={{ background: '#f9f9f9', border: '1px solid #e5e5e5', padding: '16px', marginBottom: '16px', fontFamily: 'monospace', fontSize: '12px', color: '#374151', lineHeight: 1.8 }}>
            <div style={{ color: '#737373', fontSize: '10px', marginBottom: '8px' }}>{'<div class="product-ingredients">'}</div>
            <div style={{ paddingLeft: '16px' }}>
              Zutaten: Aqua, Glycerin, Dimethicone,<br />
              Butylene Glycol, Niacinamide,<br />
              Methylpropanediol, Propylparaben,<br />
              Carbomer, Sodium Hydroxide,<br />
              Panthenol, Tocopheryl Acetate...
            </div>
            <div style={{ color: '#737373', fontSize: '10px', marginTop: '8px' }}>{'</div>'}</div>
          </div>
          <div style={{ background: '#fff5f5', border: '1px solid #fecaca', padding: '10px 14px' }}>
            <p style={{ fontSize: '12px', color: '#991b1b', margin: 0, lineHeight: 1.6 }}>
              A text string in an HTML div. The search engine indexes it as keywords. An "ohne Parabene" facet filter cannot evaluate whether Propylparaben appears.
            </p>
          </div>
        </div>

        {/* RIGHT: Structured */}
        <div style={{ padding: '28px 32px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#16a34a', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
            What search needs — structured INCI array
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '16px', marginBottom: '16px', fontFamily: 'monospace', fontSize: '12px', color: '#374151', lineHeight: 1.8 }}>
            <div style={{ color: '#16a34a', fontSize: '10px', marginBottom: '8px' }}>ingredients: [</div>
            <div style={{ paddingLeft: '16px', color: '#374151' }}>
              {'{ inci: "Propylparaben",'}<br />
              <span style={{ paddingLeft: '16px' }}>{'function: "preservative",'}</span><br />
              <span style={{ paddingLeft: '16px' }}>{'flag: ["paraben"] },'}</span><br />
              {'{ inci: "Niacinamide",'}<br />
              <span style={{ paddingLeft: '16px' }}>{'function: "active",'}</span><br />
              <span style={{ paddingLeft: '16px' }}>{'alias: ["Vitamin B3","Nicotinamid"] },'}</span>
            </div>
            <div style={{ color: '#16a34a', fontSize: '10px' }}>]</div>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px' }}>
            <p style={{ fontSize: '12px', color: '#166534', margin: 0, lineHeight: 1.6 }}>
              Each ingredient is a distinct indexed object with a function tag and flag. The search engine can now drive "ohne Parabene" as a boolean filter and "mit Niacinamide" as an attribute facet.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UC14Page() {
  return (
    <>
      <SharedNav activePage="uc14" />
      <main style={{ background: '#fafafa', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', padding: '64px 80px 56px', display: 'flex', gap: '80px', alignItems: 'center' }}>
          <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '10px' }}>Data Quality Audit — Search Intent Audit</p>
            <h1 style={{ fontSize: '72px', fontWeight: 900, letterSpacing: '-3px', color: '#0a0a0a', margin: '0 0 24px', lineHeight: 1 }}>
              WHAT USERS<br />SEARCH FOR<br />
              <em style={{ fontStyle: 'italic', color: '#E2001A' }}>vs what matches.</em>
            </h1>
            <div style={{ width: '60px', height: '3px', background: '#E2001A', marginBottom: '24px' }} />
            <p style={{ fontSize: '16px', color: '#525252', maxWidth: '680px', lineHeight: 1.6, margin: '0 0 32px' }}>
              7 query intent patterns. 35 PDPs audited across Mother &amp; Child and Cosmetics. The audit starts from what customers search for — then asks whether the catalog has the right <em>structured</em> data to answer.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '32px', width: 'fit-content' }}>
              {[
                { n: '7',  label: 'Intent types' },
                { n: '35', label: 'PDPs audited' },
                { n: '0',  label: 'Fully satisfiable' },
                { n: '35', label: 'Missing synonym arrays' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '36px', fontWeight: 900, color: '#E2001A', letterSpacing: '-1px', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#525252', textTransform: 'uppercase' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            <img src="/hero-dataquality.webp" alt="Search results for 'ohne parabene feuchtigkeitscreme' showing 21 results" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }} />
          </div>
        </div>

        {/* Reframe strip */}
        <ReframeStrip />

        {/* Query intent cards */}
        <div style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5', padding: '48px 80px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '6px' }}>Query Intent Taxonomy — 7 patterns</div>
          <p style={{ fontSize: '13px', color: '#525252', margin: '0 0 28px' }}>
            Each intent type represents a class of real German pharmacy search queries. Coverage shows what fraction of audited PDPs have the required <em>structured</em> data — not just text that contains related words.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {QUERY_INTENTS.map(intent => (
              <QueryIntentCard key={intent.id} intent={intent} />
            ))}
          </div>
        </div>

        {/* Gap matrix */}
        <GapMatrix />

        {/* Prose vs Structured */}
        <div style={{ padding: '48px 80px 0' }}>
          <ProseVsStructured />

          {/* Ranked gap table */}
          <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '48px' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>Gaps by Field — ranked by query impact</div>
              <p style={{ fontSize: '13px', color: '#525252', margin: 0 }}>{GAP_REPORT.length} field-level gaps — with affected query intent types</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    {['Field', 'Segment', 'Missing / Partial', 'Impact', 'Affects intent types', 'Why it matters', 'Data Source', 'Auto', 'How'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '10px 14px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, fontSize: '10px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GAP_REPORT.map((gap, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0a0a0a', whiteSpace: 'nowrap' }}>{FIELD_LABELS[gap.field] || gap.field}</td>
                      <td style={{ padding: '12px 14px', color: '#525252', whiteSpace: 'nowrap' }}>{SEGMENT_LABELS[gap.segment] || gap.segment}</td>
                      <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                        <span style={{ fontWeight: 700, color: '#E2001A' }}>{gap.prevalence_count}</span>
                        <span style={{ color: '#737373' }}>/{gap.prevalence_total}</span>
                      </td>
                      <td style={{ padding: '12px 14px' }}><ImpactBadge impact={gap.search_impact} /></td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {gap.affects_intents.map(id => (
                            <span key={id} style={{ fontSize: '10px', fontWeight: 600, padding: '2px 6px', background: '#fafafa', border: '1px solid #e5e5e5', color: '#525252', whiteSpace: 'nowrap' }}>
                              {INTENT_LABELS[id] || id}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px', color: '#374151', lineHeight: 1.5, maxWidth: '220px' }}>{gap.impact_rationale}</td>
                      <td style={{ padding: '12px 14px', color: '#525252', fontSize: '12px', maxWidth: '180px', lineHeight: 1.4 }}>{gap.data_source}</td>
                      <td style={{ padding: '12px 14px' }}><AutomationBadge potential={gap.automation_potential} /></td>
                      <td style={{ padding: '12px 14px', color: '#525252', fontSize: '12px', maxWidth: '220px', lineHeight: 1.4 }}>{gap.automation_note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recommended data sources */}
          <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '48px' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>Recommended Data Sources</div>
              <p style={{ fontSize: '13px', color: '#525252', margin: '0 0 4px' }}>
                Automatable external and internal data sources that can close the identified gaps — ranked by implementation effort.
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#16a34a' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
                  Automated — no editorial review per record
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#d97706' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d97706', display: 'inline-block' }} />
                  Semi-automated — spot-check or supplier setup required
                </span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0', borderTop: '1px solid #f0f0f0' }}>
              {DATA_SOURCES.map((src, i) => (
                <div key={i} style={{
                  padding: '24px 28px',
                  borderBottom: '1px solid #f0f0f0',
                  borderRight: i % 2 === 0 ? '1px solid #f0f0f0' : 'none',
                  background: '#ffffff',
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          width: '8px', height: '8px', borderRadius: '50%', flexShrink: 0,
                          background: src.type === 'automated' ? '#16a34a' : '#d97706',
                          display: 'inline-block',
                          marginTop: '2px',
                        }} />
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0a0a0a' }}>
                          {src.url
                            ? <a href={src.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0a0a0a', textDecoration: 'none' }}>{src.name} ↗</a>
                            : src.name}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#737373', marginLeft: '16px' }}>{src.segments}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: '0 0 12px' }}>{src.description}</p>
                  <div style={{ background: '#f9f9f9', borderLeft: '3px solid #e5e5e5', padding: '10px 14px', marginBottom: '12px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>How to integrate</div>
                    <p style={{ fontSize: '12px', color: '#525252', margin: 0, lineHeight: 1.6 }}>{src.how}</p>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {src.fields.map(f => (
                      <span key={f} style={{
                        fontSize: '10px', fontWeight: 600, padding: '2px 8px',
                        background: '#f0f0f0', color: '#525252', borderRadius: '2px',
                        letterSpacing: '0.3px',
                      }}>{f}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Per-PDP accordion */}
          <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '64px' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>Per-PDP Raw Field Audit — {PDP_EXTRACTIONS.length} PDPs</div>
              <p style={{ fontSize: '13px', color: '#525252', margin: '0 0 8px' }}>Field-level status across all 13 fields per PDP. Expand each row to see the breakdown.</p>
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '8px 14px', display: 'inline-block' }}>
                <p style={{ fontSize: '12px', color: '#92400e', margin: 0 }}>
                  Note: &ldquo;present&rdquo; reflects data existence on the PDP — not whether the data is structured for search-readiness. See above for the intent-level assessment.
                </p>
              </div>
            </div>
            <div>
              {PDP_EXTRACTIONS.map((pdp, i) => {
                const slug = pdp.url.split('/').pop()?.replace('.htm', '') || pdp.url
                const displaySlug = slug.length > 50 ? slug.slice(0, 50) + '…' : slug
                const missingCount = Object.values(pdp.fields).filter(s => s === 'missing').length
                const partialCount = Object.values(pdp.fields).filter(s => s === 'partial').length
                return (
                  <details key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <summary style={{ padding: '14px 32px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px', listStyle: 'none', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#737373', textTransform: 'uppercase', minWidth: '100px' }}>{pdp.segment_label}</span>
                      <span style={{ fontSize: '13px', color: '#0a0a0a', fontFamily: 'monospace', flex: 1 }}>{displaySlug}</span>
                      <span style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        {missingCount > 0 && (
                          <span style={{ background: '#fff5f5', border: '1px solid #fecaca', color: '#991b1b', fontWeight: 700, fontSize: '11px', padding: '2px 8px' }}>
                            {missingCount} missing
                          </span>
                        )}
                        {partialCount > 0 && (
                          <span style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e', fontWeight: 700, fontSize: '11px', padding: '2px 8px' }}>
                            {partialCount} partial
                          </span>
                        )}
                        {missingCount === 0 && partialCount === 0 && (
                          <span style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', fontWeight: 700, fontSize: '11px', padding: '2px 8px' }}>
                            complete
                          </span>
                        )}
                      </span>
                    </summary>
                    <div style={{ padding: '16px 32px 24px', background: '#f9f9f9', borderTop: '1px solid #f0f0f0' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <a href={pdp.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#737373', wordBreak: 'break-all' }}>{pdp.url}</a>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {Object.entries(pdp.fields).map(([field, status]) => (
                          <FieldTile key={field} field={field} status={status} />
                        ))}
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
