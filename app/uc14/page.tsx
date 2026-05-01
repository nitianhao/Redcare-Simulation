import Link from 'next/link'
import Footer from '@/components/Footer'

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav style={{ borderBottom: '1px solid #e5e5e5', background: '#ffffff', padding: '12px 80px', display: 'flex', gap: '32px', alignItems: 'center' }}>
      <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A' }}>
        REDCARE × SEARCH SIMULATION LAB
      </span>
      <span style={{ color: '#e5e5e5' }}>|</span>
      <Link href="/" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>Personas</Link>
      <Link href="/user-experience" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>Web UX</Link>
      <Link href="/user-experience-mobile" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>Mobile UX</Link>
      <Link href="/report" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>Audit Report</Link>
      <Link href="/sponsored-impact" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>Sponsored Impact</Link>
      <Link href="/use-cases" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>Simulations</Link>
      <Link href="/uc10" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>UC10</Link>
      <Link href="/uc14" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#0a0a0a', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '2px solid #E2001A', paddingBottom: '2px' }}>UC14</Link>
    </nav>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

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

const SEGMENT_LABELS: Record<string, string> = {
  both: 'Both',
  mother_child: 'Mother & Child',
  cosmetics: 'Cosmetics',
}

const mcPdps = PDP_EXTRACTIONS.filter(p => p.segment === 'mother_child')
const cosPdps = PDP_EXTRACTIONS.filter(p => p.segment === 'cosmetics')

function countHighImpactGaps(segment: string) {
  return GAP_REPORT.filter(g => g.search_impact === 'high' && (g.segment === segment || g.segment === 'both')).length
}

const criticalGapsCount = GAP_REPORT.filter(g => g.search_impact === 'high').length

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UC14Page() {
  return (
    <>
      <Nav />
      <main style={{ background: '#fafafa', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: '#0a0a0a', padding: '64px 80px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '16px' }}>UC14 — Product Data Quality Audit</p>
          <h1 style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '-2px', color: '#ffffff', margin: '0 0 20px', lineHeight: 1.05 }}>
            What&apos;s missing from your PDPs<br />that&apos;s killing search?
          </h1>
          <p style={{ fontSize: '16px', color: '#737373', maxWidth: '640px', lineHeight: 1.7, margin: '0 0 32px' }}>
            35 PDPs audited across 2 segments — Mother &amp; Child and Cosmetics. 13 fields evaluated per PDP. {criticalGapsCount} critical gaps identified that directly suppress search ranking, faceted navigation, and query matching.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '32px', width: 'fit-content' }}>
            {[
              { n: '35', label: 'PDPs Audited' },
              { n: '2', label: 'Segments' },
              { n: '13', label: 'Fields Checked' },
              { n: String(criticalGapsCount), label: 'Critical Gaps' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#E2001A', letterSpacing: '-1px', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#525252', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Segment summary cards */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '32px 80px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '20px' }}>Segment Overview</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '760px' }}>
            {[
              { label: 'Mother & Child', count: mcPdps.length, segment: 'mother_child' },
              { label: 'Cosmetics', count: cosPdps.length, segment: 'cosmetics' },
            ].map(({ label, count, segment }) => (
              <div key={segment} style={{ border: '1px solid #e5e5e5', padding: '24px 28px', background: '#fafafa' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#737373', textTransform: 'uppercase', marginBottom: '12px' }}>{label}</div>
                <div style={{ display: 'flex', gap: '32px' }}>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-1px', lineHeight: 1 }}>{count}</div>
                    <div style={{ fontSize: '11px', color: '#737373', marginTop: '2px' }}>PDPs</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 900, color: '#E2001A', letterSpacing: '-1px', lineHeight: 1 }}>{countHighImpactGaps(segment)}</div>
                    <div style={{ fontSize: '11px', color: '#737373', marginTop: '2px' }}>High-impact gaps</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ranked gap table */}
        <div style={{ padding: '48px 80px' }}>
          <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '48px' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>Ranked Gap Table</div>
              <p style={{ fontSize: '13px', color: '#525252', margin: 0 }}>{GAP_REPORT.length} gaps across {PDP_EXTRACTIONS.length} PDPs — ordered by search impact</p>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr>
                    {['Field', 'Segment', 'Missing / Partial', 'Impact', 'Why it matters', 'Data Source', 'Auto', 'How'].map(h => (
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
                      <td style={{ padding: '12px 14px', color: '#374151', lineHeight: 1.5, maxWidth: '280px' }}>{gap.impact_rationale}</td>
                      <td style={{ padding: '12px 14px', color: '#525252', fontSize: '12px', maxWidth: '200px', lineHeight: 1.4 }}>{gap.data_source}</td>
                      <td style={{ padding: '12px 14px' }}><AutomationBadge potential={gap.automation_potential} /></td>
                      <td style={{ padding: '12px 14px', color: '#525252', fontSize: '12px', maxWidth: '240px', lineHeight: 1.4 }}>{gap.automation_note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Per-PDP accordion */}
          <section style={{ background: '#ffffff', border: '1px solid #e5e5e5' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #e5e5e5' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '4px' }}>Per-PDP Field Audit</div>
              <p style={{ fontSize: '13px', color: '#525252', margin: 0 }}>All 35 PDPs — expand each row to see field-level status across all 13 fields</p>
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
