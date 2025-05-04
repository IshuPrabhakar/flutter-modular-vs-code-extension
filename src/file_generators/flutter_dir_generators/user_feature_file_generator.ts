import * as fs from 'fs';
import * as path from 'path';

export function createUserScreenDart(userRoutePath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, userRoutePath), 'ui/user_screen.dart');

  const content = 
`import 'package:flutter/material.dart';

class UserScreen extends StatelessWidget {
  const UserScreen({
    super.key,
    required this.userId,
    required this.userName,
  });

  final String userId;
  final String userName;

  static const routeName = '/user';

  /// Returns a route path for the user screen.
  /// Useful when navigating from one screen to another.
  static String routePath({
    required String userId,
    required String userName,
  }) =>
      '$routeName/$userId/$userName';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('User Profile'),
      ),
      body: Center(
        child: Text('Hello $userName!, your user id is $userId'),
      ),
    );
  }
}
`;
  fs.writeFileSync(filePath, content);
}
