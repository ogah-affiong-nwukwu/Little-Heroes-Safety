interface MascotProps {
  size?: number
  className?: string
}

export function Mascot({ size = 120, className = '' }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cheerful Little Hero mascot"
    >
      {/* cape */}
      <path
        d="M100 78 C 68 88 52 122 48 168 L 84 158 L 100 178 L 116 158 L 152 168 C 148 122 132 88 100 78 Z"
        fill="#FF6B6B"
      />
      <path
        d="M100 82 C 76 92 62 122 58 158 L 84 150 L 100 166 L 116 150 L 142 158 C 138 122 124 92 100 82 Z"
        fill="#FF8FB1"
        opacity="0.55"
      />
      {/* ears */}
      <circle cx="62" cy="102" r="12" fill="#FFD9B3" />
      <circle cx="138" cy="102" r="12" fill="#FFD9B3" />
      {/* head */}
      <circle cx="100" cy="98" r="52" fill="#FFD9B3" />
      {/* hair swoosh */}
      <path
        d="M100 46 C 128 46 148 62 152 84 C 138 66 116 58 100 58 C 76 58 56 74 56 94 C 60 60 78 46 100 46 Z"
        fill="#41345A"
      />
      <path
        d="M148 78 C 152 66 150 56 146 48 C 156 60 158 76 154 90 C 152 86 150 82 148 78 Z"
        fill="#FFC93C"
      />
      {/* mask */}
      <path
        d="M52 96 C 60 82 78 74 100 74 C 122 74 140 82 148 96 C 148 110 140 120 128 120 C 118 120 112 112 100 112 C 88 112 82 120 72 120 C 60 120 52 110 52 96 Z"
        fill="#9B6BF2"
      />
      {/* eye holes */}
      <ellipse cx="82" cy="96" rx="14" ry="13" fill="#FFFFFF" />
      <ellipse cx="118" cy="96" rx="14" ry="13" fill="#FFFFFF" />
      <circle cx="86" cy="97" r="6.5" fill="#41345A" />
      <circle cx="114" cy="97" r="6.5" fill="#41345A" />
      <circle cx="88" cy="94.5" r="2.2" fill="#FFFFFF" />
      <circle cx="116" cy="94.5" r="2.2" fill="#FFFFFF" />
      {/* mask wings */}
      <path d="M52 96 C 44 92 40 100 46 104 Z" fill="#9B6BF2" />
      <path d="M148 96 C 156 92 160 100 154 104 Z" fill="#9B6BF2" />
      {/* cheeks */}
      <circle cx="70" cy="112" r="8" fill="#FFB3C7" opacity="0.8" />
      <circle cx="130" cy="112" r="8" fill="#FFB3C7" opacity="0.8" />
      {/* smile */}
      <path
        d="M84 116 C 92 126 108 126 116 116"
        stroke="#41345A"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* lightning emblem */}
      <g transform="translate(100 152)">
        <path
          d="M0 -10 L 12 -10 L 2 2 L 10 2 L -4 12 L 1 0 L -8 0 Z"
          fill="#FFC93C"
          stroke="#41345A"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}
