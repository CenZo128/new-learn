const { Router } = require('express');
const router = Router();
const userRoutes = require('./user')
const productRoutes = require('./product')

router.get('/', (req,res)=>{
    res.status(200).json({
        message : "This is home page thanks."
    })
});
router.use('/users', userRoutes)
router.use('/products', productRoutes)

module.exports = router;