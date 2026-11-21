import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export function BrandLogo({
  variant = 'light',
  size = 'md',
  showWordmark = true,
}: BrandLogoProps) {
  const iconDimensions =
    size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
  const textSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const primaryStroke = variant === 'dark' ? '#FFFFFF' : '#101B3D';
  const purpleAccent = variant === 'dark' ? '#8B7BFF' : '#6956D8';
  const skyAccent = '#4DA8FF';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconDimensions} shrink-0`}
        aria-hidden="true"
      >
        {/* Minimalist geometric letter A frame */}
        <path
          d="M7.5 34L18.4 7.2C19.0 5.8 21.0 5.8 21.6 7.2L32.5 34"
          stroke={primaryStroke}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle bridge arch forming the crossbar inside the A */}
        <path
          d="M11.6 25.2C14.3 21.7 17.1 20.2 20 20.2C22.9 20.2 25.7 21.7 28.4 25.2"
          stroke={purpleAccent}
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* Subtle bridge base span */}
        <path
          d="M10.4 27.6H29.6"
          stroke={primaryStroke}
          strokeWidth="1.5"
          strokeOpacity="0.22"
          strokeLinecap="round"
        />

        {/* Upward arrow rising cleanly inside the A through the bridge */}
        <path
          d="M20 31.5V15.2"
          stroke={purpleAccent}
          strokeWidth="2.7"
          strokeLinecap="round"
        />
        <path
          d="M15.8 18.8L20 14.3L24.2 18.8"
          stroke={skyAccent}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showWordmark && (
        <span
          className={`font-display font-bold tracking-tight ${textSize} ${
            variant === 'dark' ? 'text-white' : 'text-[#101B3D]'
          }`}
        >
          Aspire<span className={variant === 'dark' ? 'text-[#8B7BFF]' : 'text-[#6956D8]'}>Hub</span>
        </span>
      )}
    </span>
  );
}
