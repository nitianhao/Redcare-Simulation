import Hero from '@/components/Hero'
import PersonaSection from '@/components/PersonaSection'
import Footer from '@/components/Footer'
import { personas } from '@/data/personas'

export default function PersonasPage() {
  return (
    <main>
      <Hero activePage="personas" />
      <section
        className="px-20 py-14"
        style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5' }}
      >
        <p
          className="mb-3 font-bold uppercase"
          style={{ fontSize: '11px', letterSpacing: '2px', color: '#E2001A' }}
        >
          Foundations First
        </p>

        <h2
          className="mb-5 font-black"
          style={{ fontSize: '42px', lineHeight: 1.05, letterSpacing: '-1.5px', color: '#0a0a0a' }}
        >
          How The Synthetic Personas Were Built
        </h2>

        <p className="max-w-4xl mb-8" style={{ fontSize: '16px', lineHeight: 1.75, color: '#525252' }}>
          These are not random fictional users. Every persona is a structured behavioral model
          built from German pharmacy context, search intent patterns, and observed failure
          mechanisms that repeatedly break sessions in health-commerce journeys.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '20px',
            maxWidth: '1200px',
          }}
        >
          <article style={{ border: '1px solid #e5e5e5', padding: '22px', background: '#fafafa' }}>
            <p
              className="mb-3 font-bold uppercase"
              style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#0a0a0a' }}
            >
              How they were created
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: '18px',
                listStyleType: 'disc',
                color: '#404040',
                fontSize: '14px',
                lineHeight: 1.7,
              }}
            >
              <li>Started from high-frequency pharmacy intents.</li>
              <li>Encoded urgency, life-stage context, and budget constraints.</li>
              <li>Mapped observed behavior patterns like short patience windows and reformulation loops.</li>
              <li>Grounded vocabulary in German OTC search language.</li>
              <li>Stress-tested profiles against known relevance and ranking failure modes.</li>
            </ul>
          </article>

          <article style={{ border: '1px solid #e5e5e5', padding: '22px', background: '#fafafa' }}>
            <p
              className="mb-3 font-bold uppercase"
              style={{ fontSize: '11px', letterSpacing: '1.5px', color: '#0a0a0a' }}
            >
              What each persona contains
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: '18px',
                listStyleType: 'disc',
                color: '#404040',
                fontSize: '14px',
                lineHeight: 1.7,
              }}
            >
              <li>Demographic and context frame: age, city, device, and motivation.</li>
              <li>Cognitive baseline: urgency, anxiety, cognitive load, trust sensitivity.</li>
              <li>Search behavior engine: vocabulary, scroll depth, patience, reformulation strategy.</li>
              <li>Decision logic: click priorities, abandon conditions, and competitor exits.</li>
              <li>Post-session outcome model: conversion, split basket, or dropout behavior.</li>
            </ul>
          </article>
        </div>
      </section>
      {personas.map((persona, i) => (
        <PersonaSection key={persona.id} persona={persona} alt={i % 2 !== 0} />
      ))}
      <Footer />
    </main>
  )
}
