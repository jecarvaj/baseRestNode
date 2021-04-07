const { response } = require("express")
const bcryptjs = require("bcryptjs")

const User = require("../models/user")

const getUsers = async (req, res = response) => {

	const { limit = 5, since = 0 } = req.query
	const queryStatus = { status: true }

	// Al llamar a 2 promesas demora mas porque debe esperar la finalizacion de una para seguir con la otra
	// const users = await User.find(queryStatus).limit(parseInt(limit)).skip(parseInt(since))
	// const usersCont = await User.countDocuments(queryStatus)

	// para evitarlo podemos hacer lo sguiente
	const [total, users] = await Promise.all([
		User.countDocuments(queryStatus),
		User.find(queryStatus).limit(parseInt(limit)).skip(parseInt(since))
	])
	// se pudo bajar el tiempo de respuesta  a la mitad

	res.json({
		msg: "akitan los usuarios",
		total: total,
		users
	})
}

const postUsers = async (req, res) => {
	const { name, email, password, role } = req.body
	const user = new User({ name, email, password, role })

	// Encrypt the pasword!
	const salt = bcryptjs.genSaltSync()
	user.password = bcryptjs.hashSync(password, salt)

	await user.save()

	res.json({
		msg: "Usuario creado",
		user
	})
}

const putUsers = async (req, res) => {
	const { id } = req.params
	const { _id, password, google, email, ...restUser } = req.body

	if (password) {
		const salt = bcryptjs.genSaltSync()
		restUser.password = bcryptjs.hashSync(password, salt)
	}

	const user = await User.findByIdAndUpdate(id, restUser, { new: true }) //el new: true es para que retorne el objeto actualizado

	res.json({
		msg: `Usuario ${id} actualizado`,
		user
	})
}

const deleteUsers = async (req, res) => {
	const { id } = req.params

	//Borrar fisicamente
	//const user = await User.findByIdAndDelete(id)
	console.log(req.user)
	//Cambiar estado solamente pra que no se borre fisicamente
	const userToDelete = await User.findByIdAndUpdate(id, {status: false}, {new: true})
	const userAuth = req.user
	res.json({
		msg: "Usuario borrado ",
		userToDelete,
		userAuth
	})
}

module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers
}
