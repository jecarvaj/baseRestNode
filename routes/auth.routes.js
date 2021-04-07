const { Router } = require("express")
const { check } = require("express-validator")
const { login } = require("../controllers/auth.controller")
const { validateFields } = require("../middlewares/validate-fields")

const router = Router()

router.post("/login", [
  check("email", "Debe serun email valido").isEmail(),
  check("password", "Contraseña obligatoria").not().isEmpty(),
  validateFields
], login)

module.exports = router