const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')
const moment = require('moment')

// show 
exports.show = function(req, res) {
  // query.params
  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor) {
    return id == instructor.id

  })

  if (!foundInstructor) return res.send("instructor not find!")
  
  moment.locale('pt-BR');

  
  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    create_at: moment(foundInstructor.create_at).format('l')

  }

  return res.render('instructors/show', { instructor })
}


// create 
exports.post = function(req, res) {
  
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Por favor, Todos os campos são obrigatorios')
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body

  birth = Date.parse(birth)
  const create_at = Date.now()
  const id = Number(data.instructors.length + 1)

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    create_at
  }) 

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send('Write file error!')

    return res.redirect('/instructors')
  })

  // return res.send(req.body)
}


// update



// delete