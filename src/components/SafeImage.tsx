import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export function SafeImage({ src, alt, className = '', eager = false }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#101B3D] via-[#192854] to-[#6956D8] text-white/85 p-6 text-center ${className}`}
      >
        <BookOpen className="w-8 h-8 mb-2 text-[#4DA8FF]" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide max-w-[200px] leading-relaxed">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
