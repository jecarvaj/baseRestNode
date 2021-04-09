const cloudinary = require("cloudinary").v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { uploadFile } = require("../helpers/upload-file")
const Product = require("../models/product")
const User = require("../models/user")

const PERMITTED = ["users", "products"]

const uploadImg = async (req, res) => {
	try {
		const namefileUpload = await uploadFile(req.files, undefined, "imgs")
		res.json({ namefileUpload })
	} catch (err) {
		res.status(500).json({ err })
	}
}

const updateImgCloudinary = async (req, res) => {
	const { collection, id } = req.params
	if (!PERMITTED.includes(collection)) {
		return res.status(400).json({
			msg: "Coleccion no permitida para subir imagen"
		})
	}
	let model
	if (collection === "users") model = await User.findById(id)
	if (collection === "products") model = await Product.findById(id)
	if (!model) {
		return res.status(400).json({ msg: "No se pudo encontrar el modelo asociado al id" })
	}

	if (model.img) {
		const splitName = model.img.split("/")
		const name = splitName[splitName.length - 1]
		const [public_id] = name.split(".")
		cloudinary.uploader.destroy(public_id)
	}
	const { tempFilePath } = req.files.file
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
	model.img = secure_url

	await model.save()

	res.json(model)
}

/* const showImgUpload = async (req, res) => {
  const { collection, id } = req.params
	if (!PERMITTED.includes(collection)) {
		return res.status(400).json({
			msg: "Coleccion no permitida para subir imagen"
		})
	}
	let model
	if (collection === "users") model = await User.findById(id)
	if (collection === "products") model = await Product.findById(id)
	if (!model) {
		return res.status(400).json({ msg: "No se pudo encontrar el modelo asociado al id" })
	}

  if(!model.img){
    return res.status(400).json({msg: "No hay imagen asociada"})
  }

  res.json(model.img)

}
 */
module.exports = {
	uploadImg,
	updateImgCloudinary,
  // showImgUpload
}
