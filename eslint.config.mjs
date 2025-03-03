/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],  // Lint JavaScript files
    rules: {
      "semi": ["error", "always"],   // Enforce semicolons at the end of statements
      "quotes": ["error", "double"], // Enforce double quotes for strings
      "no-console": "warn",           // Warn on usage of console.log()
    }
  }
];  
