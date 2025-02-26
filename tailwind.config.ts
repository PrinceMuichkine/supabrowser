import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: 'var(--main)',
        overlay: 'var(--overlay)',
        bg: 'var(--bg)',
        bw: 'var(--bw)',
        blank: 'var(--blank)',
        text: 'var(--text)',
        mtext: 'var(--mtext)',
        border: 'var(--border)',
        ring: 'var(--ring)',
        ringOffset: 'var(--ring-offset)',
        
        secondaryBlack: '#212121',
        
        // Icon background colors - Light mode
        iconBg: {
          home: '#e6f7ff',
          browser: '#e6fffb',
          docs: '#f6ffed',
          dashboard: '#fff7e6',
          github: '#f9f0ff',
          theme: '#fff1f0',
        },
        // Icon colors - Light mode
        iconColor: {
          home: '#0050b3',
          browser: '#006d75',
          docs: '#237804',
          dashboard: '#ad6800',
          github: '#531dab',
          theme: '#a8071a',
        },
        // Icon background colors - Dark mode
        darkIconBg: {
          home: '#111d2c',
          browser: '#112123',
          docs: '#121619',
          dashboard: '#1d1b16',
          github: '#120338',
          theme: '#2a1215',
        },
        // Icon colors - Dark mode
        darkIconColor: {
          home: '#69c0ff',
          browser: '#5cdbd3',
          docs: '#95de64',
          dashboard: '#ffd666',
          github: '#b37feb',
          theme: '#ff7875',
        },
      },
      borderRadius: {
        base: '6px'
      },
      borderWidth: {
        '6': '6px',
      },
      boxShadow: {
        shadow: 'var(--shadow)'
      },
      translate: {
        boxShadowX: '6px',
        boxShadowY: '6px',
        reverseBoxShadowX: '-6px',
        reverseBoxShadowY: '-6px',
      },
      fontWeight: {
        base: '500',
        heading: '700',
      },
    },
  },
  plugins: [],
} satisfies Config;
