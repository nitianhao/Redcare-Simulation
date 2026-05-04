import type { Persona } from '@/data/personas'
import type { CSSProperties } from 'react'
import StateBar from './StateBar'
import TrustSignals from './TrustSignals'
import CompetitorMap from './CompetitorMap'

interface PersonaSectionProps {
  persona: Persona
  alt?: boolean
}

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x/personas/svg'

function avatarUrl(seed: string, bg: string): string {
  return `${DICEBEAR_BASE}?seed=${encodeURIComponent(seed)}&backgroundColor=${bg}`
}

function queryTagStyle(type: 'entry' | 'reformulation' | 'friction'): CSSProperties {
  if (type === 'friction') return { borderColor: '#E2001A', color: '#E2001A' }
  if (type === 'reformulation') return { borderColor: '#0a0a0a', color: '#0a0a0a' }
  return { borderColor: '#e5e5e5', color: '#0a0a0a' }
}

function thoughtChain(voice: string): string[] {
  return voice
    .split(/[.!?]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 6)
}

export default function PersonaSection({ persona, alt = false }: PersonaSectionProps) {
  const thoughts = thoughtChain(persona.voice)

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
            className="mb-4 inline-block"
            style={{
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '0.2px',
              color: '#991b1b',
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              padding: '6px 10px',
            }}
          >
            {persona.personaType}
          </p>

          {/* 3. Meta strip */}
          <div
            className="flex flex-wrap gap-2.5 pb-5 mb-10"
            style={{ borderBottom: '1px solid #d4d4d4' }}
          >
            {[
              ['Age', persona.age],
              ['Device', persona.device],
              ['City', persona.city],
              ['Patience', persona.patienceScore],
              ['Scroll depth', `${persona.scrollThreshold} results`],
              ['Reformulations', `${persona.reformulationTolerance} max`],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  background: '#ffffff',
                  border: '1px solid #d4d4d4',
                  padding: '7px 10px',
                  minWidth: '120px',
                }}
              >
                <span
                  className="font-bold uppercase"
                  style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#525252', display: 'block' }}
                >
                  {label}
                </span>
                <span
                  className="font-bold"
                  style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: 1.2 }}
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
          loading="lazy"
          style={{
            borderRadius: '50%',
            border: '2px solid #e5e5e5',
            flexShrink: 0,
          }}
        />
      </div>

      {/* 4. Inner monologue thought chain */}
      <div
        className="mb-12 p-6"
        style={{ border: '1px solid #fecaca', background: '#fff7f7' }}
      >
        <p
          className="font-bold uppercase mb-4"
          style={{ fontSize: '10px', letterSpacing: '2px', color: '#E2001A' }}
        >
          Inner Monologue - Thought Chain
        </p>
        <div className="flex flex-wrap items-stretch gap-2.5">
          {thoughts.map((thought, idx) => (
            <div key={`${persona.id}-thought-${idx}`} className="flex items-center gap-2.5">
              <article
                className="p-3"
                style={{
                  background: '#ffffff',
                  border: '1px solid #e5e5e5',
                  maxWidth: '330px',
                  minHeight: '78px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <p
                  className="font-black uppercase mb-2"
                  style={{ fontSize: '10px', letterSpacing: '1px', color: '#E2001A' }}
                >
                  Thought {idx + 1}
                </p>
                <p style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: '1.55' }}>
                  {thought}
                </p>
              </article>
              {idx < thoughts.length - 1 && (
                <span
                  aria-hidden="true"
                  style={{ fontSize: '12px', fontWeight: 900, color: '#a3a3a3', letterSpacing: '0.5px' }}
                >
                  -&gt;
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-5 p-4" style={{ border: '1px solid #f3d5d8', background: '#ffffff' }}>
          <p
            className="font-bold uppercase mb-2"
            style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#991b1b' }}
          >
            Their Full Story
          </p>
          <p
            className="italic font-normal leading-relaxed"
            style={{ fontSize: '17px', color: '#0a0a0a' }}
          >
            &ldquo;{persona.voice}&rdquo;
          </p>
        </div>
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
        <p
          className="mb-4"
          style={{ fontSize: '12px', color: '#525252', lineHeight: 1.6, maxWidth: '900px' }}
        >
          These are representative examples only. For each persona, the simulator can generate
          thousands of realistic query variations using the same behavioral intent, language
          structure, and reformulation patterns.
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
            <li key={step} className="flex gap-3">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          {
            label: 'If Search Works Well',
            key: 'success',
            color: '#15803d',
            bg: '#f0fdf4',
            border: '#bbf7d0',
          },
          {
            label: 'If Search Is Only Partly Helpful',
            key: 'partial',
            color: '#b45309',
            bg: '#fffbeb',
            border: '#fde68a',
          },
          {
            label: 'If Search Fails',
            key: 'failure',
            color: '#b91c1c',
            bg: '#fef2f2',
            border: '#fecaca',
          },
        ].map(({ label, key, color, bg, border }) => (
          <article
            key={key}
            className="p-5"
            style={{ background: bg, border: `1px solid ${border}` }}
          >
            <p
              className="font-bold uppercase mb-2"
              style={{ fontSize: '11px', letterSpacing: '1.4px', color }}
            >
              {label}
            </p>
            <p
              className="font-black uppercase mb-3"
              style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#525252' }}
            >
              Typical Reaction
            </p>
            <p style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: '1.65' }}>
              {persona.postSessionBehavior[key as keyof typeof persona.postSessionBehavior]}
            </p>
          </article>
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
      <p
        className="mb-4"
        style={{ fontSize: '12px', color: '#525252', lineHeight: 1.6, maxWidth: '900px' }}
      >
        These are recurring ways search can break this persona&apos;s journey and increase the
        risk of abandonment, mistrust, or basket loss.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {persona.failureModes.map((fm, idx) => (
          <article
            key={fm}
            className="p-4"
            style={{ border: '1px solid #fecaca', background: '#fef2f2' }}
          >
            <p
              className="font-bold uppercase mb-2"
              style={{ fontSize: '10px', letterSpacing: '1.2px', color: '#b91c1c' }}
            >
              Failure Risk {idx + 1}
            </p>
            <p style={{ fontSize: '13px', color: '#0a0a0a', lineHeight: '1.6' }}>{fm}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
