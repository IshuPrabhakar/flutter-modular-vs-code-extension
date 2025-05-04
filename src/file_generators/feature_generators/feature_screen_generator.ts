import * as fs from 'fs';
import * as path from 'path';

export function createFeatureScreenDart(featurePath: string, featureName: string) {
  const className = `${capitalize(featureName)}Screen`;
  const fileName = `${featureName}_screen.dart`;
  const filePath = path.join(featurePath, 'ui', fileName);

  const content = 
`import 'package:flutter/material.dart';

class ${className} extends StatelessWidget {
  const ${className}({
    super.key,
    required this.id,
    required this.name,
  });

  final String id;
  final String name;

  static const routeName = '/${featureName}';

  static String routePath({
    required String id,
    required String name,
  }) =>
      '\$routeName/\$id/\$name';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${capitalize(featureName)} Screen'),
      ),
      body: Center(
        child: Text('Hello world!'),
      ),
    );
  }
}
`;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
