import express from 'express'
import morgan from 'morgan'
import path from 'path'

var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var port = process.env.PORT || 2046;

let app = express()

// use cookie parser middleware
app.use(cookieParser())

// serve static files
app.use(express.static('dist'))

app.use(morgan('combined'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true, limit:'5mb' }))

// parse application/json
app.use(bodyParser.json({limit:'5mb'}))
app.get('/', (req, res) => {
  res.sendfile('dist/app.html')
})

app.listen(port, function () {
  console.log('Listening on port 2046')
})
