
import { Router } from "express";
import * as todoItemController from '../controllers/todoItem.controller'

const todoItemRouter = Router()

/**
 * @openapi
 * /todoItems:
 *   post:
 *     summary: Create a new todo item
 *     tags:
 *       - TodoItem
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - todoGroupId
 *               - due_at
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               todoGroupId:
 *                 type: string
 *               des:
 *                 type: string
 *               due_at:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo item created successfully
 *       400:
 *         description: Invalid input
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

/**
 * @openapi
 * /todoItems/{id}:
 *   get:
 *     summary: Get a todo item by ID
 *     tags:
 *       - TodoItem
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo item
 *     responses:
 *       200:
 *         description: Todo item found
 *       404:
 *         description: Todo item not found
 */

todoItemRouter.get('/:id', todoItemController.getTodoItemByIdHandler);

/**
 * @openapi
 * /todoItems/{id}:
 *   put:
 *     summary: Update a todo item by ID
 *     tags:
 *       - TodoItem
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               todoGroupId:
 *                 type: string
 *               des:
 *                 type: string
 *               due_at:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo item updated successfully
 *       404:
 *         description: Todo item not found
 */

todoItemRouter.put('/:id', todoItemController.updateTodoItemHandler);

/**
 * @openapi
 * /todoItems/{id}:
 *   delete:
 *     summary: Delete a todo item by ID
 *     tags:
 *       - TodoItem
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo item deleted
 *       404:
 *         description: Todo item not found
 */

todoItemRouter.delete('/:id', todoItemController.deleteTodoItemHandler);

export default todoItemRouter