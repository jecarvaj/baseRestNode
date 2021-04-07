const bcryptjs = require("bcryptjs")
const { generateJWT } = require("../helpers/generate-jwt")
const User = require("./../models/user")

const login = async (req, res) => {
	const { email, password } = req.body

	try {
    //check email exists
    const user = await User.findOne({email})
    if(!user){
      return res.status(400).json({
        msg: "Login incorrecto-usernotfound"
      })
    }

    //check if user active
    if(!user.status){
      return res.status(400).json({
        msg: "Login incorrecto-estadofalse"
      })
    }

    //check password
    const isValidPass = bcryptjs.compareSync(password, user.password)
    if(!isValidPass) {
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

module.exports = {
	login
}
