const { Router } = require("express")
const { check } = require("express-validator")

const { validateFields, validateJWT, isAdminRole, hasRole} = require('../middlewares')
const {
	getUsers,
	postUsers,
	putUsers,
	deleteUsers
} = require("../controllers/users.controller")

const { isValidRole, existEmail, existUserById } = require("../helpers/db-validators")

const router = Router()

router.get("/", getUsers)

router.post("/",
	[
		check("email", "El correo no es valido").isEmail(),
		check("name", "El nombre es obligatorio").not().isEmpty(),
		check("password", "El password debe ser mas de 6 letras").isLength({ min: 6 }),
		// check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
		check("role").custom(isValidRole), // es lo mismo que custom( rol => isValidRole(rol) )
		check("email").custom(existEmail),
		validateFields
	],
	postUsers
)

router.put("/:id",
	[
		check("id", "El Id no es valido").isMongoId(),
		check("id").custom(existUserById),
		check("role").custom(isValidRole),
		validateFields
	],
	putUsers
)

router.delete("/:id", [
		validateJWT,
		// isAdminRole, //solo valida admin, el de abajo lo defino yo
		hasRole('ADMIN_ROLE'),
		check("id", "El Id no es valido").isMongoId(),
		check("id").custom(existUserById),
		validateFields
], deleteUsers)

module.exports = router
