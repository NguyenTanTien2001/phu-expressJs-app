
import { Router } from "express";
import * as todoListController from '../controllers/todoList.controller'
import { authenticator } from '../middlewares/auth';

const todoListRouter = Router()

/**
 * @openapi
 * /todoLists:
 *   post:
 *     summary: Create a new todo list
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TodoList
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - user_id
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *               user_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Todo list created successfully
 *       400:
 *         description: Invalid input
 */
todoListRouter.post('/', authenticator, todoListController.createTodoListHandler)

/**
 * @openapi
 * /todoLists:
 *   get:
 *     summary: Get all todoLists
 *     description: Retrieve a list of all todoLists.
 *     security:
 *       - bearerAuth: []
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

todoListRouter.get('/', authenticator, todoListController.getTodoListsHandler)

/**
 * @openapi
 * /todoLists/{id}:
 *   get:
 *     summary: Get a todo list by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TodoList
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo list
 *     responses:
 *       200:
 *         description: Todo list found
 *       404:
 *         description: Todo list not found
 */
todoListRouter.get('/:id', authenticator, todoListController.getTodoListByIdHandler);

/**
 * @openapi
 * /todoLists/{id}:
 *   put:
 *     summary: Update a todo list by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TodoList
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
 *               user_id:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo list updated
 *       404:
 *         description: Todo list not found
 */
todoListRouter.put('/:id', authenticator, todoListController.updateTodoListHandler);

/**
 * @openapi
 * /todoLists/{id}:
 *   delete:
 *     summary: Delete a todo list by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - TodoList
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo list deleted
 *       404:
 *         description: Todo list not found
 */
todoListRouter.delete('/:id', authenticator, todoListController.deleteTodoListHandler);

export default todoListRouter