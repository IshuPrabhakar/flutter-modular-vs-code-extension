import * as fs from 'fs';
import * as path from 'path';

export function createMainDart(libPath: string) {
  const filePath = path.join(libPath, 'main.dart');

  const content = 
`import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'src/app/app.dart';

void main() {
  runApp(const ProviderScope(child: App()));
}
`;
  fs.writeFileSync(filePath, content);
}
