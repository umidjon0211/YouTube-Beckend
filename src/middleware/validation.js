import CustomError from "../utils/Custom.error.js"
import { Validation } from "../validator/User.validation.js"


export default (req, res, next) => {
    try {
        if(req.originalUrl === '/api/register'  && req.method == 'POST') {
            const { error } = Validation.registerSchema.validate(req.body)
            if(error) throw error
        }


        if(req.originalUrl === '/api/login' && req.method === 'POST') {
            const { error } =  Validation.loginSchema.validate(req.body)
            if(error) throw error
        }
        
        
        if(req.originalUrl === '/file' && req.method === 'POST') {
            const { error } =  Validation.fileSchema.validate(req.body)
            if(error) throw error
        }

        next() 
    } catch (err) {
        next(new CustomError(err.message || 'interval server error !', err.status ||  500))
    }
}