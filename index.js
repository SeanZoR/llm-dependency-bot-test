const axios = require('axios');
const _ = require('lodash');

console.log('LLM Dependency Bot Test App');
console.log('Axios version:', require('axios/package.json').version);
console.log('Lodash version:', require('lodash/package.json').version);

module.exports = { axios, _ };
