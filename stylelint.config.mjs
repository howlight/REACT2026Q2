export default {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order'],
  rules: {
    'custom-property-empty-line-before': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'color-function-notation': 'modern',
    'alpha-value-notation': 'number',
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: ['grid-template'] },
    ],
  },
  ignoreFiles: [
    '**/node_modules/**',
    '**/dist/**',
    '**/modern-normalize.css',
  ],
};
