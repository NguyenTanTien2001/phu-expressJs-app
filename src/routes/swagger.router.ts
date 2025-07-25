import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from '../config/swagger';

const swaggerRouter = Router()
swaggerRouter.use(swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export default swaggerRouter