#!/usr/bin/env node

/* globals require process  */

'use strict';

process.title = 'ember-plantuml';
console.log('Ember Plant UML');
const startServer = require('../server');
startServer(process.cwd());
