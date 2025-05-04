import * as fs from "fs";
import * as path from 'path';
import { getFlutterProjectName } from "../../utils/get_flutter_project_name";

export function createAppDart(appDartPath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, appDartPath), 'app.dart');

  const projectName = getFlutterProjectName(rootPath);

  const content = 
`import 'package:flutter/material.dart';

import '../routing/app_router_config.dart';

 class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: '${projectName ?? 'Your App Name'}',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routeInformationParser: AppRouterConfig.router.routeInformationParser,
      routeInformationProvider: AppRouterConfig.router.routeInformationProvider,
      routerDelegate: AppRouterConfig.router.routerDelegate,
    );
  }
}
`;
  fs.writeFileSync(filePath, content, 'utf-8');
}