/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: false,
  printWidth: 100,
  bracketSpacing: true,
  endOfLine: 'auto',
  bracketSameLine: false,
  arrowParens: 'always',
  importOrder: [
    '^(react/(.*)$)|^(react$)', // React modules
    '^(next/(.*)$)|^(next$)', // Next.js modules
    '<THIRD_PARTY_MODULES>', // External libraries
    '',
    '^@mui/(.*)$', // MUI components
    '',
    '^@/components/(.*)$',
    '^@/styles/(.*)$', // Components and styles
    '^@/app/(.*)$',
    '',
    '^@/types$',
    '^@/types/(.*)$',
    '^@/config$', // Types and configuration
    '',
    '^@/hooks/(.*)$', // Hooks
    '^@/app/actions/(.*)$', // Business logic: hooks, models, services, etc.
    '^./actions', // Business logic: hooks, models, services, etc.
    '',
    '^@/utils/(.*)$',
    '^@/constants/(.*)$', // Utilities and constants
    '',
    '^[./]', // Catch-all for relative imports
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderBuiltinModulesToTop: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderTypeScriptVersion: '5.0.0',
  sortingMethod: 'lineLength',
plugins: ['@ianvs/prettier-plugin-sort-imports']
};

export default config;
