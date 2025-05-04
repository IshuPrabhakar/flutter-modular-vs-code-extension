import * as fs from "fs";
import * as path from 'path';

export function createHomeScreenDart(homeRoutePath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, homeRoutePath), 'ui/home_screen.dart');

  const content = 
`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key, required this.navigationShell});

  final StatefulNavigationShell navigationShell;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: widget.navigationShell,
      bottomNavigationBar: BottomNavigationBar(
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.search),
            label: 'Search',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
        currentIndex: widget.navigationShell.currentIndex,
        onTap: (index) {
          widget.navigationShell.goBranch(
            index,
            initialLocation: index == widget.navigationShell.currentIndex,
          );
        },
      ),
    );
  }
}

`;
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function createHomePageDart(homeRoutePath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, homeRoutePath), 'home_page.dart');

  const content = 
`import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../user/ui/user_screen.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  static const routeName = '/home';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Home')),
      body: ListView(
        children: [
          TextButton(
            onPressed: () {
              // We use \`context.push\` instead of \`context.go\` to explicitly
              // create a new route entry on the navigator's stack. This is
              // necessary if we want the back button to be enabled on the
              // user screen.
              context.push(
                UserScreen.routePath(userId: '123', userName: "Honey"),
              );
            },
            child: const Text("Go to User Screen"),
          ),
        ],
      ),
    );
  }
}

`;
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function createSearchPageDart(homeRoutePath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, homeRoutePath), 'search_page.dart');

  const content = 
`import 'package:flutter/material.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  static const routeName = "/search";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Search"),
      ),
      body: const Center(
        child: Text('Search Screen'),
      ),
    );
  }
}

`;
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function createSettingsPageDart(homeRoutePath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, homeRoutePath), 'settings_page.dart');

  const content = 
`import 'package:flutter/material.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  static const routeName = '/settings';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Settings'),
      ),
      body: const Center(
        child: Text("Settings Screen"),
      ),
    );
  }
}

`;
  fs.writeFileSync(filePath, content, 'utf-8');
}
