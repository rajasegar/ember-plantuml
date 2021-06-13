const express = require('express');
const os = require('os');
const path = require('path');
const getPort = require('get-port');
const { exec } = require('child_process');
const fs = require('fs');
const walkSync = require('walk-sync');
const { transform } = require('ember-gen-uml');
const plantuml = require('plantuml');
const debug = require('debug')('ember-plantuml');

function startServer(projectPath) {
  const app = express();

  app.get('/', (req, res) => {
    const indexFile = path.join(__dirname, '..', 'dist/index.html');
    res.sendFile(indexFile);
  });

  app.get('/explore', (req, res) => {
    const { folder } = req.query;
    res.json({ files: walkSync(folder, { globs: ['**/*.js'] }), folder });
  });

  app.get('/uml', async (req, res) => {
    debug('Query params: ', req.query);
    const { folder, file } = req.query;
    // Read file
    const code = fs.readFileSync(`${folder}/${file}`, 'utf8');
    // Transform to uml
    const uml = transform(code);
    debug('UML: ', uml);
    const svg = await plantuml(uml);
    debug('SVG: ', svg);
    // Get the response
    res.json({ svg });
  });

  app.use('/assets', express.static(path.join(__dirname, '..', 'dist/assets')));

  app.get('/project', (req, res) => {
    const manifestPath = `${projectPath}/package.json`;
    if (fs.existsSync(manifestPath)) {
      const manifest = require(manifestPath);
      manifest.projectPath = projectPath;
      res.json(manifest);
    } else {
      res.json({});
    }
  });

  (async () => {
    const port = await getPort();

    const host = os.platform() === 'win32' ? '127.0.0.1' : '0.0.0.0';

    console.log('Ember PlantUML Server listening to http://localhost:' + port);

    let openCommand = 'open';
    if (os.platform() === 'win32') openCommand = 'start';
    if (os.platform() === 'linux') openCommand = 'xdg-open';

    exec(`${openCommand} http://localhost:${port}`, () => {});

    app.listen(port, host);
  })();
}

module.exports = startServer;
