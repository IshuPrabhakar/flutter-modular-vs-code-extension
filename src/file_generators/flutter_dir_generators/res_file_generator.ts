import * as fs from 'fs';
import * as path from 'path';

export function createResourceDart(libPath: string, rootPath: string) {
  const filePath = path.join(path.join(rootPath, libPath), 'res.dart');

  const content = 
`/// Contains all the paths of image used across the project.
/// Every image path variable name must contain a name and its extension.
/// example :
///
/// for an image with name avatar.png,
/// a suitable variable can be [avatarImagePng].
/// \`\`\`dart
/// static const sampleImagePng = "$_base/image.png";
/// \`\`\`
/// can be used by doing
/// \`\`\`dart
/// ImageAssets.sampleImagePng
/// \`\`\`
abstract class ImageAssets {}
`;
  fs.writeFileSync(filePath, content);
}
