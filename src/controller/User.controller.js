import { UserService } from "../service/User.service.js"


class UserController {
    constructor () {}

    async salomlash (req, rres, next){
        try{
            let {name} = req.parm
        }catch(error){
            next(error)
        }
    }
s

    async getAllFiles (req, res, next) {
        try {
            const result = await UserService.allFiles()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }    
    }

    

    async getSingleFiles (req, res, next) {
        try {
            const result = await UserService.singleFiles(req.user_id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



    async SearchFile (req, res, next) {
        try {
            const result = await UserService.SearchTitle(req.query)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



    async register (req, res, next) {
        try {
            const result = await UserService.registr(req.body, req.files.img)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }
    
    

    async login (req, res, next) {
        try {
            const result = await UserService.loginService(req.body)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



    async getAllUsers (req, res, next) {
        try {
            const result = await UserService.getUsers()
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



    async createFile (req, res, next) {
        try {
            const result = await UserService.postFile(req.body, req.files.img)
            res.status(201).json(result)
        } catch (error) {
            next(error)   
        }
    }



    async getFile (req, res, next) {
        try {
            const result = await UserService.readFile(req.user_id)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



    async deleteFile (req, res, next) {
        try {
            const result = await UserService.removeFile(req.params.fileId)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }



    async updateFile (req, res, next) {
        try {
            const result = await UserService.renameFile(req.body)
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    


}

const userController = new UserController()

export default userController