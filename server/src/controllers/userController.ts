import { Request, Response } from 'express';
import { query } from '../config/db';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) : Promise<void> => {
    const { username, password } = req.body;
    const result = await query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.status(201).send(result.rows[0]);
};

export const login = async (req: Request, res: Response) : Promise<void> => {
    const { username, password } = req.body;
    const result = await query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    const user = result.rows[0];
    if (!user) {
        res.status(401).send('Invalid credentials');
        return;
    }
    const token = generateToken(user);
    res.send({ token });
};

export const getUsers = async (req: Request, res: Response) : Promise<void> => {
    const result = await query('SELECT * FROM users');
    res.send(result.rows);
};