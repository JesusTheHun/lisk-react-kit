const fs = require('fs');

const reactPrefix = 'REACT_APP_';
const files = [];
const env = {};

switch (process.env.NODE_ENV) {
  case 'production':
    files.push('.env.production', '.env.production.local');
    break;
  case 'test':
    files.push('.env.test', '.env.test.local');
    break;
  case 'development':
  default:
    files.push('.env.development', '.env.development.local');
}

files.forEach(filename => {
  if (!fs.existsSync(filename)) return;

  fs.readFileSync(filename).toString()
  .split("\n")
  .map(s => s.trim())
  .filter(entry => entry.length > 0)
  .filter(entry => entry.substr(0, 1) !== '#')
  .forEach(entry => {
    const chunks = entry.split('=');
    const name = chunks.shift();

    if (!isReactVariableName(name)) return;

    env[getReactVariableBasename(name)] = chunks.join();
  })
});

Object.entries(process.env)
.filter(([key]) => isReactVariableName(key))
.forEach(([key, value]) => env[key] = value);

const data = `window.APP_CONFIG = ${JSON.stringify(env)};`;

fs.writeFileSync(process.argv[2], data, {flag: 'w+'});

function isReactVariableName(v) {
  return v.substr(0, reactPrefix.length) === reactPrefix;
}

function getReactVariableBasename(v) {
  return v.substr(reactPrefix.length);
}
