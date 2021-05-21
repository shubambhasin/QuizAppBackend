const mongoose = require('mongoose')

const { Schema } = mongoose

const quizSchema = new Schema( {

  quizName: {
    type: String
  },
  level: {
    type: String,
    required: true
  },
  
  highScore: {
    type: Number,
  },
  hightScorerName: {
    type: String
  },
  points:{
    type: Number
  },
  negativePoints: {
    type: Number
  },
  questions: [  
    {
      question: {
        type: String,
        required: true
      },
      options: [
        {
          value: {
            type: String
          },
          isRight: {
            type: Boolean
          }
         
        }
      ]
    }
  ]

})

const QuizModel = mongoose.model("Quiz", quizSchema)


module.exports = { QuizModel };