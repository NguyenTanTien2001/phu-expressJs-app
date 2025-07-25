import './core/envLoader'
import express from 'express';
import { errorHandlerMiddleware, loggerMiddleware } from './middlewares';
import { connectMongoDB } from './config/mongodb';
import indexRouter from './routes';
import cors from 'cors'
const PORT = 3000;

const app = express();

(async () => {
  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(loggerMiddleware)

  app.use('/api', indexRouter)
  app.use(errorHandlerMiddleware)
  
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at ${process.env.SERVER_URL}`);
    console.log(`🚀 APIs document running at ${process.env.SERVER_URL}/api/docs`);
  });
})();