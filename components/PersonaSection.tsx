import type { Persona } from '@/data/personas'
import StateBar from './StateBar'
import TrustSignals from './TrustSignals'
import CompetitorMap from './CompetitorMap'

interface PersonaSectionProps {
  persona: Persona
  alt?: boolean
}

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x/micah/svg'

function avatarUrl(seed: string, bg: string): string {
  return `${DICEBEAR_BASE}?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`
}

function queryTagStyle(type: 'entry' | 'reformulation' | 'friction'): React.CSSProperties {
  if (type === 'friction') return { borderColor: '#E2001A', color: '#E2001A' }
  if (type === 'reformulation') return { borderColor: '#0a0a0a', color: '#0a0a0a' }
  return { borderColor: '#e5e5e5', color: '#0a0a0a' }
}

export default function PersonaSection({ persona, alt = false }: PersonaSectionProps) {
  return (
    <section
      className="px-20 py-20"
      style={{
        background: alt ? '#fafafa' : '#ffffff',
        borderTop: '1px solid #e5e5e5',
      }}
    >
      {/* 1. Header row */}
      <div className="flex items-start gap-6 mb-2">
        <div className="flex-1">
          <div className="flex items-baseline gap-4 mb-2">
            <span
              className="font-black tracking-widest"
              style={{ fontSize: '13px', color: '#E2001A', letterSpacing: '2px' }}
            >
              {persona.number} —
            </span>
            <h2
              className="font-black leading-none"
              style={{ fontSize: '42px', letterSpacing: '-2px', color: '#0a0a0a' }}
            >
              {persona.name.toUpperCase()}
            </h2>
          </div>

          {/* 2. German subtitle */}
          <p
            className="italic mb-3"
            style={{ fontSize: '14px', color: '#737373' }}
          >
            {persona.personaTypeDE}
          </p>

          {/* 3. Meta strip */}
          <div
            className="flex gap-4 pb-4 mb-10"
            style={{ borderBottom: '1px solid #e5e5e5' }}
          >
            {[
              ['Age', persona.age],
              ['Device', persona.device],
              ['City', persona.city],
              ['Patience', persona.patienceScore],
              ['Scroll depth', `${persona.scrollThreshold} results`],
              ['Reformulations', `${persona.reformulationTolerance} max`],
            ].map(([label, value]) => (
              <div key={label}>
                <span
                  className="font-bold uppercase"
                  style={{ fontSize: '11px', letterSpacing: '1px', color: '#737373' }}
                >
                  {label}{' '}
                </span>
                <span
                  className="font-bold"
                  style={{ fontSize: '11px', color: '#0a0a0a' }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Avatar */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl(persona.avatarSeed, persona.avatarBg)}
          alt={`Avatar for ${persona.name}`}
          width={100}
          height={100}
          style={{
            borderRadius: '50%',
            border: '2px solid #e5e5e5',
            flexShrink: 0,
          }}
        />
      </div>

      {/* 4. Voice quote */}
      <div
        className="mb-12 py-5 px-7"
        style={{ borderLeft: '4px solid #E2001A' }}
      >
        <p
          className="font-bold uppercase mb-2.5"
          style={{ fontSize: '10px', letterSpacing: '2px', color: '#E2001A' }}
        >
          IN THEIR OWN WORDS
        </p>
        <p
          className="italic font-normal leading-relaxed"
          style={{ fontSize: '20px', color: '#0a0a0a' }}
        >
          &ldquo;{persona.voice}&rdquo;
        </p>
      </div>

      {/* 5. Two-column: state bars + triggers */}
      <div className="grid grid-cols-2 gap-16 mb-12">
        <div>
          <p
            className="font-bold uppercase mb-4 pb-2"
            style={{
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#737373',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            Psychological State at Session Start
          </p>
          <StateBar
            label="Cognitive Load"
            value={persona.initialState.cognitiveLoad.value}
            reason={persona.initialState.cognitiveLoad.reason}
          />
          <StateBar
            label="Urgency"
            value={persona.initialState.urgency.value}
            reason={persona.initialState.urgency.reason}
          />
          <StateBar
            label="Anxiety"
            value={persona.initialState.anxiety.value}
            reason={persona.initialState.anxiety.reason}
          />
        </div>

        <div>
          <p
            className="font-bold uppercase mb-4 pb-2"
            style={{
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#737373',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            What Brings Them Here
          </p>
          <ul className="space-y-3 mb-8">
            {persona.sessionTriggers.map((trigger) => (
              <li key={trigger} className="flex gap-2.5 items-start">
                <span
                  className="mt-1.5 shrink-0 rounded-full"
                  style={{ width: '6px', height: '6px', background: '#E2001A', display: 'inline-block' }}
                />
                <span style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: '1.4' }}>
                  {trigger}
                </span>
              </li>
            ))}
          </ul>

          <p
            className="font-bold uppercase mb-3 pb-2"
            style={{
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#737373',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            Abandon Condition
          </p>
          <div
            className="p-3.5"
            style={{ border: '1px solid #E2001A', background: '#fff5f5' }}
          >
            <p style={{ fontSize: '12px', color: '#0a0a0a', lineHeight: '1.5' }}>
              {persona.abandonCondition}
            </p>
          </div>
        </div>
      </div>

      {/* 6. Search vocabulary */}
      <div className="mb-12">
        <p
          className="font-bold uppercase mb-4 pb-2"
          style={{
            fontSize: '10px',
            letterSpacing: '2px',
            color: '#737373',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          Search Vocabulary
        </p>
        <div className="space-y-5">
          {persona.queryVocabulary.map((group) => (
            <div key={group.label}>
              <p
                className="uppercase mb-2"
                style={{ fontSize: '10px', letterSpacing: '1px', color: '#737373', fontWeight: 700 }}
              >
                {group.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.queries.map((q) => (
                  <span
                    key={q}
                    className="px-3 py-1 border rounded-sm"
                    style={{
                      fontFamily: "'SF Mono', 'Fira Code', monospace",
                      fontSize: '12px',
                      ...queryTagStyle(group.type),
                    }}
                  >
                    {q}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Trust signal weights */}
      <div className="mb-12">
        <p
          className="font-bold uppercase mb-4 pb-2"
          style={{
            fontSize: '10px',
            letterSpacing: '2px',
            color: '#737373',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          Trust Signal Weights — what they need to see to click
        </p>
        <TrustSignals signals={persona.trustSignalWeights} />
      </div>

      {/* 8. Reformulation strategy */}
      <div className="mb-12">
        <p
          className="font-bold uppercase mb-4 pb-2"
          style={{
            fontSize: '10px',
            letterSpacing: '2px',
            color: '#737373',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          Reformulation Strategy
        </p>
        <p
          className="mb-3 font-bold"
          style={{ fontSize: '12px', color: '#0a0a0a' }}
        >
          Pattern: {persona.reformulationStrategy.pattern}
        </p>
        <ol className="space-y-2 mb-4 list-none">
          {persona.reformulationStrategy.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="font-black shrink-0"
                style={{ fontSize: '12px', color: '#E2001A', minWidth: '20px' }}
              >
                {i + 1}.
              </span>
              <span style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: '1.4' }}>
                {step}
              </span>
            </li>
          ))}
        </ol>
        <p
          className="italic"
          style={{ fontSize: '12px', color: '#525252', lineHeight: '1.5' }}
        >
          Linguistic style: {persona.reformulationStrategy.linguisticStyle}
        </p>
      </div>

      {/* 9. Competitor exit map */}
      <div className="mb-12">
        <p
          className="font-bold uppercase mb-4 pb-2"
          style={{
            fontSize: '10px',
            letterSpacing: '2px',
            color: '#737373',
            borderBottom: '1px solid #e5e5e5',
          }}
        >
          Where They Go When Search Fails
        </p>
        <CompetitorMap exits={persona.competitorExitMap} />
      </div>

      {/* 10. Post-session outcomes */}
      <p
        className="font-bold uppercase mb-4 pb-2"
        style={{
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#737373',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        Post-Session Behavior
      </p>
      <div
        className="grid grid-cols-3 mb-12"
        style={{ gap: '1px', background: '#e5e5e5', border: '1px solid #e5e5e5' }}
      >
        {[
          { label: '✓ Success', key: 'success', color: '#16a34a' },
          { label: '~ Partial', key: 'partial', color: '#d97706' },
          { label: '✕ Failure', key: 'failure', color: '#E2001A' },
        ].map(({ label, key, color }) => (
          <div key={key} className="p-5" style={{ background: '#ffffff' }}>
            <p
              className="font-bold uppercase mb-2.5"
              style={{ fontSize: '10px', letterSpacing: '2px', color }}
            >
              {label}
            </p>
            <p style={{ fontSize: '12px', color: '#525252', lineHeight: '1.5' }}>
              {persona.postSessionBehavior[key as keyof typeof persona.postSessionBehavior]}
            </p>
          </div>
        ))}
      </div>

      {/* 11. Failure modes */}
      <p
        className="font-bold uppercase mb-4 pb-2"
        style={{
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#737373',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        Documented Failure Modes
      </p>
      <div className="space-y-2.5">
        {persona.failureModes.map((fm) => (
          <div
            key={fm}
            className="flex gap-2.5 p-3"
            style={{ borderLeft: '2px solid #E2001A', background: '#fff5f5' }}
          >
            <p style={{ fontSize: '12px', color: '#0a0a0a', lineHeight: '1.4' }}>{fm}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
