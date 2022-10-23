---
to: packages/<%= name %>/tsconfig.lib.json
---

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["node"]
  },
  "files": [],
  "exclude": ["**/*.spec.ts", "**/*.spec.tsx"],
  "include": ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"]
}
