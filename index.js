const express = require("express")
const server = express()

server.use(express.json())
server.get('/test', (request, response) => {
  return response.json({
    message: "Hello World!"
  })
})

const users = ['first']

// List all users
server.get('/users', (request, response) => {
  return response.json(users)
})

// Saves a new user
server.post('/users', checkNameExistance, (req, res) => {
  const { name } = req.body
  users.push(name)

  return res.json(users)
})

// Retrieves user by index
server.get('/users/:index', checkUserIndexExistance, (request, response) => {
  const { index } = request.params // Gets the named param from the route
  return response.json(users[index])
})

// Overwrites the indexed user with a new name
server.put('/users/:index', checkUserIndexExistance, checkNameExistance, (request, response) => {
  const { index } = request.params
  users[index] = request.body.name

  return response.json(users)
})

server.delete('/users/:index', checkUserIndexExistance, (request, response) => {
  const { index } = request.params
  users.splice(index, 1)

  return response.send()
})

// Middlewares
function checkNameExistance (request, response, next) {
  if (!request.body.name) return response.status(400).json({ error: "Bad request", message: "Name is required" })

  next()
}

function checkUserIndexExistance (request, response, next) {
  if (!users[request.params.index]) return response.status(404).json({ error: "Not found", message: "User not registered" })

  next()
}

server.listen(3000)