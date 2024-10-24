#! /bin/bash

# build javascript files
node esbuild.mjs

# esbuild does not support building .d.ts files for type definitions.
# This npm script executes tsc to build type definition files.
yarn run build-types
