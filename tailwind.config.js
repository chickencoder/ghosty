module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        loader: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        loader: 'loader 10s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
