const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

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

function addRoute(p){
  const name = path.parse(path.basename(p)).name;
  const componentPath = path.basename(p);
  router[name] = {
    name, componentPath
  }
  rewriteJSON('src/examples/index.json')
}

function removeRoute(p){
  const name = path.parse(path.basename(p)).name;
  delete router[name];
  rewriteJSON('src/examples/index.json')
}

function rewriteJSON(_path){
  const p = path.resolve(_path);
  fs.writeFile(p, JSON.stringify(router), (error) => {
    if(error) {
      console.log(error);
    }
  });
}
