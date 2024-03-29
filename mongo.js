const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://zixin-zhou:${password}@fullstack.8bpn9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
    Person.find({}).then(result => {
        console.log("phonebook:")
        result.forEach(person => {
          console.log(person)
        })
      mongoose.connection.close()
    })
}
else if(process.argv.length === 5){
    const name = process.argv[3]
    const number = process.argv[4]
    const newPerson = new Person ({
    name:name,
    number:number
    })
    Person.find({"name" : name}).then(personFound=>{
    if (personFound.length===0){
        newPerson.save().then( result => {
            console.log(`added ${name} number ${number} to phonebook`)
            mongoose.connection.close()
        })
    }
    else{
        mongoose.connection.close()
    }})
}