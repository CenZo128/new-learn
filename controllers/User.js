const { User } = require('../models')
const { decryptPwd } = require('../helpers/bcrypt')
const { tokenGenerator } = require('../helpers/jwt')

class UserController {
    static async list(req, res, next) {
        try {
            const users = await User.findAll();

            res.status(200).json(users)
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({
                where: {
                    username
                }
            })
            if (user) {
                if (decryptPwd(password, user.password)) {

                    const access_token = tokenGenerator(user)
                    res.status(200).json({ access_token })
                } else {
                    res.status(404).json({
                        msg: "Pwd is not the same."
                    })
                }

            } else {
                res.status(404).json({
                    msg: "User is not found thanks."
                })
            }

        } catch (err) {
            next(err)
        }
    }
    static async register(req, res, next) {
        const { username, password } = req.body;
        try {
            const found = await User.findOne({
                where: {
                    username
                }
            })
            if (found) {
                throw {
                    name: "Data already exist"
                }
            } else {
                const user = await User.create({
                    username, password
                })
                res.status(201).json(user);
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;