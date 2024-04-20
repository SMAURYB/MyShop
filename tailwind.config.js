module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg1': 'slate-800', //bg general
        'bg2': '#1F1D2B', //bg secundario, sidebar etc
        'bg3': '#312d49', //bg focus, checked
        'bg4': '#ec7c6a' //bg buttons
      },
      listStyleType: {
        none: 'none',
        disc: 'disc',
        decimal: 'decimal',
        square: 'square',
        roman: 'upper-roman'
      }
    }
  },
  plugins: []
}
