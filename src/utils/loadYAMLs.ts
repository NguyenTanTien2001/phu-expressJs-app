import fs from 'fs';
import path from 'path';
import YAML from 'yamljs';

/**
 * Loads and merges all YAML files from a specified directory into a single object.
 *
 * @param dirPath - The relative path to the directory containing YAML files.
 * @returns An object containing the merged contents of all YAML files in the directory.
 *
 * @remarks
 * - Only files with `.yaml` or `.yml` extensions are processed.
 * - If multiple files contain the same keys, later files will overwrite earlier ones.
 * - The function expects the YAML files to be valid and parseable.
 */
export function loadAllYAMLFromDir(dirPath: string): Record<string, any> {
  const absolutePath = path.resolve(__dirname, dirPath);
  const yamlFiles = fs.readdirSync(absolutePath).filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));

  const merged: Record<string, any> = {};

  for (const file of yamlFiles) {
    const filePath = path.join(absolutePath, file);
    const yamlContent = YAML.load(filePath);

    if (yamlContent?.components?.schemas) {
      Object.assign(merged, yamlContent.components.schemas); // ✅ merge only the schemas
    }
  }

  return merged
}
