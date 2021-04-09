const { Router } = require("express")
const { check } = require("express-validator")
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct
} = require("../controllers/products.controller")

const { validateFields, validateJWT, isAdminRole } = require("../middlewares")
const { existProduct, existCategory } = require("../helpers/db-validators")

const router = Router()

//Obtener todas, con paginacion y tdo eso/ publico
router.get("/", getProducts)

//Obtener por id
router.get(
	"/:id",
	[
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(existProduct),
		validateFields
	],
	getProduct
)

//Crear una categoria, cualquiera logueado
router.post(
	"/",
	[
		validateJWT,
		check("name", "Nombre obligatorio").notEmpty(),
		check("category", "Debe agregar una cateogir").notEmpty(),
		check("category", "No es un id valido de caregotira").isMongoId(),
		check("category").custom(existCategory),
		validateFields
	],
	createProduct
)

//Actualizar categoria, logueado
router.put(
	"/:id",
	[
		validateJWT,
		check("name", "Nombre requerido").notEmpty(),
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(existProduct),
		check("category", "Debe agregar una cateogir").notEmpty(),
		check("category", "No es un id valido de caregotira").isMongoId(),
		check("category").custom(existCategory),
		validateFields
	],
	updateProduct
)

//Borrar categoria, solo admin
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "No es un id valido").isMongoId(),
		check("id").custom(existProduct)
	],
	deleteProduct
)

module.exports = router
