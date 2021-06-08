const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const { User } = require('../Models/userModel.js')

const mySecret = process.env['tokenSecret']
const secret = mySecret
const handleError = (error, res) => {

  console.log(error.message)

  const errors = {
    email: "",
    password: ""
  }

  if(error.message === "Email not registered")
  {
    errors.email = "Email not registered"
  }
  if(error.message === "Password incorrect")
  {
    errors.password = "Password incorrect"
  }
  if(error.code === 11000)
  {
    errors.email = "Email already registered, please login instead"
    res.json({error: errors})
    return
  }
  // if(error.errors.email)
  // {
  //   errors.email = error.errors.email.message
  // if(error.errors.password) {
  //   errors.password = error.errors.password.message
  // }
  // } else {
  //   res.status(400).json({error: error})
  //   return
  // }

  if(error.message.includes("user validation failed"))
  {
    Object.values(error.errors).forEach(({properties}) => {
      errors[properties.path]= properties.message;
    })

    return res.json({error: errors})
  }

res.status(400).json({error: errors})
}
const maxAge = 24*60*60
const createToken = ( id ) => {
  return jwt.sign( {id}, secret, {
    expiresIn: maxAge*10
  })
}

router.route('/')
.post( async( req, res) => {
  const { name, email, password } = req.body  
  try{
    const newUser = new User( {
      name: name,
      email: email,
      password: password
    })
    const user = await newUser.save()
     const token = createToken(user._id)
    //  console.log("token", token)
    //  res.cookie('jwtToken', token, { httpOnly: true, maxAge: maxAge*10*1000})
     res.status(200).json({user, token})
  } catch(error) {
    handleError(error, res)
  }
})
module.exports = router 
