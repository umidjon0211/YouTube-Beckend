import fs from "fs";
import path from "path";

export default (error, req, res, next) => {
    if (error.status) {
        res.status(error.status).json({
            message: error.message,
            success: false,
            data: null
        })
    } else {
        res.status(500).json({
            message: "Internal server error !",
            success: false,
            data: null
        })
    }
    let filePath = path.join(process.cwd(), "src", "utils", "Log")
    
    if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath,{recursive:true})
    }
    filePath = path.join(filePath, "logger.txt")
    if(!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath,"=== Error Logger File ====\n\n")
    }

    let date = new Date().toISOString().split("T")

    date = "time -> ( " + date[0] + " _ " + date[1].slice(0, -1) + ") ...."

    const errlog = [
        "Method - > " + req.method,"Url -> " + req.url,
        date,
        "Type - > " + error.name,
        "Error_message - > " + error.message,
        "Steck file - > " + error.stack.split("\n")[1].split(":").at(-3),
        "Line -> " + error.stack.split("\n")[1].split(":").at(-2),
        "END !!!",
        "__".repeat(50)
    ]
    fs.appendFileSync(filePath, `${errlog.join("\n")} \n`)
}