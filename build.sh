#! /bin/bash

# build javascript files
node esbuild.js

# esbuild does not support building .d.ts files for type definitions.
# This npm script executes tsc to build type definition files.
npm run build-types