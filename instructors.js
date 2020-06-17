const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')
const moment = require('moment')

exports.index = function(req, res) {

  return res.render('instructors/index', { instructors: data.instructors })
}


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

// edit 
exports.edit = function(req, res) {
   // query.params
   const { id } = req.params

   const foundInstructor = data.instructors.find(function(instructor) {
     return id == instructor.id
   })
   
   const instructor = {
     ...foundInstructor,
     birth: date(foundInstructor.birth)
   }

  return res.render('instructors/edit', { instructor })  
}

// put/update
exports.put = function(req, res) {
   const { id } = req.body

   const foundInstructor = data.instructors.find(function(instructor) {
     return id == instructor.id
 
   })
 
   if (!foundInstructor) return res.send("instructor not find!")

   const instructor = {
     ... foundInstructor,
     ...req.body,
     birth: Date.parse(req.body.birth)
   }

   data.instructors[id - 1] = instructor

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
     if (err) return res.send('Write error!')

     return res.redirect(`instructors/${id}`)
   })
 

}

// delete
exports.delete = function(req, res) {
  const { id } =  req.body 

  const filteredInstructors = data.instructors.filter(function(instructor) {
    return instructor.id != id

  })

  data.instructors = filteredInstructors

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("write file error!")

    return res.redirect('/instructors')
  })
}
