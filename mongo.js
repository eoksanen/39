const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]




const url =
  `mongodb+srv://fs:${password}@cluster0-s3xkk.mongodb.net/identities?retryWrites=true&w=majority`


mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Note = mongoose.model('Contact', noteSchema)

const note = new Note({
  name: process.argv[3],
  number: process.argv[4]
})

console.log('process.argv[3] = ', process.argv[3])

if (process.argv[3] !== undefined) {
  
  note.save().then(response => {
    console.log('Contact saved!')
    mongoose.connection.close()
  })
}
else if ((process.argv[3] === undefined))
{
Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
}



