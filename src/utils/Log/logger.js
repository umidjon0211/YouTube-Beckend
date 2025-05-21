import winston from "winston";

const logger = winston.createLogger({
    level:"info",
    format:winston.format.combine(
        winston.format.timestamp({format:"YYYY-MM-DD, HH:mm:ss"}),
        winston.format.printf(({level,message,timestamp})=>{
            return [`${timestamp} ${level}:${message}`]
        })      
    ),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:"../utils/Log/error.log", level:"error"})
    ]
})

export default logger