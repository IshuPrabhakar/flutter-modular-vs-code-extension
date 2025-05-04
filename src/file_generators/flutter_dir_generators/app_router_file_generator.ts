import * as fs from "fs";
import * as path from 'path';

export function createAppRouterDart(routerPath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, routerPath), 'app_router_config.dart');

  const content = 
`import 'package:flutter/widgets.dart';
import 'package:go_router/go_router.dart';

import '../features/home/ui/home_screen.dart';
import '../features/home/ui/pages/home_page.dart';
import '../features/home/ui/pages/search_page.dart';
import '../features/home/ui/pages/settings_page.dart';
import '../features/user/ui/user_screen.dart';

/// Configuration for the app's routing.
///
/// This class provides a single entrypoint for the app's routing configuration.
/// It defines the root navigator key, the initial location, and the routes.
///
/// The [router] is a singleton instance of [GoRouter] that is used by the
/// app to navigate between pages.
///
/// The [rootNavigatorKey] is a global key that is used by the app to access
/// the root navigator. This is necessary because the app has multiple
/// navigators, and the root navigator is the one that is used to navigate
/// between the different sections of the app.
abstract class AppRouterConfig {
  static final _rootNavigatorKey = GlobalKey<NavigatorState>(
    debugLabel: 'root',
  );

  static final GoRouter router = GoRouter(
    initialLocation: HomePage.routeName,
    navigatorKey: _rootNavigatorKey,
    routes: [
      /// A [StatefulShellRoute] is a special type of route that is used to
      /// manage a stack of pages that are related to each other. It is used to
      /// manage the app's main navigation, and it is used to provide a
      /// consistent navigation experience throughout the app.
      ///
      /// The [StatefulShellRoute] is configured to use an indexed stack to
      /// manage its pages. This means that the user can navigate back and forth
      /// between the pages by swiping left and right.
      ///
      /// The [StatefulShellRoute] is also configured to use a navigation shell
      /// to manage its pages. This means that the user can navigate between the
      /// pages using the app's bottom navigation bar.
      ///
      /// The [StatefulShellRoute] is configured to have three branches:
      /// [HomeBranch], [SearchBranch], and [SettingsBranch]. Each branch
      /// represents a different section of the app, and each branch has its own
      /// set of routes.
      ///
      /// The [HomeBranch] branch has a single route, which is the [HomePage].
      /// The [SearchBranch] branch has a single route, which is the [SearchPage].
      /// The [SettingsBranch] branch has a single route, which is the
      /// [SettingsPage].
      StatefulShellRoute.indexedStack(
        builder:
            (context, state, navigationShell) =>
                HomeScreen(navigationShell: navigationShell),
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: HomePage.routeName,
                builder: (context, state) => const HomePage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: SearchPage.routeName,
                builder: (context, state) => const SearchPage(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: SettingsPage.routeName,
                builder: (context, state) => const SettingsPage(),
              ),
            ],
          ),
        ],
      ),
      /// This route is used to navigate to the [UserScreen].
      ///
      /// The route path is \`user/:user_name/:user_id\`, where \`:user_name\` and
      /// \`:user_id\` are path parameters.
      ///
      /// The [UserScreen] is built with the \`userId\` and \`userName\` parameters
      /// extracted from the route path.
      ///
      /// For example, if the app navigates to the route \`user/JohnDoe/123\`,
      /// the [UserScreen] will be built with \`userId = 123\` and \`userName =
      /// JohnDoe\`.
      GoRoute(
        path: "\${UserScreen.routeName}/:user_name/:user_id",
        builder:
            (context, state) => UserScreen(
              userId: state.pathParameters['user_id']!,
              userName: state.pathParameters['user_name']!,
            ),
      ),
    ],
    // errorPageBuilder: (context, state) => const ErrorScreen(),
  );
}

`;
  fs.writeFileSync(filePath, content, 'utf-8');
}