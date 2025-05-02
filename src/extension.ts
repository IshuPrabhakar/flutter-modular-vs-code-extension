import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createMainDart } from './file_generators/main_file_generator';
import { createAppDart } from "./file_generators/app_file_generator";
import { addFlutterDependencies } from "./utils/add_dependencies";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('flutter-modular.flutterDirStructure', async () => {
    const folderUri = await vscode.window.showOpenDialog({ canSelectFolders: true, openLabel: "Select Project Root Folder" });
    if (!folderUri) {
      vscode.window.showErrorMessage('No folder selected.');
      return;
    }

    const rootPath = folderUri[0].fsPath;
    const libPath = path.join(rootPath, 'lib');

    if (!fs.existsSync(libPath)) {
      fs.mkdirSync(libPath, { recursive: true });
    }

    const appDartPath = 'lib/src/app'

    const folders = [
      appDartPath,
      'lib/src/common_widgets',
      'lib/src/constants',
      'lib/src/errors',
      'lib/src/features',
      'lib/src/features/home/application/services',
      'lib/src/features/home/data/repository',
      'lib/src/features/home/data/dtos',
      'lib/src/features/home/data/data_sources',
      'lib/src/features/home/domain/models',
      'lib/src/features/home/ui/controllers',
      'lib/src/features/home/ui/states',
      'lib/src/features/home/ui/widgets',
      'lib/src/localization',
      'lib/src/routing',
      'lib/src/utils',
    ];

    // Create folders
    folders.forEach(folder => {
      fs.mkdirSync(path.join(rootPath, folder), { recursive: true });
    });
    
    // Add dependencies
    addFlutterDependencies(rootPath, {
      'flutter_riverpod': '^2.6.1',
      'go_router': '^15.1.1'
    });

    // main.dart
    createMainDart(libPath);
    createAppDart(appDartPath, rootPath);
    vscode.window.showInformationMessage('Flutter project structure with Riverpod and GoRouter generated!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
