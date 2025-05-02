import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

export function addFlutterDependencies(projectRoot: string, dependencies: { [key: string]: string }) {
  const pubspecPath = path.join(projectRoot, 'pubspec.yaml');

  if (!fs.existsSync(pubspecPath)) {
    vscode.window.showErrorMessage('pubspec.yaml not found.');
    return;
  }

  let pubspecContent = fs.readFileSync(pubspecPath, 'utf-8');
  const lines = pubspecContent.split('\n');

  let depStartIndex = lines.findIndex(line => line.trim() === 'dependencies:');

  if (depStartIndex === -1) {
    vscode.window.showErrorMessage('dependencies: section not found in pubspec.yaml.');
    return;
  }

  // Collect existing dependencies to avoid duplicates
  const existingDeps = new Set<string>();
  let insertIndex = depStartIndex + 1;

  for (let i = depStartIndex + 1; i < lines.length; i++) {
    const line = lines[i];

    // If we hit another top-level section, stop
    if (/^\S/.test(line)) {
      break;
    }

    const match = line.match(/^\s*([a-zA-Z0-9_]+):/);
    if (match) {
      existingDeps.add(match[1]);
    }

    insertIndex = i + 1;
  }

  const newLines: string[] = [];

  for (const [pkg, version] of Object.entries(dependencies)) {
    if (!existingDeps.has(pkg)) {
      newLines.push(`  ${pkg}: ${version}`);
    }
  }

  if (newLines.length === 0) {
    vscode.window.showInformationMessage('All dependencies already exist.');
    return;
  }

  lines.splice(insertIndex, 0, ...newLines);
  fs.writeFileSync(pubspecPath, lines.join('\n'), 'utf-8');

  vscode.window.showInformationMessage('Dependencies added. Running flutter pub get...');

  const cp = require('child_process');
  const flutterCmd = process.platform === 'win32' ? 'flutter.bat' : 'flutter';

  cp.exec(`${flutterCmd} pub get`, { cwd: projectRoot, env: process.env }, (error: any, stdout: string, stderr: string) => {
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if (error) {
      vscode.window.showErrorMessage(`Failed to run flutter pub get: ${stderr || error.message}`);
      return;
    }
    vscode.window.showInformationMessage('flutter pub get completed successfully.');
  });
}
