const Product = require("../models/product")

const getProducts = async (req, res) => {
	const { limit = 10, since = 0 } = req.query
	const queryStatus = { status: true }

	const [total, products] = await Promise.all([
		Product.countDocuments(queryStatus),
		Product.find(queryStatus)
			.limit(parseInt(limit))
			.skip(parseInt(since))
			.populate("user", "name")
	])

	res.json({
		msg: "akitan los productos",
		total: total,
		products
	})
}

const getProduct = async (req, res) => {
	const { id } = req.params
	const product = await Product.findById(id).populate("user", "name")

	res.json(product)
}

const createProduct = async (req, res) => {
	const {name, category} = req.body

	const productDb = await Product.findOne({ name: name.toUpperCase() })
	console.log(productDb)
	if (productDb) {
		return res.status(400).json({
			msg: "Producto ya existe"
		})
	}
	const userId = req.user._id

	const data = {
		name: name.toUpperCase(),
		status: true,
    category,
		user: userId
	}

	const product = new Product(data)
	await product.save()

	res.status(201).json(product)
}

const updateProduct = async (req, res) => {
	const { id } = req.params
	const { status, user, ...data } = req.body

	data.name = data.name.toUpperCase()
	data.user = req.user._id

	const product = await Product.findByIdAndUpdate(id, data, { new: true })

	res.json(product)
}

const deleteProduct = async (req, res) => {
	const { id } = req.params
	const productToDelete = await Product.findByIdAndUpdate(id, { status: false }, { new: true })

	res.json(productToDelete)
}

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct
}
