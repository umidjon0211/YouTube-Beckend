import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    profile_img: String
})

const userModel = model('User', userSchema)

export default userModel