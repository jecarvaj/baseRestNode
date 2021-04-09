const { Router } = require("express")
const { check } = require("express-validator")
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require("../controllers/categories.controller")

const { validateFields, validateJWT, isAdminRole } = require("../middlewares")
const { existCategory } = require("../helpers/db-validators")

const router = Router()

//Obtener todas, con paginacion y tdo eso/ publico
router.get("/", getCategories)

//Obtener por id
router.get("/:id", [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existCategory),
  validateFields
], getCategory)

//Crear una categoria, cualquiera logueado 
router.post("/", [
  validateJWT,
  check("name", 'Nombre obligatorio').notEmpty(),
  validateFields
  ], createCategory)

//Actualizar categoria, logueado
router.put("/:id", [
  validateJWT,
  check('name', 'Nombre requerido').notEmpty(),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existCategory),
  validateFields
], updateCategory)

//Borrar categoria, solo admin
router.delete("/:id", [
  validateJWT,
  isAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existCategory),
], deleteCategory)

module.exports = router