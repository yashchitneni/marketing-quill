module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-require-imports': 'warn',
    'jsx-a11y/alt-text': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn'
  }
}