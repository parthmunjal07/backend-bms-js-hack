import ApiError from "../../common/utils/apiError.js";
import { createUsers, getUserByEmail } from "./auth.models.js";
import jwt from 'jsonwebtoken'

export const register = async (name, email, password) => {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        throw ApiError.conflict("User with this email already exists")
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
        throw ApiError.unauthorized("Invalid email or password");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUsers(name, email, hashedPassword);

    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET,             
        { expiresIn: '1d' } 
    );
    return { 
        user: newUser, 
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

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );

    const { password_hash, ...userWithoutPassword } = user;
    
    return { 
        user: userWithoutPassword, 
        token 
    };
}