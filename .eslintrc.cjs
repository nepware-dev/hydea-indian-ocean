module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'commitlint.config.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    settings: {
        'import/resolver': {
            typescript: {
                project: './tsconfig.json',
            }
        }
    },
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        indent: ['error', 4, { SwitchCase: 1 }],
        semi: 2,
        '@typescript-eslint/no-explicit-any': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal', ['index', 'sibling', 'parent']],
                'newlines-between': 'always',
                pathGroups: [
                    {
                        pattern: '@ra/**',
                        group: 'internal',
                        position: 'after',
                    }
                ],
                pathGroupsExcludedImportTypes: ['builtin'],
                alphabetize: { order: 'asc', caseInsensitive: true },
            }
        ]
    },
};
