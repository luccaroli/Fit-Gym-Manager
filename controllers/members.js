const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')
const moment = require('moment')

exports.index = function(req, res) {

  return res.render('members/index', { members: data.members })
}

exports.show = function(req, res) {
  // query.params
  const { id } = req.params

  const foundMember = data.members.find(function(member) {
    return id == member.id

  })

  if (!foundMember) return res.send("member not find!")

  moment.locale('pt-BR');

  
  const member = {
    ...foundMember,
    age: age(foundMember.birth)

  }

  return res.render('members/show', { member })
}

exports.create = function(req, res) {
  return res.render('members/create')
}

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
  const id = Number(data.members.length + 1)

  data.members.push({
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

    return res.redirect('/members')
  })

  // return res.send(req.body)
}

exports.edit = function(req, res) {
   // query.params
   const { id } = req.params

   const foundMember = data.members.find(function(member) {
     return id == member.id
   })
   
   const member = {
     ...foundMember,
     birth: date(foundMember.birth)
   }

  return res.render('members/edit', { member })  
}

exports.put = function(req, res) {
   const { id } = req.body
   let index = 0

   const foundMember = data.members.find(function(member, foundIndex) {
     if (id == member.id) {
       index = foundIndex
       return true
     }
 
   })
 
   if (!foundMember) return res.send("member not find!")

   const member = {
     ... foundMember,
     ...req.body,
     birth: Date.parse(req.body.birth),
     id: Number(req.body.id)
   }

   data.members[index] = member

   fs.writeFile('data.json', JSON.stringify(data, null, 2), function(err) {
     if (err) return res.send('Write error!')

     return res.redirect(`members/${id}`)
   })
 

}

exports.delete = function(req, res) {
  const { id } =  req.body 

  const filteredMembers = data.members.filter(function(member) {
    return member.id != id

  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("write file error!")

    return res.redirect('/members')
  })
}
