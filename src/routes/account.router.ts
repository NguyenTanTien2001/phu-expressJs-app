import { Router } from "express";
import {
    registerAccountHandler,
    loginAccountHandler,
    getAccountsHandler,
    getAccountByIdHandler,
    updateAccountHandler,
    deleteAccountHandler,
} from '../controllers/account.controller';
import { validate } from "../middlewares/validateResource";
import { loginAccountSchema, registerAccountSchema, updateAccountSchema } from "../schemas/account.schema";

const router = Router();

/**
 * @openapi
 * /accounts:
 *   post:
 *     summary: Register a new account (and user)
 *     tags:
 *       - Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *               - status
 *               - name
 *               - gender
 *               - dob
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *               status:
 *                 type: string
 *                 example: active
 *               name:
 *                 type: string
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 enum: [Male, Female, Other]
 *                 example: Male
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 1990-05-15
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       400:
 *         description: Invalid input
 */
router.post('/', validate(registerAccountSchema), registerAccountHandler);

/**
 * @openapi
 * /accounts/login:
 *   post:
 *     summary: Log in to an account
 *     tags:
 *       - Account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Missing username or password
 */
router.post('/login', validate(loginAccountSchema), loginAccountHandler);

/**
 * @openapi
 * /accounts:
 *   get:
 *     summary: Get all accounts
 *     tags:
 *       - Account
 *     responses:
 *       200:
 *         description: List of accounts
 */
router.get('/', getAccountsHandler);

/**
 * @openapi
 * /accounts/{id}:
 *   get:
 *     summary: Get account by ID
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account data
 *       404:
 *         description: Account not found
 */
router.get('/:id', getAccountByIdHandler);

/**
 * @openapi
 * /accounts/{id}:
 *   put:
 *     summary: Update account by ID
 *     tags:
 *       - Account
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the account
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: updatedUsername
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password (if changing)
 *                 example: newStrongPassword456
 *               status:
 *                 type: string
 *                 example: active
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', validate(updateAccountSchema), updateAccountHandler);

/**
 * @openapi
 * /accounts/{id}:
 *   delete:
 *     summary: Delete an account
 *     tags:
 *       - Account
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Account deleted
 *       404:
 *         description: Account not found
 */
router.delete('/:id', deleteAccountHandler);

export default router;
