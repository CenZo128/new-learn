const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/Product')

const { authentication, authorization } = require('../middlewares/auth')

router.get('/', ProductController.getProduct)
// router.get('/add', ProductController.addProduct)
router.post('/', ProductController.addProduct)
router.delete('/:id', ProductController.deleteProduct)
router.put('/:id', ProductController.updateProduct)

module.exports = router;