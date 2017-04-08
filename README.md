# 🐙 express-generator-last

This module allows you to start using Node es-2015 and stage-0 features very quickly.

It has some dev ops implemented on the npm package:

### - lint : standard
```
npm run lint
```
Is not working actually.

### - dev : nodemon
```
npm run dev
```
Hotreloading running, with lint and ignoring public/js folder.

### - start : babel-node
```
npm start
```
Runs the server with babel-node (kind of node but transpiling before) and with "dev" enviroment flags. babel-node works together with .babelrc file, the same as babel-cli.

### - build : babel
```
npm run build
```
For production build only.

### - serve : node
```
npm run serve
```
For production serve only, running real Node.

# getting started

If you want to start coding just clone this repo, get into and run:
```
yarn install && npm run dev
```

And try to make a change on any file of /src folder. I suggest to get into /src/controllers/index.js to make a very fast and understandable change.
