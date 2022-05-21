import esbuild from "esbuild"
import { resolve } from "path"
esbuild.build({
    entryPoints: [resolve(__dirname, "src/index.ts")],
    bundle: true,
    minify: true,
    outfile: resolve(__dirname, "dist/eventx.min.js")
})
esbuild.build({
    entryPoints: [resolve(__dirname, "src/index.ts")],
    bundle: true,
    sourcemap: true,
    outfile: resolve(__dirname, "dist/eventx.js")
})