const mongoose = require('mongoose')

const schema = mongoose.Schema({
  siteTitle: String,
  siteLink: String,
  title: String,
  link: String,
  pubDate: String,
  categories: Array
})

schema.set('toJSON', { virtuals: true, versionKey: false })

module.exports = mongoose.model('Article', schema)
