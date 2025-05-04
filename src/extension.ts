import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { createMainDart } from './file_generators/flutter_dir_generators/main_file_generator';
import { createAppDart } from "./file_generators/flutter_dir_generators/app_file_generator";
import { addFlutterDependencies } from "./utils/add_dependencies";
import { createAppRouterDart, } from "./file_generators/flutter_dir_generators/app_router_file_generator";
import { createHomeScreenDart, createSearchPageDart, createHomePageDart, createSettingsPageDart } from "./file_generators/flutter_dir_generators/home_feature_file_generators";
import { createUserScreenDart } from "./file_generators/flutter_dir_generators/user_feature_file_generator";
import { createResourceDart } from "./file_generators/flutter_dir_generators/res_file_generator";

import { createFeatureScreenDart } from "./file_generators/feature_generators/feature_screen_generator";

export function activate(context: vscode.ExtensionContext) {

  /// Generate folder structure
  const generateFolderStructureCommand = vscode.commands.registerCommand('flutter-modular-structure-generator.flutterDirStructure', async () => {
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

    const appDartPath = 'lib/src/app';
    const appRouterConfigPath = 'lib/src/routing';
    const homeFeaturePath = 'lib/src/features/home';
    const userFeaturePath = 'lib/src/features/user';
    const resourcePath = 'lib/src/res';

    const folders = [
      appDartPath,
      'lib/src/common_widgets',
      'lib/src/constants',
      'lib/src/errors',
      'lib/src/features',
      resourcePath,
      `${homeFeaturePath}/application/services`,
      `${homeFeaturePath}/data/repository`,
      `${homeFeaturePath}/data/dtos`,
      `${homeFeaturePath}/data/data_sources`,
      `${homeFeaturePath}/domain/models`,
      `${homeFeaturePath}/ui/controllers`,
      `${homeFeaturePath}/ui/states`,
      `${homeFeaturePath}/ui/widgets`,
      `${homeFeaturePath}/ui/pages`,
      `${userFeaturePath}/application/services`,
      `${userFeaturePath}/data/repository`,
      `${userFeaturePath}/data/dtos`,
      `${userFeaturePath}/data/data_sources`,
      `${userFeaturePath}/domain/models`,
      `${userFeaturePath}/ui/controllers`,
      `${userFeaturePath}/ui/states`,
      `${userFeaturePath}/ui/widgets`,
      'lib/src/localization',
      appRouterConfigPath,
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
    createAppRouterDart(appRouterConfigPath, rootPath);

    createHomeScreenDart(homeFeaturePath, rootPath);
    createSearchPageDart(`${homeFeaturePath}/ui/pages`, rootPath);
    createSettingsPageDart(`${homeFeaturePath}/ui/pages`, rootPath);
    createHomePageDart(`${homeFeaturePath}/ui/pages`, rootPath);

    createUserScreenDart(userFeaturePath, rootPath);

    createResourceDart(resourcePath, rootPath);

    vscode.window.showInformationMessage('Flutter project structure with Riverpod and GoRouter generated!');
  });

  /// Generate a feature folder structure
  const generateFeatureFolderStructureCommand = vscode.commands.registerCommand(
    'flutter-modular-structure-generator.flutterFeatureDirStructure',
    async () => {
      const folderUri = await vscode.window.showOpenDialog({
        canSelectFolders: true,
        openLabel: "Select lib Folder"
      });

      if (!folderUri) {
        vscode.window.showErrorMessage('No folder selected.');
        return;
      }

      const libPath = folderUri[0].fsPath;

      const featureName = await vscode.window.showInputBox({
        prompt: "Enter the feature name (e.g., home, auth, profile)",
        ignoreFocusOut: true,
        validateInput: (value) => {
          if (!value.trim()) return 'Feature name cannot be empty';
          if (/\s/.test(value)) return 'Feature name must not contain spaces';
          return null;
        }
      });

      if (!featureName) {
        vscode.window.showErrorMessage('No feature name provided.');
        return;
      }

      const featurePath = path.join(libPath, 'src', 'features', featureName);

      const folders = [
        path.join(featurePath, 'application', 'services'),
        path.join(featurePath, 'data', 'repository'),
        path.join(featurePath, 'data', 'dtos'),
        path.join(featurePath, 'data', 'data_sources'),
        path.join(featurePath, 'domain', 'models'),
        path.join(featurePath, 'ui', 'controllers'),
        path.join(featurePath, 'ui', 'states'),
        path.join(featurePath, 'ui', 'widgets'),
        path.join(featurePath, 'ui', 'pages'),
      ];

      // Create folders
      folders.forEach(folder => {
        fs.mkdirSync(folder, { recursive: true });
      });

      // Create sample screen
      createFeatureScreenDart(featurePath, featureName);

      vscode.window.showInformationMessage(`Feature folder structure for "${featureName}" generated!`);
    }
  );

  context.subscriptions.push(generateFolderStructureCommand);
  context.subscriptions.push(generateFeatureFolderStructureCommand);
}

export function deactivate() { }
