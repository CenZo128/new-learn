const { User } = require('../models')
const {decryptPwd} = require('../helpers/bcrypt')
const {tokenGenerator} = require('../helpers/jwt')

class UserController {
    static async list(req, res) {
        try {
            const users = await User.findAll();

            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async login(req, res) {
        const { username, password } = req.body;
        
        try {
            const user = await User.findOne({
                where : {
                    username
                }
            })
            if(user){
                if(decryptPwd(password, user.password)){
                    
                    const access_token = tokenGenerator(user)
                    res.status(200).json({access_token})
                }else{
                    res.status(404).json({
                        msg : "Pwd is not the same."
                    })
                }

            }else{
                res.status(404).json({
                    msg : "User is not found thanks."
                })
            }

        }catch (err) {
            res.status(500).json(err)
        }
    }
    static async register(req, res) {
        const { username, password } = req.body;
        try {
            const user = await User.create({
                username, password 
            })

            res.status(201).json(user);

        }catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController;