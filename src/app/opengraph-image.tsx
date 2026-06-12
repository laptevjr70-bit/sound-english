import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Sound English — детская студия английского языка'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #143A8E 0%, #2A6FD6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute', right: 80, top: 80,
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
        }} />
        <div style={{
          position: 'absolute', right: 180, bottom: 60,
          width: 180, height: 180,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
        }} />

        {/* Badge */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 100,
          padding: '8px 20px',
          color: 'rgba(255,255,255,0.9)',
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}>
          Детская студия английского · Воронеж
        </div>

        {/* Title */}
        <div style={{
          fontSize: 72,
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.1,
          maxWidth: 700,
          marginBottom: 24,
        }}>
          Sound English
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 28,
          color: 'rgba(255,255,255,0.85)',
          maxWidth: 600,
          lineHeight: 1.4,
          marginBottom: 48,
        }}>
          Английский, который дети полюбят
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['Игровой формат', 'Маленькие группы', 'С 3 лет'].map((tag) => (
            <div key={tag} style={{
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 100,
              padding: '10px 20px',
              color: 'white',
              fontSize: 18,
              fontWeight: 500,
            }}>{tag}</div>
          ))}
        </div>

        {/* Fox emoji as mascot placeholder */}
        <div style={{
          position: 'absolute',
          right: 100,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 180,
          opacity: 0.9,
        }}>
          🦊
        </div>
      </div>
    ),
    { ...size }
  )
}
