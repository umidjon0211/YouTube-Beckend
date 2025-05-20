import Joi  from "joi"


export class Validation {
    constructor () {}

    static registerSchema = Joi.object({
        username: Joi.string().min(3).max(16).alphanum().required(),
        password: Joi.string().min(8).max(16).required()
    })
    
    
    static loginSchema = Joi.object({
        username: Joi.string().min(3).max(16).alphanum().required(),
        password: Joi.string().min(8).max(16).required()
    })
    
    
    static fileSchema = Joi.object({
        title: Joi.string().min(3).max(16).alphanum().required(),
        user_id: Joi.string().required()
    })
}