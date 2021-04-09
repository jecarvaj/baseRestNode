const { isValidObjectId } = require("mongoose")
const User = require("./../models/user")
const Category = require("./../models/category")
const Product = require("./../models/product")

const PERMITTED = ["users", "categories", "products"]

const search = async (req, res) => {
	const { collection, term } = req.params

	if (!PERMITTED.includes(collection)) {
		return res.status(400).json({
			msg: "Coleccion no permitida para busqueda"
		})
	}

	let results = []

	switch (collection) {
		case "users":
			results = await searchUser(term)
			break
		case "categories":
			results = await searchCategory(term)
			break
		case "products":
			results = await searchProduct(term)
			break
		default:
			break
	}

	return res.json({
		total: results.length,
		results
	})
}

const searchUser = async term => {
	//Checkar si es un mongoId para retornar el usuario con ese id
	const isMongoId = isValidObjectId(term)
	if (isMongoId) {
		const user = await User.findById(term)
		return user ? [user] : []
	}

	//Si no es id buscar por nombre o mail
	const regex = new RegExp(term, "i") //el i es para insensitive case
	const users = await User.find({
		$or: [{ name: regex }, { email: regex }],
		$and: [{ status: true }]
	})

	return users
}

const searchCategory = async term => {
	const isMongoId = isValidObjectId(term)
	if (isMongoId) {
		const category = await Category.findById(term)
		return category ? [category] : []
	}

	const regex = new RegExp(term, "i")
	const categories = await Category.find({ name: regex, status: true })
	return categories
}

const searchProduct = async term => {
	const isMongoId = isValidObjectId(term)
	if (isMongoId) {
		const product = await Product.findById(term).populate("category", "name")
		return product ? [product] : []
	}

	const regex = new RegExp(term, "i")
	const products = await Product.find({ name: regex, status: true }).populate(
		"category",
		"name"
	)
	return products
}

module.exports = {
	search
}
