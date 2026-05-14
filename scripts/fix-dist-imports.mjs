import { existsSync } from 'node:fs'
import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const distDir = path.resolve('dist')
const extensionPattern = /\.[a-z0-9]+$/i

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const fullPath = path.join(dir, entry)
    const info = await stat(fullPath)
    if (info.isDirectory()) {
      yield* walk(fullPath)
    } else if (fullPath.endsWith('.js')) {
      yield fullPath
    }
  }
}

function withJsExtension(specifier, importerDir) {
  if (!specifier.startsWith('.')) return specifier
  if (extensionPattern.test(path.basename(specifier))) return specifier
  if (existsSync(path.resolve(importerDir, `${specifier}.js`))) {
    return `${specifier}.js`
  }
  if (existsSync(path.resolve(importerDir, specifier, 'index.js'))) {
    return `${specifier}/index.js`
  }
  return `${specifier}.js`
}

function rewriteImports(source, importerDir) {
  return source
    .replace(/(\bfrom\s+['"])(\.[^'"]+)(['"])/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${withJsExtension(specifier, importerDir)}${suffix}`
    })
    .replace(/(\bimport\s+['"])(\.[^'"]+)(['"])/g, (_match, prefix, specifier, suffix) => {
      return `${prefix}${withJsExtension(specifier, importerDir)}${suffix}`
    })
}

for await (const filePath of walk(distDir)) {
  const source = await readFile(filePath, 'utf8')
  const rewritten = rewriteImports(source, path.dirname(filePath))
  if (rewritten !== source) {
    await writeFile(filePath, rewritten)
  }
}
