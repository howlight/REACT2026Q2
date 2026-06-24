import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import eslintReactHooks from 'eslint-plugin-react-hooks';
import eslintReactRefresh from 'eslint-plugin-react-refresh';
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['**/node_modules', '**/.next', '**/dist', '*.config.*'],
  },

  eslint.configs.recommended,
  eslintReact.configs.flat.recommended,
  eslintReact.configs.flat['jsx-runtime'],
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      'react-hooks': eslintReactHooks,
      'react-refresh': eslintReactRefresh,
      'simple-import-sort': eslintSimpleImportSort,
    },

    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'error',
    },

    rules: {
      // TypeScript
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // React
      ...eslintReactHooks.configs.recommended.rules,
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react-refresh/only-export-components': 'off',

      // import sort
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      'arrow-body-style': ['error', 'as-needed'],
      'no-useless-return': 'error',
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  eslintConfigPrettier,
);
