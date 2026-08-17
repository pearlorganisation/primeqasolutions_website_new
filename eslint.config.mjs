import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.

  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "tailwind.config.js",
    "postcss.config.js",
    // "eslint.config.mjs",
  ]),
  {
    rules: {
      "no-restricted-imports": [
        "warn",
        {
          paths: [
            {
              name: "lodash",
              message:
                "Import specific functions from lodash/[function] to optimize bundle size.",
            },
            {
              name: "date-fns",
              message:
                "Import specific functions from date-fns/[function] to optimize bundle size.",
            },
          ],
          // patterns: [
          //   {
          //     group: ["**/index", "**/index.*"],
          //     message: "Avoid importing from barrel (index) files. Import directly from the specific file to optimize bundle size and prevent cascading imports."
          //   },
          //   {
          //     group: ["@/components", "@/lib", "@/hooks"],
          //     message: "Avoid importing from top-level directories. Import directly from the specific file to optimize bundle size."
          //   }
          // ]
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
