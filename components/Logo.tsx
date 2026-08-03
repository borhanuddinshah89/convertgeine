import Link from "next/link";

type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ConvertGeine home"
      className="group inline-flex items-center gap-3"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lampGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="42%" stopColor="#FACC15" />
              <stop offset="72%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            <linearGradient id="magicBlue" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="55%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>

            <filter id="blueGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M48 63
               C44 56 48 50 57 47
               C67 44 72 37 68 30
               C65 25 57 24 52 28
               C48 31 48 37 53 39
               C57 41 61 38 60 35
               C64 38 62 44 56 45
               C47 46 39 41 39 33
               C39 23 49 16 61 18
               C76 20 82 34 75 46
               C69 57 58 58 53 63Z"
            fill="url(#magicBlue)"
            filter="url(#blueGlow)"
            className="origin-center transition duration-300 group-hover:scale-105"
          />

          <path
            d="M53 63
               C50 67 48 71 50 75
               C45 72 43 68 45 63Z"
            fill="#2563EB"
            opacity="0.9"
          />

          <path
            d="M20 70
               C27 64 42 62 57 64
               C65 65 70 68 72 72
               C67 78 57 81 43 81
               C31 81 22 77 20 70Z"
            fill="url(#lampGold)"
            filter="url(#goldGlow)"
          />

          <path
            d="M68 68
               C78 65 84 67 88 72
               C83 70 79 73 75 76"
            fill="none"
            stroke="#FACC15"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M21 70
               C14 67 9 69 8 74
               C8 79 14 81 21 77"
            fill="none"
            stroke="#FACC15"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <ellipse cx="45" cy="81" rx="18" ry="4" fill="#92400E" opacity="0.65" />

          <path
            d="M32 63
               C33 58 37 55 43 55
               C49 55 53 58 54 63Z"
            fill="url(#lampGold)"
          />

          <circle cx="43" cy="54" r="3" fill="#FACC15" />

          <circle cx="80" cy="19" r="2.5" fill="#38BDF8" />
          <circle cx="85" cy="31" r="1.6" fill="#FACC15" />
          <circle cx="26" cy="31" r="1.8" fill="#38BDF8" />

          <path
            d="M80 11 L82 16 L87 18 L82 20 L80 25 L78 20 L73 18 L78 16Z"
            fill="#67E8F9"
            filter="url(#blueGlow)"
          />
        </svg>
      </span>

      {!compact && (
        <span className="leading-tight">
          <span className="block text-xl font-extrabold tracking-tight">
            <span className="text-white">Convert</span>
            <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Geine
            </span>
          </span>

          <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500">
            Smart online tools
          </span>
        </span>
      )}
    </Link>
  );
}
