const mongoose = require('mongoose')



const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number
  })

const Person = mongoose.model('Person', personSchema)

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]


console.log(name, number)
  
const url =
  `mongodb+srv://Jaakko:${password}@cluster0.0jmfl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const person = new Person({

    "name": name,
    "number": number,
    "id":  Math.round(Math.random() * 10000)
  })


if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  } else if (process.argv.length<4) {

    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number)
        })
        mongoose.connection.close()
      })
  } else {

    person.save().then(response => {
        console.log('added ' + name + ' number ' + number + ' to phonebook')
        mongoose.connection.close()
})

}