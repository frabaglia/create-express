# express-generator-last

This module allows you to start using Node es-2015 and stage-0 features very quickly.

It has some dev ops implemented on the npm package:

### - lint : standard

Is not working actually.

### - dev : nodemon

Hotreloading running, with lint and ignoring public/js folder.

### - start : babel-node

Runs the server with babel-node (kind of node but transpiling before) and with "dev" enviroment flags. babel-node works together with .babelrc file, the same as babel-cli.

### - build : babel

For production build only.

### - start : node

For production serve only, running real Node.
