// Dependency-free test runner: bundles every src/**/*.test.{js,jsx} with esbuild
// (already installed through Vite) and runs the result with Node's built-in test runner.
import { build } from "esbuild";
import { spawnSync } from "node:child_process";
import { readdirSync, statSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const filter = process.argv[2] ?? "";
const found = [];
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.test\.jsx?$/.test(name) && p.includes(filter)) found.push(p);
  }
})(join(root, "src"));

if (!found.length) {
  console.error(`No test files matched "${filter}"`);
  process.exit(1);
}

const out = join(root, ".test-build");
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

// Images and styles are not needed in tests: resolve them to an empty string.
const stubAssets = {
  name: "stub-assets",
  setup(b) {
    b.onResolve({ filter: /\.(png|jpe?g|svg|webp|css)$/ }, (a) => ({ path: a.path, namespace: "stub" }));
    b.onLoad({ filter: /.*/, namespace: "stub" }, (a) => ({ contents: `export default ${JSON.stringify("/stub/" + a.path.split("/").pop())}`, loader: "js" }));
  },
};

await build({
  entryPoints: found,
  outdir: out,
  outbase: join(root, "src"),
  bundle: true,
  platform: "node",
  format: "esm",
  jsx: "automatic",
  loader: { ".js": "jsx" },
  plugins: [stubAssets],
  packages: "external",
  logLevel: "error",
});

const files = found.map((f) => join(out, f.slice(join(root, "src").length).replace(/\.jsx?$/, ".js")));
const r = spawnSync(process.execPath, ["--test", ...files], { stdio: "inherit" });
rmSync(out, { recursive: true, force: true });
process.exit(r.status ?? 1);
