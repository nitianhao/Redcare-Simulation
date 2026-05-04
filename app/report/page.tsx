import Link from 'next/link'
import SharedNav from '@/components/SharedNav'
import Footer from '@/components/Footer'
import SeverityBadge from '@/components/SeverityBadge'
import InfoTooltip from '@/components/InfoTooltip'

// ─── Nav ─────────────────────────────────────────────────────────────────────


// ─── Relevance bar ────────────────────────────────────────────────────────────

function RelevanceBar({ score, rank }: { score: number; rank: number }) {
  const color = score >= 0.7 ? '#16a34a' : score >= 0.5 ? '#d97706' : '#E2001A'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
      <span style={{ fontSize: '16px', color: '#737373', width: '16px', textAlign: 'right', flexShrink: 0 }}>#{rank}</span>
      <div style={{ width: '80px', background: '#f0f0f0', height: '5px', borderRadius: '3px', flexShrink: 0 }}>
        <div style={{ width: `${score * 100}%`, height: '100%', background: color, borderRadius: '3px' }} />
      </div>
      <span style={{ fontSize: '16px', color, fontWeight: 700, width: '32px', flexShrink: 0 }}>{score.toFixed(2)}</span>
    </div>
  )
}

// ─── Data ────────────────────────────────────────────────────────────────────

const revenueRiskQueries = [
  {
    query: 'sport verletzung behandeln',
    failReason: 'Effectively empty — only 1 result returned',
    evidence: 'Query returned only 1 result with a maximum relevance score of 0.27, which falls below the 0.25 threshold for useful results.',
    fix: 'Expand the search index to include pain relief medications, sports injury treatment products, and items from the "Sport & Fitness" category.',
    fixCategory: 'SEMANTIC GAP',
    results: [{ name: 'Online-Arzt', score: 0.27 }],
  },
  {
    query: 'mein hund braucht vitamine',
    failReason: 'Symptom-phrased query not mapped to medication category',
    evidence: 'Customer searched expecting pet supplements, but got human prescription vitamin D medications like "Alfacalcidol Aristo® 1 Mikrogramm" and "ALFACALCIDOL AL 0,25 Mikrogramm Weichkapseln".',
    fix: 'Implement natural language processing to understand conversational queries and route to the Pet Care category.',
    fixCategory: 'INTENT MISMATCH',
    results: [
      { name: 'Alfacalcidol Aristo® 1 Mikrogramm', score: 0.28 },
      { name: 'Alfacalcidol Aristo® 0,5 Mikrogramm', score: 0.27 },
      { name: 'Alfacalcidol Aristo® 0,25 Mikrogramm', score: 0.27 },
      { name: 'ALFACALCIDOL AL 0,25 Mikrogramm Weichkapseln', score: 0.33 },
      { name: 'ALFACALCIDOL STADA 0,25 Mikrogramm Weichkapseln', score: 0.33 },
    ],
  },
  {
    query: 'reiseapotheke zusammenstellen',
    failReason: 'Top result is irrelevant (relevance 0.31)',
    evidence: 'The search engine correctly identified relevant travel pharmacy products but ranked them poorly — Bach RESCUE NIGHT Spray is not a travel pharmacy essential.',
    fix: 'Reconfigure the ranking algorithm to prioritize relevance scores over other factors for use-case queries.',
    fixCategory: 'RANKING ORDER',
    results: [
      { name: 'Bach Original RESCUE NIGHT® alkoholfrei Spray', score: 0.31 },
      { name: 'Redcare Reisetabletten Dimenhydrinat 50 mg', score: 0.45 },
      { name: 'ASPIRIN® plus C Brausetabletten + Redcare Xylo 0,1 % Nasenspray', score: 0.39 },
      { name: 'Redcare Reisetabletten Dimenhydrinat 50 mg + Redcare Ibuprofen 400 mg', score: 0.55 },
      { name: 'Redcare Elektrolyte + Redcare Reisetabletten Dimenhydrinat 50 mg', score: 0.51 },
    ],
  },
  {
    query: 'trockene haut im winter',
    failReason: 'Top result is irrelevant (relevance 0.33) — best match buried at #2',
    evidence: 'The most relevant result "Australian Bodycare Set für juckende und sehr trockene Haut im Gesicht" (0.562) was ranked #2. "Weleda Geschenkset Skin Food Body" (0.33) ranked #1.',
    fix: 'Adjust the ranking algorithm to prioritize relevance scores more heavily for descriptive skincare queries.',
    fixCategory: 'RANKING ORDER',
    results: [
      { name: 'Weleda Geschenkset Skin Food Body', score: 0.33 },
      { name: 'Australian Bodycare Set für juckende und sehr trockene Haut im Gesicht', score: 0.56 },
      { name: 'DUCRAY KELUAL DS Beruhigende Anti–Schuppen Creme', score: 0.36 },
      { name: 'RAU Cosmetics Eye Lifting Roll On Pflege für Fältchen', score: 0.26 },
      { name: 'Hädensa® Pflegesalbe mit Dosierspitze', score: 0.30 },
    ],
  },
  {
    query: 'beauty pflege',
    failReason: 'Best match (0.64) buried at rank #13 — customer sees 0.43 at #1',
    evidence: '"Redcare Vita+ Beauty für Haut, Haare und Nägel, mit Hyaluronsäure, Kollagen und Coenzym Q10" (0.641) buried at position #13. Sun creams dominate positions 1–5.',
    fix: 'Reconfigure the ranking algorithm to properly weight relevance scores for broad beauty queries.',
    fixCategory: 'RANKING ORDER',
    results: [
      { name: 'Redcare Sonnencreme LSF 30', score: 0.43 },
      { name: 'Redcare Beauty Kollagen mit bioaktiven Kollagenpeptiden', score: 0.49 },
      { name: 'Redcare Sonnencreme LSF 50', score: 0.43 },
      { name: 'Redcare Derma Gesichts-Sonnencreme LSF 50', score: 0.46 },
      { name: 'Redcare Gesichts-Sonnencreme Sensitive LSF 50', score: 0.46 },
    ],
  },
  {
    query: 'milde babypflege',
    failReason: 'Best match (0.81) buried at rank #5 — customer sees 0.45 at #1',
    evidence: '"Weleda Baby Pflegeöl Calendula Parfümfrei" (0.81) and "Weleda Baby Waschlotion & Shampoo Calendula" (0.68) are buried while lower-relevance bundle sets dominate positions 1–3.',
    fix: 'Adjust the ranking algorithm to prioritize relevance scores over product bundling or brand preference.',
    fixCategory: 'RANKING ORDER',
    results: [
      { name: 'Weleda Baby Calendula - Set L', score: 0.45 },
      { name: 'Weleda Baby Calendula - Set M', score: 0.46 },
      { name: 'Weleda Baby Calendula - Set S', score: 0.44 },
      { name: 'Weleda Baby Waschlotion & Shampoo Calendula', score: 0.68 },
      { name: 'Weleda Baby Pflegeöl Calendula Parfümfrei', score: 0.81 },
    ],
  },
  {
    query: 'nasenspray unter 10 euro',
    failReason: 'Price constraint silently dropped — 8 of 14 results violate the limit',
    evidence: 'Query specified "unter 10 euro" but results include: #1 Mometasonfuroat Cipla €17.01 · #2 Dolphiner Ohrenspray €10.90 · #3 Redcare Xylo bundle €14.79 · #5 Redcare Nasenspülsalz €23.99 · #7 NasenSpray ratiopharm bundle €10.19 · #8 Redcare Xylo + Sinupret €13.99 · #9 ASPIRIN bundle €19.99 · #12 Redcare Nasendusche €16.19.',
    fix: 'Implement price constraint parsing to extract "unter 10 euro" from the query text and apply it as a hard filter before ranking.',
    fixCategory: 'CONSTRAINT DROPPED',
    results: [
      { name: 'Mometasonfuroat Cipla 50 Mikrogramm/Sprühstoß', score: 0.46 },
      { name: 'Dolphiner™ Ohrenspray', score: 0.52 },
      { name: 'Redcare Xylo 0,1 % Nasenspray + GRIPPOSTAD® COMPLEX', score: 0.61 },
      { name: 'Redcare Xylo 0,1 % Nasenspray', score: 0.89 },
      { name: 'Redcare Nasenspülsalz', score: 0.44 },
    ],
  },
  {
    query: 'geschenk für schwangere',
    failReason: 'Best matches buried deep — customer sees 0.48 at #1',
    evidence: '"Gute Nacht Mami BIO Schwangerschaftstee" (0.562) at position #9 · "Mitwachsende Schwangerschaftsunterhose" (0.559) at position #10 · "Antar Oppo Schwangerschafts-Entlastungsbandage" (0.543) at position #15.',
    fix: 'Reconfigure the ranking algorithm to prioritize relevance scores over other factors. Consider a curated gift guide landing page for this query.',
    fixCategory: 'RANKING ORDER',
    results: [
      { name: 'Ein Kind entsteht (book)', score: 0.48 },
      { name: 'Weleda Schwangerschafts-Pflegeöl', score: 0.55 },
      { name: 'Redcare Schwangerschaft Phase 0 + Clearblue® Test', score: 0.44 },
      { name: 'Schwangerschaft (book)', score: 0.48 },
      { name: 'Alles für die Schwangerschaft (book)', score: 0.53 },
    ],
  },
  {
    query: 'red',
    failReason: 'Prefix query — best match (0.53) buried at rank #13',
    evidence: '"Redcare Wärmepflaster" (0.527) ranked #13. Prefix "red" matches many Redcare products but ranking is not ordering by relevance.',
    fix: 'Add edge-ngram prefix index, or surface autocomplete suggestions before search executes so customers pick a full term.',
    fixCategory: 'PREFIX HANDLING',
    results: [
      { name: 'Redcare Xylo 0,1 % Nasenspray', score: 0.48 },
      { name: 'Redcare Ibu-Lysin', score: 0.48 },
      { name: 'Redcare Ibuprofen 400 mg', score: 0.50 },
      { name: 'Redcare Augentropfen Doppelpack', score: 0.50 },
      { name: 'Paracetamol Redcare 500 mg gegen Schmerzen', score: 0.52 },
    ],
  },
  {
    query: 'tablette',
    failReason: 'Best match buried — customer sees 0.50 at #1',
    evidence: 'Correct retrieval for singular "tablette" query, but ranking is suboptimal — Redcare Pantoprazol (a specific acid reflux drug) leads over generic high-relevance tablets.',
    fix: 'Adjust the ranking algorithm to prioritize relevance scores more heavily for generic product-type queries.',
    fixCategory: 'RANKING ORDER',
    results: [
      { name: 'Redcare Pantoprazol Eris Doppelpack', score: 0.50 },
      { name: 'Redcare Kohle-Tabletten', score: 0.69 },
      { name: 'Paracetamol Redcare 500 mg gegen Schmerzen', score: 0.54 },
      { name: 'Ibuprofen 400 mg Filmtabletten', score: 0.67 },
      { name: 'Redcare Ibu-Lysin', score: 0.42 },
    ],
  },
  {
    query: 'was hilft gegen kopfschmerzen',
    failReason: 'Symptom query mapped to wrong sub-category (migraine-only)',
    evidence: 'Query "was hilft gegen kopfschmerzen" (what helps against headaches) returned only prescription migraine medications: Formigran, Naratriptan, Sumatriptan — not the OTC pain relief a typical customer expects.',
    fix: 'Implement semantic understanding to map "kopfschmerzen" to the broader pain relief (Analgetika) category. A symptom-to-category dictionary is sufficient for this case.',
    fixCategory: 'INTENT MISMATCH',
    results: [
      { name: 'FORMIGRAN® bei Migräne', score: 0.55 },
      { name: 'Naratriptan Hennig® 2,5mg bei Migräne', score: 0.59 },
      { name: 'FENDRIX Fertigspritze o.Kanüle', score: 0.35 },
      { name: 'Naratriptan HEXAL® bei Migräne 2,5 mg', score: 0.57 },
      { name: 'Sumatriptan 1A Phar 100Mg', score: 0.51 },
    ],
  },
  {
    query: 'schmerzmittel nicht aspirin',
    failReason: 'Negation silently dropped — 8 of 14 results contain Aspirin',
    evidence: 'Query explicitly excludes Aspirin, yet results include: #2 Aspirin Complex Granulat · #3 Aspirin Plus C Brausetabletten · #4 ASPIRIN® Direkt Kautabletten · #5 ASPIRIN® Effect Granulat · #6 ASPIRIN® COMPLEX Granulat-Sticks · #8 Aspirin® Plus C Forte · #11 ASPIRIN® Coffein · #12 Aspirin® Migräne.',
    fix: 'Implement negative keyword filtering — convert "nicht / ohne / kein + [brand]" into an exclusion facet at query-rewrite time.',
    fixCategory: 'CONSTRAINT DROPPED',
    results: [
      { name: 'Neuralgin® Tabletten', score: 0.57 },
      { name: 'Aspirin Complex Granulat', score: 0.38 },
      { name: 'Aspirin Plus C Brausetabletten', score: 0.35 },
      { name: 'ASPIRIN® Direkt Kautabletten', score: 0.36 },
      { name: 'ASPIRIN® Effect Granulat', score: 0.36 },
    ],
  },
  {
    query: 'günstige schmerztabletten',
    failReason: 'Price modifier "günstige" silently dropped — top results are not budget options',
    evidence: 'Results are dominated by Tebonin® (ginkgo biloba, unrelated to pain) and no sorting by price ascending was applied. "Günstige" was treated as a keyword with no matches.',
    fix: 'Route "günstig / billig" into a sort-by-price-ascending or budget-tier facet. Separate from price-range parsing.',
    fixCategory: 'CONSTRAINT DROPPED',
    results: [
      { name: 'Tebonin® intens 120 mg', score: 0.61 },
      { name: 'Ginkobil® ratiopharm 120mg', score: 0.38 },
      { name: 'Gingium® 120 mg', score: 0.47 },
      { name: 'Tebonin® forte 40 mg', score: 0.53 },
      { name: 'Tebonin® spezial 80 mg', score: 0.54 },
    ],
  },
  {
    query: 'günstige kontaktlinsen bis 20 euro',
    failReason: 'Price constraint silently dropped — 11 of 14 results priced at €39.90',
    evidence: 'Query specified "bis 20 euro" (up to €20). 11 of 14 returned results are priced at €39.90 — nearly double the price limit. OPTI-FREE® lens solution (irrelevant category) ranks #1.',
    fix: 'Implement price constraint parsing to extract "bis 20 euro" and apply as a hard price filter. Also route "kontaktlinsen" queries to the contact lens category first.',
    fixCategory: 'CONSTRAINT DROPPED',
    results: [
      { name: 'OPTI-FREE® Puremoist® Kontaktlinsenpflegemittel', score: 0.61 },
      { name: 'Air Optix plus HydraGlyde 3er | DP: -1.25', score: 0.55 },
      { name: 'Air Optix plus HydraGlyde 6er | DP: -2.75', score: 0.42 },
      { name: 'Menisoft S toric 14-Tageslinse 6er Box -0,25 -1,25 20', score: 0.50 },
      { name: 'Menisoft S toric 14-Tageslinse 6er Box -2,25 -1,75 20', score: 0.51 },
    ],
  },
]

const frictionQueries = [
  { query: 'volt', bestScore: 0.59, bestRank: 15, seenScore: 0.55, results: [{ name: 'Voltaren Schmerzgel forte 23,2 mg/g Gel', score: 0.55 }, { name: 'Voltaren Schmerzgel 11,6 mg/g', score: 0.54 }, { name: 'Voltaren Actigo Schmerzgel 1% Diclofenac', score: 0.55 }, { name: 'Voltaren Dolo Schmerztabletten 25 mg Diclofenac', score: 0.52 }, { name: 'Voltaren Dolo Liquid 25 mg Weichkapseln', score: 0.51 }] },
  { query: 'augentropfen', bestScore: 0.84, bestRank: 15, seenScore: 0.80, results: [{ name: 'Hyaluron-ratiopharm® Augentropfen', score: 0.80 }, { name: 'WALA® Euphrasia Augentropfen', score: 0.83 }, { name: 'Bepanthen Augentropfen Einzeldosis', score: 0.81 }, { name: 'Redcare Augentropfen', score: 0.84 }, { name: 'HYLO-COMOD®', score: 0.30 }] },
  { query: 'redcare vitamin d hochdosiert', bestScore: 0.78, bestRank: 13, seenScore: 0.78, results: [{ name: 'Redcare Vitamin D3 1000 I.E.', score: 0.78 }, { name: 'Redcare Vitamin D3 + K2', score: 0.71 }, { name: 'Redcare Selen 100', score: 0.33 }, { name: 'Redcare Omega-3 vegan', score: 0.34 }, { name: 'Redcare Probio 8 Plus', score: 0.37 }] },
  { query: 'vitamin d 1000 ie', bestScore: 0.91, bestRank: 9, seenScore: 0.90, results: [{ name: 'Vitamin D3 1000 I.E.', score: 0.90 }, { name: 'Redcare Vitamin D3 1000 I.E.', score: 0.89 }, { name: 'Hevert® Vitamin D3 1000 IE', score: 0.90 }, { name: 'Vitamin D3 Tropfen 1000 IE', score: 0.89 }, { name: 'Doppelherz® aktiv Vitamin D 1000 I.E. EXTRA', score: 0.88 }] },
  { query: 'eucrin', bestScore: 0.72, bestRank: 8, seenScore: 0.67, results: [{ name: 'Eucerin® Oil Control Face Sun Gel-Creme LSF 50+', score: 0.67 }, { name: 'Eucerin® UreaRepair 10% Urea Intensive Feuchtigkeitslotion', score: 0.71 }, { name: 'Eucerin® Aquaphor Protect & Repair Salbe', score: 0.68 }, { name: 'Eucerin® UreaRepair 5% Urea Feuchtigkeitslotion', score: 0.70 }, { name: 'Eucerin® UltraSensitive Beruhigende Pflege für Trockene Haut', score: 0.71 }] },
  { query: 'nasenspray', bestScore: 0.87, bestRank: 8, seenScore: 0.86, results: [{ name: 'Nasenspray-ratiopharm Erwachsene', score: 0.86 }, { name: 'Nasenspray AL 0,1 % bei Schnupfen', score: 0.87 }, { name: 'Redcare Xylo 0,1 % Nasenspray', score: 0.85 }, { name: 'NasenDuo Nasenspray', score: 0.87 }, { name: 'Nasenspray AL 0,05% für Kinder', score: 0.84 }] },
  { query: 'weleda baby', bestScore: 0.85, bestRank: 8, seenScore: 0.82, results: [{ name: 'Weleda Baby Wundschutzcreme Calendula', score: 0.82 }, { name: 'Weleda Baby Waschlotion & Shampoo Calendula', score: 0.79 }, { name: 'Weleda Baby Pflegecreme Calendula Körper & Gesicht', score: 0.80 }, { name: 'Weleda Wundschutzcreme parfümfrei', score: 0.77 }, { name: 'Weleda Baby Med 3in1 Wundschutzcreme Weiße Malve', score: 0.79 }] },
  { query: 'acc', bestScore: 0.68, bestRank: 8, seenScore: 0.62, results: [{ name: 'ACC® akut 600 mg bei Husten', score: 0.62 }, { name: 'ACC® akut 200 mg bei Husten', score: 0.62 }, { name: 'ACC® akut 600 mg Z bei Husten', score: 0.64 }, { name: 'ACC® direkt 600 mg bei Husten', score: 0.65 }, { name: 'Erkältungsset ASPIRIN® Complex + ACC akut 600 mg', score: 0.57 }] },
]

const heatmap = [
  { category: 'Medications (Arzneimittel)',    direct: { pass: 6, total: 7 }, category_q: { pass: 1, total: 3 }, symptom: null, constraint: null },
  { category: 'Skincare & Beauty',            direct: { pass: 4, total: 4 }, category_q: { pass: 1, total: 3 }, symptom: { pass: 0, total: 1 }, constraint: null },
  { category: 'Vitamins & Supplements',       direct: { pass: 3, total: 3 }, category_q: null, symptom: null, constraint: null },
  { category: 'Baby & Family',                direct: { pass: 1, total: 1 }, category_q: { pass: 0, total: 1 }, symptom: { pass: 1, total: 2 }, constraint: null },
  { category: 'Eye care & Contact lenses',    direct: { pass: 1, total: 1 }, category_q: { pass: 1, total: 2 }, symptom: null, constraint: { pass: 0, total: 1 } },
  { category: 'Cold, Pain & Nasal care',      direct: { pass: 0, total: 1 }, category_q: { pass: 3, total: 3 }, symptom: { pass: 0, total: 3 }, constraint: { pass: 0, total: 4 } },
  { category: 'Pet care & Generic browse',    direct: { pass: 0, total: 1 }, category_q: { pass: 0, total: 1 }, symptom: { pass: 0, total: 2 }, constraint: null },
]

const capabilities = [
  { label: 'Brand & model search',   pass: 4, total: 4, definition: 'Queries that name a specific brand, product line, or model number (e.g. "Voltaren Schmerzgel", "Aspirin 500mg"). The engine must surface the exact product as rank #1 with no reformulation.' },
  { label: 'Product discovery',      pass: 6, total: 7, definition: 'Broad category-intent queries where the user knows the product type but not the brand (e.g. "sonnencreme", "nahrungsergänzung"). The engine must retrieve a relevant, varied assortment from the correct category.' },
  { label: 'Typo tolerance',         pass: 6, total: 7, definition: 'Queries containing spelling variants, German umlaut substitutions (ae/oe/ue), compound-word splits, or capitalisation differences. The engine must return the same results regardless of these surface variations.' },
  { label: 'Filters & constraints',  pass: 6, total: 9, definition: 'Queries that embed a hard constraint the result set must satisfy — price ceiling ("bis 20 euro"), pack size ("50ml"), dosage, or form factor. All returned results must respect the constraint; violations count as failures.' },
  { label: 'Language understanding', pass: 5, total: 8, definition: 'Queries phrased in natural German, including symptom descriptions ("was hilft gegen kopfschmerzen"), use-case framing ("für trockene haut"), and mixed German/Latin medical terminology. The engine must resolve these to the correct product category.' },
  { label: 'Shopping context',       pass: 3, total: 9, definition: 'Multi-signal queries that combine intent, constraint, and context simultaneously (e.g. symptom + price + recipient). The engine must satisfy all signals at once — partial matches that ignore any signal are counted as failures.' },
]

const typographyTests = [
  { pattern: 'Umlauts (ä)', typed: 'nahrungsergänzung (33)', ascii: 'nahrungsergaenzung (34)' },
  { pattern: 'Umlauts (ü)', typed: 'müdigkeit (33)', ascii: 'muedigkeit (33)' },
  { pattern: 'Umlauts (ö)', typed: 'öl zum einnehmen (34)', ascii: 'oel zum einnehmen (34)' },
  { pattern: 'Sharp s (ß)', typed: 'fußcreme (30)', ascii: 'fusscreme (30)' },
  { pattern: 'Compound split', typed: 'handcreme (29)', ascii: 'hand creme (30)' },
  { pattern: 'Compound split', typed: 'augentropfen (32)', ascii: 'augen tropfen (33)' },
  { pattern: 'Capitalization', typed: 'Voltaren (29)', ascii: 'voltaren (29)' },
]

const fixGroups = [
  {
    effort: 'LOW' as const,
    group: 'Intra-brand / intra-category ranking',
    affected: 12,
    queries: 'medikamente, kosmetik, voltaren, eucrin, volt, nasenspray, augentropfen, weleda baby, acc, kontaktlinse',
    description: 'For strong queries (voltaren, la roche posay, weleda baby, augentropfen) every result on page 1 is on-topic — but the single best match is often buried rank #6–14. This is a ranking-weights tuning job, not a retrieval problem. Rebalance the scoring function to weigh textual relevance higher relative to popularity / recency / margin.',
  },
  {
    effort: 'LOW' as const,
    group: 'Prefix / partial-query handling',
    affected: 2,
    queries: 'volt, red',
    description: 'Three-letter prefixes like "red" and "volt" return off-topic results. Either (a) add an edge-ngram prefix index, or (b) surface autocomplete suggestions before search executes so customers pick a full term.',
  },
  {
    effort: 'LOW' as const,
    group: 'Pharma-abbreviation dictionary',
    affected: 1,
    queries: 'acc',
    description: 'Common German pharma shorthand (acc → Acetylcystein, vit d → Vitamin D, ass → Acetylsalicylsäure) needs explicit mapping. A ~50-entry synonym file covers 80% of everyday OTC abbreviations.',
  },
  {
    effort: 'MEDIUM' as const,
    group: 'Broad-category routing',
    affected: 5,
    queries: 'arzneimittel, beauty pflege, medikamente, kosmetik, haustier',
    description: 'Broad nouns like "medikamente", "kosmetik", "haustier", "beauty pflege" should route to category landing pages, not a keyword-matched product list. Implement category-intent detection: if the query matches a top-level nav term, redirect to that category\'s L2 listing instead of running it through full-text search.',
  },
  {
    effort: 'MEDIUM' as const,
    group: 'Price / numeric constraint parsing',
    affected: 3,
    queries: 'günstige schmerztabletten, nasenspray unter 10 euro, günstige kontaktlinsen bis 20 euro',
    description: 'Price phrases like "unter 10 euro" or "günstig" are treated as keywords, not filters. Parse numeric-price expressions (unter / bis / ab / zwischen X und Y) into a price-range filter at query-rewrite time. Also route "günstig / billig" into a sort-by-price-ascending or a budget-tier facet.',
  },
  {
    effort: 'MEDIUM' as const,
    group: 'Exclusion / negation handling',
    affected: 2,
    queries: 'nasenspray ohne konservierungsstoffe, schmerzmittel nicht aspirin',
    description: '"nicht aspirin" and "ohne konservierungsstoffe" are not being parsed as negative filters. Add a negation tokenizer (nicht / ohne / kein) that converts the trailing token into an exclusion facet or filter.',
  },
  {
    effort: 'HIGH' as const,
    group: 'Symptom & use-case understanding',
    affected: 6,
    queries: 'was hilft gegen kopfschmerzen, trockene haut im winter, mein hund braucht vitamine, geschenk für schwangere, reiseapotheke zusammenstellen, sport verletzung behandeln',
    description: 'Conversational queries like "was hilft gegen kopfschmerzen" or "sport verletzung behandeln" retrieve almost nothing. Options ordered by lift: (a) curated symptom-to-category dictionary (kopfschmerzen → Analgetika), (b) semantic/vector retrieval layer on top of Algolia, (c) LLM query-rewriter that expands "was hilft gegen X" → relevant product categories.',
  },
]

const fixCategoryColors: Record<string, string> = {
  'CONSTRAINT DROPPED': '#E2001A',
  'INTENT MISMATCH': '#E2001A',
  'SEMANTIC GAP': '#E2001A',
  'RANKING ORDER': '#d97706',
  'PREFIX HANDLING': '#d97706',
}

const effortColors = { LOW: '#16a34a', MEDIUM: '#d97706', HIGH: '#E2001A' }
const effortBg = { LOW: '#f0faf4', MEDIUM: '#fff8ed', HIGH: '#fff0f0' }

function HeatCell({ data }: { data: { pass: number; total: number } | null }) {
  if (!data) return <td style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }} />
  const pct = data.pass / data.total
  const bg = pct === 1 ? '#f0faf4' : pct >= 0.5 ? '#fff8ed' : pct > 0 ? '#fff0f0' : '#fde8e8'
  const color = pct === 1 ? '#16a34a' : pct >= 0.5 ? '#d97706' : '#E2001A'
  return (
    <td style={{ background: bg, border: '1px solid #e5e5e5', padding: '12px 16px', textAlign: 'center' }}>
      <span style={{ fontSize: '16px', fontWeight: 700, color }}>{Math.round(pct * 100)}%</span>
      <br />
      <span style={{ fontSize: '16px', color: '#737373' }}>({data.pass}/{data.total})</span>
    </td>
  )
}

export default function ReportPage() {
  return (
    <main>
      <SharedNav activePage="report" />

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="px-20 pt-16 pb-14" style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', display: 'flex', gap: '80px', alignItems: 'center' }}>
        <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
        <p className="mb-4 font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A' }}>
          SEARCH QUALITY AUDIT · SHOP-APOTHEKE.COM · 2026-04-24
        </p>
        <h1 className="font-black leading-none mb-6" style={{ fontSize: '72px', letterSpacing: '0px', color: '#0a0a0a' }}>
          32% BOUNCE
          <br />
          <em style={{ fontStyle: 'italic', color: '#E2001A' }}>RISK.</em>
        </h1>
        <div className="mb-5" style={{ width: '60px', height: '3px', background: '#E2001A' }} />
        <p className="max-w-2xl leading-relaxed mb-10" style={{ fontSize: '16px', color: '#525252' }}>
          We tested 44 realistic customer queries against Shop Apotheke&rsquo;s live search. When a
          customer types a product name, a brand, or an exact dose, search works well — Algolia&rsquo;s
          retrieval is solid. This report documents the 14 queries where a customer hits a dead end:
          symptom-phrased queries that return off-topic results, price constraints that silently get
          dropped, and broad category terms that land on unrelated products.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            ['44', 'QUERIES TESTED'],
            ['14', 'REVENUE-RISK FAILURES'],
            ['24', 'FRICTION QUERIES'],
            ['6', 'WORKING WELL'],
          ].map(([num, label]) => (
            <div key={label} style={{ border: '1px solid #e5e5e5', padding: '14px 22px', background: '#fafafa' }}>
              <div className="font-black" style={{ fontSize: '32px', letterSpacing: '0px', color: '#0a0a0a', lineHeight: 1 }}>{num}</div>
              <div className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Highest-ROI callout */}
        <div style={{ borderLeft: '4px solid #E2001A', background: '#fff5f5', padding: '18px 22px', maxWidth: '680px' }}>
          <p className="font-bold uppercase mb-1" style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}>SINGLE HIGHEST-ROI FIX</p>
          <p style={{ fontSize: '16px', color: '#0a0a0a', lineHeight: '1.6' }}>
            Parse price and exclusion phrases as filters, not keywords. Four of the 14 revenue-risk
            queries (&ldquo;unter 10 euro&rdquo;, &ldquo;bis 20 euro&rdquo;, &ldquo;nicht aspirin&rdquo;,
            &ldquo;ohne konservierungsstoffe&rdquo;) recover with a single query-rewrite module.
          </p>
        </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          <img src="/hero-relevance.webp" alt="Search results for 'schlafmittel unter 10 euro' showing price constraint dropped" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }} />
        </div>
      </section>

      {/* ── How this audit was built ───────────────────────────────────────── */}
      <section className="px-20 py-16" style={{ background: '#fafafa', borderBottom: '2px solid #e5e5e5' }}>
        <p className="mb-3 font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A' }}>
          METHODOLOGY
        </p>
        <h2 className="font-black mb-12" style={{ fontSize: '32px', letterSpacing: '0px', color: '#0a0a0a' }}>
          How This Audit Was Built
        </h2>

        {/* Step-by-step diagram */}
        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0', maxWidth: '1200px' }}>
          {[
            {
              step: '01',
              title: 'Query\nGeneration',
              body: '44 pharmacy queries across 6 intent types: brand, symptom, price-constrained, negation, prefix, conversational.',
              tool: 'Claude Sonnet 4.6',
              red: true,
              output: '44 queries',
            },
            {
              step: '02',
              title: 'Live\nScraping',
              body: 'Playwright (headless Chromium) hits the live Algolia endpoint, dismisses cookie banners, extracts variantDetails JSON from page source.',
              tool: 'Playwright · Python',
              red: false,
              output: '44 SERPs',
            },
            {
              step: '03',
              title: 'Relevance\nScoring',
              body: 'Every result scored 0–1 for intent match. Scores reflect customer need fulfilment, not keyword overlap. Best vs. position-1 gap drives failure tagging.',
              tool: 'Claude Sonnet 4.6',
              red: true,
              output: '~440 scores',
            },
            {
              step: '04',
              title: 'Persona\nEvaluation',
              body: '5 AI shopper agents independently evaluate each SERP, producing inner monologue, satisfaction score, and click / scroll / reformulate / abandon decision.',
              tool: 'Claude Haiku 4.5 · 5 agents',
              red: true,
              output: '220 decisions',
            },
            {
              step: '05',
              title: 'Failure\nClassification',
              body: 'Failures classified by type (semantic gap, intent mismatch, constraint dropped, ranking order, prefix) and ranked by revenue risk across all persona signals.',
              tool: 'Claude Sonnet 4.6',
              red: true,
              output: 'This report',
            },
          ].map(({ step, title, body, tool, red, output }, i, arr) => (
            <div key={step} style={{ display: 'flex', alignItems: 'stretch', flex: 1 }}>
              {/* Card */}
              <div
                style={{
                  flex: 1,
                  background: '#ffffff',
                  border: '1px solid #e5e5e5',
                  borderLeft: i === 0 ? '3px solid #E2001A' : '1px solid #e5e5e5',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '24px 20px 20px',
                }}
              >
                {/* Step number */}
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: '#E2001A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    flexShrink: 0,
                  }}
                >
                  <span className="font-black" style={{ fontSize: '16px', color: '#ffffff', letterSpacing: '0.5px' }}>{step}</span>
                </div>

                {/* Title */}
                <p
                  className="font-black mb-3"
                  style={{ fontSize: '16px', color: '#0a0a0a', letterSpacing: '0px', lineHeight: 1.2, whiteSpace: 'pre-line' }}
                >
                  {title}
                </p>

                {/* Body */}
                <p style={{ fontSize: '16px', lineHeight: 1.7, color: '#525252', marginBottom: 'auto', paddingBottom: '16px' }}>
                  {body}
                </p>

                {/* Tool chip */}
                <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #f0f0f0' }}>
                  <span
                    style={{
                      fontSize: '16px',
                      fontFamily: "'SF Mono', 'Fira Code', monospace",
                      padding: '3px 8px',
                      background: red ? '#fff5f5' : '#f5f5f5',
                      border: `1px solid ${red ? '#fecaca' : '#e5e5e5'}`,
                      color: red ? '#E2001A' : '#525252',
                      display: 'inline-block',
                      letterSpacing: '0.2px',
                      marginBottom: '10px',
                    }}
                  >
                    {tool}
                  </span>
                  {/* Output badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px', color: '#a3a3a3', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      Output
                    </span>
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: i === arr.length - 1 ? '#E2001A' : '#0a0a0a',
                        background: i === arr.length - 1 ? '#fff5f5' : '#f5f5f5',
                        padding: '2px 8px',
                        border: `1px solid ${i === arr.length - 1 ? '#fecaca' : '#e5e5e5'}`,
                      }}
                    >
                      {output}
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow connector */}
              {i < arr.length - 1 && (
                <div
                  style={{
                    width: '32px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  <div style={{ width: '100%', height: '2px', background: '#e5e5e5', position: 'absolute' }} />
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderLeft: '8px solid #E2001A',
                      position: 'absolute',
                      right: '2px',
                      zIndex: 1,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Tier Breakdown ─────────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-8" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>
          TIER BREAKDOWN — 44 QUERIES
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          {[
            { tier: 'TIER 1', label: 'Revenue Risk', count: 14, color: '#E2001A', bg: '#fff0f0', border: '#E2001A', desc: 'Off-topic top result, dropped constraint, or semantic miss. The customer leaves.' },
            { tier: 'TIER 2', label: 'Friction', count: 24, color: '#d97706', bg: '#fff8ed', border: '#d97706', desc: 'Top result is on-topic, but the best match is buried rank #5–14. Customer can find it — slower.' },
            { tier: 'TIER 3', label: 'Working Well', count: 6, color: '#16a34a', bg: '#f0faf4', border: '#16a34a', desc: 'Top-1 is relevant and ranking is near-optimal. No attention needed.' },
          ].map(({ tier, label, count, color, bg, border, desc }) => (
            <div key={tier} style={{ background: bg, border: `1px solid ${border}`, padding: '24px', borderLeft: `4px solid ${border}` }}>
              <p className="font-bold uppercase mb-1" style={{ fontSize: '16px', letterSpacing: '2px', color }}>{tier}</p>
              <div className="font-black" style={{ fontSize: '48px', letterSpacing: '0px', color, lineHeight: 1 }}>{count}</div>
              <div className="font-bold" style={{ fontSize: '16px', color, marginBottom: '10px' }}>{label}</div>
              <p style={{ fontSize: '16px', color: '#525252', lineHeight: '1.55' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Coverage Heatmap ───────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>
          COVERAGE HEATMAP — CATEGORY × QUERY TYPE
        </p>
        <p style={{ fontSize: '16px', color: '#737373', marginBottom: '24px', lineHeight: '1.55' }}>
          Pass rate = queries where the customer sees a relevant top-1 result. Red cells are where a shopper in that segment is most likely to leave empty-handed.
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '16px' }}>
            <thead>
              <tr style={{ background: '#0a0a0a' }}>
                {['CATEGORY', 'DIRECT PRODUCT / BRAND', 'CATEGORY / SYNONYM', 'SYMPTOM / USE-CASE', 'CONSTRAINT / PRICE'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: h === 'CATEGORY' ? 'left' : 'center', fontSize: '16px', letterSpacing: '1.5px', color: '#ffffff', fontWeight: 700, border: '1px solid #333' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmap.map(row => (
                <tr key={row.category}>
                  <td style={{ padding: '12px 16px', fontSize: '16px', color: '#0a0a0a', fontWeight: 500, border: '1px solid #e5e5e5', background: '#fafafa' }}>{row.category}</td>
                  <HeatCell data={row.direct} />
                  <HeatCell data={row.category_q} />
                  <HeatCell data={row.symptom} />
                  <HeatCell data={row.constraint} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '16px', padding: '14px 18px', background: '#fafafa', border: '1px solid #e5e5e5', maxWidth: '640px' }}>
          <p style={{ fontSize: '16px', color: '#737373', lineHeight: '1.6' }}>
            <strong style={{ color: '#0a0a0a' }}>Pattern: </strong>
            Direct lookups (exact product names, brand names, specific doses) work uniformly. The failure surface is concentrated in symptom-driven queries and price-constrained queries — exactly the shopping patterns that drive the highest conversion intent on a pharma site.
          </p>
        </div>
      </section>

      {/* ── German Typography ──────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>
          GERMAN TYPOGRAPHY STRENGTH — UMLAUTS, ß, AND COMPOUND SPLITS
        </p>
        <p style={{ fontSize: '16px', color: '#737373', marginBottom: '24px', lineHeight: '1.55' }}>
          7 of 7 pairs returned within 15% of each other — a genuine strength. This means typography is not the source of the failures documented in this report. The failures are ranking, semantic understanding, and constraint parsing, which sit one layer deeper than character normalization.
        </p>
        <div style={{ border: '1px solid #e5e5e5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 80px', gap: 0, background: '#0a0a0a', padding: '10px 20px' }}>
            {['PATTERN', 'AS TYPED', 'ASCII / SPLIT VARIANT', 'PARITY'].map(h => (
              <span key={h} style={{ fontSize: '16px', letterSpacing: '1.5px', color: '#ffffff', fontWeight: 700 }}>{h}</span>
            ))}
          </div>
          {typographyTests.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 80px', gap: 0, padding: '12px 20px', borderTop: '1px solid #e5e5e5', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', color: '#737373', fontWeight: 600 }}>{row.pattern}</span>
              <span className="font-mono" style={{ fontSize: '16px', color: '#0a0a0a' }}>{row.typed}</span>
              <span className="font-mono" style={{ fontSize: '16px', color: '#525252' }}>{row.ascii}</span>
              <span style={{ fontSize: '16px', color: '#16a34a', fontWeight: 700 }}>parity ✓</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Capability Coverage ────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-8" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>
          CAPABILITY COVERAGE SCORECARD
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px' }}>
          {capabilities.map(({ label, pass, total, definition }) => {
            const pct = pass / total
            const color = pct === 1 ? '#16a34a' : pct >= 0.75 ? '#0a0a0a' : pct >= 0.6 ? '#d97706' : '#E2001A'
            const status = pct === 1 ? 'Healthy' : pct >= 0.75 ? 'Partial' : pct >= 0.6 ? 'Degraded' : 'Broken'
            return (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '16px', color: '#0a0a0a', fontWeight: 500 }}>{label}</span>
                    <InfoTooltip text={definition} />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <span style={{ fontSize: '16px', color: '#737373' }}>{pass}/{total}</span>
                    <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1px', color, minWidth: '64px', textAlign: 'right' }}>{status.toUpperCase()}</span>
                  </div>
                </div>
                <div style={{ background: '#f0f0f0', height: '6px', borderRadius: '3px' }}>
                  <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: '3px' }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Revenue-Risk Failures ──────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px', display: 'flex', gap: '32px', alignItems: 'baseline' }}>
          <p className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A' }}>TIER 1</p>
          <p className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>14 REVENUE-RISK FAILURES — CUSTOMER LEAVES EMPTY-HANDED</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e5e5e5' }}>
          {revenueRiskQueries.map((q, i) => {
            const accentColor = fixCategoryColors[q.fixCategory] ?? '#737373'
            return (
              <div
                key={q.query}
                style={{
                  borderLeft: `4px solid ${accentColor}`,
                  borderBottom: i < revenueRiskQueries.length - 1 ? '1px solid #e5e5e5' : 'none',
                  background: i % 2 === 0 ? '#ffffff' : '#fafafa',
                  padding: '24px 28px',
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color: '#737373', flexShrink: 0 }}>#{i + 1}</span>
                  <code style={{ fontSize: '16px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '4px 12px', border: '1px solid #e5e5e5', borderRadius: '2px' }}>
                    &ldquo;{q.query}&rdquo;
                  </code>
                  <span style={{ marginLeft: 'auto', fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color: accentColor }}>
                    {q.fixCategory}
                  </span>
                </div>

                {/* Fail reason */}
                <p style={{ fontSize: '16px', color: accentColor, fontWeight: 600, marginBottom: '12px' }}>↳ {q.failReason}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 33%', gap: '32px', alignItems: 'start' }}>
                  <div>
                    {/* Evidence */}
                    <p className="font-bold uppercase mb-1" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>EVIDENCE</p>
                    <p style={{ fontSize: '16px', color: '#525252', lineHeight: '1.6', marginBottom: '14px' }}>{q.evidence}</p>

                    {/* Fix */}
                    <div style={{ background: '#f5f5f5', borderLeft: '3px solid #e5e5e5', padding: '10px 14px' }}>
                      <p className="font-bold uppercase mb-1" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>FIX</p>
                      <p style={{ fontSize: '16px', color: '#525252', lineHeight: '1.55' }}>{q.fix}</p>
                    </div>
                  </div>

                  {/* Top results */}
                  <div>
                    <p className="font-bold uppercase mb-2" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>TOP RESULTS</p>
                    {q.results.map((r, ri) => (
                      <div key={ri} style={{ marginBottom: '8px' }}>
                        <RelevanceBar score={r.score} rank={ri + 1} />
                        <p style={{ fontSize: '16px', color: '#737373', lineHeight: '1.3', paddingLeft: '24px', marginTop: '2px' }}>
                          {r.name.length > 50 ? r.name.slice(0, 50) + '…' : r.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Friction Queries ───────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ borderBottom: '1px solid #e5e5e5', paddingBottom: '16px', marginBottom: '40px', display: 'flex', gap: '32px', alignItems: 'baseline' }}>
          <p className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '3px', color: '#d97706' }}>TIER 2</p>
          <p className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>FRICTION QUERIES — RANKING IMPERFECTION, CUSTOMER FINDS IT SLOWER</p>
        </div>
        <p style={{ fontSize: '16px', color: '#737373', marginBottom: '24px', lineHeight: '1.55', maxWidth: '640px' }}>
          All page-1 results are on-topic for these queries. The failure mode is narrower: the single best match is buried at rank #6–15 while lower-relevance alternatives occupy top positions. This is a ranking-weights tuning problem, not a retrieval problem.
        </p>
        <div style={{ border: '1px solid #e5e5e5' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 120px 140px', gap: 0, background: '#0a0a0a', padding: '10px 24px' }}>
            {['QUERY', 'TOP 5 RESULTS', 'BEST BURIED AT', 'DELTA'].map(h => (
              <span key={h} style={{ fontSize: '16px', letterSpacing: '1.5px', color: '#ffffff', fontWeight: 700 }}>{h}</span>
            ))}
          </div>
          {frictionQueries.map((q, i) => (
            <div key={q.query} style={{ display: 'grid', gridTemplateColumns: '200px 1fr 120px 140px', gap: 0, padding: '18px 24px', borderTop: '1px solid #e5e5e5', borderLeft: '4px solid #d97706', background: i % 2 === 0 ? '#ffffff' : '#fafafa', alignItems: 'start' }}>
              <code style={{ fontSize: '16px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', paddingRight: '16px' }}>&ldquo;{q.query}&rdquo;</code>
              <div>
                {q.results.map((r, ri) => (
                  <div key={ri} style={{ marginBottom: '6px' }}>
                    <RelevanceBar score={r.score} rank={ri + 1} />
                    <p style={{ fontSize: '16px', color: '#737373', paddingLeft: '24px', marginTop: '1px' }}>
                      {r.name.length > 48 ? r.name.slice(0, 48) + '…' : r.name}
                    </p>
                  </div>
                ))}
              </div>
              <div style={{ paddingLeft: '8px' }}>
                <span style={{ fontSize: '16px', color: '#d97706', fontWeight: 700 }}>Rank #{q.bestRank}</span>
                <br />
                <span style={{ fontSize: '16px', color: '#737373' }}>score {q.bestScore.toFixed(2)}</span>
              </div>
              <div style={{ paddingLeft: '8px' }}>
                <span style={{ fontSize: '16px', color: '#0a0a0a', fontWeight: 600 }}>Seen: {q.seenScore.toFixed(2)}</span>
                <br />
                <span style={{ fontSize: '16px', color: '#16a34a', fontWeight: 700 }}>Best: {q.bestScore.toFixed(2)}</span>
                <br />
                <span style={{ fontSize: '16px', color: '#737373' }}>+{((q.bestScore - q.seenScore) * 100).toFixed(0)}pt gap</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fix Prioritization ─────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#fafafa', borderBottom: '1px solid #e5e5e5' }}>
        <p className="font-bold uppercase mb-8" style={{ fontSize: '16px', letterSpacing: '3px', color: '#737373', borderBottom: '1px solid #e5e5e5', paddingBottom: '8px' }}>
          FIX PRIORITIZATION — GROUPED BY ENGINEERING EFFORT
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e5e5e5' }}>
          {fixGroups.map((g, i) => (
            <div
              key={g.group}
              style={{
                borderLeft: `4px solid ${effortColors[g.effort]}`,
                borderBottom: i < fixGroups.length - 1 ? '1px solid #e5e5e5' : 'none',
                background: i % 2 === 0 ? '#ffffff' : '#fafafa',
                padding: '22px 28px',
                display: 'grid',
                gridTemplateColumns: '80px 1fr 80px',
                gap: '32px',
                alignItems: 'start',
              }}
            >
              <div>
                <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '1.5px', color: effortColors[g.effort], background: effortBg[g.effort], padding: '3px 8px', border: `1px solid ${effortColors[g.effort]}`, borderRadius: '2px', whiteSpace: 'nowrap' }}>
                  {g.effort}
                </span>
              </div>
              <div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', marginBottom: '8px' }}>{g.group}</p>
                <p style={{ fontSize: '16px', color: '#525252', lineHeight: '1.6', marginBottom: '10px' }}>{g.description}</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {g.queries.split(', ').map(qr => (
                    <code key={qr} style={{ fontSize: '16px', fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#0a0a0a', background: '#f5f5f5', padding: '2px 8px', border: '1px solid #e5e5e5', borderRadius: '2px' }}>
                      {qr}
                    </code>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="font-black" style={{ fontSize: '32px', letterSpacing: '0px', color: '#0a0a0a', lineHeight: 1 }}>{g.affected}</div>
                <div className="font-bold uppercase" style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}>queries</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scope & Boundaries ─────────────────────────────────────────────── */}
      <section className="px-20 py-20" style={{ background: '#0a0a0a' }}>
        <p className="font-bold uppercase mb-8" style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A', borderBottom: '1px solid #333', paddingBottom: '8px' }}>
          SCOPE AND BOUNDARIES
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {[
            {
              label: 'WHAT THIS AUDIT COVERS',
              body: '44 live queries chosen to exercise the realistic shopping patterns of a pharmacy customer — brand lookups, symptoms, price constraints, typos, abbreviations, compound words. Queries were tested live against shop-apotheke.com, not on cached or sampled data.',
            },
            {
              label: 'WHAT IT DOES NOT COVER',
              body: 'This is not a traffic-weighted study. We don\'t know the query mix from actual server logs. The verdicts are capability verdicts (can the engine handle this pattern?) — not revenue verdicts (which pattern drives the most lost sales?).',
            },
            {
              label: 'PRIORITY NOTE',
              body: 'The 6 queries tagged "working well" are genuinely fine. The intra-brand ranking nuances in Tier 2 (voltaren, la roche posay, weleda baby, ibuprofen 400mg filmtabletten) are worth tuning but are not the place to start — the Tier 1 constraint-dropped and symptom-semantic failures will recover more lost customers per engineering hour.',
            },
            {
              label: 'AVAILABLE ARTIFACTS',
              body: 'Raw scored results per query (JSON), per-query LLM judgments with evidence and recommended fixes, and the unfiltered capability scorecard are available on request.',
            },
          ].map(({ label, body }) => (
            <div key={label} style={{ borderLeft: '4px solid #E2001A', paddingLeft: '20px' }}>
              <p className="font-bold uppercase mb-3" style={{ fontSize: '16px', letterSpacing: '2px', color: '#E2001A' }}>{label}</p>
              <p style={{ fontSize: '16px', color: '#a3a3a3', lineHeight: '1.65' }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
