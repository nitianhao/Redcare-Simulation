export default function Hero() {
  return (
    <section
      className="px-20 pt-16 pb-14"
      style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a' }}
    >
      <p
        className="mb-4 font-bold uppercase"
        style={{ fontSize: '11px', letterSpacing: '3px', color: '#E2001A' }}
      >
        REDCARE × SEARCH SIMULATION LAB
      </p>

      <h1
        className="font-black leading-none mb-6"
        style={{ fontSize: '72px', letterSpacing: '-3px', color: '#0a0a0a' }}
      >
        5 SHOPPERS.
        <br />
        <em style={{ fontStyle: 'italic', color: '#E2001A' }}>THOUSANDS</em>
        <br />
        OF DECISIONS.
      </h1>

      <div className="mb-5" style={{ width: '60px', height: '3px', background: '#E2001A' }} />

      <p
        className="max-w-lg leading-relaxed"
        style={{ fontSize: '16px', color: '#525252' }}
      >
        Five synthetic personas. Each one built from behavioral research, German market data,
        and real search failure patterns. This is how your customers actually experience search.
      </p>

      <p
        className="mt-10 font-bold uppercase"
        style={{ fontSize: '11px', letterSpacing: '2px', color: '#737373' }}
      >
        ↓ SCROLL TO MEET THEM
      </p>
    </section>
  )
}
