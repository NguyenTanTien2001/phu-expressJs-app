import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as AccountService from '../services/account.service';
import * as UserService from '../services/user.service';
import * as Utils from '../utils/jwt';

export const createAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, username, hashedPassword, accessToken, status } = req.body;
        const account = await AccountService.createAccount(user_id, username, hashedPassword, accessToken, status);
        res.status(201).json(account);
    } catch (error) {
        console.log("error ==> ", error);
        next(error)
    }
};

export const getAccountsHandler = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const accounts = await AccountService.getAccounts();
        res.json(accounts);
    } catch (error) {
        next(error)
    }
};

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const getAccountByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AccountService.getAccountById(req.params.id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        next(error);
    }
};

export const updateAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountId = req.params.id;
        const { user_id, username, hashedPassword, accessToken, status } = req.body;
        const updated = await AccountService.updateAccount(accountId, user_id, username, hashedPassword, accessToken, status);
        if (!updated) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

export const deleteAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accountId = req.params.id;
        const deleted = await AccountService.deleteAccount(accountId);
        if (!deleted) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// REGISTER
export const registerAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, name, gender, dob } = req.body;

        // Check if Account existed
        const existing = await AccountService.getAccountByUsername(username);
        if (existing) return res.status(409).json({ error: 'Username already exists' });

        // Create a new user
        const user = await UserService.createUser(name, gender, dob);

        // Hash password
        const hashedPassword = Utils.hashPassword(password);

        const account = await AccountService.createAccount(user._id as string, username, hashedPassword, '', 'active');

        res.status(201).json({ message: 'Account created successfully', accountId: account._id, userId: user._id });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// LOGIN
export const loginAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const account = await AccountService.getAccountByUsername(username);
        if (!account) return res.status(401).json({ error: 'Invalid credentials' });

        const valid = await Utils.verifyPassword(password, account.hashedPassword);
        if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ accountId: account._id, userId: account.user_id }, JWT_SECRET, {
            expiresIn: '2h'
        });

        account.accessToken = token;
        await account.save();

        res.status(200).json({ message: 'Login successful', accessToken: token });
    } catch (error) {
        next(error);
    }
};