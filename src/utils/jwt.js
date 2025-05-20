import Jwt from "jsonwebtoken"

export default {
    sign: (payload) => Jwt.sign({username: payload.username, user_id: payload._id}, process.env.JWT_SECRET, {expiresIn: '10m'}),
    signRef: (payload) => Jwt.sign({username: payload.username}, process.env.JWT_SECRET, {expiresIn: '24h'}),
    verify: token => Jwt.verify(token, process.env.JWT_SECRET)
}