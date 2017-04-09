#!/usr/bin/env node

var ncp = require('ncp').ncp

ncp('/usr/local/lib/node_modules/create-express-server/template', './myNewExpressApp', function(err) {
    if (err) {
        return console.error(err)
    }
    console.log('express template is ready...')
    console.log('go to root directory make:')
    console.log('yarn install && npm run dev')
})
