
import { Router } from "express";
import * as todoItemController from '../controllers/todoItem.controller'

const todoItemRouter = Router()

/**
 * @openapi
 * /todoItems:
 *  post:
 *    summary: Create a new todoItem
 *    description: Creates a new todoItem entry with the provided name.
 *    tags:
 *      - TodoItem
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           required:
 *             - name
 *           properties:
 *             todoGroupId:
 *               type: string
 *               description: The group id of the todoItem to create.
 *             name:
 *               type: string
 *               description: The name of the todoItem to create.
 *             des:
 *               type: string
 *               description: The description of the todoItem to create.
 *    responses:
 *      201:
 *        description: TodoItem created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TodoItem'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
todoItemRouter.post('/', todoItemController.createTodoItemHandler)

/**
 * @openapi
 * /todoItems:
 *   get:
 *     summary: Get all todoItems
 *     description: Retrieve a list of all todoItems.
 *     tags:
 *       - TodoItem
 *     responses:
 *       200:
 *         description: A list of todoItems
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoItem'
 *       500:
 *         description: Internal server error
 */

todoItemRouter.get('/', todoItemController.getTodoItemsHandler)

export default todoItemRouter