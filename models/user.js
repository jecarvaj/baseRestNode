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
		default: "USER_ROLE",
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

// Para modificar parametros visibles!
UserSchema.methods.toJSON = function(){
	const { __v, password, _id, ...restUser} = this.toObject()
	restUser.uid = _id
	return restUser
}
module.exports = model("User", UserSchema)
