const { Router } = require('express');
const router = Router();
const ProductController = require('../controllers/Product')

const { authentication, authorization } = require('../middlewares/auth')

const upload = require('../middlewares/multer')

router.get('/', authentication, ProductController.getProduct)
// router.get('/add', authentication, ProductController.addProduct)
router.post('/', authentication, upload.single('image') , ProductController.addProduct)
router.delete('/:id', authentication, ProductController.deleteProduct)
router.put('/:id', authentication, ProductController.updateProduct)

module.exports = router;