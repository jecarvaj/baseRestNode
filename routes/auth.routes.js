const { Router } = require("express")
const { check } = require("express-validator")
const { validateFields } = require("../middlewares/validate-fields")
const { login, googleSignIn } = require("../controllers/auth.controller")

const router = Router()

router.post("/login", [
  check("email", "Debe serun email valido").isEmail(),
  check("password", "Contraseña obligatoria").not().isEmpty(),
  validateFields
], login)

router.post("/google", [
  check("id_token", "falta el token! google").notEmpty(),
  validateFields
], googleSignIn)

module.exports = router