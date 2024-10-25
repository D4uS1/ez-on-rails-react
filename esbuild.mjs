#!/usr/bin/env node

import * as esbuild from 'esbuild';
import CssModulesPlugin from 'esbuild-css-modules-plugin';
import packageJson from './package.json' with {type: 'json'};

// Options for both, cjs and esm builds
const sharedBuildOptions = {
    bundle: true,
    entryPoints: ['src/index.ts'],
    // Treat all dependencies in package.json as externals to keep bundle size to a minimum
    external: [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.peerDependencies || {})],
    logLevel: "info",
    minify: true,
    sourcemap: true,
    plugins: [
        // @see https://github.com/indooorsman/esbuild-css-modules-plugin/blob/main/index.d.ts for possible options
        CssModulesPlugin({})
    ]
};

// build cjs.
esbuild.build({
    ...sharedBuildOptions,
    format: "cjs",
    outfile: "./dist/cjs/index.js",
    target: ["esnext", "node22"],
}).then(() => console.log('finished cjs build.'))

// build esm.
esbuild.build({
    ...sharedBuildOptions,
    format: "esm",
    outfile: "./dist/esm/index.js",
    target: ["esnext", "node22"],
}).then(() => console.log('finished esm build.'))
