const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const Person = require('./models/person')
const { response } = require('express')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.get('/api/persons', (req, res, next) => {
    console.log('serveri ymmärtää pyynnön')
    Person.find({}).then(persons => {
      console.log(persons)
      res.json(persons)
    })
    .catch(error => next(error))
    
} )

app.get('/info', (req, res) => {
  console.log('pyydetään info')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('puhelinluettelossa on ' + persons.length + ' ihmista \n ' + new Date)
})

app.get('/api/persons/:id', (req, res, next) => {
  
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end
    }
  })
  .catch(error => {
    console.log(error)
    next(error)
  }
  )
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  console.log(id)

  Person.findByIdAndRemove(id)
    .then(result => {
      res.json(result).end
      
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})
 
app.post('/api/persons/:name/:number', (req, res, next) => {

  const name = req.params.name
  console.log(name)

  const number = req.params.number
  console.log(number)

  const id = Math.round(Math.random() * 10000)
  console.log(id)

  const person = new Person({
    name : name,
    number : number,
    id : id
  })

  person.save().then(result => {
    console.log(person)
    res.json(person)
  })
  .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, pitäkää hauskaa`)
})

