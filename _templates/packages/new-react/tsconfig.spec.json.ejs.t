---
to: packages/<%= name %>/tsconfig.spec.json
---

{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": ["**/*.spec.ts", "**/*.spec.tsx", "**/*.spec.js", "**/*.spec.jsx", "**/*.d.ts"],
  "files": []
}
