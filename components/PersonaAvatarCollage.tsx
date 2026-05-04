import { personas } from '@/data/personas'

const DICEBEAR_BASE = 'https://api.dicebear.com/9.x/personas/svg'

export default function PersonaAvatarCollage() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top row: 3 avatars */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {personas.slice(0, 3).map(p => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${DICEBEAR_BASE}?seed=${encodeURIComponent(p.avatarSeed)}&backgroundColor=${p.avatarBg}`}
              alt={p.name}
              width={120}
              height={120}
              style={{
                borderRadius: '50%',
                border: '3px solid #ffffff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                background: `#${p.avatarBg}`,
                display: 'block',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', letterSpacing: '0px' }}>{p.name}</p>
              <p style={{ fontSize: '16px', color: '#E2001A', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{p.personaType}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Bottom row: 2 avatars centered */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        {personas.slice(3).map(p => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${DICEBEAR_BASE}?seed=${encodeURIComponent(p.avatarSeed)}&backgroundColor=${p.avatarBg}`}
              alt={p.name}
              width={120}
              height={120}
              style={{
                borderRadius: '50%',
                border: '3px solid #ffffff',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
                background: `#${p.avatarBg}`,
                display: 'block',
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#0a0a0a', letterSpacing: '0px' }}>{p.name}</p>
              <p style={{ fontSize: '16px', color: '#E2001A', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>{p.personaType}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
