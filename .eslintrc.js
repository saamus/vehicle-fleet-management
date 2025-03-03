module.exports = {
  extends: [
    'eslint:recommended', // Use ESLint's recommended rules
    'plugin:prettier/recommended', // Prettier integration
  ],
  parser: '@typescript-eslint/parser', // Use the parser for TypeScript
  plugins: ['prettier'], // Prettier plugin
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier formatting as an error
  },
}
