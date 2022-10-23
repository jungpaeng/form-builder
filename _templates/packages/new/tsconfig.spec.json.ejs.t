---
to: packages/<%= name %>/tsconfig.spec.json
---

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["**/*.spec.ts", "**/*.spec.js", "**/*.d.ts"],
  "files": []
}
