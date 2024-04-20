module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'standard',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','node_modules'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/self-closing-comp":"error",
    "indent": ["error", 2],
		"react/prop-types":"off",
		"react/react-in-jsx-scope":"off",
		"react/jsx-key": "off",
    "react-hooks/exhaustive-deps": "off",
  },
}
