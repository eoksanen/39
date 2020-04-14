require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()
app.use(express.json()) 
app.use(cors())
app.use(express.static('build'))



// ÄLÄ KOSKAAN TALLETA SALASANOJA githubiin!

morgan.token('body', function getBody (req) {
  return JSON.stringify( req.body )
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined){
    
    return response.status(400).json({
      error: "missing name or number"
    })
  }
  
  else if (persons.map(n => n.name).indexOf(body.name) >= 0 ){

    return response.status(400).json({
      error: "name must be unique"
    })
}

else{
  const person = new Person ({
    name: body.name,
    number: body.number || false,
  })

  person.save().then(savedPerson => {   
    console.log('Contact saved!')
    response.json(savedPerson.toJSON())
    })

  }
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
      res.json(persons.map(person => person.toJSON()))
    })
  })
  
  app.get('/api/persons/:id', (request, response, next) => {

    Person.findById(request.params.id).then(c=> {
      if(c){
        response.json(c.toJSON())
      } else {
        response.status(404).end()  
      }
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({error: 'malformatted id'})
    })
    .catch(error => next(error))
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id).then(reult => response.status(204).end() )
    .catch(error => next(error))
    })
 
app.put('/api/persons/:id', (request, response, next) => {

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedContact => {
    response.json(updatedContact.toJSON())
  })
  .catch(error => next(error))
})

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  // olemattomien osoitteiden käsittely
  app.use(unknownEndpoint)
  
  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    }
  
    next(error)
  }
  
  app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`)
})