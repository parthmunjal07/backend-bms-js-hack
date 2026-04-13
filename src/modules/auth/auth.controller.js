import ApiResponse from '../../common/utils/apiResponse.js';
import * as authService from './auth.service.js';

const register = async (req, res) => {
    const user = await authService.register(req.body.name, req.body.email, req.body.password);

    ApiResponse.created(res, "Registration success", user)
}

const login = async (req, res) => {
    const user = await authService.login(req.body.email, req.body.password)

    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    ApiResponse.ok(res, "Login success", user)
}