module.exports = {
    "env": {
      "node": true
    },
    "extends": [
      "airbnb",
      "airbnb/hooks",
      "airbnb-typescript"
    ],
    "ignorePatterns": ["reportWebVitals.ts", "setupTests.ts", "*.d.ts", ".eslintrc.js", "*.test.*"],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json",
      "tsconfigRootDir": __dirname
    },
    "plugins": [
      "@typescript-eslint"
    ],
    "root": true
}