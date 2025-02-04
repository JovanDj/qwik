/* eslint-disable no-console */
import { mkdirSync } from 'fs';
import color from 'kleur';
import { relative } from 'path';
import type { CliGenerateOptions, CliStarterData, CliStarters } from '../../scripts/util';
import {
  cp,
  createOutDir,
  createOutDirName,
  mergeSort,
  panic,
  readPackageJson,
  Replacements,
  validateOutDir,
  writePackageJson,
  writeToCwd,
} from './utils';

export function generateStarter(starters: CliStarters, opts: CliGenerateOptions) {
  if (!isValidOption(opts.projectName)) {
    panic(`Missing project name`);
  }
  if (!isValidOption(opts.appId)) {
    panic(`Missing starter id`);
  }

  const outDirName = createOutDirName(opts.projectName!);
  let outDir: string;

  if (writeToCwd()) {
    // write to the current working directory
    outDir = process.cwd();
  } else {
    // create a sub directory
    outDir = createOutDir(outDirName);
    validateOutDir(outDir);
    mkdirSync(outDir, { recursive: true });
  }

  const starterApp = starters.apps.find((s) => s.id === opts.appId);
  const starterServer = starters.servers.find((s) => s.id === opts.serverId);
  if (starterApp) {
    generateUserStarter(outDir, starterApp, starterServer, opts.projectName!);
  } else {
    panic(`Invalid starter id "${opts.appId}".`);
  }
}

function generateUserStarter(
  outDir: string,
  starterApp: CliStarterData,
  starterServer: CliStarterData | undefined,
  projectName: string
) {
  const replacements: Replacements = [[/\bqwik-project-name\b/g, projectName]];
  cp(starterApp.dir, outDir, replacements);

  const pkgJson = readPackageJson(starterApp.dir);

  if (starterServer) {
    pkgJson.name = projectName;
    cp(starterServer.dir, outDir, replacements);

    const serverPkgJson = readPackageJson(starterServer.dir);
    mergeSort(pkgJson, serverPkgJson, 'scripts');
    mergeSort(pkgJson, serverPkgJson, 'dependencies');
    mergeSort(pkgJson, serverPkgJson, 'devDependencies');
  }
  delete pkgJson.priority;
  writePackageJson(outDir, pkgJson);

  const isCwdDir = process.cwd() === outDir;
  const relativeProjectPath = relative(process.cwd(), outDir);
  console.log(``);

  if (isCwdDir) {
    console.log(`⭐️ ${color.green(`Success!`)}`);
  } else {
    console.log(
      `⭐️ ${color.green(`Success! Project saved in`)} ${color.yellow(
        relativeProjectPath
      )} ${color.green(`directory`)}`
    );
  }

  console.log(``);

  console.log(`📟 ${color.cyan(`Next steps:`)}`);
  if (!isCwdDir) {
    console.log(`   cd ${relativeProjectPath}`);
  }
  console.log(`   npm install`);
  console.log(`   npm start`);
  console.log(``);
}

function isValidOption(value: any) {
  return typeof value === 'string' && value.trim().length > 0;
}
