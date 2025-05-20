import Jwt  from "../utils/jwt.js"
import userModel from "../modules/User.module.js"
import { Validation } from "../validator/User.validation.js"
import bcrypt from 'bcrypt'
import path from 'path'
import fileModel from "../modules/File.module.js"
import CustomError from "../utils/Custom.error.js"

export class UserService {
    constructor () {}

    static async allFiles () {
        const data = await fileModel.find().populate('user_id', 'username profile_img')
        return data
    }



    static async singleFiles (userId) {
        const data = await fileModel.find({user_id: userId}).populate('user_id', 'username profile_img')
        return data
    }



    static async SearchTitle (query) {
        const data = await fileModel.find(query).populate('user_id', 'username profile_img')
        return data
    }



    static async registr(body, file) {
        try {
            const { error } = Validation.registerSchema.validate(body)
            if (error) throw error

            const profile_img = new Date().getTime() + '_' + file.name

            body.password = await bcrypt.hash(body.password, 10)

            file.mv(path.join(process.cwd(), 'src', 'uploads', profile_img), (err) => {
                if (err) throw err
            })

            const newUser = await userModel.create({ ...body, profile_img })

            const accessToken = Jwt.sign({ _id: newUser._id, username: newUser.username })
            const refreshToken = Jwt.signRef({ _id: newUser._id, username: newUser.username })

            return { accessToken, refreshToken }
        } catch (error) {
            throw error
        }
    }




    static async loginService(body) {
        try {
            const user = await userModel.findOne({ username: body.username })
            if (!user || !(await bcrypt.compare(body.password, user.password))) {
                throw new Error("Username or password is incorrect")
            }

            const accessToken = Jwt.sign({ _id: user._id, username: user.username })
            const refreshToken = Jwt.signRef({ _id: user._id, username: user.username })

            return { accessToken, refreshToken }
        } catch (error) {
            throw error
        }
    }




    static async getUsers () {
        try {
            let users = await userModel.find({}, {username: 1, profile_img: 1})
            return users
        } catch (error) {
            throw error
        }
    }



    static async postFile (body, file) {

        try {
            const fileName = new Date().getTime() + '_' + file.name
            body.size = Math.ceil((file.size / 1024) / 1024)
            body.file = fileName
        await fileModel.create(body)

        file.mv(path.join(process.cwd(), 'src', 'uploads', fileName), (err) => {
            if(err) throw err
        })

        return {succses: true}
        } catch (error) {
            throw error
        }
    }



    static async readFile (userId) {
        try {
            const data = await fileModel.find({user_id: userId})
            return data
        } catch (error) {
            throw error
        }
    }


    static async removeFile (fileId) {
        try {
            const data = await fileModel.deleteOne({_id: fileId})
            
            if(!data.deletedCount) throw new CustomError('File not deleted !', 404)
            return 'file succses deleted !'
        } catch (error) {
            throw error
        }
    }



    static async renameFile(body) {
        try {
            const result = await fileModel.updateOne({ _id: body.fileId }, { $set: { title: body.title } });
            if (result.matchedCount === 0) {
                throw new CustomError('File not found to update', 404);
            }
            return 'file successfully updated';
        } catch (error) {
            throw error;
        }
    }




}