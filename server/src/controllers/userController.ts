import { Request, Response } from 'express';
import { query } from '../config/db';
import { generateToken } from '../utils/jwt';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const register = async (req: Request, res: Response) : Promise<void> => {
    const { name, username, role, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await query('INSERT INTO users (name, username, role, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, username, role, email, hashedPassword]);
    res.status(201).send(result.rows[0]);
};

export const login = async (req: Request, res: Response) : Promise<void> => {
    const { email, password } = req.body;
    const result = await query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
        res.status(401).send('Invalid credentials');
        return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.status(401).send('Invalid credentials');
        return;
    }
    const token = generateToken(user);
    res.send({ user, token });
};

export const getUsers = async (req: Request, res: Response) : Promise<void> => {
    const result = await query('SELECT * FROM users');
    res.send(result.rows);
};