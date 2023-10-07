const express = require('express')
const mongoose = require('mongoose')
const usersRoutes = require('./src/routes/users.routes')

const app = express()

const dbUrl = 'mongodb://127.0.0.1:27017/warden-db'
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database Connected!')
})

app.use(express.json())

//routes
app.use('/users', usersRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//start the server
const port = 3000

app.listen(port, () => {
  console.log(`Server is up on Port ${port}`)
})
