// create 
exports.post = function(req, res) {
  
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Por favor, Todos os campos são obrigatorios')
    }
  }

  return res.send(req.body)
}


// update



// delete