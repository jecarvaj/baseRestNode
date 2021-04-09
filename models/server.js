const express = require("express")
const cors = require("cors")
const {dbConnection} = require("../db/config")
const fileUpload = require("express-fileupload")


// Route files
const usersRoutes = require("../routes/users.routes")
const authRoutes = require("../routes/auth.routes")
const categoriesRoutes = require("../routes/categories.routes")
const productsRoutes = require("../routes/products.routes")
const searchRoutes = require("../routes/search.routes")
const uploadsRoutes = require("../routes/uploads.routes")

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
		this.paths = {
			auth: 			"/api/auth",
			categories: "/api/categories",
			products:   "/api/products",
			users: 			"/api/users",
			search: 		"/api/search",
			uploads:	  "/api/uploads"
		}
		// Connect DB
		this.connectDb()
		//Middlewares
		this.middlewares()
    
		//Routes
		this.routes()
	}

  async connectDb(){
		await dbConnection()
	}

	middlewares() {
    //Cors
    this.app.use(cors())
		
		// Reading and parse body
		this.app.use(express.json())

		// Public directory
    this.app.use(express.static("public"))

			// Fileupload - Carga de archivos
		this.app.use( fileUpload({
				useTempFiles : true,
				tempFileDir : '/tmp/',
				createParentPath: true
		}));

	}

	routes() {
    this.app.use(this.paths.auth, authRoutes)
    this.app.use(this.paths.categories, categoriesRoutes)
    this.app.use(this.paths.users, usersRoutes)
    this.app.use(this.paths.products, productsRoutes)
    this.app.use(this.paths.search, searchRoutes)
    this.app.use(this.paths.uploads, uploadsRoutes)
  }

	listen() {
		this.app.listen(this.port, () => {
			console.log("server running on this.port", this.port)
		})
	}
}

module.exports = Server
