var express = require('express');
var router = express.Router();

let {formAgregar,addProduct,editProduct,updateProduct,deleteProduct} = require('../controllers/productController')

router.get('/agregarProducto', formAgregar);

router.post('/agregarProducto', addProduct);

router.get('/editar/:id', editProduct);

router.put('/editar/:id', updateProduct);

router.delete('/deleteProduct/:id', deleteProduct );


module.exports = router;