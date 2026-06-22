import { motion } from "framer-motion";

/**
 * Original animated avatar (an own illustration — not Apple's Memoji): a
 * friendly face with glasses that gently bobs, blinks, and waves. All motion is
 * transform-based, so prefers-reduced-motion (via the app's MotionConfig)
 * freezes it to a calm static avatar.
 */
export function AvatarCharacter({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid place-items-center overflow-hidden rounded-xl bg-[radial-gradient(circle_at_35%_22%,#efe7fe,#d6c4f6)] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Head + face — bobs gently */}
        <motion.g
          animate={{ y: [0, -1.6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          {/* neck/shoulders hint */}
          <path d="M30 96 Q34 78 50 78 Q66 78 70 96 Z" fill="#5b3aa6" />
          {/* face */}
          <circle cx="50" cy="50" r="27" fill="#f3c9a4" />
          {/* ears */}
          <circle cx="24" cy="52" r="4.5" fill="#f3c9a4" />
          <circle cx="76" cy="52" r="4.5" fill="#f3c9a4" />
          {/* hair */}
          <path
            d="M23 50 C22 26 34 16 50 16 C66 16 78 26 77 50 C73 41 64 33 50 33 C36 33 27 41 23 50 Z"
            fill="#241f33"
          />
          {/* glasses */}
          <g stroke="#241f33" strokeWidth="2.4" fill="rgba(36,31,51,0.10)">
            <rect x="31" y="45" width="16" height="13" rx="6" />
            <rect x="53" y="45" width="16" height="13" rx="6" />
            <line x1="47" y1="50" x2="53" y2="50" />
          </g>
          {/* eyes — blink */}
          <motion.g
            fill="#241f33"
            animate={{ scaleY: [1, 1, 0.12, 1] }}
            transition={{
              duration: 4,
              times: [0, 0.9, 0.95, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          >
            <circle cx="39" cy="52" r="2.6" />
            <circle cx="61" cy="52" r="2.6" />
          </motion.g>
          {/* smile */}
          <path
            d="M42 65 Q50 72 58 65"
            fill="none"
            stroke="#9a5a40"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Waving hand (top-right) */}
        <motion.g
          animate={{ rotate: [0, 16, -4, 16, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 1.6,
            ease: "easeInOut",
          }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
        >
          {/* fingers */}
          <g fill="#f3c9a4">
            <rect x="78" y="16" width="2.8" height="11" rx="1.4" />
            <rect x="81.6" y="14.5" width="2.8" height="12.5" rx="1.4" />
            <rect x="85.2" y="15.5" width="2.8" height="11.5" rx="1.4" />
            <rect x="88.8" y="17.5" width="2.8" height="10" rx="1.4" />
            {/* palm + thumb */}
            <path d="M76 25 Q76 36 84 36 Q92 36 92 25 Q92 23 90 23 L78 23 Q76 23 76 25 Z" />
            <circle cx="75" cy="28" r="2.6" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
