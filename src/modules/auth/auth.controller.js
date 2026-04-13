import ApiResponse from '../../common/utils/apiResponse.js';
import * as authService from './auth.service.js';

const register = async (req, res) => {
    const user = await authService.register(req.body.name, req.body.email, req.body.password);
    ApiResponse.created(res, "Registration success", user)
}

const login = async (req, res) => {
    const user = await authService.login(req.body.email, req.body.password)
    ApiResponse.ok(res, "Login success", user)
}