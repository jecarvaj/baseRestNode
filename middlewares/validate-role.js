const isAdminRole = (req, res, next) => {
  
  if(!req.user){
    return res.status(500).json({
      msg: "Se quiere verificar role sin validar token antes"
    })
  }

  const {role, name} = req.user

  if(role !== "ADMIN_ROLE"){
    return res.status(401).json({
      msg: `${name} no es admin!`
    })
  }
  next()
}

const hasRole = (...roles) => { // retorna un array con todos los argumentos 
  return (req, res, next) =>{
    if(!roles.includes(req.user.role)){
      return res.status(401).json({
        msg: "Rol invalido"
      })
    }
    next()
  }
}


module.exports = {
   isAdminRole,
  hasRole
} 