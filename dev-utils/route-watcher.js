const chokidar = require('chokidar');
const path = require('upath');
const fs = require('fs');
const _ = require('lodash');
path.sep = "/";

const watcher = chokidar.watch('src/examples', {
  ignored: /index\.js/,
  persistent: true
});

watcher
  .on('add', p => {
    addRoute(p);
  })
  .on('unlink', p => {
    removeRoute(p);
  });

const router = {};

function routesTemp(router){
  const routes = _.values(router).reduce((prev, c) => 
    prev += `<Route key='${c.name}' path='/examples/${c.name}' component={require('${c.path}').default}/>\n`
  , "");
  return `
  // this file is generate by dev-utils/route-watcher
  import React from "react";
  import { Route } from "react-router-dom";
    export default function ExampleRoutes(){
      return (
        <div>
    ` 
    + routes +
    `   </div>
      )
    }
  `
}

// p: src/examples/PostsWithSaga.jsx
// parsedPath: { 
//   root: '',
//   dir: '',
//   base: 'EditReceipt.jsx',
//   ext: '.jsx',
//   name: 'EditReceipt' 
// }
// 
function addRoute(p) {
  const parsedPath = path.parse(p);
  if(parsedPath.ext === '.jsx' || parsedPath.ext === '.jsx') {
    router[parsedPath.name] = {
      name: parsedPath.name,
      path: path.join(parsedPath.dir, parsedPath.base)
    }
  }
  writeFile('src/examples/index.json', JSON.stringify(router))
  writeFile('src/components/ExampleRoutes.jsx', routesTemp(router))
}

function removeRoute(p){
  const name = path.parse(path.basename(p)).name;
  delete router[name];
  writeFile('src/examples/index.json', JSON.stringify(router))
  writeFile('src/components/ExampleRoutes.jsx', routesTemp(router))
}

function writeFile(_path, str){
  const p = path.resolve(_path);
  fs.writeFile(p, str, (error) => {
    if(error) {
      console.log(error);
    }
  });
}
