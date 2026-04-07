import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser as createSupabaseUser, findUserByEmail, findUserById, updateProfile as updateSupabaseProfile } from '../services/supabaseService';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, role, name } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createSupabaseUser({
            email,
            password: hashedPassword,
            role: role || 'INDIVIDUAL',
            name: name || '',
        });

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        const { password: _, ...userWithoutPassword } = user;

        res.cookie('token', token, COOKIE_OPTIONS);
        res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '24h' });

        const { password: _, ...userWithoutPassword } = user;

        res.cookie('token', token, COOKIE_OPTIONS);
        res.json({ user: userWithoutPassword });
    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const user = await findUserById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user!.userId;
        const { name, bio, location } = req.body;
        
        const profile = await updateSupabaseProfile(userId, { name, bio, location });
        
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};
