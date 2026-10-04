// Cyber Particle & Haptic Feedback Engine
const PARTICLE_THEMES = {
  cyan: {
    colors: ['#2dd4bf', '#10b981', '#34d399', '#a7f3d0', '#00f1fd'],
    glow: '0 0 6px rgba(45, 212, 191, 0.7), 0 0 10px rgba(16, 185, 129, 0.5)',
  },
  'gold-purple': {
    colors: ['#fbbf24', '#ffd700', '#c084fc', '#a855f7', '#e879f9'],
    glow: '0 0 8px rgba(251, 191, 36, 0.75), 0 0 12px rgba(168, 85, 247, 0.65)',
  },
  'silver-blue': {
    colors: ['#38bdf8', '#60a5fa', '#94a3b8', '#e2e8f0'],
    glow: '0 0 6px rgba(56, 189, 248, 0.7), 0 0 10px rgba(148, 163, 184, 0.5)',
  },
};

export type ParticleTheme = 'cyan' | 'gold-purple' | 'silver-blue';

export function createParticleBurst(
  x: number,
  y: number,
  count = 24,
  themeKey: ParticleTheme = 'cyan'
) {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const themeConfig = PARTICLE_THEMES[themeKey] || PARTICLE_THEMES.cyan;
  const themeColors = themeConfig.colors;
  const themeGlow = themeConfig.glow;

  const actualCount = count || Math.floor(Math.random() * 8) + 20;

  for (let i = 0; i < actualCount; i++) {
    const p = document.createElement('div');
    p.className = 'cyber-particle';

    const size = Math.random() * 2.5 + 2; // 2px - 4.5px
    const color = themeColors[Math.floor(Math.random() * themeColors.length)];

    p.style.width = `${size.toFixed(1)}px`;
    p.style.height = `${size.toFixed(1)}px`;
    p.style.backgroundColor = color;
    p.style.boxShadow = themeGlow;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;

    document.body.appendChild(p);

    const angle = ((Math.PI * 2) / actualCount) * i + (Math.random() - 0.5) * 0.5;
    const distance = Math.random() * 35 + 45; // 45px - 80px
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance + (Math.random() * 12 + 4);
    const midDistance = distance * (Math.random() * 0.2 + 0.6);
    const midX = Math.cos(angle) * midDistance;
    const midY = Math.sin(angle) * midDistance - (Math.random() * 10 + 4);
    const rotation = (Math.random() - 0.5) * 360;
    const duration = Math.random() * 100 + 400; // 400ms - 500ms

    const animation = p.animate(
      [
        {
          transform: 'translate(0, 0) scale(1) rotate(0deg)',
          opacity: 1,
        },
        {
          transform: `translate(${midX}px, ${midY}px) scale(${Math.random() * 0.4 + 1.1}) rotate(${rotation * 0.5}deg)`,
          opacity: 0.9,
          offset: 0.35,
        },
        {
          transform: `translate(${destX}px, ${destY}px) scale(0) rotate(${rotation}deg)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    );

    animation.onfinish = () => p.remove();
    setTimeout(() => {
      if (p && p.parentNode) p.remove();
    }, 550);
  }
}

export function triggerFeedback(
  element: HTMLElement | null,
  e?: React.MouseEvent | MouseEvent,
  theme: ParticleTheme = 'cyan'
) {
  // 1. Device Haptic Vibrate
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      navigator.vibrate([15, 30, 15]);
    } catch (err) {}
  }

  // 2. Shake animation on target element
  if (element) {
    element.classList.remove('haptic-shake');
    void element.offsetWidth; // Force reflow
    element.classList.add('haptic-shake');
    setTimeout(() => element.classList.remove('haptic-shake'), 320);
  }

  // 3. Cyber particle burst at click coordinates
  let px = e && 'clientX' in e ? e.clientX : 0;
  let py = e && 'clientY' in e ? e.clientY : 0;

  if ((!px || !py) && element) {
    const rect = element.getBoundingClientRect();
    px = rect.left + rect.width / 2;
    py = rect.top + rect.height / 2;
  }

  if (px && py) {
    createParticleBurst(px, py, Math.floor(Math.random() * 7) + 20, theme);
  }
}

// Copy to clipboard helper
export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}
