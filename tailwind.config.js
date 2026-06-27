/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'datamt-bg':          '#070B14',
        'datamt-surface':     '#0D1526',
        'datamt-border':      '#1E293B',
        'datamt-cyan':        '#00F2FE',
        'datamt-blue':        '#2D6BFF',
        'datamt-purple':      '#7B2FFF',
        'datamt-purple-dark': '#4A1FA8',
        'datamt-muted':       '#64748B',
      },
    },
  },
  plugins: [],
}
