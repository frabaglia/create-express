#!/usr/bin/env node

/* Only working on macOS, how could i handle it on Windows and Linux ? */
var ncp = require('ncp').ncp
var program = require('commander')
var chalk = require('chalk')
var sys = require('util')
var exec = require('child_process').exec
var spinner = require("char-spinner")

program
    .arguments('<serverName>')
    .action(function(serverName) {
        startCopyWithServerName(serverName)
    })
    .parse(process.argv)


function startCopyWithServerName(serverName) {
    exec('mkdir ' + serverName + ' && pwd',
        function(error, stdout, stderr) {

            stdout = stdout.substring(0, stdout.length - 1)

            console.log(chalk.bold.green('🐙 express-create is creating a new server template on ' + stdout + '/' + serverName))
            var interval = spinner()
            if (typeof error !== 'undefined' && error !== null) {
                return errorHandler(error, interval)
            } else if (typeof stderr !== 'undefined' && stderr !== null && stderr !== '') {
                return stdErrorHandler(error, interval)
            } else {
                return copyFiles(stdout, serverName, interval)
            }
        })
}

function errorHandler(error, interval) {
    console.log('')
    console.error(chalk.bold.red("node exec() error: "))
    console.error(chalk.red(error))
    clearInterval(interval)
}

function stdErrorHandler(error, interval) {
    console.log('')
    console.error(chalk.bold.red("stderr error: "))
    console.error(chalk.red(stderr))
    clearInterval(interval)
}

function ncpError(err, interval) {
    console.log('')
    console.error(chalk.bold.red("ncp error: "))
    console.error(chalk.red(err))
    clearInterval(interval)
}

function copyFiles(stdout, serverName, interval) {
    ncp('./template', stdout + '/' + serverName, function(err) {
        if (err) {
            return ncpError(err)
        }
        clearInterval(interval)
        console.log('')
        console.log(chalk.bold.green('Your template is ready! 🍻 '))
        console.log('')
        console.log(chalk.bold.white('Start making some awsome things, to start coding just make:'))
        console.log('')
        console.log(chalk.bold.cyan('cd ' + serverName) + chalk.white(' && ') + chalk.bold.cyan('yarn install') + chalk.white(' && ') + chalk.bold.cyan('npm run dev'))
    })
}
