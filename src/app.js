"use strict"
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import babelEnvLogger from '../.internal-modules/env-logger'
import routes from './routes/index'

babelEnvLogger(process.env.ENV)

let app = express()

app.use(logger('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

/* Main routing */
app.use('/', routes)

/* 404 handling */
app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})

/* 500 handling */
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.render('error', {
            message: err.message,
            error: err
        })
    })
}

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
        message: err.message,
        error: {}
    })
})

module.exports = app
