const Category = require("../models/category")
const Role = require("../models/role")
const User = require('../models/user')
const Product = require('../models/product')
const isValidRole = async (role = "") => {
	const existRole = await Role.findOne({ role })
	if (!existRole) {
		throw new Error(`El role ${role} no es valido`)
	}
}

// Verify email exists
const existEmail = async (email = "") => {
	const existsEmail = await User.findOne({email})
	if(existsEmail){
    throw new Error(' El correo ya existe')
  }
}

// Verify user exists
const existUserById = async (id) => {
	const userExists = await User.findById(id)
	if(!userExists){
    throw new Error(' El usuario no existe')
  }
}

const existCategory = async (id) => {
	const category = await Category.findById(id)
	if(!category){
		throw new Error('Categoria no existe')
	}
}


const existProduct = async id => {
	const product = await Product.findById(id)
	if (!product) {
		throw new Error("Producto no existe")
	}
}





module.exports = {
  isValidRole,
  existEmail,
  existUserById,
	existCategory,
	existProduct
} 