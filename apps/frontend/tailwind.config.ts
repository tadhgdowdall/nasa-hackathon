import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nasa: {
          blue: '#0B3D91',
          red: '#FC3D21',
          white: '#FFFFFF',
        },
        space: {
          dark: '#0a0e27',
          darker: '#05070f',
          purple: '#6366f1',
          cyan: '#06b6d4',
          pink: '#ec4899',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'stars': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Ccircle cx='10' cy='10' r='1' fill='white' opacity='0.3'/%3E%3Ccircle cx='50' cy='30' r='0.5' fill='white' opacity='0.5'/%3E%3Ccircle cx='90' cy='20' r='1' fill='white' opacity='0.4'/%3E%3Ccircle cx='130' cy='50' r='0.5' fill='white' opacity='0.6'/%3E%3Ccircle cx='170' cy='40' r='1' fill='white' opacity='0.3'/%3E%3Ccircle cx='30' cy='70' r='0.5' fill='white' opacity='0.5'/%3E%3Ccircle cx='70' cy='90' r='1' fill='white' opacity='0.4'/%3E%3Ccircle cx='110' cy='80' r='0.5' fill='white' opacity='0.3'/%3E%3Ccircle cx='150' cy='100' r='1' fill='white' opacity='0.5'/%3E%3Ccircle cx='190' cy='90' r='0.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='20' cy='130' r='1' fill='white' opacity='0.6'/%3E%3Ccircle cx='60' cy='150' r='0.5' fill='white' opacity='0.3'/%3E%3Ccircle cx='100' cy='140' r='1' fill='white' opacity='0.5'/%3E%3Ccircle cx='140' cy='160' r='0.5' fill='white' opacity='0.4'/%3E%3Ccircle cx='180' cy='150' r='1' fill='white' opacity='0.6'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.5)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
