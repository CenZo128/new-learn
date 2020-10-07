const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/Product')

const { authentication, authorization } = require('../middlewares/auth')

router.get('/', authentication, ProductController.getProduct)
// router.get('/add', authentication, ProductController.addProduct)
router.post('/', authentication, ProductController.addProduct)
router.delete('/:id', authentication, authentication, ProductController.deleteProduct)
router.put('/:id', authentication, ProductController.updateProduct)

module.exports = router;