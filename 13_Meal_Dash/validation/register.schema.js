import Joi from "joi";

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).trim().required().messages({
        "string.base": "name must be in string",
        "string.min": "name must be 2 character long",
        "string.max": "name maximum can be 50 character long",
        "any.required": "name is required",
    }),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30).required().messages({
        "string.base": "password must be in string",
        "string.min": "password must be atleast 6 character long",
        "string.max": "password can be max upto 30 character long",
        "any.required": "password is required",
    }),

    phone: Joi.string()
        .pattern(/^[6-9]\d{9}$/)
        .required()
        .messages({
            "string.base": "phone number must be a string",
            "string.pattern.base":
                "phone number must be a valid 10-digit Indian mobile number",
            "any.required": "phone number is required",
        }),

    role: Joi.string().valid("customer", "provider").default("customer"),

    address: Joi.string().min(10).max(100).required(),
});

export default registerSchema;
