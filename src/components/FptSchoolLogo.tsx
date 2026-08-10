import React from 'react';

interface FptSchoolLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showFullName?: boolean;
  className?: string;
}

export const FptSchoolLogo: React.FC<FptSchoolLogoProps> = ({
  size = 'md',
  showFullName = true,
  className = '',
}) => {
  const scaleClass =
    size === 'sm'
      ? 'h-9 sm:h-11'
      : size === 'lg'
      ? 'h-16 sm:h-20'
      : 'h-12 sm:h-14';

  return (
    <div className={`inline-flex items-center gap-3 shrink-0 ${className}`}>
      {/* Crisp FPT SVG Logo */}
      <svg
        viewBox="0 0 380 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${scaleClass} w-auto drop-shadow-lg shrink-0 overflow-visible`}
      >
        {/* Parallelogram F (Blue) */}
        <polygon points="12,10 70,10 50,65 2,65" fill="#0054A6" />
        <text
          x="32"
          y="50"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="44"
          fontStyle="italic"
          textAnchor="middle"
        >
          F
        </text>

        {/* Parallelogram P (Orange) */}
        <polygon points="76,10 134,10 114,65 66,65" fill="#F26522" />
        <text
          x="96"
          y="50"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="44"
          fontStyle="italic"
          textAnchor="middle"
        >
          P
        </text>

        {/* Parallelogram T (Green) */}
        <polygon points="140,10 198,10 178,65 130,65" fill="#00A859" />
        <text
          x="160"
          y="50"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontWeight="900"
          fontSize="44"
          fontStyle="italic"
          textAnchor="middle"
        >
          T
        </text>

        {/* Education Text */}
        <text
          x="208"
          y="42"
          fill="#0054A6"
          fontFamily="Arial, sans-serif"
          fontWeight="700"
          fontSize="28"
        >
          Education
        </text>

        {/* FPT SCHOOLS Text */}
        <text
          x="10"
          y="102"
          fill="#F26522"
          fontFamily="Impact, Arial Black, sans-serif"
          fontWeight="900"
          fontSize="34"
          letterSpacing="1"
        >
          FPT SCHOOLS
        </text>
      </svg>

      {/* School Name & Teacher Info */}
      {showFullName && (
        <div className="flex flex-col text-left justify-center min-w-0">
          <span className="font-black text-amber-300 text-sm sm:text-base tracking-wide leading-tight uppercase">
            Tiểu học, THCS & THPT FPT Bắc Giang
          </span>
          <span className="text-xs sm:text-sm font-semibold text-cyan-200 opacity-95 leading-tight">
            GV: Trần Thị Nhung • Tổ STEM, Tin học & Công nghệ
          </span>
        </div>
      )}
    </div>
  );
};
