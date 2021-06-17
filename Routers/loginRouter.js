const express = require('express');
const jwt = require('jsonwebtoken')
const { User } = require('../Models/userModel.js');
const router = express.Router()

const mySecret = process.env['tokenSecret']
const secret = mySecret
const maxAge = 24*60*60

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
res.json({error: errors})
}

const createToken = ( id ) => {
  return jwt.sign( {id}, secret, {
    expiresIn: maxAge*10
  })
}

router.route('/')
.post( async ( req, res ) => {
  const { email, password } = req.body
  try {
    const user = await User.login( email, password )
    const token = createToken(user._id)
    res.status(200).json({user, token})
  } catch(error) {
    handleError(error, res)
  }



})

module.exports = router