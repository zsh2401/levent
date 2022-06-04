import esbuild from "esbuild"
import { resolve } from "path"
const NAME = "levent"
esbuild.build({
    entryPoints: [resolve(__dirname, "src/umd.ts")],
    bundle: true,
    minify: true,
    outfile: resolve(__dirname, `dist/${NAME}.min.js`)
})
esbuild.build({
    entryPoints: [resolve(__dirname, "src/umd.ts")],
    bundle: true,
    sourcemap: true,
    outfile: resolve(__dirname, `dist/${NAME}.js`)
})