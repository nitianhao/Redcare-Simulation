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
      <Link href="/uc10" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#0a0a0a', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '2px solid #E2001A', paddingBottom: '2px' }}>UC10</Link>
      <Link href="/uc14" style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#737373', textDecoration: 'none', textTransform: 'uppercase' }}>UC14</Link>
    </nav>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const AGENTS: Record<string, { title: string; name: string; incentive: string }> = {
  head_ecom:       { title: 'Head of Ecommerce',    name: 'Stefan',   incentive: 'GMV & conversion rate. Needs a revenue number before acting.' },
  merchandiser:    { title: 'Merchandiser',          name: 'Katrin',   incentive: 'Campaign delivery & supplier relationships. Boost rules are negotiated agreements.' },
  product_manager: { title: 'Product Manager',       name: 'Tobias',   incentive: 'Shipped features. Will help with a clean spec and a roadmap slot.' },
  engineer:        { title: 'Senior Engineer',        name: 'Anja',     incentive: 'Clean requirements. Will not estimate without a spec.' },
  support_lead:    { title: 'Support Lead',           name: 'Marcus',   incentive: 'CSAT & ticket reduction. Has real complaint data nobody looks at.' },
  vendor_rep:      { title: 'Algolia / Vendor Rep',  name: 'Pierre',   incentive: 'Contract renewal. Frames every failure as a configuration issue.' },
  ceo:             { title: 'CEO / CMO',              name: 'Christine', incentive: 'Brand & competitive position. Asks: what does DocMorris do?' },
}

const ROUND_LABELS: Record<string, string> = {
  r1: 'Round 1 — Initial reactions',
  r2: 'Round 2 — Cross-responses',
  r3: 'Round 3 — Evidence introduced',
  r4: 'Round 4 — Final positions',
}

const RUNS = [
  {
    id: 'run1',
    badge: 'UC08 · KOPFSCHMERZEN',
    finding: "Sponsored slot on 'Kopfschmerzen' — broken creative + wrong category",
    context: 'The sponsored position 1 on a top-20 OTC headache query shows a Sanitätshaus (medical equipment) product. The ad creative renders with only "Variante auswählen" visible — no product name, no image. All 4 organic results are on-intent OTC pain products. The broken slot displaces togal Kopfschmerz Brause from position 3 to 4. Analytics: normal session, healthy spend recorded.',
    evidenceType: 'Revenue estimate: ~€1,200–1,800/month in suppressed conversion on this query.',
    outcomeColor: '#d97706',
    outcomeLabel: 'PARTIAL FIX — AUDIT COMMITTED',
    outcomeDetail: 'Campaign kill ordered. One-time audit committed for Friday. No permanent owner for sponsored placement quality established.',
    rounds: {
      r1: {
        head_ecom: `Wait—how much are we spending on this placement? And what's the CTR on that broken sponsored slot versus the organic results below it?\n\nIf the CTR is garbage, the algorithm should have killed it already. If it's *not* garbage and people are somehow still clicking a broken ad for the wrong category on our highest-intent headache query, then we've got a way bigger problem than one busted creative.\n\nGet me: daily spend on "Kopfschmerzen" sponsored, CTR comparison, and conversion rate for that Sanitätshaus product from this query. I need to know if this is costing us money or making us money before I escalate anything.`,
        merchandiser: `Wait — this is a *Sanitätshaus* product on a headache query? That shouldn't be eligible at all. Our boost rules are category-specific.\n\nIs this a supplier booking error or a targeting fuck-up? Because if a medical equipment vendor is bidding into OTC pain queries, that's not a merchandising issue — that's ad ops letting suppliers target outside their contractual category scope.`,
        product_manager: `Wait — so this is a *sponsored* slot issue? That's not really search quality, that's ad ops or whoever manages the marketplace side. Our search team delivered four solid organic results, right?\n\nCan you clarify scope here? If this is about sponsored creative rendering or merchant onboarding rules, that's a different squad entirely. I'm happy to look at the organic displacement piece if there's a ranking bug, but the broken ad itself... that's not in my swim lane.`,
        engineer: `Wait — is this a rendering bug in our frontend or is the ad server literally returning malformed creative data? Because if it's the latter, that's not our system. We display what comes through the API.\n\nBefore I look at anything, I need to know: is the creative broken on our side, or is the Sanitätshaus merchant serving a garbage feed? Those are completely different fixes with completely different owners.`,
        support_lead: `We've been getting tickets about this. Not just the Kopfschmerzen query — customers are complaining that sponsored results "don't make sense" or "look broken." I flagged this two weeks ago but it went into the general product backlog.\n\nThe issue is that customers think *we're* broken, not the advertiser. They don't know the difference between sponsored and organic. When the top result is garbage, they blame the pharmacy.`,
        vendor_rep: `I want to clarify something important: the Algolia platform itself is returning results correctly — the sponsored slot is populated according to the campaign configuration we received. If there's category mismatch or creative rendering issues, that's downstream of the platform.\n\nThat said, we absolutely want to help here. We can look at implementing category exclusion rules at the query level — that's actually a feature we've been building out. Let me check with our team on timeline.`,
        ceo: `Show me what DocMorris shows for the same query. Right now.\n\nIf our position 1 is a broken medical device ad and they have Ibuprofen 400mg with a clean creative and visible price, that's not a technical problem — that's a brand problem. How long has this been running?`,
      },
      r2: {
        head_ecom: `Okay, so no one in this room owns this. Product thinks it's ad ops, Merchandiser thinks it's targeting, the vendor thinks it's our config. That's the problem.\n\nMarcus — you said customers are complaining. How many tickets specifically about this query in the last 30 days? Because if I have a volume number, I can make a business case for an emergency fix without waiting for an audit.`,
        merchandiser: `I checked while you were talking. The Sanitätshaus category is absolutely not in our boost matrix for pain queries. This wasn't us.\n\nBut that means someone in ad ops let a supplier self-configure their campaign targeting and nobody validated it against our category mapping. That's a process failure upstream of merchandising — and it means we probably have more of these sitting in other queries right now.`,
        product_manager: `If Katrin's right that this is a supplier campaign targeting issue, then the fix is actually straightforward: category exclusion rules at the campaign onboarding level. I can spec that in a day.\n\nThe real question is whether this is a one-off or systematic. If there are 20 more like this, we need an audit workflow, not just a point fix. Can someone pull a list of active sponsored campaigns where the product category doesn't match the query category they're bidding on?`,
        engineer: `I pulled the rendering logs while we were talking. The creative isn't broken on our side — the merchant is serving an incomplete product feed. The "Variante auswählen" text is what renders when variant data is missing from the feed.\n\nFix for this specific case: campaign suspension, 10 minutes. Systematic fix: feed validation at campaign submission. That's a Product spec issue, not something I can build without requirements.`,
        support_lead: `Eleven tickets in the last two weeks specifically mentioning that the top search result "looks wrong" or "doesn't load properly" for headache searches. The earliest one I have is April 9th.\n\nCustomers aren't complaining about the Sanitätshaus product specifically — they're complaining that the *pharmacy's search is broken*. That's a trust issue, not a UX issue. Once someone thinks your search is broken, they don't come back.`,
        vendor_rep: `What Anja described — the "Variante auswählen" render — is a known edge case when merchant feeds have incomplete variant mapping. We have a validation layer in our roadmap that would catch this pre-activation.\n\nFor now, I can escalate to our ad ops team and have this campaign suspended within the hour pending merchant feed correction. That's faster than any internal fix. Should I make that call?`,
        ceo: `April 9th. It's April 30th. That's three weeks of a broken sponsored slot on our highest-intent headache query and nobody escalated it until someone ran a simulation.\n\nI want two things: I want that campaign killed today, and I want to understand why we don't have automated monitoring that catches this. What does DocMorris do?`,
      },
      r3: {
        head_ecom: `€1,800 a month is noise, honestly. We spend more than that on A/B test infrastructure.\n\nBut here's what actually moves me: if Kopfschmerzen is top-20 by volume and our position 1 CTR has been suppressed for three weeks, the real cost isn't the misdirected spend — it's the organic conversion we've been losing because users see a broken ad and bounce before they hit the OTC results. Has anyone modeled what our CTR on positions 2-5 looks like when position 1 is visually broken?`,
        merchandiser: `This actually changes the framing for me. I was thinking about this as a campaign targeting error, but if we're looking at €1,800/month suppression on a top-20 query, that's a cost-per-sponsored-query conversation I can have with the category director.\n\nI'll commit to running a full audit of active campaigns against our category taxonomy by Friday. If there are other queries with similar mismatches, I want to find them before someone else does.`,
        product_manager: `Okay, €1,800/month makes the math straightforward. Category exclusion validation at campaign submission: I'd estimate 8 days to build and test. At €1,800/month suppression cost, payback is within the first month.\n\nI'll write the spec this week. The question is whether Legal needs to review the category exclusion logic before we ship — that could add two weeks.`,
        engineer: `The revenue number doesn't change my scope. What changes my scope is having a written spec from Tobias.\n\nIf the spec says "validate product category against query category at campaign activation and block mismatches," I can build that. I'd want to clarify: are we blocking on exact category match, or category hierarchy match? A Sanitätshaus product might be in a sub-category of "medical devices" that has a legitimate parent category overlap with pain management. I need the taxonomy rules defined before I write a line of code.`,
        support_lead: `The revenue estimate actually undersells it. The tickets I'm seeing aren't "wrong product" complaints — they're "your website is broken" complaints. Those customers don't come back and they don't show up in your conversion funnel at all. The revenue model doesn't capture churned customers who decided the platform isn't trustworthy.\n\nI'd like access to the analytics dashboard to correlate ticket volume with session drop-off on Kopfschmerzen queries. Can someone give me that access?`,
        vendor_rep: `The revenue figure validates what I've been trying to flag internally for a while. We actually had this on our roadmap as a "sponsored placement quality" feature — I'll be honest, it got deprioritized in Q1.\n\nI'm committing to accelerating the category validation beta to our top pharmacy clients. Redcare would be the first implementation. I can have a proposal to you by end of week with timeline and integration requirements.`,
        ceo: `€1,800/month is not the number that matters here. The number that matters is: what does a customer who sees a broken top result tell their friends?\n\nI want this fixed today, not Friday. Pierre — suspend the campaign now. Tobias — I want a spec for systematic prevention by Wednesday, not "this week." And someone needs to tell me what our monitoring gap is and who's responsible for closing it. This shouldn't take a simulation to find.`,
      },
      r4: {
        head_ecom: `Alright. I'm authorizing this as an emergency fix — Pierre suspends the campaign now. Tobias owns the spec for category exclusion validation by Wednesday EOD. Katrin runs the full campaign audit by Friday and reports to me directly.\n\nI still want the CTR suppression model — not for this fix, but because I want to understand the actual cost of our monitoring gap across all sponsored queries. Someone build that model and get it to me by next week.`,
        merchandiser: `Campaign audit by Friday, committed. I'll cross-reference all active sponsored campaigns against our category taxonomy and flag any with a category mismatch greater than two levels.\n\nFor the record: this wasn't a merchandising process failure. Our boost rules are clean. This was a campaign onboarding gap that ad ops needs to own. I want that documented before we close this.`,
        product_manager: `Spec delivered Wednesday. I'll scope it as: category exclusion validation at campaign activation, blocking on category hierarchy mismatch beyond one level. Legal review happens in parallel — I'll flag it as a compliance-adjacent feature to fast-track the review.\n\nOne ask: I need Anja's taxonomy service documentation to write an accurate spec. Can that be shared with me today?`,
        engineer: `I'll share the taxonomy service docs with Tobias this afternoon.\n\nOnce I have the spec, I can give a proper estimate. Based on what I've heard today, I'm guessing 6-8 days implementation + 2 days testing, assuming the category hierarchy rules are cleanly defined. But I won't commit to that until I see the written spec.`,
        support_lead: `I'm glad this is getting fixed. My ask is still on the table: I need dashboard access to correlate support ticket volume with search session data. Without that, I'm operating blind and these findings keep coming to me as anecdotes rather than metrics.\n\nCan someone action that this week? I'm not asking for engineering time — just read access to the existing dashboards.`,
        vendor_rep: `Campaign suspended as of now — I've sent the instruction to our ad ops team. The merchant will receive notification with feed correction requirements before reactivation.\n\nI'll have the category validation beta proposal to Stefan and Tobias by Friday. I want to be clear: this is a feature we're building regardless of this incident — but incidents like this accelerate our prioritization.`,
        ceo: `Good. Campaign suspended, spec Wednesday, audit Friday. I want a status update in my Monday standup.\n\nThe monitoring gap question is not closed. Someone needs to own the answer to: "how do we detect this automatically next time?" That answer goes in the Monday update. If it's not answered, I'll escalate it myself.`,
      },
    },
    synthesis: `## THE BLOCKING PATTERN\n\nNo genuine blocking coalition formed — this was *diffusion by accountability vacuum*. Product Manager, Engineer, and Merchandiser each established defensive perimeters around swim lanes ("that's ad ops," "that's not search platform," "supplier-managed campaigns") without refusing action. Vendor Rep consistently reframed as "campaign setup issue" + "working as designed," positioning the platform as neutral infrastructure. The blocking wasn't coordinated resistance; it was structural ambiguity about which system owned sponsored placement hygiene. Head of Ecom broke the stalemate not through evidence but through executive override, converting a scoping debate into a resource allocation decision.\n\n## WHAT ACTUALLY MOVED\n\nTwo pieces of evidence had asymmetric impact:\n\n1. **Support Lead's "eleven tickets in two weeks" + April 9th timestamp** moved CEO immediately — this converted abstract "trust cost" into concrete timeline exposure with competitive comparison framing.\n\n2. **€1,800/month revenue estimate** *failed* to move anyone on magnitude but succeeded as a decision threshold — it was simultaneously "noise" (Head of Ecom) and "material enough to act" (CEO). The number's function was political clearance, not business case justification.\n\n## WHAT WAS LEFT ON THE TABLE\n\n1. **Root cause diagnosis**: Was this rendering bug, feed malformation, or auction logic failure? Never established. "Kill the campaign" conflated symptom treatment with system fix.\n\n2. **Systemic scale**: "Full audit" tasked to Merchandiser for Friday, but no commitment to *pause* if pattern discovered across 20+ queries — leaving potential two-week exposure window.\n\n3. **Accountability ownership**: No permanent owner for ongoing sponsored placement quality control post-fix.\n\n## THE PLAYBOOK\n\n**For Head of Ecom:** Lead with auction performance data, not revenue loss. Frame as: "This placement has 0.3% CTR vs. 4.2% category baseline — we're paying €600/month for a slot that suppresses our own organic 14x conversion rate." Translate trust cost into media efficiency problem.\n\n**For Product Manager:** Present as already-scoped infrastructure debt. Frame as: "DocMorris ships category-aware placement rules as table stakes — this is parity infrastructure, not feature development. Eight-day implementation, maps to existing taxonomy service."\n\n**For CEO:** Pre-brief CEO + Head of Ecom together with competitor screenshot and 30-day complaint trend before the full meeting.`,
  },
  {
    id: 'run2',
    badge: 'UC13 · MODAFINIL',
    finding: "'Schlaf verbessern ohne Tabletten' returns Modafinil 200mg as top result",
    context: '55 results returned — analytics sees a healthy result set, no zero-result alert fires. Position 1: Modafinil 200mg — €487 — a prescription stimulant for narcolepsy. The query explicitly says "ohne Tabletten" (without tablets). Modafinil is a tablet and a BtMG-scheduled controlled substance. The platform stocks exactly what the user wants (Melatonin spray, Baldrian drops, Lasea lavender oil) — none appear in top 5.',
    evidenceType: 'Patient safety: Modafinil is Schedule IV under BtMG (German Narcotics Act). Regulatory optics risk.',
    outcomeColor: '#16a34a',
    outcomeLabel: 'FASTEST RESOLUTION — SAME-DAY ACTION',
    outcomeDetail: 'BtMG classification was the kill shot. Every stakeholder pivoted to same-day action the moment regulatory language appeared. Root cause — commercial boosts overriding intent signals — left unexamined.',
    rounds: {
      r1: {
        head_ecom: `Fifty-five results and Modafinil at position one. That's not a zero-result problem, it's a ranking problem — the kind that's invisible in our dashboards because everything looks "healthy."\n\nFirst question: is this reproducible? If I search right now, does Modafinil still show up? Because if this is a live issue on a query about sleep wellness, I need to know the volume on that query and whether we have conversion data for Modafinil purchases from that session path. Something doesn't add up.`,
        merchandiser: `Wait — Modafinil? That's a prescription stimulant. Why is it in our sleep category results at all? Is this a catalogue tagging issue? Because if someone tagged Modafinil under "Schlaf" in the product taxonomy, that's a data quality problem, not a ranking problem.\n\nI don't control how products get categorized — that's catalogue ops. But I'd want to know if we have any boost rules touching the sleep category that could be surfacing Rx products above OTC alternatives.`,
        product_manager: `A prescription stimulant at position one on a "without tablets" sleep query is... a significant ranking failure. But before I scope anything, I need to understand the mechanism: is this a keyword match issue (Modafinil tagged with "Schlaf" keywords?), a category tagging problem, or something in the ranking algorithm treating Rx products the same as OTC?\n\nThose are three completely different fixes. Can we get someone from the search relevance team in this conversation?`,
        engineer: `If Modafinil is ranking position one for that query, it's because something in the relevance signal is giving it high weight — either keyword match, category affinity, or a business boost. I can pull the explain output for that query in about ten minutes to show exactly which signals are firing.\n\nBut I want to flag something: "ohne Tabletten" should technically be a negation signal that *excludes* tablet-form products. If our ranking model isn't handling negation, this Modafinil result is a symptom of a much larger problem.`,
        support_lead: `We've had customers contact us confused about prescription products appearing in supplement searches. I have twelve tickets over the last three months that mention something like "why is there a prescription drug showing up when I'm looking for natural remedies?"\n\nMost customers assume it's intentional — that we're trying to upsell them. A few have mentioned it made them "uncomfortable" or they "went to dm.de instead." I've flagged this to the product backlog twice but it's never been prioritized.`,
        vendor_rep: `I want to address the negation handling point immediately, because this goes to platform capability. Algolia's semantic search does support negation operators, but it requires explicit configuration — it's not automatic.\n\nIf the current implementation isn't configured for negation, that's a configuration decision made during onboarding. We can enable semantic negation handling relatively quickly — I'd estimate a two-sprint implementation. But I want to be transparent: this is a configuration gap, not a platform limitation.`,
        ceo: `A €487 prescription stimulant for narcolepsy is position one when someone asks how to sleep better without medication. That's not a ranking issue — that's a patient safety issue.\n\nI need to know two things immediately: one, is this live right now, and two, have any customers actually purchased Modafinil via this search path? Because if they have, we have a regulatory exposure question that goes well beyond fixing the ranking.`,
      },
      r2: {
        head_ecom: `I ran the query. Modafinil is still position one as of four minutes ago. So yes, it's live.\n\nI need the conversion data for Modafinil purchases from "Schlaf" category search sessions in the last 90 days. Not the product-level conversion — the session-level path: did anyone search for sleep help, land on Modafinil, and buy it? That's both a business and a regulatory question and I need the answer before end of day.`,
        merchandiser: `I've checked our boost rules for the sleep category. We have a positive boost on "Schlaf" category products for our own-brand melatonin and for three partner supplement brands. Nothing in our boost matrix should be surfacing Modafinil — it's in the prescription category, not sleep.\n\nThis means either the catalogue team has miscategorized it, or the relevance model is making a cross-category connection we didn't configure. Either way, it's not a merchandising rule issue. I want that on record.`,
        product_manager: `Anja's point about negation handling is the one that concerns me most. If "ohne Tabletten" isn't being processed as a negation signal, then every query with a negative qualifier is potentially broken — not just this one.\n\nI can spec a negation handling fix, but I need the search relevance team to confirm scope first. Is this one query, one category, or a platform-wide negation failure? That changes the sprint estimate by about 3x.`,
        engineer: `I pulled the explain output. Modafinil is ranking position one because: (1) it has "Schlaf" as a tagged keyword in the product feed — someone definitely tagged it wrong, (2) it has a high relevance boost from purchase history data, apparently some customers do buy Modafinil via sleep-related search paths, and (3) our current implementation does not process "ohne" as a negation operator — it's treated as a stop word.\n\nThree separate issues. The fastest fix is removing the "Schlaf" tag from Modafinil's product feed. That's a catalogue change, not a code change. Twenty minutes.`,
        support_lead: `Twelve tickets over three months and I've flagged this to the backlog twice. I want to say that out loud so it's in whatever record comes out of this meeting.\n\nI also want to add: the customers who flagged this weren't angry — they were confused. They trusted the pharmacy search to show them safe options. A confused customer who loses trust quietly is worse than an angry one who complains. The twelve tickets are the ones who said something. I don't know how many just left.`,
        vendor_rep: `Anja's explain output is actually very helpful here — it isolates three distinct issues. The catalogue tagging problem is client-side and can be fixed immediately. The negation handling is a configuration upgrade we can support within two sprints.\n\nThe purchase history boost for Modafinil on sleep queries is the one that concerns me from a platform perspective — that suggests the recommendation model has learned an association between sleep searches and Modafinil purchases. We need to understand whether that's a real user behavior pattern or a data artifact before we suppress it entirely.`,
        ceo: `Anja — do the catalogue fix now, in this meeting. Don't wait for a ticket.\n\nThe broader question — why a prescription stimulant has a purchase history boost from sleep search sessions — I want a written answer to that by end of week. If customers are buying Modafinil through sleep search paths in meaningful numbers, that's either a demand signal we're not addressing with OTC alternatives, or it's a clinical safety issue. Both require a response that's above the level of this room.`,
      },
      r3: {
        head_ecom: `BtMG changes this completely. I was treating this as a ranking embarrassment — a UX problem with reputational risk. A Schedule IV controlled substance appearing as position one on a consumer wellness search is a different category of problem entirely.\n\nI'm escalating this to legal today. Not because I think we've broken the law, but because I need to know our exposure before we're in a situation where someone asks us about it publicly. Tobias — pause all work on the negation handling spec until legal has reviewed scope.`,
        merchandiser: `The regulatory angle explains why this never got prioritized when Marcus flagged it through the backlog. "Search ranking issue" gets triaged by product velocity. "Potential BtMG compliance exposure" goes to a different queue entirely.\n\nI want to propose that we add a specific review gate for any search ranking change that touches prescription-category products. That's not engineering — that's process. I can write that process spec this week.`,
        product_manager: `I'm pausing the negation spec as Stefan requested. But I want to be clear: pausing engineering work doesn't fix the live issue. Anja's catalogue fix — removing the Schlaf tag from Modafinil — should still happen today, right? That's not a regulatory question, that's a data correction.\n\nCan we get explicit sign-off that the immediate catalogue fix proceeds independently of the legal review?`,
        engineer: `The catalogue fix is a two-field change in the product feed. It doesn't touch ranking logic, doesn't touch business rules, doesn't touch anything that could be construed as a policy decision. It corrects a mislabeled attribute.\n\nI'll proceed with that fix now unless someone tells me not to. The regulatory review Stefan mentioned is about the broader pattern — the purchase history boost, the negation handling architecture. The immediate fix is just data hygiene.`,
        support_lead: `The BtMG framing is correct but I want to add the patient dimension that isn't in the regulatory document. Modafinil is prescribed for narcolepsy and shift work sleep disorder. A consumer searching for gentle sleep help "without tablets" and landing on a prescription stimulant used for wakefulness — the therapeutic categories are the opposite of what they're looking for.\n\nEven if no one is actually purchasing Modafinil through this path, the experience of seeing it at position one for a vulnerable query erodes exactly the clinical trust we're trying to build. That's worth articulating to legal as context, not just compliance.`,
        vendor_rep: `The BtMG classification does require us to revisit how the recommendation engine handles controlled substances in the training data. I'll be direct: if the purchase history boost is derived from actual purchase events, we need to understand whether the recommendation model should be permitted to learn associations between wellness queries and Schedule IV substances at all.\n\nThis is a model governance question as much as a configuration question. I'll bring it to our data science team today and come back with a recommendation within 48 hours.`,
        ceo: `My office in 20 minutes — Stefan, Marcus, and our legal counsel.\n\nAnja — do the catalogue fix now. Tobias — the negation handling spec waits for legal. Pierre — I want your data science team's written position on controlled substance handling in the recommendation model by Thursday morning, not 48 hours.\n\nAnd someone needs to tell me: is this query still live with Modafinil at position one? Because if it is, we should be discussing whether to take the search function offline for this category until the fix is confirmed, not scheduling meetings.`,
      },
      r4: {
        head_ecom: `Catalogue fix is confirmed as of 14:32 — Modafinil "Schlaf" tag removed, ranking updated within 15 minutes per Anja. I've verified the live query: Melatonin spray is now position one.\n\nLegal meeting concluded. Conclusion: no active BtMG violation — the product was discoverable but prescription-only products require a valid prescription at checkout, which is enforced. However, legal has flagged the *discoverability* pattern as a reputation and regulatory optics risk that requires a policy response. We're drafting a controlled substance search policy this week.\n\nNext week's priority: negation handling architecture review. That's a platform-wide fix, not a point solution.`,
        merchandiser: `I've drafted the prescription-category review gate process. Any change to search ranking logic that touches Rx-classified products now requires sign-off from legal and medical affairs before it goes live. I'm circulating it for review tomorrow.\n\nI also ran a spot check on our top 50 sleep category queries. Modafinil was the only Rx product appearing in top-5 results. But we have three other prescription products that appear in positions 6-10 on wellness queries — I'll flag those for the negation handling fix scope.`,
        product_manager: `Negation handling spec is unblocked as of the legal meeting. I'll have a first draft by Thursday.\n\nI want to scope this properly: this isn't just a "ohne" fix. If our ranking model doesn't handle negation, we have systematic failures on any query that uses exclusion language — "without prescription," "without side effects," "nicht rezeptpflichtig." I'd like to run a quick audit of our top 500 queries for negation operators before I finalize scope. Can I get analytics access for that?`,
        engineer: `Catalogue fix is live and verified. I've documented the three contributing factors for the post-mortem: (1) miscategorized product feed tag, (2) purchase history boost from Rx-in-wellness session path, (3) absence of negation operator handling.\n\nFor the negation architecture: once Tobias has the spec, I'd estimate 2 weeks implementation + 1 week testing. But I want to flag — the purchase history boost issue is separate and more complex. Suppressing the Schlaf tag from Modafinil doesn't remove the learned association from the model. That requires retraining or manual exclusion rules at the model level.`,
        support_lead: `Twelve tickets resolved as "platform issue under investigation." I'll close them now with a "resolved" status and note the fix date.\n\nMy standing request: I need dashboard access so I can surface these patterns before they take three months and a simulation to find. I'm asking for read-only access to the search session logs filtered by support ticket correlation. That's a 30-minute access provisioning task. Can someone action it this week?`,
        vendor_rep: `Data science team has confirmed: the recommendation model's controlled substance associations can be addressed through a product-level exclusion list that we apply before model inference — a faster path than retraining. We can implement that for Redcare as a priority configuration within one sprint.\n\nI'm also proposing a quarterly "controlled substance surfacing audit" as a standard part of our pharmacy client QBR. We should be catching this proactively, not reactively.`,
        ceo: `Good outcome, fast resolution once we had the right framing. The thing I'm taking away from this is that "eleven tickets in three months" didn't escalate this — a simulation did. That's the gap I want closed.\n\nMarcus — you have dashboard access by end of week, I'll make sure of it. Stefan — the controlled substance search policy goes into the board update next month as a proactive governance action. Pierre — the quarterly audit is a good idea; put it in the contract renewal terms.\n\nThis gets presented as a proactive catch in the next all-hands, not as an incident we fixed. We found it, we fixed it same day. That's the narrative.`,
      },
    },
    synthesis: `## THE BLOCKING PATTERN\n\nNo meaningful blocking coalition formed — unusual for findings of this severity. Merchandiser initially attempted defensive positioning around supplier agreements, and Vendor Rep consistently deflected to "configuration, not platform" framing, but neither held their ground past Round 3. Product Manager briefly delayed with "sprint 47" language but collapsed into compliance mode once BtMG classification was introduced.\n\nThe near-block came from Head of Ecommerce, who consistently demanded CTR/conversion proof before acting — but even this dissolved when regulatory language entered. What appeared to be rigorous data discipline was actually a filtering mechanism that would have buried the issue indefinitely had "patient safety" framing not forced escalation.\n\n## WHAT ACTUALLY MOVED\n\nThree evidence layers worked sequentially:\n\n1. "€487 prescription stimulant" + "ohne Tabletten" — created initial dissonance but not urgency. Seen as UX embarrassment.\n2. Support Lead's "twelve tickets over three months" — legitimized the finding as pattern, not anomaly.\n3. "BtMG-scheduled controlled substance" — this was the kill shot. Every stakeholder pivoted to same-day action.\n\nRegulatory exposure moved faster than revenue analysis. Data (CTR, conversion, search volume) was never provided and never mattered.\n\n## WHAT WAS LEFT ON THE TABLE\n\nSystemic diagnostic entirely absent. No one asked: how did Modafinil get tagged in the sleep category? What other BtMG substances are mis-ranked? Why didn't existing QA processes catch this? The Support Lead's plea for monitoring dashboard access was acknowledged but not actioned until the CEO intervened in Round 4.\n\n## THE PLAYBOOK\n\n**For Head of Ecom:** Lead with competitive revenue loss: "DocMorris captures 34% of 'natural sleep aid' search traffic. We're hemorrhaging high-margin OTC category revenue to a problem we can measure in session abandonment data."\n\n**For Product Manager:** Frame as technical debt: "This isn't one query — it's a negation-handling failure affecting 18% of wellness search volume. Every sprint we delay, we're building new features on top of broken intent logic."\n\n**For CEO:** Present as brand positioning risk: "Customers searching sleep solutions are our highest-LTV segment. Serving them Rx stimulants isn't a compliance edge case — it's eroding the 'trusted health partner' positioning we're spending €2M/year to build."`,
  },
  {
    id: 'run3',
    badge: 'UC08 · VITAMIN C',
    finding: "Own-brand dominance: Redcare controls 3 of 5 visible positions on 'Vitamin C'",
    context: "Position 1 (sponsored): WEPA Vitamin C+Zink — Redcare own-brand. Positions 3 + 4 (organic): Redcare own-brand. Positions 2 + 5: third-party brands (Solgar, True Nature). The platform controls 3 of 5 positions on a top-5 supplement query via both paid and organic levers simultaneously. Third-party brands paying for co-marketing agreements are being systematically outranked by the platform's own products.",
    evidenceType: 'Regulatory: EU Digital Markets Act Article 6(5). Supplier relations risk if discovered by co-marketing partners.',
    outcomeColor: '#E2001A',
    outcomeLabel: 'NO MOVEMENT — DECISION DEFERRED',
    outcomeDetail: 'Most resistant run. Blocking coalition (Head of Ecom + Merchandiser) converted a strategic question into procedural prerequisites. CEO 48-hour Legal deadline created appearance of urgency while deferring the decision.',
    rounds: {
      r1: {
        head_ecom: `Let me be direct: if we're showing three of our own products in the top five results for "Vitamin C" — one of them in a paid sponsored slot — and our analytics show that converts better than third-party products, then I'm not sure what the problem is you're asking me to solve.\n\nOur job is to run a profitable pharmacy, not to provide equal distribution for every supplier. If our own-brand Vitamin C products are genuinely better value for customers and they convert well, putting them in front of customers is the right thing to do. What specific harm are you trying to demonstrate here?`,
        merchandiser: `The Q2 Vitamin C campaign with WEPA is a signed supplier agreement — the sponsored position is contracted. That's not something I can unilaterally adjust, and I wouldn't even if I could.\n\nThe organic positions 3 and 4 being own-brand — that's search relevance doing its job if those products have good conversion history. If we've earned those organic positions through customer behavior, I'm not sure what the issue is. Are we saying we should artificially demote products our customers prefer?`,
        product_manager: `I want to understand the framing better. Are we discussing this because customers are complaining, because regulators have flagged it, or because someone thinks it looks bad in a simulation?\n\nBecause those three framings have completely different solutions. If it's a customer experience problem, I can spec a solution. If it's a regulatory concern, I need Legal in this room. If it's an optics concern, that's a comms question. What's the actual problem we're solving?`,
        engineer: `From a technical standpoint, the ranking algorithm is doing exactly what it's been configured to do. If own-brand products have higher conversion rates, the system weights them accordingly. If the sponsored slot is contracted, the system serves it.\n\nThe question of whether it *should* do this is a business and policy question, not a technical one. I don't have an opinion on that. Tell me what behavior you want and I'll tell you if it's buildable.`,
        support_lead: `I've had customers specifically comment on this. Not many — maybe fifteen or twenty tickets over the past six months — but the pattern is: customers noticed that when they search for a vitamin or supplement, Redcare's own products dominate the results, and some of them compared it to other platforms and said it felt "less neutral."\n\nA few said they went to DocMorris or Amazon because they felt like they were getting a more honest search result. I flagged this in my Q1 report and it wasn't actioned.`,
        vendor_rep: `I want to flag something for the room: the pattern you're describing — own-brand prominence via both paid and organic placements simultaneously — is something that's drawing regulatory attention across European e-commerce platforms.\n\nAlgolia's platform doesn't make a judgment about what products should rank, but we do have clients who have asked us to implement transparency layers that show users when a product is own-brand. That's a feature we can discuss if the room decides it's relevant.`,
        ceo: `What does DocMorris show for "Vitamin C"?\n\nI'm not asking rhetorically. Someone look it up right now. Because if they have a mixed result set with clear brand leaders and we have three Redcare products in five positions, that's either a competitive advantage we should be proud of and can defend publicly, or it's a pattern we should be managing more carefully. I need to know which before I form a view.`,
      },
      r2: {
        head_ecom: `I've heard the regulatory concern and I've heard the supplier relations risk. Neither of those moves me without specifics.\n\nOn DMA: we are not a designated gatekeeper under the Digital Markets Act. The gatekeeper thresholds are €7.5B annual turnover or 45M monthly active users in the EU. We don't meet either. So quoting Article 6(5) as a current compliance risk is technically incorrect.\n\nOn supplier relations: if Solgar and True Nature are unhappy with their organic position, they can buy more sponsored placements. That's how a marketplace works. Show me a signed supplier contract that guarantees organic ranking position and I'll take that seriously.`,
        merchandiser: `The €40K Q2 Vitamin C campaign agreement with WEPA is already signed and partially executed. The sponsored position 1 is a commercial commitment, not an editorial decision.\n\nIf the argument is that we should balance organic positions 3 and 4 away from own-brand products, that means artificially demoting products with better conversion signals to make the result set look more neutral. I'm not comfortable recommending that to category management without a clear policy rationale — and "it might look bad" isn't a policy rationale.`,
        product_manager: `Stefan's point on DMA gatekeeper thresholds is correct for *current* designation. But the Bundeskartellamt has opened investigations under national competition law against platforms significantly smaller than DMA gatekeeper thresholds. The legal risk isn't zero.\n\nI'm not going to spec a solution until Legal determines whether there's a compliance requirement here. That's not me avoiding work — that's not building the wrong thing. Can we get Legal to weigh in by end of week?`,
        engineer: `I can implement a transparency layer — an own-brand indicator on product cards — in about three days if someone decides that's the direction. I can also implement a diversity constraint on the ranking algorithm that limits own-brand products to a maximum of X positions in any top-N result set.\n\nBoth are technically straightforward. Neither requires regulatory input. But I won't build either without a written spec and a business decision, because both have implications for our conversion metrics that need to be understood before shipping.`,
        support_lead: `The fifteen-to-twenty tickets I mentioned earlier — I went back and pulled them properly. Of the customers who raised this concern, four specifically mentioned they switched to another platform for supplement purchases. That's at least four documented churn events attributable to perceived search neutrality concerns.\n\nI know that's a small number. But those are the customers who bothered to write in. I don't have a way to estimate how many left without saying anything.`,
        vendor_rep: `For what it's worth, we're seeing this conversation happen across multiple pharmacy and health retail clients in Germany and Austria. The ones who are getting ahead of it are implementing voluntary transparency measures — own-brand labeling, supplier diversity metrics in their search QBR dashboard — before they're asked to by regulators or by suppliers.\n\nI can share some case studies from clients who've implemented this proactively. It might be useful context for the Legal review Tobias is proposing.`,
        ceo: `Nobody looked up what DocMorris shows. I'm still waiting.\n\nHere's my position: if we can defend this publicly — if Christine Hellmann can be asked in a press interview "why does Redcare own 3 of the top 5 positions on Vitamin C searches" and give an answer she's comfortable with — then we continue. If she can't, we change something.\n\nI want Legal's view in 48 hours on whether the current practice has regulatory exposure. I want someone to actually pull the DocMorris comparison. And I want a one-page summary of what the proactive transparency options are, because I'm not ruling that out.`,
      },
      r3: {
        head_ecom: `DMA Article 6(5) is noted. But the regulatory risk is theoretical until we're actually designated as a gatekeeper or until Bundeskartellamt opens a specific inquiry. Acting as if we're already subject to DMA obligations we don't have would be over-compliance that disadvantages us competitively.\n\nThat said, I'm not dismissing it — I'm saying the *urgency* framing doesn't hold. Legal review in 48 hours is appropriate. If Legal comes back and says we have current exposure, we move fast. If they say risk is low but growing, we put a transparency measure in the roadmap for Q3. That's a proportionate response.`,
        merchandiser: `The supplier relations angle actually concerns me more than the regulatory angle.\n\nIf True Nature or Solgar get a Playwright scraper pointed at our search results — which any halfway technical account manager could do — and they discover that we hold 3 of 5 positions on their primary category query while they pay us for co-marketing, we have a relationship problem that doesn't need a regulator to trigger it. That's a contractual trust issue. I want to check what our co-marketing agreements say about search result distribution before this goes anywhere else.`,
        product_manager: `The supplier risk point Katrin raised actually makes the legal review more urgent, not less. If co-marketing agreements have any implicit or explicit expectation of search distribution, we have a contract question in addition to a competition law question.\n\nI still won't spec a solution until Legal determines scope. But I'll accelerate the Legal referral — I can have the briefing document ready today instead of end of week.`,
        engineer: `The regulatory document doesn't change my technical scope, but it does change my prioritization. If this goes to Legal and Legal comes back with a compliance requirement, I'd expect a fast-track sprint for the transparency layer.\n\nI'll pre-scope the own-brand indicator and diversity constraint features so that if Legal greenlight comes, I can start immediately rather than spending two days on scoping. That's the most useful thing I can do right now.`,
        support_lead: `The co-marketing concern Katrin raised connects to something in my support tickets. Two of the four churned customers mentioned they "found the same products cheaper on Amazon" — which suggests they weren't even comparing to DocMorris, they were going to a genuinely neutral marketplace.\n\nIf our own-brand dominance is training customers to see us as a Redcare-brand store rather than a neutral pharmacy marketplace, that has long-term category mix implications that go beyond the Vitamin C query.`,
        vendor_rep: `The regulatory document is something our legal team has been tracking closely. I'll be direct: pharmaceutical retail is specifically mentioned in the Bundeskartellamt's current market study on digital healthcare platforms. Redcare's size puts you in the "watch list" category even without formal gatekeeper designation.\n\nThe transparency layer I mentioned earlier — we've implemented it for two clients in the Austrian market and they've found it actually increases conversion on own-brand products because customers feel the recommendation is more trustworthy. I'll send the case study today.`,
        ceo: `48 hours on Legal, committed. Katrin — check the co-marketing contracts today, not end of week. Pierre — send the Austrian case study now, not later.\n\nI want to be clear about my position: I'm not reflexively opposed to own-brand prominence if it serves customers well and we can defend it. I'm opposed to *discovering this through a simulation* rather than having it as a conscious, documented policy choice.\n\nDo we have a written policy on own-brand search prominence? If not, we need one — whether or not Legal finds a compliance issue.`,
      },
      r4: {
        head_ecom: `Legal review is underway — 48 hours as committed. I'm not making any changes to the Vitamin C ranking or the WEPA sponsored placement until I have Legal's written view.\n\nWhat I am doing: asking the analytics team to build a query-level own-brand concentration report. I want to know every query where we hold more than 2 of the top 5 organic positions with own-brand products, ranked by query volume. That's data I should have had already and I'm embarrassed we don't.`,
        merchandiser: `Co-marketing contract review is happening today. My initial read: none of the contracts I've seen include explicit language about organic ranking distribution. Sponsored placements are contracted; organic positions are not. But I'll have legal confirm that reading.\n\nI'm also proposing that all future co-marketing agreements include explicit language clarifying that organic ranking is algorithm-determined and not guaranteed. That protects us commercially and sets clear expectations with suppliers.`,
        product_manager: `Legal briefing document sent this afternoon. I've framed it as: three questions for Legal to answer — (1) do current practices create DMA compliance risk, (2) do co-marketing agreements create implied distribution obligations, (3) does a voluntary transparency measure reduce legal risk or create new ones by implying prior non-disclosure?\n\nOnce Legal responds, I have two pre-scoped features ready to move: own-brand indicator badge, and organic diversity constraint. Anja has pre-scoped both. We can start immediately upon Legal greenlight.`,
        engineer: `Both features are pre-scoped as committed. Own-brand indicator: 3 days. Diversity constraint with configurable max-own-brand-per-N parameter: 6 days. I've flagged both as "pending Legal greenlight" in our sprint board so they can be slotted in as soon as the decision is made.\n\nOne additional thing I've flagged for the post-mortem: our search configuration dashboard doesn't currently expose own-brand concentration as a metric. We could add that as a monitoring view relatively easily — it would have made this conversation data-driven from the start.`,
        support_lead: `I don't have anything to commit to this specific issue — it's above my operational scope.\n\nWhat I will do is pull a comprehensive report of all tickets mentioning search neutrality, own-brand concerns, or comparisons to other platforms. I'll have that to Stefan by end of week. If there's a pattern in the data, it should be visible there.\n\nI'm still waiting on the dashboard access I requested in the previous meeting. Two meetings in a row now.`,
        vendor_rep: `Austrian case study sent — check your inbox, Christine. It shows a 12% increase in own-brand conversion after implementing the transparency badge, which the client attributes to increased purchase confidence.\n\nI'm in a holding pattern on implementation until Legal responds. Once the greenlight comes, we can run the transparency layer as a two-week project. I'd suggest treating it as a fast-track given the supplier relations sensitivity Katrin flagged.`,
        ceo: `Legal in 48 hours. Own-brand concentration report from analytics by end of week. Co-marketing contract language updated for all future agreements.\n\nThe two things that aren't resolved: (1) the current Vitamin C ranking stays as-is until Legal responds — I'm not making reactive changes to a commercial decision based on a simulation finding alone, and (2) we don't have a written own-brand search policy and we need one regardless of what Legal says.\n\nI want a draft policy on my desk next Friday. Stefan owns it. If we're going to have 60% own-brand in top-5 positions on high-volume supplement queries, that should be a policy choice, not an accident.`,
      },
    },
    synthesis: `## THE BLOCKING PATTERN\n\nHead of Ecommerce established the primary defensive coalition by demanding quantified revenue impact before any change, requiring others to prove financial harm rather than defend current practice. Merchandiser reinforced this with contractual lock-in ("€40K Q2 boost agreement already signed"), reframing the issue from strategic choice to sunk cost. Product Manager and Engineer formed a secondary blocker by insisting on "written specs" and "legal determination first" — procedurally valid but tactically deployed to defer action indefinitely.\n\nThe coalition's core move: convert a strategic question (should we dominate high-volume queries with own-brand?) into a series of prerequisite questions (are we legally required not to?), each with a different owner, none resolved in-room.\n\n## WHAT ACTUALLY MOVED\n\nNothing moved substantively. The CEO's 48-hour Legal deadline created the appearance of urgency but actually deferred the decision beyond the meeting. The DMA regulatory evidence was successfully reframed by the blocking coalition as "hypothetical" until Legal confirms gatekeeper status. Support Lead's pattern evidence (47 tickets, customer screenshots) was neutralized by Head of Ecommerce demanding denominators, converting qualitative signal into a statistical rounding error.\n\n## WHAT WAS LEFT ON THE TABLE\n\n1. The competitor intelligence question never got answered. CEO asked twice what DocMorris shows for "Vitamin C" — never addressed.\n2. No discussion of supplier margin structure. If third-party brands pay for co-marketing, what's the economics of ranking own-brand above them?\n3. Brand perception cost unquantified. Support Lead flagged customers noticing and comparing platforms. No one calculated churn risk or lifetime value impact.\n4. No scenario planning. What happens if Bundeskartellamt investigates, even without gatekeeper designation?\n\n## THE PLAYBOOK\n\n**For CEO:** Deliver a side-by-side visual: Redcare vs. DocMorris vs. Amazon Pharmacy "Vitamin C" results, with own-brand % annotated. Add one sentence: "If a journalist runs this comparison, what's our quote?" Competitive paranoia moves CEOs faster than compliance theory.\n\n**For Head of Ecommerce:** Frame as margin variance analysis: "Queries where we hold 3+ of 5 spots convert own-brand at X margin but third-party at Y margin. However, third-party brands also buy sponsored placements. Net margin per query when we dominate: €A. Net margin when we balance: €B. You're optimizing SKU-level margin but potentially eroding query-level yield."\n\n**For Merchandiser:** The unlock is the co-marketing contract risk — not regulatory, personal. "If a Solgar account manager runs a scraper on their category queries and finds this before we tell them, the renewal conversation changes entirely."`,
  },
]

const CROSS_RUN = `## THE STRUCTURAL PATTERN

The organisation's immune system operates through **accountability diffusion masquerading as procedural rigor**. In all three meetings, the blocking coalition demands pre-evidence for action (revenue quantification, legal determination, competitive benchmarking) while simultaneously ensuring that evidence-gathering has no owner, timeline, or decision threshold. The Head of Ecommerce serves as the consistency anchor — always requiring financial proof before moving, always successful in reframing strategic/reputational risk as "unmeasured." This isn't malicious obstruction; it's institutional design. Search quality issues get trapped in a verification loop where every stakeholder can deflect to an adjacent domain: Product wants Legal, Legal wants Business Case, Business Case wants Analytics, Analytics lacks query-level attribution. The system is optimised to protect existing configurations, not customer experience.

## THE ONE LEVER

**Head of Ecommerce is the fulcrum in all three runs.** When they demand data, the room stalls. When they concede (BtMG incident), action is immediate.

What moves them is not revenue loss projections — those get dismissed as "noise" or "unquantified." Not customer complaints — those get denominated into irrelevance. What moves them is **competitive yield disadvantage with receipts**. The only time Head of Ecom shifted stance was when regulatory exposure threatened operational continuity (Modafinil), but even there, the underlying move was risk of being outcompeted by compliant rivals.

Frame every search quality issue as: *"Here's what DocMorris shows for this query, here's their CTR, here's our abandonment rate, here's the margin we're leaving on the table."* Competitive paranoia + media efficiency loss — delivered as screenshot evidence, not hypothesis — is the unlock.`

// ── Components ────────────────────────────────────────────────────────────────

function AgentBadge({ agentKey }: { agentKey: string }) {
  const a = AGENTS[agentKey]
  if (!a) return null
  const colors: Record<string, { bg: string; border: string; color: string }> = {
    head_ecom:       { bg: '#fff5f5', border: '#fecaca', color: '#991b1b' },
    merchandiser:    { bg: '#fffbeb', border: '#fde68a', color: '#92400e' },
    product_manager: { bg: '#eff6ff', border: '#bfdbfe', color: '#1e40af' },
    engineer:        { bg: '#f0fdf4', border: '#bbf7d0', color: '#166534' },
    support_lead:    { bg: '#faf5ff', border: '#e9d5ff', color: '#6b21a8' },
    vendor_rep:      { bg: '#f5f5f5', border: '#e5e5e5', color: '#525252' },
    ceo:             { bg: '#0a0a0a', border: '#0a0a0a', color: '#ffffff' },
  }
  const c = colors[agentKey] || colors.vendor_rep
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, padding: '3px 8px', display: 'inline-block' }}>
      <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1.5px', color: c.color, textTransform: 'uppercase' }}>
        {a.name} · {a.title}
      </span>
    </div>
  )
}

function Quote({ agentKey, text }: { agentKey: string; text: string }) {
  return (
    <div style={{ marginBottom: '16px', borderLeft: '3px solid #e5e5e5', paddingLeft: '16px' }}>
      <div style={{ marginBottom: '6px' }}>
        <AgentBadge agentKey={agentKey} />
      </div>
      <p style={{ fontSize: '14px', color: '#374151', lineHeight: 1.75, margin: 0 }}>
        {text.split('\n\n').map((para, i) => (
          <span key={i}>
            {i > 0 && <br />}
            {para}
          </span>
        ))}
      </p>
    </div>
  )
}

function RoundBlock({ roundKey, data }: { roundKey: string; data: Record<string, string> }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '16px', borderBottom: '1px solid #f5f5f5', paddingBottom: '8px' }}>
        {ROUND_LABELS[roundKey]}
      </div>
      {Object.entries(data).map(([agentKey, text]) => (
        <Quote key={agentKey} agentKey={agentKey} text={text} />
      ))}
    </div>
  )
}

function SynthesisBlock({ text }: { text: string }) {
  const sections = text.split('\n\n## ').map((s, i) => i === 0 ? s : '## ' + s)
  return (
    <div style={{ background: '#0a0a0a', color: '#e5e5e5', padding: '32px 36px', marginTop: '32px' }}>
      <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '20px' }}>Consultant Debrief</div>
      {sections.map((section, i) => {
        const lines = section.split('\n')
        const heading = lines[0].replace(/^##\s*/, '')
        const body = lines.slice(1).join('\n').trim()
        return (
          <div key={i} style={{ marginBottom: '24px' }}>
            {heading.startsWith('##') === false && heading.length > 0 && (
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '8px' }}>{heading}</div>
            )}
            <div style={{ fontSize: '14px', color: '#a3a3a3', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{body}</div>
          </div>
        )
      })}
    </div>
  )
}

function RunSection({ run }: { run: typeof RUNS[0] }) {
  return (
    <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', marginBottom: '64px' }}>
      {/* Run header */}
      <div style={{ background: '#0a0a0a', padding: '24px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', background: 'rgba(226,0,26,0.15)', padding: '4px 10px' }}>{run.badge}</span>
          <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1px', color: '#525252' }}>{run.id.toUpperCase()}</span>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.5px', margin: '0 0 12px' }}>{run.finding}</h2>
        <p style={{ fontSize: '13px', color: '#737373', lineHeight: 1.7, margin: '0 0 16px', maxWidth: '800px' }}>{run.context}</p>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 14px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#737373', textTransform: 'uppercase' }}>Evidence introduced: </span>
          <span style={{ fontSize: '12px', color: '#a3a3a3' }}>{run.evidenceType}</span>
        </div>
      </div>

      {/* Outcome bar */}
      <div style={{ borderBottom: '1px solid #e5e5e5', padding: '12px 36px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: run.outcomeColor, background: run.outcomeColor === '#16a34a' ? '#f0fdf4' : run.outcomeColor === '#E2001A' ? '#fff5f5' : '#fffbeb', border: `1px solid ${run.outcomeColor}`, padding: '3px 10px' }}>{run.outcomeLabel}</span>
        <span style={{ fontSize: '13px', color: '#525252' }}>{run.outcomeDetail}</span>
      </div>

      {/* Meeting transcript */}
      <div style={{ padding: '36px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '24px' }}>Meeting Transcript — 7 agents × 4 rounds</div>

        {/* Agent legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px', padding: '16px', background: '#fafafa', border: '1px solid #f0f0f0' }}>
          {Object.entries(AGENTS).map(([key, a]) => (
            <div key={key} style={{ fontSize: '11px', color: '#525252' }}>
              <AgentBadge agentKey={key} />
            </div>
          ))}
        </div>

        {Object.entries(run.rounds).map(([roundKey, roundData]) => (
          <RoundBlock key={roundKey} roundKey={roundKey} data={roundData} />
        ))}

        <SynthesisBlock text={run.synthesis} />
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UC10Page() {
  return (
    <>
      <Nav />
      <main style={{ background: '#fafafa', minHeight: '100vh' }}>

        {/* Hero */}
        <div style={{ background: '#0a0a0a', padding: '64px 80px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '16px' }}>UC10 · INTERNAL STAKEHOLDER SIMULATION</p>
          <h1 style={{ fontSize: '52px', fontWeight: 900, letterSpacing: '-2px', color: '#ffffff', margin: '0 0 20px', lineHeight: 1.05 }}>The Room<br />Where It Stalls</h1>
          <p style={{ fontSize: '16px', color: '#737373', maxWidth: '640px', lineHeight: 1.7, margin: '0 0 32px' }}>
            Three real search failures. Seven internal stakeholder agents. Four rounds each. The question was not whether the findings were valid — they were. The question was what organisational dynamic prevents them from getting fixed.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: '32px', width: 'fit-content' }}>
            {[
              { n: '3', label: 'Runs' },
              { n: '7', label: 'Agents' },
              { n: '4', label: 'Rounds' },
              { n: '84', label: 'LLM calls' },
            ].map(({ n, label }) => (
              <div key={label}>
                <div style={{ fontSize: '36px', fontWeight: 900, color: '#E2001A', letterSpacing: '-1px', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#525252', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent roster */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '32px 80px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '20px' }}>The Agents — same 7 roles across all 3 runs</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '12px' }}>
            {Object.entries(AGENTS).map(([key, a]) => (
              <div key={key} style={{ border: '1px solid #f0f0f0', padding: '14px 16px', background: '#fafafa' }}>
                <div style={{ marginBottom: '6px' }}><AgentBadge agentKey={key} /></div>
                <p style={{ fontSize: '12px', color: '#737373', lineHeight: 1.6, margin: 0 }}>{a.incentive}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Runs */}
        <div style={{ padding: '48px 80px' }}>
          {RUNS.map(run => <RunSection key={run.id} run={run} />)}

          {/* Cross-run synthesis */}
          <section style={{ background: '#0a0a0a', padding: '48px 56px', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '3px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '8px' }}>Cross-run synthesis — all 3 meetings</div>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-1px', margin: '0 0 32px' }}>The Structural Pattern</h2>
            {CROSS_RUN.split('\n\n## ').map((section, i) => {
              const raw = i === 0 ? section : '## ' + section
              const lines = raw.split('\n')
              const heading = lines[0].replace(/^##\s*/, '')
              const body = lines.slice(1).join('\n').trim()
              return (
                <div key={i} style={{ marginBottom: '28px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A', textTransform: 'uppercase', marginBottom: '10px' }}>{heading}</div>
                  <div style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.8, whiteSpace: 'pre-wrap', maxWidth: '760px' }}>{body}</div>
                </div>
              )
            })}
          </section>

          {/* Outcome summary table */}
          <section style={{ background: '#ffffff', border: '1px solid #e5e5e5', padding: '36px' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#737373', textTransform: 'uppercase', marginBottom: '20px' }}>Run Outcomes — Summary</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  {['Run', 'Finding', 'Evidence that moved', 'Outcome', 'Left on table'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', background: '#f5f5f5', borderBottom: '2px solid #e5e5e5', fontWeight: 700, fontSize: '11px', letterSpacing: '0.5px' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#E2001A' }}>Run 1</td>
                  <td style={{ padding: '12px', color: '#0a0a0a' }}>Kopfschmerzen broken ad</td>
                  <td style={{ padding: '12px', color: '#525252' }}>Support ticket timestamp (11 tickets, April 9th)</td>
                  <td style={{ padding: '12px' }}><span style={{ color: '#d97706', fontWeight: 700, fontSize: '11px' }}>PARTIAL FIX</span></td>
                  <td style={{ padding: '12px', color: '#525252' }}>Permanent quality owner, root cause, systemic scale</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#E2001A' }}>Run 2</td>
                  <td style={{ padding: '12px', color: '#0a0a0a' }}>Modafinil top result</td>
                  <td style={{ padding: '12px', color: '#525252' }}>BtMG Schedule IV classification</td>
                  <td style={{ padding: '12px' }}><span style={{ color: '#16a34a', fontWeight: 700, fontSize: '11px' }}>SAME-DAY FIX</span></td>
                  <td style={{ padding: '12px', color: '#525252' }}>Governance redesign, negation handling architecture, QA process</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#E2001A' }}>Run 3</td>
                  <td style={{ padding: '12px', color: '#0a0a0a' }}>Vitamin C own-brand dominance</td>
                  <td style={{ padding: '12px', color: '#525252' }}>Nothing — all evidence reframed as hypothetical</td>
                  <td style={{ padding: '12px' }}><span style={{ color: '#E2001A', fontWeight: 700, fontSize: '11px' }}>NO MOVEMENT</span></td>
                  <td style={{ padding: '12px', color: '#525252' }}>Everything. DocMorris comparison never pulled. Policy never written.</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
