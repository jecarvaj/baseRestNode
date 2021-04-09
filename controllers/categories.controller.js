const Category = require("../models/category")

const getCategories = async (req, res) => {
  const { limit=10, since=0 } = req.query
	const queryStatus = { status: true }

	const [total, categories] = await Promise.all([
		Category.countDocuments(queryStatus),
		Category.find(queryStatus).limit(parseInt(limit)).skip(parseInt(since)).populate('user', 'name')
	])

	res.json({
		msg: "akitan los categorias",
		total: total,
		categories
	})
  
}

const getCategory = async (req, res) => {
  const {id} = req.params
  const category = await Category.findById(id).populate('user', 'name')

  res.json(category)
}

const createCategory = async (req, res) => {
	const name = req.body.name.toUpperCase()
	const categoryDB = await Category.findOne({ name })
	if (categoryDB) {
		return res.status(400).json({
			msg: "Categoria ya existe"
		})
	}
	const userId = req.user._id

	const data = {
		name,
		status: true,
		user: userId
	}

	const category = new Category(data)
	await category.save()

	res.status(201).json(category)
}

const updateCategory = async (req, res) => {
  const {id} = req.params
  const {status, user, ...data} = req.body

  data.name = data.name.toUpperCase()
  data.user = req.user._id

  const category = await Category.findByIdAndUpdate(id, data, {new: true})

  res.json(category)
  
}

const deleteCategory = async (req, res) => {
  const {id} = req.params
  const categoryToDelete = await Category.findByIdAndUpdate(id, {status: false}, {new: true})

  res.json(categoryToDelete)
}




module.exports = {
	createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory
}
