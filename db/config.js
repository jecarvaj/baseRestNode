const mongoose = require("mongoose")

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		})
		console.log("Conectado a DB ")
	} catch (error) {
		console.log(error)
		throw new Error("Error al iniciar DB")
	}
}

module.exports = {
  dbConnection
} 