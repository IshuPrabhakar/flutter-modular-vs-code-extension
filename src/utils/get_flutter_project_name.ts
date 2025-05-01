import * as fs from 'fs';
import * as path from 'path';

export function getFlutterProjectName(projectRoot: string): string | undefined {
  const pubspecPath = path.join(projectRoot, 'pubspec.yaml');

  if (!fs.existsSync(pubspecPath)) {
    console.error('pubspec.yaml not found');
    return undefined;
  }

  const pubspecContent = fs.readFileSync(pubspecPath, 'utf-8');

  // Simple regex to extract project name
  const nameMatch = pubspecContent.match(/^name:\s*([a-zA-Z0-9_]+)/m);

  if (nameMatch && nameMatch[1]) {
    return nameMatch[1];
  }

  console.error('Project name not found in pubspec.yaml');
  return undefined;
}
