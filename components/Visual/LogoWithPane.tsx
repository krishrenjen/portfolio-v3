'use client';

export default function LogoWithPane({
  src,
  size = 1.5, // in rem
  rgb = '0, 0, 0',
}: {
  src: string;
  size?: number;
  rgb?: string;
}) {
  const background = `rgba(${rgb}, 0.1)`;
  const border = `rgb(${rgb})`;

  return (
    <div
      style={{
        backgroundColor: background,
        border: `${size / 2}px solid ${border}`,
        padding: `${size / 6}rem`,
        borderRadius: `${size * 3}px`,
        display: 'inline-block',
      }}
    >
      <div
        style={{
          backgroundColor: `rgb(${rgb})`,
          WebkitMaskImage: `url(${src})`,
          WebkitMaskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          WebkitMaskPosition: 'center',
          maskImage: `url(${src})`,
          maskRepeat: 'no-repeat',
          maskSize: 'contain',
          maskPosition: 'center',
          width: `${size}rem`,
          height: `${size}rem`,
        }}
      />
    </div>
  );
}
