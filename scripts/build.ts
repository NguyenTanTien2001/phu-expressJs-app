import { execSync } from 'child_process';
import { copySync } from 'fs-extra';

execSync('tsc', { stdio: 'inherit' });
copySync('src/docs', 'dist/docs');
