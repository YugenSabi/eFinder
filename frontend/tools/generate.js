#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function slugToPascal(value) {
  return value
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function slugToTitle(value) {
  return value
    .split(/[-_/]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function writeFile(relativePath, content) {
  const filePath = path.join(process.cwd(), relativePath);

  if (fs.existsSync(filePath)) {
    throw new Error('File already exists: ' + relativePath);
  }

  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function writeJson(relativePath, value) {
  writeFile(relativePath, JSON.stringify(value, null, 2) + '\n');
}

function createUi(slug) {
  const componentName = slugToPascal(slug);

  writeJson('ui/' + slug + '/package.json', {
    name: '@ui/' + slug,
    version: '1.0.0',
    private: true,
    main: 'src/index.ts',
    dependencies: {
      '@ui/theme': '*',
    },
  });

  writeFile('ui/' + slug + '/src/index.ts', "export * from './" + slug + "';\n");
  writeFile(
    'ui/' + slug + '/src/' + slug + '.tsx',
    "import type { ReactNode } from 'react';\n\n" +
      'type ' +
      componentName +
      "Props = {\n  children?: ReactNode;\n};\n\n" +
      'export function ' +
      componentName +
      '({ children }: ' +
      componentName +
      "Props) {\n  return <div>{children}</div>;\n}\n"
  );
}

function createFragment(slug) {
  const componentName = slugToPascal(slug) + 'Component';

  writeJson('dashboard/identity/fragments/' + slug + '/package.json', {
    name: '@identity/' + slug,
    version: '1.0.0',
    private: true,
    main: 'src/index.ts',
    dependencies: {
      '@ui/layout': '*',
      '@ui/text': '*',
    },
  });

  writeFile(
    'dashboard/identity/fragments/' + slug + '/src/index.ts',
    "export * from './component';\n"
  );

  writeFile(
    'dashboard/identity/fragments/' + slug + '/src/component.tsx',
    "import { Box } from '@ui/layout';\n" +
      "import { Text } from '@ui/text';\n\n" +
      'export function ' +
      componentName +
      "() {\n  return (\n    <Box direction=\"column\" gap={12}>\n      <Text as=\"h1\" tone=\"title\">\n        " +
      slugToTitle(slug) +
      "\n      </Text>\n    </Box>\n  );\n}\n"
  );
}

function createPage(route, fragmentSlug) {
  const componentName = slugToPascal(fragmentSlug) + 'Component';
  const routePath = route.replace(/^\/+|\/+$/g, '');

  writeFile(
    'dashboard/identity/app/' + routePath + '/page.tsx',
    "import type { ReactNode } from 'react';\n" +
      "import { " +
      componentName +
      " } from '@identity/" +
      fragmentSlug +
      "';\n\n" +
      'export default function ' +
      slugToPascal(fragmentSlug) +
      "Page(): ReactNode {\n  return <" +
      componentName +
      ' />;\n}\n'
  );
}

function main() {
  const [, , command, first, second] = process.argv;

  if (!command || !first) {
    process.stderr.write('Usage:\n');
    process.stderr.write('  node ./tools/generate.js ui <name>\n');
    process.stderr.write('  node ./tools/generate.js fragment <name>\n');
    process.stderr.write('  node ./tools/generate.js page <route> <fragment-name>\n');
    process.exitCode = 1;
    return;
  }

  if (command === 'ui') {
    createUi(first);
    process.stdout.write('Created ui/' + first + '\n');
    return;
  }

  if (command === 'fragment') {
    createFragment(first);
    process.stdout.write('Created fragment ' + first + '\n');
    return;
  }

  if (command === 'page') {
    if (!second) {
      throw new Error('Page generation requires <route> and <fragment-name>');
    }

    createPage(first, second);
    process.stdout.write('Created page ' + first + ' -> ' + second + '\n');
    return;
  }

  throw new Error('Unknown command: ' + command);
}

try {
  main();
} catch (error) {
  process.stderr.write(String(error.message || error) + '\n');
  process.exitCode = 1;
}
