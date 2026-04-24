export default function Footer() {
  return (
    <footer
      className="px-20 py-5 flex items-center justify-between"
      style={{ background: '#0a0a0a' }}
    >
      <span
        className="font-bold uppercase"
        style={{ fontSize: '11px', letterSpacing: '2px', color: '#737373' }}
      >
        REDCARE × SEARCH SIMULATION LAB
      </span>
      <span
        className="font-bold"
        style={{ fontSize: '11px', color: '#525252' }}
      >
        {new Date().getFullYear()}
      </span>
    </footer>
  )
}
