import userModel from "../modules/User.module.js"
import CustomError from "../utils/Custom.error.js"
import jwt from "../utils/jwt.js"

export default async (req, res, next) => {
    try {
        const { token } = req.headers
        if(!token) throw new CustomError('token is required', 404)

        const {username, user_id} = jwt.verify(token)
        const user = await userModel.findOne({username})
        if(!user) {
            throw new CustomError('User not found !', 404)
        }
        req.user_id = user_id
        next()
    } catch (error) {
        if(error.name == 'TokenExpiredError') {
            throw new CustomError('Token expire', 401)
        }
        if(error.name == 'JsonWebTokenError') {
            throw new CustomError('Invalid token', 400)
        }
        next(error)
    }
}