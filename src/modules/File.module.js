import { Schema, model } from "mongoose";

const fileSchema = new Schema({
    title: String,
    file: String,
    size: Number,
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    createAt: {type: Date, default: new Date()}
})

const fileModel = model('File', fileSchema)

export default fileModel