const { response } = require("express")

const getUsers = (req, res = response) => {
	const queryString = req.query
	res.json({
		msg: "akitan los usuarios",
		queryString
	})
}

const postUsers = (req, res) => {
	const {name, age} = req.body
	res.json({
		msg: "Usuario creado",
		name, 
		age
	})
}

const putUsers = (req, res) => {
	const id = req.params.id
	res.json({
		msg: `Usuario ${id} actualizado`
	})
}

const deleteUsers = (req, res) => {
	res.json({
		msg: "Usuario borrado "
	})
}

module.exports = {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers
}
