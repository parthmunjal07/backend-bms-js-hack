import ApiError from "../../common/utils/apiError.js";
import { createUsers, getUserByEmail } from "./auth.models.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { generateAccessToken } from "../../common/utils/jwt.utils.js";

export const register = async (name, email, password) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw ApiError.conflict("User with this email already exists")
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUsers(name, email, hashedPassword);

    const token = generateAccessToken({ id: user.id, email: user.email, name: user.name });

    return { 
        user: user, 
        token 
    };
    
}

export const login = async (email, password) => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw ApiError.unauthorized("Invalid email or password");
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw ApiError.unauthorized("Invalid email or password");
    }

    const token = generateAccessToken({ id: user.id, email: user.email, name: user.name });

    const { password_hash, ...userWithoutPassword } = user;
    
    return { 
        user: userWithoutPassword, 
        token 
    };
}