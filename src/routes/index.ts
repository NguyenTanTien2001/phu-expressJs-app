import { Router } from "express";
import swaggerRouter from './swagger.router';
import testRouter from "./test.router";
import userRouter from "./user.router";
import todoItemRouter from "./todoItem.router";
import todoListRouter from "./todoList.router";

const indexRouter = Router()

indexRouter.use('/docs', swaggerRouter)
indexRouter.use('/tests', testRouter)
indexRouter.use('/users', userRouter)
indexRouter.use('/todoItems', todoItemRouter)
indexRouter.use('/todoLists', todoListRouter)

export default indexRouter