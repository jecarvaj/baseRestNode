const jwt = require("jsonwebtoken")
const User = require("../models/user")

const validateJWT = async (req, res, next) => {
	const token = req.header("x-token")

	if (!token) {
		return res.status(401).json({
			msg: "No hay token"
		})
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRET_KEY_JWT) //solo con el jwt.verify se verifica, si es malo tira un trhow

		req.uid = uid // Le agrego al request el uid, para usarlo en los midlewares siguietnes
		const user = await User.findById(uid)
		req.user = user //Lo agrego al request para despues

		if (!user) {
			return res.status(401).json({
				msg: "Token no valido-usuario no existe"
			})
		}

		if (!user.status) {
			return res.status(401).json({
				msg: "Token no valido-usuario status"
			})
		}

/* LO COMENTO PORQUE LO PASO A OTRO MIDDLEWARE 	
		if (user.role !== "ADMIN_ROLE") {
			return res.status(401).json({
				msg: "Token no valido- usuario no admin"
			})
		} */
		next()
	} catch (error) {
		return res.status(401).json({
			msg: "Token no valido - catch jwt"
		})
	}
}

module.exports = {
	validateJWT
}
