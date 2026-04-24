export interface QueryVocabularyGroup {
  label: string
  type: 'entry' | 'reformulation' | 'friction'
  queries: string[]
}

export interface TrustSignal {
  signal: string
  weight: number
}

export interface CompetitorExit {
  platform: string
  likelihood: number
  reason: string
}

export interface StateMetric {
  value: number
  reason: string
}

export interface PersonaInitialState {
  cognitiveLoad: StateMetric
  urgency: StateMetric
  anxiety: StateMetric
}

export interface ReformulationStrategy {
  pattern: string
  steps: string[]
  linguisticStyle: string
}

export interface PostSessionBehavior {
  success: string
  partial: string
  failure: string
}

export interface Persona {
  id: string
  number: string
  name: string
  personaType: string
  personaTypeDE: string
  city: string
  age: string
  device: string
  patienceScore: 'Low' | 'Medium' | 'High' | 'Low–Medium' | 'Medium–High'
  scrollThreshold: number
  reformulationTolerance: number
  avatarSeed: string
  /** Hex color without '#' prefix — used in DiceBear URL params. Prepend '#' for CSS use. */
  avatarBg: string
  voice: string
  sessionContext: string
  initialState: PersonaInitialState
  sessionTriggers: string[]
  abandonCondition: string
  queryVocabulary: QueryVocabularyGroup[]
  trustSignalWeights: TrustSignal[]
  reformulationStrategy: ReformulationStrategy
  competitorExitMap: CompetitorExit[]
  postSessionBehavior: PostSessionBehavior
  failureModes: string[]
}

export const personas: Persona[] = [
  {
    id: 'anxious_young_mother',
    number: '01',
    name: 'Laura Becker',
    personaType: 'Anxious Young Mother',
    personaTypeDE: 'Besorgte Junge Mutter',
    city: 'Hamburg',
    age: '31',
    device: 'Mobile-first',
    patienceScore: 'Medium',
    scrollThreshold: 3,
    reformulationTolerance: 3,
    avatarSeed: 'Laura-Becker',
    avatarBg: 'fef3c7',
    voice:
      "I just got back from the pediatrician — she said to get a nasal spray for babies but didn't name a brand. " +
      'I checked urbia.de quickly and someone recommended Sterimar Baby. ' +
      "I'm searching on my phone right now, my daughter is asleep in the stroller so I need to be quick. " +
      "If I see anything that looks like a prescription product or something for adults, I'm closing it immediately — " +
      "I'm not giving my baby the wrong thing.",
    sessionContext:
      'Fragmented attention — searching one-handed while breastfeeding, during nap windows, or waiting at Kita pickup. Not a deliberate desktop session; reactive, need-triggered.',
    initialState: {
      cognitiveLoad: {
        value: 0.7,
        reason:
          'Searching one-handed on mobile during a nap window or at Kita pickup. Attention is fragmented — she may be interrupted at any moment and cannot commit to a long session.',
      },
      urgency: {
        value: 0.6,
        reason:
          'She needs the product but it is not an emergency. The Kinderarzt appointment created a clear task, but the child is not in acute distress. She will try a few times before giving up.',
      },
      anxiety: {
        value: 0.8,
        reason:
          'Safety stakes for a baby are extremely high. A wrong product — wrong age group, wrong dosage, prescription item — is not just a bad purchase, it is a perceived threat to her child. Any distrust signal triggers immediate abandonment.',
      },
    },
    sessionTriggers: [
      'Just left Kinderarzt appointment — doctor named a category, not a brand',
      'Read urbia.de, eltern.de, or Netmoms thread recommending a specific product',
      'Product mentioned by other mothers in WhatsApp group',
    ],
    abandonCondition:
      'Rx product or wrong age group in top 3 results → immediate trust collapse. Does not scroll further. Closes tab.',
    queryVocabulary: [
      {
        label: 'Entry — symptom-led, mobile-typed',
        type: 'entry',
        queries: [
          'Baby Husten Mittel',
          'Baby Fieber Zäpfchen',
          'Kleinkind Erkältung natürlich',
          'Baby schläft nicht was hilft',
          'Zähnen Baby Mittel',
        ],
      },
      {
        label: 'Reformulations — narrows to known brand',
        type: 'reformulation',
        queries: [
          'Fenistil Gel Baby',
          'Viburcol Zäpfchen',
          'Nurofen Baby 60mg',
          'Paracetamol Säugling Dosierung',
        ],
      },
      {
        label: 'High Friction — where search fails her',
        type: 'friction',
        queries: [
          'Baby Schlaf ohne Tabletten',
          'Erkältung Baby ab wann Arzt',
          'Zäpfchen 6 Monate',
        ],
      },
    ],
    trustSignalWeights: [
      { signal: 'No Rx icon visible', weight: 1.0 },
      { signal: 'Age-appropriate labeling (Baby / Kleinkind)', weight: 0.95 },
      { signal: 'Apotheken-Empfehlung', weight: 0.7 },
      { signal: 'Brand recognition from forums', weight: 0.6 },
    ],
    reformulationStrategy: {
      pattern: 'Sequential qualifier escalation',
      steps: [
        "Add age qualifier to original query ('Baby' or 'Kleinkind' if not already present)",
        "Add safety qualifier ('ohne Rezept', 'natürlich', 'ohne [ingredient]')",
        'Search exact brand name heard on forum or from Kinderarzt',
        'If all fail: leave and consult forum before returning',
      ],
      linguisticStyle:
        'Short, mobile-typed German. Safety qualifiers always appended, never prepended. Brand names searched exactly as remembered — may include typos.',
    },
    competitorExitMap: [
      {
        platform: 'DocMorris',
        likelihood: 0.4,
        reason: 'High brand recognition among German mothers as a legitimate online pharmacy alternative',
      },
      {
        platform: 'Local Apotheke (physical)',
        likelihood: 0.3,
        reason: 'Immediacy and ability to ask a real pharmacist — replicates the Kinderarzt trust model',
      },
      {
        platform: 'amazon.de',
        likelihood: 0.2,
        reason: 'Familiar interface, Prime delivery, but lower trust for baby health products — fallback only',
      },
      {
        platform: 'Returns to forum first',
        likelihood: 0.1,
        reason: 'Consults urbia.de/Netmoms to verify product name before trying again elsewhere',
      },
    ],
    postSessionBehavior: {
      success:
        'Returns within 2–3 weeks for next purchase. Beginning of a loyalty loop. Often adds a second baby product while on site.',
      partial:
        'Posts in forum asking if product X is equivalent to Y — indirect signal of search failure circulating in peer network.',
      failure:
        "Mentions in forum that shop-apotheke 'hatte das nicht.' Peer network reputation damage — discourages other mothers.",
    },
    failureModes: [
      "UC13 'Baby schläft nicht': top 3 results are children's picture books — direct life-stage routing failure",
      "UC13 'Schwangerschaft schlafen': books + prenatal vitamins surfaced, zero sleep aids",
      'UC8: sponsored products for baby category appear without relevance gate — adult-dose products surface',
    ],
  },

  {
    id: 'wellness_optimizer',
    number: '02',
    name: 'Mia Schröder',
    personaType: 'Wellness Optimizer',
    personaTypeDE: 'Wellness-Optimierer',
    city: 'München',
    age: '34',
    device: 'Mobile → Desktop mid-session',
    patienceScore: 'High',
    scrollThreshold: 7,
    reformulationTolerance: 4,
    avatarSeed: 'Mia-Schroeder',
    avatarBg: 'd1fae5',
    voice:
      'I was listening to a podcast yesterday and they talked about Magnesium Bisglycinat specifically — ' +
      'not oxide, not citrat, Bisglycinat — because of the absorption rate. ' +
      "I know exactly what I want and I'm going to check the ingredient list on the product page before I buy anything. " +
      "If I search for it and just get a wall of generic magnesium products with no form specified, " +
      "I'll add it to my Amazon cart instead. I've done it before.",
    sessionContext:
      'Arrives via health podcast, Instagram, or biohacking blog with a specific product name or ingredient already in mind. Deliberate session, high intent, prepared.',
    initialState: {
      cognitiveLoad: {
        value: 0.2,
        reason:
          'Deliberate, prepared session. She arrived knowing the exact ingredient, form, and dosage she wants. No distractions — this is a planned desktop or mobile research session, not a reactive one.',
      },
      urgency: {
        value: 0.2,
        reason:
          'No time pressure. Supplement restocking is planned in advance. If this session fails she will simply order elsewhere — she is not under any deadline or physical discomfort.',
      },
      anxiety: {
        value: 0.1,
        reason:
          'Low emotional stakes. A failed search is inconvenient and mildly frustrating, but not distressing. She has fallback platforms (Amazon, brand websites) and is comfortable using them.',
      },
    },
    sessionTriggers: [
      'Heard specific product or ingredient recommended on health podcast',
      'Saw influencer post on Instagram or YouTube (supplement stack content)',
      'Read biohacking forum or Heilpraktiker blog',
    ],
    abandonCondition:
      '4 reformulations with no ingredient-specific result → opens Amazon in new tab for that product.',
    queryVocabulary: [
      {
        label: 'Entry — ingredient-first, technically precise',
        type: 'entry',
        queries: [
          'Ashwagandha KSM-66',
          'Magnesium Bisglycinat 300mg',
          'Vitamin D3 K2 Tropfen hochdosiert',
          'L-Theanin Kapseln',
          'NAD+ Vorläufer NMN',
        ],
      },
      {
        label: 'Reformulations — escalates specificity',
        type: 'reformulation',
        queries: [
          'Ashwagandha Extrakt ohne Zusätze',
          'Magnesium gut verträglich kein Durchfall',
          'Coenzym Q10 Ubiquinol nicht Ubiquinon',
        ],
      },
      {
        label: 'High Friction — where search fails her',
        type: 'friction',
        queries: [
          'Melatonin 0,5mg niedrig dosiert',
          'Kollagen Hydrolysat Typ II',
          'Adaptogen Mischung Stress',
        ],
      },
    ],
    trustSignalWeights: [
      { signal: 'Ingredient form specified in title (Bisglycinat vs oxide)', weight: 0.9 },
      { signal: 'Transparent ingredient list on PDP', weight: 0.85 },
      { signal: 'Dosage visible in result tile', weight: 0.8 },
      { signal: 'Supplement-native brand (Sunday Natural, NATUGENA)', weight: 0.7 },
      { signal: 'Certificate badges (GMP, laborgeprüft)', weight: 0.65 },
    ],
    reformulationStrategy: {
      pattern: 'Precision escalation with platform-switch threshold',
      steps: [
        "Add bioavailability/form qualifier to original ingredient query (e.g. 'Bisglycinat' after 'Magnesium')",
        "Add dosage specificity ('300mg', '5000 IE')",
        "Switch from German term to English or INCI name ('Ashwagandha' → 'Withania somnifera')",
        'Add preferred brand name directly (Sunday Natural, NATUGENA, Viktilabs)',
        'After 4 failed attempts: opens Amazon in new tab, keeps shop-apotheke for rest of basket',
      ],
      linguisticStyle:
        "Mix of German and English, technical vocabulary. Searches read like ingredient labels — precise, no filler words. Will use both 'Magnesium Bisglycinat' and 'magnesium bisglycinate' in sequence.",
    },
    competitorExitMap: [
      {
        platform: 'Amazon.de',
        likelihood: 0.5,
        reason: 'Breadth of supplement-native brands, Prime delivery, detailed ingredient listings from brand pages',
      },
      {
        platform: 'Brand website directly (Sunday Natural, NATUGENA)',
        likelihood: 0.25,
        reason: 'Maximum trust for preferred brands — full ingredient transparency, no search intermediary',
      },
      {
        platform: 'iHerb',
        likelihood: 0.15,
        reason: 'US supplement specialist with European shipping — large catalogue of brands unavailable in German market',
      },
      {
        platform: 'Myprotein / bulk supplements',
        likelihood: 0.1,
        reason: 'Price-per-gram optimization for commodity ingredients like creatine, protein',
      },
    ],
    postSessionBehavior: {
      success:
        'High order value (€80–150+ typical basket). Repeat monthly customer. High likelihood of adding complementary products (stack building).',
      partial:
        "Leaves a review on the compromise product — often mentions what was missing ('würde lieber X Form kaufen, aber diese war die einzige verfügbare').",
      failure:
        'Goes to Amazon for that specific product. Keeps shop-apotheke tab open for other items. Stable split-platform behavior — does not abandon shop-apotheke entirely.',
    },
    failureModes: [
      'Ingredient form not indexed at form level (oxide vs bisglycinat vs citrat — treated as same product)',
      'Dosage unit inconsistency between query and product title (IE vs µg vs mg)',
      'Supplement-native brands buried under pharma brands for supplement queries',
      'No certification filter — certification keywords in query go unmatched in index',
    ],
  },

  {
    id: 'elderly_patient',
    number: '03',
    name: 'Sandra Müller',
    personaType: 'Elderly Patient / Caregiver',
    personaTypeDE: 'Pflegender Angehöriger',
    city: 'Köln',
    age: '52',
    device: 'Desktop (elderly) / Mobile (caregiver)',
    patienceScore: 'Low–Medium',
    scrollThreshold: 4,
    reformulationTolerance: 2,
    avatarSeed: 'Sandra-Muller',
    avatarBg: 'dbeafe',
    voice:
      "I'm ordering for my mother — she needs her Metoprolol, 95mg, 100 tablets, exactly what's on the box. " +
      "Not 50, not 47.5, not a different brand. I have the empty pack in front of me right now. " +
      "If the first result shows a different pack size I won't even click it — that's the wrong product, full stop. " +
      "If I can't find it I'd rather call than order something incorrect.",
    sessionContext:
      'Caregiver: multi-product session from written medication list, efficient and task-oriented. Elderly self-purchaser: deliberate session, reads product descriptions fully, compares label on box at home.',
    initialState: {
      cognitiveLoad: {
        value: 0.6,
        reason:
          'Ordering on behalf of someone else adds mental overhead — she must cross-reference a written medication list and verify every detail against the prescription. There is no room for interpretation.',
      },
      urgency: {
        value: 0.5,
        reason:
          'Monthly reorder cycle — not an emergency, but the task needs to get done before the current supply runs out. A failed session will require a follow-up call or pharmacy visit, which costs her additional time.',
      },
      anxiety: {
        value: 0.7,
        reason:
          'A wrong product — incorrect dosage, wrong pack size, unexpected generic substitution — could cause real harm to her mother. This drives a high verification instinct: she checks every detail and calls support rather than guessing.',
      },
    },
    sessionTriggers: [
      'Monthly medication reorder (Kassenrezept renewal cycle)',
      'Hausarzt updated medication plan — new product to locate',
      "Caregiver managing parent's recurring supply order",
    ],
    abandonCondition:
      'Wrong dosage or pack size in top result → channel shift to phone or physical Apotheke.',
    queryVocabulary: [
      {
        label: 'Entry — exact product name + pack size',
        type: 'entry',
        queries: [
          'Metoprolol 95mg 100 Tabletten',
          'Omeprazol 20mg 60 Kapseln Generikum',
          'Aspirin protect 100mg 100 Stück',
          'Voltaren Schmerzgel 150g',
          'Bepanthen Wundcreme 100g',
        ],
      },
      {
        label: 'Reformulations — pack size or manufacturer qualifier',
        type: 'reformulation',
        queries: [
          'Metoprolol 95mg ratiopharm 100',
          'Ibuprofen 400mg Hexal 50 Stück',
          'Wundauflage saugfähig 10x10',
        ],
      },
      {
        label: 'High Friction — where search fails her',
        type: 'friction',
        queries: [
          'Generikum Metoprolol 95mg',
          'Katheter Einmalkatheter Charriere 14',
          'Inkontinenzeinlagen Nacht starke Saugfähigkeit',
        ],
      },
    ],
    trustSignalWeights: [
      { signal: 'Exact pack size match (100 Stück, 150g)', weight: 1.0 },
      { signal: 'Exact product name match (reads title word-by-word)', weight: 0.95 },
      { signal: 'Correct dosage in title (95mg vs 100mg)', weight: 0.9 },
      { signal: 'Familiar brand logo', weight: 0.6 },
      { signal: 'Apotheke quality signal', weight: 0.5 },
    ],
    reformulationStrategy: {
      pattern: 'Verification-first, minimal reformulation',
      steps: [
        'Elderly: repeats original query verbatim (assumes typo or temporary error)',
        'Elderly: if second attempt fails → calls customer service rather than reformulating further',
        "Caregiver: adds pack size qualifier explicitly ('100 Stück')",
        "Caregiver: tries manufacturer name if brand/generic confusion ('ratiopharm', 'Hexal')",
        'Caregiver: calls if still unresolved — does not attempt more than 2 query variations',
      ],
      linguisticStyle:
        'Exact text copied from prescription or box — including full product name, dosage, pack size, and manufacturer. Elderly users type slowly and carefully; caregiver types faster with occasional abbreviations.',
    },
    competitorExitMap: [
      {
        platform: 'Physical Apotheke (local)',
        likelihood: 0.45,
        reason: 'Absolute trust anchor — pharmacist can confirm product equivalence in person',
      },
      {
        platform: 'Phone call to shop-apotheke support',
        likelihood: 0.25,
        reason: 'Preferred resolution channel when search fails — channel shift within shop-apotheke, not a platform exit',
      },
      {
        platform: 'Sanicare',
        likelihood: 0.15,
        reason: 'Established German online pharmacy with strong elderly customer base and easy reorder flow',
      },
      {
        platform: 'DocMorris',
        likelihood: 0.1,
        reason: 'Brand recognition as legitimate alternative — familiar from TV advertising targeting older demographics',
      },
      {
        platform: 'Family member places order',
        likelihood: 0.05,
        reason: 'Elderly patient asks adult child to order — session failure becomes invisible to the platform',
      },
    ],
    postSessionBehavior: {
      success:
        "Saves order to Merkliste for next month's reorder. Extremely high reorder rate — most loyal repeat segment if first order succeeds.",
      partial:
        'Calls customer service to verify equivalence before ordering. High customer service cost per failed session.',
      failure:
        "Switches permanently to competitor (Sanicare, DocMorris) for that product. High chance of leaving negative review citing 'nicht lieferbar'.",
    },
    failureModes: [
      "Pack size not factored into ranking — 50-Stück results appear before 100-Stück for '100 Stück' queries",
      "Generic/brand disambiguation missing — 'Ibuprofen' returns branded first, generic second, confusing Kassenrezept patients",
      'Medical device categories (Sanitätshaus) poorly indexed — catheter, wound dressing, incontinence queries return sparse results',
      "No 'not available' signal clarity — substitution suggestions appear without dosage equivalence explanation",
    ],
  },

  {
    id: 'acute_self_treater',
    number: '04',
    name: 'Jonas Weber',
    personaType: 'Acute Self-Treater',
    personaTypeDE: 'Akutbehandler',
    city: 'Berlin',
    age: '28',
    device: 'Mobile-first',
    patienceScore: 'Low',
    scrollThreshold: 3,
    reformulationTolerance: 2,
    avatarSeed: 'Jonas-Weber',
    avatarBg: 'fee2e2',
    voice:
      "My throat is killing me and I need something today — not in three days. " +
      "I'm searching on my phone, I feel terrible. " +
      "If I see Grippostad or Ibuflam in the first results I'll click it immediately, " +
      "but if the first thing I see is some prescription medication I can't buy, or a blog post, " +
      "I'm going to the Apotheke around the corner instead. It's not worth fighting with the website when I feel this bad.",
    sessionContext:
      'Currently symptomatic — literally unwell while searching. Reduced cognitive bandwidth, short session, high urgency. Needs product today or tomorrow; delivery speed is a decision variable.',
    initialState: {
      cognitiveLoad: {
        value: 0.9,
        reason:
          'Currently symptomatic. Physical discomfort — sore throat, fever, headache — directly reduces decision-making capacity. He cannot process complex result sets or evaluate unfamiliar brands. He needs an obvious answer in the first two results.',
      },
      urgency: {
        value: 0.9,
        reason:
          'Needs the product today or tomorrow at the latest. The physical Apotheke around the corner is a real and immediate alternative. Every extra click or failed result increases the chance he abandons online entirely and goes physical.',
      },
      anxiety: {
        value: 0.5,
        reason:
          'Driven by discomfort, not safety fear. He wants relief, not reassurance. Unlike the Anxious Mother or Elderly Caregiver, he is not worried about harming someone — he just wants the right OTC product fast.',
      },
    },
    sessionTriggers: [
      'Currently symptomatic (Erkältung, Halsschmerzen, Fieber, Rückenschmerzen)',
      'Urgency: needs fast delivery, physical Apotheke is the real-time alternative',
      'Erkältungssaison spike (October–March peak volume)',
    ],
    abandonCondition:
      'No satisfying result in first scroll + physical pharmacy nearby → goes physical. Online pharmacy loses the conversion entirely.',
    queryVocabulary: [
      {
        label: 'Entry — symptom-first, informal',
        type: 'entry',
        queries: [
          'Halsschmerzen schlucken schmerzt',
          'Kopfschmerzen was nehmen',
          'Schnupfen sofort Hilfe',
          'Fieber senken Erwachsene',
          'Husten Nacht schlimmer',
          'Rückenschmerzen akut',
        ],
      },
      {
        label: 'Reformulations — pivots to known brand',
        type: 'reformulation',
        queries: [
          'Aspirin Complex Grippe',
          'Nasenspray Schnupfen sofort',
          'Ibuprofen 600 Halsschmerzen',
          'Grippostad C Kapseln',
        ],
      },
      {
        label: 'High Friction — where search fails him',
        type: 'friction',
        queries: [
          'was hilft bei Halsschmerzen',
          'Fieber 39 Grad',
          'Erkältung schnell loswerden',
        ],
      },
    ],
    trustSignalWeights: [
      { signal: 'OTC label clear (not Rx)', weight: 1.0 },
      { signal: 'Known OTC brand name (Grippostad, Ibuflam, Wick DayMed)', weight: 0.85 },
      { signal: 'Delivery speed signal (same-day / next-day visible in tile)', weight: 0.8 },
      { signal: 'Visible price', weight: 0.5 },
    ],
    reformulationStrategy: {
      pattern: 'Symptom-to-brand pivot, then hard stop',
      steps: [
        "Start with symptom description in plain language ('Halsschmerzen was hilft')",
        "If Rx or irrelevant results appear: add 'rezeptfrei' or switch to known brand name directly",
        "If brand search also fails: try alternate symptom phrasing ('Erkältung' instead of 'Grippe')",
        'After 2 failed attempts: goes to physical Apotheke — does not try further',
      ],
      linguisticStyle:
        'Short, informal, symptom-first. Queries typed fast on mobile while unwell — typos common. Will use common colloquial terms rather than medical vocabulary. Brand names used exactly as known.',
    },
    competitorExitMap: [
      {
        platform: 'Physical Apotheke (local)',
        likelihood: 0.55,
        reason: 'Immediate availability wins over online delivery when symptomatic — no wait time, can ask pharmacist',
      },
      {
        platform: 'dm / Rossmann (drugstore)',
        likelihood: 0.2,
        reason: 'Stocks common OTC brands without needing a pharmacy — faster than Apotheke queue',
      },
      {
        platform: 'Amazon.de (Prime)',
        likelihood: 0.15,
        reason: 'Same-day or next-day Prime delivery competes with online pharmacy speed — used if delivery confirmed fast enough',
      },
      {
        platform: 'DocMorris',
        likelihood: 0.1,
        reason: 'Tried as last-resort online alternative if shop-apotheke fails — delivery speed is the deciding factor',
      },
    ],
    postSessionBehavior: {
      success:
        'One-time conversion. Rarely returns unless experience was noticeably good. Low loyalty — convenience-driven, not platform-loyal.',
      partial: 'Buys compromise product. Low satisfaction. Leaves no review.',
      failure:
        'Goes to physical Apotheke — shop-apotheke loses conversion entirely for this session. No re-engagement until next illness episode.',
    },
    failureModes: [
      "Symptom queries surface Rx products (documented: 'zu früh aufwachen' → Zopiclon Rx)",
      "No semantic symptom-to-product mapping (documented: 'Gedankenkarussell nachts' → cold syrup)",
      'Result counts too high with no quality hierarchy (357 results for compound intent queries)',
      'Books and informational content bleed into health/symptom results (documented across UC13)',
      'Delivery speed not surfaced in search result tiles — key decision signal is invisible',
    ],
  },

  {
    id: 'alternative_medicine_seeker',
    number: '05',
    name: 'Petra Zimmermann',
    personaType: 'Alternative Medicine Seeker',
    personaTypeDE: 'Naturheilkunde-Anhänger',
    city: 'Stuttgart',
    age: '47',
    device: 'Desktop and mobile mix',
    patienceScore: 'Medium–High',
    scrollThreshold: 6,
    reformulationTolerance: 3,
    avatarSeed: 'Petra-Zimmermann',
    avatarBg: 'ede9fe',
    voice:
      'My Heilpraktiker recommended Nux vomica D12 Globuli specifically — that exact potency, not C30, not D6. ' +
      "I know the difference and I won't just buy whatever comes up. " +
      'If I search for it and the first results are Ibuprofen or some conventional pharmaceutical, ' +
      "I know immediately this pharmacy doesn't stock what I need. " +
      "I'll order from Weleda directly or go to apo-rot — I know my way around those.",
    sessionContext:
      'Arrives via Heilpraktiker recommendation or naturheilkunde-oriented publication. Often has exact product name. Naturheilkunde as identity — not just a product preference, a worldview.',
    initialState: {
      cognitiveLoad: {
        value: 0.3,
        reason:
          'Deliberate and knowledgeable. She arrives with the exact product name, potency, and manufacturer already in mind — given by her Heilpraktiker. There is very little active decision-making required; she is executing a lookup, not a discovery.',
      },
      urgency: {
        value: 0.3,
        reason:
          'Seasonal or constitutional restocking — not an acute need. She is not in pain or distress. If this session fails she will order from a specialist platform without significant inconvenience.',
      },
      anxiety: {
        value: 0.4,
        reason:
          'Wrong results produce frustration and distrust, not distress. She knows her alternatives well (Weleda, apo-rot, Medpex) and is comfortable using them. The anxiety here is identity-level — a conventional pharmaceutical surfaced as a substitute feels like an insult, not just a bad result.',
      },
    },
    sessionTriggers: [
      'Heilpraktiker gave specific product recommendation with potency notation',
      'Read naturheilkunde blog or forum (Naturarzt, Heilpraxis, Homöopathie-Forum)',
      'Seasonal remedy restocking (constitutional approach, cyclical purchasing)',
    ],
    abandonCondition:
      'Correct product not found after 3 reformulations → brand website or specialized Naturheilkunde webshop.',
    queryVocabulary: [
      {
        label: 'Entry — precise technical homeopathic / herbal vocabulary',
        type: 'entry',
        queries: [
          'Nux vomica D12 Globuli',
          'Belladonna C30 Granulat',
          'Oscillococcinum Erkältung',
          'Traumeel Salbe',
          'Schüssler Salze Nr 7 Magnesium phosphoricum',
          'Bachblüten Rescue Tropfen',
          'Johanniskraut 900mg Laif',
        ],
      },
      {
        label: 'Reformulations — adds brand or potency qualifier',
        type: 'reformulation',
        queries: [
          'DHU Nux vomica D12',
          'Weleda Belladonna C30',
          'Passionsblume Tabletten Angst',
          'Mönchspfeffer PMS',
        ],
      },
      {
        label: 'High Friction — where search fails her',
        type: 'friction',
        queries: [
          'Globuli Kinder Schlaf',
          'Bachblüten Mischung Angst',
          'anthroposophisch Erkältung',
        ],
      },
    ],
    trustSignalWeights: [
      { signal: 'Correct potency notation in title (D6, C30, LM, D12)', weight: 1.0 },
      { signal: 'Trusted manufacturer (Weleda, Wala, DHU, Heel)', weight: 0.9 },
      { signal: 'No conventional pharma dominance in results', weight: 0.75 },
      { signal: 'Bio/organic certification visible', weight: 0.5 },
    ],
    reformulationStrategy: {
      pattern: 'Technical escalation through Naturheilkunde vocabulary hierarchy',
      steps: [
        "Add potency notation if absent ('Nux vomica' → 'Nux vomica D12')",
        "Add trusted manufacturer name ('DHU Nux vomica D12' or 'Weleda Nux vomica D12')",
        'Switch to Latin botanical name if German common name failed',
        "Try Schüssler Salz number + mineral name combination ('Schüssler Nr 7 Magnesium phosphoricum')",
        'Navigate manually to Homöopathie & Naturprodukte category page if all queries fail',
      ],
      linguisticStyle:
        'Precise technical vocabulary from Naturheilkunde tradition. Comfortable with Latin names (Nux vomica, Pulsatilla, Belladonna), potency notations (D6, C30, LM1), and brand-specific product names. Will not simplify vocabulary to match search engine limitations.',
    },
    competitorExitMap: [
      {
        platform: 'Weleda Versandapotheke',
        likelihood: 0.3,
        reason: 'Direct brand trust — Weleda is the most recognized anthroposophic brand; buying direct guarantees authenticity',
      },
      {
        platform: 'apo-rot',
        likelihood: 0.25,
        reason: 'Specialist German online pharmacy with strong naturheilkunde catalogue and Homöopathie category depth',
      },
      {
        platform: 'Medpex',
        likelihood: 0.2,
        reason: 'Alternative online pharmacy with broader naturheilkunde stocking than mainstream competitors',
      },
      {
        platform: 'Local Naturheilkunde specialist (Reformhaus)',
        likelihood: 0.15,
        reason: 'Physical specialist store where staff understand the vocabulary and can confirm potency equivalence',
      },
      {
        platform: 'DHU / brand webshop directly',
        likelihood: 0.1,
        reason: 'Deutsche Homöopathie-Union direct — maximum product range certainty for homeopathic products',
      },
    ],
    postSessionBehavior: {
      success:
        'High loyalty — if shop-apotheke stocks her brands correctly, returns for every remedy. High basket value (multiple potencies per session). Strong word-of-mouth in community.',
      partial:
        'Posts question in Homöopathie forum whether the available alternative is equivalent. Indirect evidence of unmet need circulating in peer network.',
      failure:
        "Goes to specialist webshop (apo-rot, Medpex, Weleda). Notes shop-apotheke as 'nicht gut sortiert für Naturheilkunde' — reputational loss in a community with strong word-of-mouth.",
    },
    failureModes: [
      'Homeopathic potency notation not indexed as structured attribute — D6 vs C30 undifferentiated in search',
      "Naturheilkunde brand vocabulary not synonymized — 'Schüssler Nr 7' not mapped to Magnesium phosphoricum",
      'Alternative category (Homöopathie & Naturprodukte) under-boosted relative to conventional pharma',
      'Conventional products surfaced as substitutes for homeopathic queries — active trust destroyer',
      "Life-stage routing absent for 'Kinder' + homeopathy queries",
    ],
  },
]
