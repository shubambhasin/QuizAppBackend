const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { Schema, model } = mongoose
const { isEmail } = require('validator')

const UserSchema = new Schema( {

  name: {
    type: String,
    required: [true, "Please enter your name"]
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: [isEmail, "Please enter an valid Email"]
  },
  password: {
    type: String,
    minlength: [6,"password should be atleast of 6 characters"]
  },
  quizPlayed:[
    {     
      quizName: String,
      score: Number,
      highScore:Number
    }
  ]
} )

UserSchema.pre("save", async function(next){
const salt = await bcrypt.genSalt()
this.password = await bcrypt.hash(this.password, salt)
next()  

})
// UserSchema.post("save", async function(next){
//   console.log(this)
//   next()
// })

const User = new model('user', UserSchema)


module.exports = { UserSchema, User}