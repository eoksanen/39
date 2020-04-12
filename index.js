const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(express.json()) 
app.use(cors())
app.use(express.static('build'))

morgan.token('body', function getBody (req) {
  return JSON.stringify( req.body )
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let notes = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/notes', (req, res) => {
    res.json(notes)
  })
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => note.id === id)
    console.log(note)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      name: body.name,
      number: body.number || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`server running on port ${PORT}`)

})