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
    startProcess(serverName)
  })
  .parse(process.argv)


function startProcess(serverName) {
  exec('mkdir ' + serverName + ' && pwd',
    function(error, stdout, stderr) {

      if (typeof error !== 'undefined' && error !== null) {
        return errorHandler(error, undefined)
      } else if (typeof stderr !== 'undefined' && stderr !== null && stderr !== '') {
        return stdErrorHandler(error, undefined)
      }

      var to = stdout.substring(0, stdout.length - 1)

      startCopy(to, serverName)
    })
}

function startCopy(to, serverName) {
  console.log(chalk.bold.green('🐙  express-create is creating a new server template on ' + to + '/' + serverName))
  var interval = spinner()
  var from = ''

  exec('echo $NVM_BIN', function(error, stdout, stderr) {

    from = stdout.substring(0, stdout.length - 1)

    if (typeof error !== 'undefined' && error !== null) {
      return errorHandler(error, interval)
    } else if (typeof stderr !== 'undefined' && stderr !== null && stderr !== '') {
      return stdErrorHandler(error, interval)
    } else {
      return copyFiles(from, to, serverName, interval)
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

function copyFiles(from, to, serverName, interval) {

  if (typeof from !== 'undefined' && from !== null && from !== '') {
    console.log('')
    console.log(chalk.bold.cyan('Detecting NVM enviroment on your computer.'))
    console.log(chalk.bold.cyan('Taking the template from the corresponding node modules...'))
    from = from + "/../lib/node_modules/create-express/template/"
  } else {
    console.log('')
    console.log(chalk.bold.cyan('Detecting non NVM enviroment on your computer.'))
    console.log(chalk.bold.cyan('Taking the template from the corresponding node modules...'))
    from = '/usr/local/lib/node_modules/create-express/template/'
    //TODO: This is the only one?
    // Could there be other paths for node_modules in a UNIX enviroment?
    // Is enoghth for Linux users too?
    //from = '/usr/local/node_modules/create-express/template/'
    //from = '/usr/lib/node_modules/create-express/template/'
    //from = '/usr/local/bin/create-express/template/'
  }

  ncp(from, to + '/' + serverName, function(err) {
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
