import { defineConfig } from 'eslint/config'
import reactHooks from 'eslint-plugin-react-hooks'

export default defineConfig([
  {
    "ignores": [
      "dist/**/*",
      '**/node_modules',
      '**/dist',
      '**/.github',
      '**/.idea'
    ],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
        "padding-line-between-statements": [
            "error",
            { "blankLine": "always", "prev": "multiline-block-like", "next": "*" }
        ]
    }
  }
])
