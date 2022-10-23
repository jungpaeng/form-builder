---
to: packages/<%= name %>/esbuild.config.js
---

const { build } = require('esbuild');

const pkg = require('./package.json');

const watch = process.argv.includes('--watch');
const external = Object.keys({
  ...pkg.dependencies,
  ...pkg.peerDependencies,
});

const base = ({ entryPoints = ['./src/index.ts'], outdir = 'dist' }) => ({
  entryPoints,
  outdir,
  external,
  target: 'es2015',
  watch,
  minify: !watch,
  sourcemap: !watch,
});

Promise.all([
  build({ ...base({}), format: 'cjs' }),
  build({
    ...base({}),
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  }),
]).catch(() => process.exit(1));
