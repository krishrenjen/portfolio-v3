'use client';

export default function Logo({
  src,
  size = 1.5, // in rem
  rgb = '0, 0, 0',
  alt
}: {
  src: string;
  size?: number;
  rgb?: string;
  alt?: string;
}) {

  return (
    <div
      style={{
        display: 'inline-block'
      }}
    >
      <div title={alt}
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
