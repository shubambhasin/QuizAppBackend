const mongoose = require('mongoose')

const mySecret = process.env['dbURL']

const url = mySecret

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true, //this is the code I added that solved it all
  keepAlive: true,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  useFindAndModify: false,
  useUnifiedTopology: true
}

const connectDatabase = async () => {
  try{
    const response = await mongoose.connect( url, options )

    console.log("DB connected")
  } catch(error){

    console.log("Erro occured: ", error)

  }
}

module.exports = connectDatabase;
