const { Schema, model } = require("mongoose")

const ProductSchema = Schema({
	name: {
		type: String,
		required: [true, "Product name is required"]
	},
	status: {
		type: Boolean,
		default: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  desc: {
    type: String,
  }
})

// Para modificar parametros visibles!
ProductSchema.methods.toJSON = function(){
	const { __v, status, ...data} = this.toObject()
	return data
}
module.exports = model("Product", ProductSchema)
