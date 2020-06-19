const { age, date } = require('../../lib/utils')
const moment = require('moment')

module.exports = {

  index(req, res){
    return res.render('members/index')

  },
  create(req, res){
    return res.render('members/create')
    

  },
  post(req, res){
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Por favor, Todos os campos são obrigatorios')
      }
    }
    
    return
  },
  show(req, res){
    return 

  },
  edit(req, res){
    return

  },
  put(req, res){
    return

  },
  delete(req, res){
    return

  }

}

