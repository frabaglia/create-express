#!/usr/bin/env node

/* Only working on macOS, how could i handle it on Windows and Linux ? */

var ncp = require('ncp').ncp
var program = require('commander')
var chalk = require('chalk')
var sys = require('util')
var exec = require('child_process').exec

console.log(chalk.bold.green('express-create is working...'))

program
    .arguments('<serverName>')
    .action(function(serverName) {
        console.log(chalk.bold.cyan('server name:', serverName))
        startCopyWithServerName(serverName)
    })
    .parse(process.argv)


function startCopyWithServerName(serverName) {
    exec('mkdir ' + serverName + ' && pwd',
        function(error, stdout, stderr) {

            stdout = stdout.substring(0, stdout.length - 1)

            console.log('creating new express proyect on: ' + stdout + '/' + serverName)
            if (typeof error !== 'undefined' && error !== null) {
                return errorHandler(error)
            } else if (typeof stderr !== 'undefined' && stderr !== null && stderr !== '') {
                return stdErrorHandler(error)
            } else {
                return copyFiles(stdout, serverName)
            }
        })
}

function errorHandler(error) {
    console.error(chalk.bold.red("node exec() error: "))
    console.error(chalk.red(error))
}

function stdErrorHandler(error) {
    console.error(chalk.bold.red("stderr error: "))
    console.error(chalk.red(stderr))
}

function ncpError(err) {
    console.error(chalk.bold.red("ncp error: "))
    console.error(chalk.red(err))
}

function copyFiles(stdout, serverName) {
    ncp('./template', stdout + '/' + serverName, function(err) {
        if (err) {
            return ncpError(err)
        }
        console.log(chalk.bold.green('express-create is ready!'))
        console.log(chalk.bold.white('cd to your app and make:'))
        console.log(chalk.bold.cyan('yarn install && npm run dev'))
    })
}
