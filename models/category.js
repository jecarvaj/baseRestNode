const { Schema, model } = require("mongoose")

const CategorySchema = Schema({
	name: {
		type: String,
		required: [true, "Category name is required"]
  },
  status: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// Para modificar parametros visibles!
CategorySchema.methods.toJSON = function(){
	const { __v, status, ...data} = this.toObject()
	return data
}

module.exports = model("Category", CategorySchema)
