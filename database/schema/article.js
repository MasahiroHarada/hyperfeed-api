const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ArticleSchema = Schema({
  siteTitle: String,
  siteLink: String,
  title: String,
  link: String,
  pubDate: String,
  categories: Array
})

module.exports = mongoose.model('Article', ArticleSchema)
