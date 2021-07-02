const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
        "name": "Dan Abramov",
        "number": "23457889",
        "id": 3
      },
      {
        "name": "Jaakko Aakula",
        "number": "88088080808",
        "id": 5
      },
      {
        "name": "Linus Storvalds",
        "number": "29292929292",
        "id": 6
      },
      {
        "name": "Adrijan Balic",
        "number": "22222222222",
        "id": 7
      },
      {
        "name": "Tony Montana",
        "number": "020202020202",
        "id": 8
      },
      {
        "name": "Pablo Escobar",
        "number": "2002020220",
        "id": 9
      }
]


app.get('/api/persons', (req, res) => {
    console.log('serveri ymmärtää pyynnön')
    res.json(persons)
    
} )

app.get('/info', (req, res) => {
  console.log('pyydetään info')
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('puhelinluettelossa on ' + persons.length + ' ihmista \n ' + new Date)

})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const person = persons.find(person => person.id === id)
  console.log(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)

  var index = persons.map(person => {
    return person.id;
  }).indexOf(id)

  console.log(index)
  persons.splice(index, 1)
  res.json(persons)
})

app.post('/api/persons/:name/:number', (req, res) => {

  const name = req.params.name
  console.log(name)

  const number = req.params.number
  console.log(number)

  const id = Math.round(Math.random() * 10000)
  console.log(id)

  const person = {
    name : name,
    number : number,
    id : id
  }

  console.log(person)


if (persons.find(person => person.name == name)) {

    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('error: name must be unique')
    console.log('error: name must be unique')
  } else if (persons.find(person => person.number == number)) {

    res.writeHead(400, { 'Content-Type': 'text/plain' })
    res.end('error: number must be unique')
    console.log('error: number must be unique')

  } else {
    persons.push(person)
    res.json(person)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, pitäkää hauskaa`)
})

