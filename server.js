const express = require('express')
const connect = require('./database/connect')
const Article = require('./database/schema/article')

require('dotenv').config()

const app = express()

connect()

app.get('/', (req, res) => {
  Article.find({})
    .sort('-pubDate')
    .then(docs => res.json(docs))
})

const port = process.env.PORT || 9000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
