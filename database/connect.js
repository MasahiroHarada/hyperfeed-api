const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  mongoose.Promise = global.Promise
  const db = mongoose.connection

  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}
