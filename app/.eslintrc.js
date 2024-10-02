module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['react', 'react-native', 'react-hooks', 'jsx-a11y', 'import'],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'padded-blocks': 'off',
    'arrow-body-style': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'off', // 'error'
    // 'react-native/no-color-literals': 'error',
    'react-native/no-raw-text': 'error',
    'react-native/no-single-element-style-arrays': 'error',
  },
};
