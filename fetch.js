const axios = require('axios')
const cheerio = require('cheerio')
const moment = require('moment')
const feeds = require('./feeds.json')
const connect = require('./database/connect')
const Article = require('./database/schema/article')

require('dotenv').config()

connect()
run()

async function run() {
  await Article.deleteMany({})
  await Promise.all(feeds.map(f => fetch(f)))
  process.exit(0)
}

async function fetch(feed) {
  const response = await axios.get(feed)
  const $ = cheerio.load(response.data, { xmlMode: true })

  const siteTitle = $('title').first().text()
  const siteLink = $('link').first().text()

  const models = $('item').map((index, elem) => {
    const $elem = $(elem)
    const title = $elem.find('title').first().text()
    const link = $elem.find('link').first().text()
    const categories = $elem.find('category').map((i, c) => $(c).text()).get()
    const pubDate = (() => {
      const text = $elem.find('pubDate').first().text()
      return moment(text).format('YYYY/MM/DD')
    })()

    return new Article({
      siteTitle, siteLink, title, link, categories, pubDate
    })
  }).get()

  return await Promise.all(models.map(model => model.save()))
}
