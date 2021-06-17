const jwt = require('jsonwebtoken')

const mySecret = process.env['tokenSecret']

const secret = mySecret

const authenticateRoutes = (req, res, next) => {

  const token = req.headers.authorization

  if(token)
  {
    jwt.verify(token, secret, ( error, decodedToken ) => {
      if(error)
      {
        console.log(error)
    res.json({error: "this not a verified user" })
      } else{

        console.log("verified")
        next()

      }
    } )
  } else {
    console.log("No login tokenn")
    res.json({error: "No login token" })
  }

}

module.exports = authenticateRoutes;