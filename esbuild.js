#!/usr/bin/env node

const esbuild = require('esbuild')
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const { dependencies } = require("./package.json");
const { peerDependencies } = require("./package.json");

// Options for both, cjs and esm builds
const sharedBuildOptions = {
    bundle: true,
    entryPoints: ['src/index.ts'],
    // Treat all dependencies in package.json as externals to keep bundle size to a minimum
    external: [...Object.keys(dependencies || {}), ...Object.keys(peerDependencies || {})],
    logLevel: "info",
    minify: true,
    sourcemap: true,
    plugins: [
        cssModulesPlugin({
            // experimental. v2 can bundle images in css, note if set `v2` to true, other options except `inject` will be ignored. and v2 only works with `bundle: true`.
            v2: false,
        })
    ]
};

// build cjs.
esbuild.build({
    ...sharedBuildOptions,
    format: "cjs",
    outfile: "./dist/cjs/index.js",
    target: ["esnext", "node18"],
}).then(() => console.log('finished cjs build.'))

// build esm.
esbuild.build({
    ...sharedBuildOptions,
    format: "esm",
    outfile: "./dist/esm/index.js",
    target: ["esnext", "node18"],
}).then(() => console.log('finished esm build.'))