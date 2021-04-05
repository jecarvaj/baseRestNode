const { Schema, model } = require("mongoose")

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "Nombre es obligatorio"]
	},
	email: {
		type: String,
		required: [true, "Correo obligatorio"]
	},
	password: {
		type: String,
		required: [true, "Contraseña obligatorio"]
	},
	img: {
		type: String
	},
	role: {
		type: String,
		required: [true, "Rol obligatorio"],
		enum: ["ADMIN_ROLE", "USER_ROLE"]
	},
	status: {
		type: Boolean,
		default: true
	},
	google: {
		type: Boolean,
		default: false
	}
})

module.exports = model("User", UserSchema)
