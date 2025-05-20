import express from 'express'
import { connectDB } from './config/Database.js'
import 'dotenv/config'
import router from './routes/route.js'
import fileUpload from 'express-fileupload'
import errorHandler from './middleware/errorHandler.js'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 5500
app.use(express.json())

await connectDB()
app.use(fileUpload())
app.use(express.static(path.join(process.cwd(), 'src', 'uploads')))

app.use('/api',router)


app.use(errorHandler)

const initApp = () => {

    app.listen(PORT, () => console.log(`listening in ${PORT}-port`))
}

initApp()