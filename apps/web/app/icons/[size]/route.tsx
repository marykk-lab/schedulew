import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET(_req: Request, { params }: { params: { size: string } }) {
  const size = Number(params.size) || 192;
  const radius = Math.round(size * 0.18);

  return new ImageResponse(
    (
      <div
        style={{
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1710',
          borderRadius: radius,
        }}
      >
        <span
          style={{
            fontSize: Math.round(size * 0.48),
            fontWeight: 900,
            color: '#a8977a',
            fontFamily: 'serif',
            lineHeight: 1,
          }}
        >
          SW
        </span>
      </div>
    ),
    { width: size, height: size },
  );
}
