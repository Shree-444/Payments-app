const {JWT_SECRET} = require("../config")
const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next){

    const auth = req.headers.authorization

    if(!auth || !auth.startsWith('Bearer')){
        res.status(403).json({
            msg: 'authorization header missing or invalid'
        })
    }

    const token = auth.split(' ')[1]

    try{
        const decoded = jwt.verify(token, JWT_SECRET)
        if(decoded.userId){
            req.userId = decoded.userId
            next()
        }
        else{
            return res.status(403).json({
                msg: 'decoding fail error'
            })
        }
    } catch(err){
        return res.status(403).json({
            msg: 'error caught in middleware'
        })
    }
}

module.exports = authMiddleware