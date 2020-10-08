const { Product,User } = require('../models')

class ProductController {
    static async getProduct(req, res) {
        try {
            const result = await Product.findAll({
                order: [
                    ['id', 'ASC']
                ],
                include : [
                    User
                ]
            })
            res.status(200).json(result);

        }
        catch (err) {
            next(err)
            // res.status(500).json(err);
        }
    }

    static async addProduct(req, res, next) {
        const { name, info, price, stock } = req.body;
        //Menerima dari Middlewares authentication
        const UserId = req.userData.id
        //Multer
        const image = req.file.path;
        try {
            const product = await Product.create({
                name, info, image, price, stock, UserId
            })

            res.status(201).json(product)
        } catch (err) {
            // res.status(500).json(err)
            next(err);
        }
    }

    static async deleteProduct(req, res, next) {
        const id = req.params.id;

        try {
            const result = Product.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({
                result,
                msg: "Product deleted"
            })
        } catch (err) {
            // res.status(500).json(err)
            next(err)
        }
    }

    static async updateProduct(req, res) {

    }
}

module.exports = ProductController;