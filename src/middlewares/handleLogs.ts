import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs'
import { ulid } from 'ulid';

const logFilePath = path.join(__dirname, `../../logs/[${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}]-access.log`);

if (!fs.existsSync(path.dirname(logFilePath))) {
  fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
}

function writeLog(message: string) {
  const logLine = `${message}\n`;
  fs.appendFileSync(logFilePath, logLine, 'utf8');
}

/**
 * Express middleware that logs the HTTP method and URL of each incoming request.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the stack.
 *
 * @remarks
 * This middleware outputs a log message to the console in the format: `[METHOD] URL`.
 * It should be placed early in the middleware chain to capture all requests.
 */
export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.originalUrl.includes('.well-known')) return next();

  const startTime = Date.now();
  const id = ulid()

  // console.log(`\n[TIME = ${new Date().toISOString()}]`)
  // console.log(`➡️  [ID = ${id}] Request: ${req.method} ${req.originalUrl}`);
  // console.log(`Headers:`, req.headers);
  // if (req.method !== 'GET') {
  //   console.log(`Body:`, req.body);
  // }

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    // console.log(`⬅️  [ID = ${id}] Response: ${res.statusCode} ${res.statusMessage}; Duration: ${duration}ms`);

    writeLog(`➡️ [TIME = ${new Date().toISOString()}, ID = ${id}]]`)
    writeLog(`Request: ${req.method} ${req.originalUrl}`)
    writeLog(`Headers: ${JSON.stringify(req.headers)}`)
    
    if (req.method !== 'GET') {
      console.log(`Body: ${JSON.stringify(req.body)}`);
    }

    writeLog(`Response: ${res.statusCode} ${res.statusMessage}; Duration: ${duration}ms`)
    writeLog('-------------------------------------------------------------------------------------------------------')
  });

  next();
}

