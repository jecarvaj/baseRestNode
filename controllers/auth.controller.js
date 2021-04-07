const bcryptjs = require("bcryptjs")
const { generateJWT } = require("../helpers/generate-jwt")
const { googleVerify } = require("../helpers/google-verify")
const User = require("./../models/user")

const login = async (req, res) => {
	const { email, password } = req.body

	try {
		//check email exists
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(400).json({
				msg: "Login incorrecto-usernotfound"
			})
		}

		//check if user active
		if (!user.status) {
			return res.status(400).json({
				msg: "Login incorrecto-estadofalse"
			})
		}

		//check password
		const isValidPass = bcryptjs.compareSync(password, user.password)
		if (!isValidPass) {
			return res.status(400).json({
				msg: "Login incorrecto-password"
			})
		}

		const token = await generateJWT(user.id)
		res.json({
			msg: "login ok",
			user,
			token
		})
	} catch (error) {
		return res.status(500).json({
			msg: "Error, contacte con admin"
		})
	}
}

const googleSignIn = async (req, res) => {
	const { id_token } = req.body
	console.log(id_token)
	try {
		const {name, img, email} = await googleVerify(id_token)
    console.log(name, img, email)
    let user = await User.findOne({email})
    if(!user){
      const data = {
        name,
        email,
        img,
        google: true,
        password: ":p" //lo envio asi porque nunca sera posible por el formato del hash
      }
      user = new User(data)
      await user.save()
    }
 
    if(!user.status){
      return res.status(401).json({
        msg: "Usuario bloqueado, hable con admin"
      })
    } 

    const token = await generateJWT(user.id)

    res.status(400).json({
      msg: 'User loguieadop correctamente',
      user, 
      token
    })
	} catch (error) {
    console.log(error)
		return res.status(500).json({
			msg: "Error, contacte con admin"
		})
	}
}

module.exports = {
	login,
	googleSignIn
}
