const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");

const esbuild = require("esbuild");
const sass = require("sass");

const root = path.resolve(__dirname, "..");

const paths = {
  styles: {
    entry: path.join(root, "src/scss/styles.scss"),
    out: path.join(root, "www/css/styles.css"),
    map: path.join(root, "www/css/maps/styles.css.map"),
    mapUrl: "maps/styles.css.map"
  },
  scripts: {
    entry: path.join(root, "src/js/sotm.js"),
    out: path.join(root, "www/js/sotm.js"),
    map: path.join(root, "www/js/maps/sotm.js.map"),
    mapUrl: "maps/sotm.js.map"
  }
};

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function writeFile(filePath, contents) {
  ensureDir(filePath);
  fs.writeFileSync(filePath, contents);
}

function rebaseSassSource(source, mapFilePath) {
  if (!source.startsWith("file:")) {
    return source;
  }

  return normalizePath(path.relative(path.dirname(mapFilePath), fileURLToPath(source)));
}

function rebaseMovedSource(source) {
  if (/^(?:[a-z]+:)?\/\//i.test(source) || path.isAbsolute(source)) {
    return source;
  }

  return normalizePath(path.join("..", source));
}

function buildStyles() {
  const result = sass.compile(paths.styles.entry, {
    sourceMap: true,
    sourceMapIncludeSources: false,
    style: "compressed"
  });

  const sourceMap = {
    ...result.sourceMap,
    file: "../styles.css",
    sources: result.sourceMap.sources.map((source) => rebaseSassSource(source, paths.styles.map))
  };

  writeFile(paths.styles.out, `${result.css}\n/*# sourceMappingURL=${paths.styles.mapUrl} */\n`);
  writeFile(paths.styles.map, `${JSON.stringify(sourceMap)}\n`);
}

async function buildScripts() {
  const result = await esbuild.build({
    bundle: true,
    entryPoints: [paths.scripts.entry],
    minify: true,
    outfile: paths.scripts.out,
    sourcemap: true,
    write: false
  });

  const script = result.outputFiles.find((file) => file.path.endsWith(".js"));
  const sourceMapFile = result.outputFiles.find((file) => file.path.endsWith(".js.map"));

  if (!script || !sourceMapFile) {
    throw new Error("esbuild did not return the expected output files");
  }

  const sourceMap = JSON.parse(sourceMapFile.text);
  sourceMap.file = "../sotm.js";
  sourceMap.sources = sourceMap.sources.map(rebaseMovedSource);

  const scriptText = script.text.replace(
    /\/\/# sourceMappingURL=sotm\.js\.map\s*$/,
    `//# sourceMappingURL=${paths.scripts.mapUrl}\n`
  );

  writeFile(paths.scripts.out, scriptText);
  writeFile(paths.scripts.map, `${JSON.stringify(sourceMap)}\n`);
}

async function run() {
  const tasks = {
    css: buildStyles,
    js: buildScripts
  };
  const requestedTasks = process.argv.slice(2);
  const selectedTasks = requestedTasks.length > 0 ? requestedTasks : Object.keys(tasks);

  for (const taskName of selectedTasks) {
    const task = tasks[taskName];

    if (!task) {
      throw new Error(`Unknown build task: ${taskName}`);
    }

    await task();
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
