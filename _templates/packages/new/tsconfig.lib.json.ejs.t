---
to: packages/<%= name %>/tsconfig.lib.json
---

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "types": ["node"]
  },
  "files": [],
  "exclude": ["**/*.spec.ts"],
  "include": ["**/*.js", "**/*.ts"]
}
