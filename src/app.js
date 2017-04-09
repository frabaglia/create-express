"use strict"
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import babelEnvLogger from './utils/env-logger'
import routes from './routes/index'

/* This function is just a helper to let you know how is the server running without inspecting npm scripts. */
/* If it bothers, you can delete it right now. */
babelEnvLogger(process.env.ENV)

let app = express()

/* Template engine */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

/* Morgan logger */
app.use(logger('dev'))

/* Body parsing */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cookieParser())

/* Statinc serving */
app.use(express.static(path.join(__dirname, '../public')))

/* Main routing */
app.use('/', routes)

/* 404 handling */
app.use((req, res, next) => {
    let err = new Error('Not found.')
    err.status = 404
    next(err)
})

/* 500 handling */
if (process.env.ENV === 'dev') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.send({
            message: err.message,
            status: err.status,
            error: err
        })
    })
}

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        message: err.message,
        status: err.status,
        err: {}
    })
})

module.exports = app
