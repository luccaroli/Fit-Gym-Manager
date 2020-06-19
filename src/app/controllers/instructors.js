const { age, date } = require('../../lib/utils')
const db = require("../../config/db")
const moment = require('moment')

module.exports = {

  index(req, res){
    db.query(`SELECT * FROM instructors`, function(err, results){
      if (err) return res.send("erro no banco de dados!")

      return res.render('instructors/index', {instructors: results.rows})

    })

    

  },
  create(req, res){
    return res.render('instructors/create')
    

  },
  post(req, res){
    const keys = Object.keys(req.body)

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Por favor, Todos os campos são obrigatorios')
      }
    }

    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `
    const values = [
      req.body.name,
      req.body.avatar_url,
      req.body.gender,
      req.body.services,
      date(req.body.birth).iso,
      date(Date.now()).iso
    ]
    
    db.query(query, values, function(err, results) {
      if (err) return res.send("DataBase Erro!")

      return res.redirect(`/instructors/${results.rows[0].id}`)
    })

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

