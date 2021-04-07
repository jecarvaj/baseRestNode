const Role = require("../models/role")
const User = require('../models/user')

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



module.exports = {
  isValidRole,
  existEmail,
  existUserById
} 