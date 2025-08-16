import esbuild from "esbuild"
import { resolve } from "path"

const NAME = "levent"

// UMD build (minified)
esbuild.build({
    entryPoints: [resolve(__dirname, "src/umd.ts")],
    bundle: true,
    minify: true,
    format: "iife",
    globalName: NAME,
    outfile: resolve(__dirname, `dist/${NAME}.min.js`)
})

// UMD build (with sourcemap)
esbuild.build({
    entryPoints: [resolve(__dirname, "src/umd.ts")],
    bundle: true,
    sourcemap: true,
    format: "iife",
    globalName: NAME,
    outfile: resolve(__dirname, `dist/${NAME}.js`)
})