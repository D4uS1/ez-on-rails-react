module.exports = {
    "ignorePatterns": ["dist/**/*"],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['prefer-arrow'],
    settings: {
        react: {
            version: '18.2.0'
        }
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:react-hooks/recommended'
    ],
    rules: {
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
        'prettier/prettier': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off', // explicit return type on react functions should be disabled
        '@typescript-eslint/ban-ts-comment': [
            'error',
            {
                'ts-expect-error': 'allow-with-description',
                'ts-ignore': 'allow-with-description',
                'ts-nocheck': 'allow-with-description',
                'ts-check': 'allow-with-description'
            }
        ],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-var-requires': 'warn',
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                disallowPrototype: true,
                singleReturnOnly: false,
                classPropertiesAllowed: false,
            }
        ],
        "padding-line-between-statements": [
            "error",
            { "blankLine": "always", "prev": "multiline-block-like", "next": "*" }
        ]
    }
};
