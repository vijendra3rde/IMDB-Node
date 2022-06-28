const config = require('./constants')
const mongoose = require('mongoose')

function MongoDBHandler() {
  //connecting to MongoDB database
  mongoose.connect(config.mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  mongoose.Promise = global.Promise
  const db = mongoose.connection
  db.on('error', console.error)
  db.once('open', () => {
    console.log('Connected to MongoDB')
  })
}

module.exports = MongoDBHandler

//dummy text