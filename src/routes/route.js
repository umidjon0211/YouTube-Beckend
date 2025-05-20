import { Router } from "express"
import validate from '../middleware/validation.js'
import controller from "../controller/User.controller.js"
import checkToken from "../middleware/checkToken.js"

const router = Router()

router
    .get('/files/all', controller.getAllFiles)
    .get('/files/single/:userId', controller.getSingleFiles)
    .get('/files/search', controller.SearchFile)
    .post('/register', validate, controller.register)
    .post('/login',validate, controller.login)
    .get('/users/all',validate, controller.getAllUsers)
    .post('/file', validate, checkToken, controller.createFile)
    .get('/file', controller.getFile)
    .delete('/file/:fileId',checkToken, controller.deleteFile)
    .put('/file', validate, checkToken,controller.updateFile)

export default router