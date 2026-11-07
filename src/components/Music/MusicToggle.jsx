import { motion } from 'framer-motion'
import { useMusic } from './useMusic.js'
import './MusicToggle.css'

/**
 * Floating round music button (bottom-right).
 * `src` is only used if music was never started (e.g. ?skip=1).
 */
export default function MusicToggle({ src }) {
  const { playing, toggle } = useMusic()

  return (
    <motion.button
      type="button"
      className={`music-toggle${playing ? ' is-playing' : ''}`}
      onClick={() => toggle(src)}
      aria-label={playing ? 'Pause music' : 'Play music'}
      aria-pressed={playing}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.4 }}
      whileTap={{ scale: 0.9 }}
    >
      {playing ? (
        <span className="music-toggle__bars" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
      ) : (
        <svg className="music-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 18V6l10-2v12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
          <circle cx="16.5" cy="16" r="2.5" fill="currentColor" />
          <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </motion.button>
  )
}
