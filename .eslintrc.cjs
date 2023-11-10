/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'plugin:astro/recommended', 'prettier'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        astro: 'always',
        ts: 'never',
        tsx: 'never',
        js: 'never',
        jsx: 'never',
        json: 'never',
        vue: 'never',
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
        amd: true,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      },
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript/base',
        'plugin:astro/recommended',
        'prettier',
      ],
      plugins: ['@typescript-eslint'],
      rules: {
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      // Define the configuration for `<script>` tag.
      // Script in `<script>` is assigned a virtual file name with the `.js` extension.
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      parser: '@typescript-eslint/parser',
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.astro', '.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
      alias: {
        map: [['~', './src']],
        extensions: ['.astro', '.ts', '.tsx', '.js', '.jsx', '.json', '.vue'],
      },
    },
  },
};
