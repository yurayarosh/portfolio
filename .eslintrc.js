module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'no-trailing-spaces': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 1,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-indent': 0,
    'vue/no-v-html': 0,
    'vue/comment-directive': 0,
    'no-template-curly-in-string': 0,
    curly: 0,
    camelcase: 0,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
        },
      },
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'arrow-parens': ['error', 'as-needed'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    indent: ['error', 2, { offsetTernaryExpressions: true }],
  }
}
