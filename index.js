const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env['PORT']
const cookieParser = require('cookie-parser');
const signupRouter = require('./Routers/userRouter')
const quizRouter = require('./Routers/quizRouter')
const connectDatabase = require('./db/db.connect')
const loginRouter = require('./Routers/loginRouter')


mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors())
app.use(express.json());
app.use(cookieParser());
// establish connection with db
connectDatabase()

app.get('/' , (req, res) => {
  res.send("QuizBackend")
})

app.use('/quiz', quizRouter)
app.use('/signup', signupRouter)
app.use('/login', loginRouter)

app.listen(PORT, () => {
  console.log("Running on port", PORT)
})
