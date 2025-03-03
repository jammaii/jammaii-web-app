/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  tabWidth: 2,
  printWidth: 80,
  trailingComma: 'all'
};

export default config;
