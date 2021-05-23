const express = require('express')
const router = express.Router()
const {QuizModel} = require('../Models/quizModel')

router.route('/founders-quiz')
.get( async ( req, res) => {
    try{
        const quiz = await QuizModel.findById("60a7eda0bef5cc0023fd117d")
        res.send({quiz})
      } 
      catch(error){

        res.send("error occured")

      }
})
router.route('/startup-quiz')
.get( async( req, res) => {
  try {
    const quiz = await QuizModel.findById("60aa6933e627db010ed58f82")
    res.send({quiz})
  } catch(error) {

    res.send("error occured")

  }
})


router.route('/')
.post( async (req, res) => {
  try{

    console.log(req.body)

    console.log("inside try")

    const {quizName, level, highScore, highScorerName, points, negativePoints, questions } = req.body
console.log("above new QUiz")
    const newQuiz = new QuizModel( {
      quizName: quizName,
      level: level,
      highScore: highScore,
      highScorerName: highScorerName,
      points: points,
      negativePoints: negativePoints,
      questions: questions
    })

    console.log("above await")

    await newQuiz.save()

    res.status(200).json({success: true, data: newQuiz})
    
  } catch(error){

    res.send("Error occured while saving quiz")
    
  }
})

module.exports = router;