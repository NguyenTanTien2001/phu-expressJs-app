
import { Router } from "express";
import * as todoListController from '../controllers/todoList.controller'

const todoListRouter = Router()

/**
 * @openapi
 * /todoLists:
 *  post:
 *    summary: Create a new todoList
 *    description: Creates a new todoList entry with the provided name.
 *    tags:
 *      - TodoList
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - title
 *           properties:
 *             title:
 *               type: string
 *               description: The name of the todoList to create.
 *    responses:
 *      201:
 *        description: TodoList created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TodoList'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
todoListRouter.post('/', todoListController.createTodoListHandler)

/**
 * @openapi
 * /todoLists:
 *   get:
 *     summary: Get all todoLists
 *     description: Retrieve a list of all todoLists.
 *     tags:
 *       - TodoList
 *     responses:
 *       200:
 *         description: A list of todoLists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoList'
 *       500:
 *         description: Internal server error
 */

todoListRouter.get('/', todoListController.getTodoListsHandler)

export default todoListRouter