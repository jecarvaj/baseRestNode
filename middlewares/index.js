//cREO ESTE ARCHIVO PARA EXPORTAR TODOS LOS MIDLEWARES DESDE EL MISMO ARCHIVO
const validateFields = require("../middlewares/validate-fields")
const validateJwt = require("../middlewares/validate-jwt")
const validateRole = require("../middlewares/validate-role")

module.exports = {
  ...validateFields,
  ...validateJwt,
  ...validateRole
} 