import mongoose from "mongoose";

export async function connectDB () {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Mongodb connect !'))
        .catch((err) => console.log(err))
}