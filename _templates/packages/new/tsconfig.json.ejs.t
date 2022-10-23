---
to: packages/<%= name %>/tsconfig.json
---

{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "allowJs": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "files": [],
  "exclude": ["dist"],
  "include": ["src/**/*"],
  "references": [{ "path": "./tsconfig.lib.json" }, { "path": "./tsconfig.spec.json" }]
}
