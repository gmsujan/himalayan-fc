/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0faf0',
          100: '#d9f0d9',
          200: '#b3e0b3',
          300: '#7ec87e',
          400: '#4daa4d',
          500: '#2d8a2d',
          600: '#1e6e1e',
          700: '#165516',
          800: '#0f3d0f',
          900: '#092609',
        },
        cream: '#f8f5f0',
        charcoal: '#1a1a1a',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
