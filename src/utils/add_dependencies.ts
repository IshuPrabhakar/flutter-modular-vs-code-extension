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

  // Ensure "dependencies:" exists
  if (!pubspecContent.includes('dependencies:')) {
    pubspecContent += '\ndependencies:\n';
  }

  // Append each dependency if not already present
  for (const [pkg, version] of Object.entries(dependencies)) {
    const depPattern = new RegExp(`^\\s*${pkg}:`, 'm');
    if (!depPattern.test(pubspecContent)) {
      pubspecContent += `  ${pkg}: ${version}\n`;
    }
  }

  fs.writeFileSync(pubspecPath, pubspecContent, 'utf-8');

  vscode.window.showInformationMessage('Dependencies added. Running flutter pub get...');

  // Run flutter pub get
  const cp = require('child_process');
  cp.exec('flutter pub get', { cwd: projectRoot }, (error: any, stdout: string, stderr: string) => {
    if (error) {
      vscode.window.showErrorMessage(`Failed to run flutter pub get: ${stderr}`);
      return;
    }
    vscode.window.showInformationMessage('flutter pub get completed successfully.');
  });
}
