const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env['PORT']
const quizRouter = require('./Routers/quizRouter')
const connectDatabase = require('./db/db.connect')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors())
app.use(express.json());
// establish connection with db
connectDatabase()

app.get('/', (req, res) => {
  res.send("QuizBackend")
})

app.use('/quiz', quizRouter)

app.listen(PORT, () => {
  console.log("Running on port", PORT)
})
