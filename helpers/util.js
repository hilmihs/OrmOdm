const secretKey = 'rubicamp'
const User = require('../MongoModels/user')
const jwt = require('jsonwebtoken')
class Response {
    constructor(data, success = true) {
        this.success = success
        this.data = data


    }
}

const isTokenValid = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)
    if (token && token.split(' ')[1]) {
        const pureToken = token.split(' ')[1]
        try {
            const user = jwt.verify(pureToken, secretKey)
            req.user = await User.findById(user.userid)
            if (req.user.token == pureToken) {
                next()
            }
            else {
                res.json(new Response({ message: 'token invalid' }, false))
            }
        } catch (e) {
            console.log('gagal verify')
            res.json(new Response({ message: 'token invalid' }, false))
        }
    } else {
        res.json(new Response({ message: 'token invalid' }, false))
    }

}

module.exports = { Response, isTokenValid, secretKey }