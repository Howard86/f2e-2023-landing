import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/** */
export const getProjectRootDir = (): string => {
  const mode = import.meta.env.MODE;

  return mode === 'production' ? path.join(dirname, '../') : path.join(dirname, '../../');
};

const srcFolder = path.join(getProjectRootDir(), '/src');

/** */
export const getRelativeUrlByFilePath = (filepath: string): string => filepath.replace(srcFolder, '');
