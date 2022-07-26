const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

module.exports = {
    formAgregar : (req,res) => {
        res.render('productAdd');
    },

    addProduct: (req,res) => {
        let nuevoProducto = {
        id: products[products.length - 1].id + 1,
        ...req.body,
        image: req.file ? req.file.filename : 'default-image.png'
        };
        products.push(nuevoProducto);

        fs.writeFileSync(productsPath, JSON.stringify(products, null, ' '));
        res.redirect('/')
    },

    editProduct: (req, res) => {
		let id = req.params.id
		let editProduct = products.find(producto => producto.id == id)
		res.send( editProduct )

	},

    updateProduct: (req, res) => {
		let id = req.params.id
		let editProduct = products.find(producto => producto.id == id) 

		editProduct = {
			id: editProduct.id,
			...req.body,
			image: editProduct.image
		};
		let newProducts = products.map(producto => {
			if (producto.id === editProduct.id) {
				return product = { ...editProduct };
			}
			return producto;
		})
		fs.writeFileSync(productsPath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},
    deleteProduct: (req, res) => {
		let id = req.params.id  
		let finalProducts = products.filter(producto => producto.id != id)
		fs.writeFileSync(productsPath, JSON.stringify(finalProducts, null, ' '));
		res.redirect('/');
	}
}