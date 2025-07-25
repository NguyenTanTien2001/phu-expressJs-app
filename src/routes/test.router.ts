
import { Router } from "express";
import * as testController from '../controllers/test.controller'

const testRouter = Router()

/**
 * @openapi
 * /tests:
 *  post:
 *    summary: Create a new test
 *    description: Creates a new test entry with the provided name.
 *    tags:
 *      - Test
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
 *               description: The name of the test to create.
 *    responses:
 *      201:
 *        description: Test created successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Test'
 *      400:
 *        description: Invalid input
 *      500:
 *        description: Internal server error
 */
testRouter.post('/', testController.createTestHandler)

/**
 * @openapi
 * /tests:
 *   get:
 *     summary: Get all tests
 *     description: Retrieve a list of all tests.
 *     tags:
 *       - Test
 *     responses:
 *       200:
 *         description: A list of tests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 *       500:
 *         description: Internal server error
 */

testRouter.get('/', testController.getTestsHandler)

export default testRouter