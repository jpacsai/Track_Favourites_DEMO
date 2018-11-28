const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const epilogue = require('epilogue')
const OktaJwtVerifier = require('@okta/jwt-verifier')
const {id, domain} = require('../apiKeys')

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: id,
  issuer: 'https://' + domain + '/oauth2/default'
})

let app = express()
app.use(cors())
app.use(bodyParser.json())

// verify JWT token middleware
app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  oktaJwtVerifier.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      next()
    })
    .catch(next) // jwt did not verify!
})

// For ease of this tutorial, we are going to use SQLite to limit dependencies
let database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite'
})

// Define our Book model
// id, createdAt, and updatedAt are added by sequelize automatically
let Book = database.define('books', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  authorId: Sequelize.INTEGER,
  imgUrl: Sequelize.TEXT,
  rating: Sequelize.FLOAT,
  goodreadsUrl: Sequelize.TEXT,
  displayYear: Sequelize.TEXT,
  displayDateString: Sequelize.TEXT,
  dateObj: Sequelize.DATE,
  future: Sequelize.BOOLEAN,
  serie: Sequelize.BOOLEAN,
  title_without_serie: Sequelize.TEXT,
  serieTitle: Sequelize.TEXT,
  position: Sequelize.TEXT
})

// Initialize epilogue
epilogue.initialize({
  app: app,
  sequelize: database
})

// Create the dynamic REST resource for our Book model
let userResource = epilogue.resource({
  model: Book,
  endpoints: ['/books', '/books/:id']
})

// Resets the database and launches the express app on :8081

database
  .sync({ force: true })
  .then(() => {
    app.listen(8081, () => {
      console.log('listening to port localhost:8081')
    })
  }) 
