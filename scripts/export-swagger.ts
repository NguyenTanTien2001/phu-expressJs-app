import fs from 'fs';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from '../src/config/swagger';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const outputPath = path.resolve(__dirname, '../public/docs/api-document.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');

console.log(`✅ Swagger JSON exported to: ${outputPath}`);
