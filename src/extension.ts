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

    const appDartPath = 'lib/app'

    const folders = [
      appDartPath,
      'lib/src/common_widgets',
      'lib/src/constants',
      'lib/src/errors',
      'lib/src/features',
      'lib/src/home/application/services',
      'lib/src/home/data/repository',
      'lib/src/home/data/dtos',
      'lib/src/home/data/data_sources',
      'lib/src/home/domain/models',
      'lib/src/home/ui/controllers',
      'lib/src/home/ui/states',
      'lib/src/home/ui/widgets',
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

    // app.dart
    createAppDart(appDartPath);
//     fs.writeFileSync(path.join(libPath, 'app', 'app.dart'),
// 	`import 'package:flutter/material.dart';
// 	import 'package:go_router/go_router.dart';
// 	import '../src/routing/app_route.dart';

// 	class MyApp extends StatelessWidget {
// 	const MyApp({super.key});

// 	@override
// 	Widget build(BuildContext context) {
// 		return MaterialApp.router(
// 		routerConfig: AppRoute.router,
// 		debugShowCheckedModeBanner: false,
// 		);
// 	}
// 	}
// 	`);

//     // app_route.dart
//     fs.writeFileSync(path.join(libPath, 'src', 'routing', 'app_route.dart'),
// `import 'package:go_router/go_router.dart';
// import '../home/ui/home_screen.dart';

// class AppRoute {
//   static final router = GoRouter(
//     routes: [
//       GoRoute(
//         path: '/',
//         builder: (context, state) => const HomeScreen(),
//       ),
//     ],
//   );
// }
// `);

//     // home_screen.dart with BottomNavBar
//     fs.writeFileSync(path.join(libPath, 'src', 'home', 'ui', 'home_screen.dart'),
// `import 'package:flutter/material.dart';

// class HomeScreen extends StatefulWidget {
//   const HomeScreen({super.key});

//   @override
//   State<HomeScreen> createState() => _HomeScreenState();
// }

// class _HomeScreenState extends State<HomeScreen> {
//   int _currentIndex = 0;

//   final List<Widget> _pages = [
//     Center(child: Text('Home Page')),
//     Center(child: Text('Search Page')),
//     Center(child: Text('Profile Page')),
//   ];

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text('Home')),
//       body: _pages[_currentIndex],
//       bottomNavigationBar: BottomNavigationBar(
//         currentIndex: _currentIndex,
//         onTap: (index) => setState(() => _currentIndex = index),
//         items: const [
//           BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
//           BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
//           BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
//         ],
//       ),
//     );
//   }
// }
// `);

    vscode.window.showInformationMessage('Flutter project structure with Riverpod and GoRouter generated!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
