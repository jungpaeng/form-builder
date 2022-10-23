---
to: packages/<%= name %>/esbuild.config.js
---

const { build } = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const watch = process.argv.includes('--watch');

const base = ({ entryPoints = ['src/index.ts'], outdir = 'dist' }) => ({
  entryPoints,
  outdir,
  bundle: true,
  target: 'es2015',
  watch,
  minify: !watch,
  sourcemap: !watch,
  plugins: [nodeExternalsPlugin()],
});

Promise.all([
  build({ ...base({}), format: 'cjs' }),
  build({
    ...base({}),
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  }),
]).catch(() => process.exit(1));
