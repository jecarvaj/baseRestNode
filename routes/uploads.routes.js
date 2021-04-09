const { Router } = require("express")
const { check } = require('express-validator')
const { uploadImg, updateImgCloudinary, showImgUpload } = require("../controllers/uploads.controller")
const { validateFields } = require("../middlewares")
const { validateFile } = require("../middlewares/validate-file")

const router = Router()

router.post("/", uploadImg)

router.put('/:collection/:id', [
  validateFile,
  check('id','El id debe de ser de mongo').isMongoId(),
  validateFields
], updateImgCloudinary)

/* router.get('/:collection/:id', [
    check('id','El id debe de ser de mongo').isMongoId(),
    validateFields
], showImgUpload  ) */
module.exports = router
