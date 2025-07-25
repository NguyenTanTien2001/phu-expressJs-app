
import { Router } from "express";
import * as userController from '../controllers/user.controller'

const userRouter = Router()

/**
 * @openapi
 * /users:
 *  post:
 *    summary: Create a new user
 *    description: Creates a new user entry with the provided name.
 *    tags:
 *      - User
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
 *               description: The name of the user to create.
 *    responses:
 *      201:
 *        description: User created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
userRouter.post('/', userController.createUserHandler)

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

userRouter.get('/', userController.getUsersHandler)

export default userRouter