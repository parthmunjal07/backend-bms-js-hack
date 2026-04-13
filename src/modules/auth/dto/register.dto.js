import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto {
    static schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().message("Password must minimum of 8 characters").min(8).required()
    })
}

export default RegisterDto
