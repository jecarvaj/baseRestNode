const express = require("express")
const cors = require("cors")
const {dbConnection} = require("../db/config")

// Route files
const usersRoutes = require("../routes/users.routes")

class Server {
	constructor() {
		this.app = express()
		this.port = process.env.PORT
    this.usersPath = "/api/users"
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
	}

	routes() {
    this.app.use(this.usersPath, usersRoutes)
  }

	listen() {
		this.app.listen(this.port, () => {
			console.log("server running on this.port", this.port)
		})
	}
}

module.exports = Server
