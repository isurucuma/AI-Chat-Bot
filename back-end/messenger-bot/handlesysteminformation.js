const fs = require('fs');

function createConfigFile() {
  const config = {
    systemState: 'default'
  };
  fs.writeFileSync('config.json', JSON.stringify(config));
}

function createEnvFile() {
  const env = {
    PAGE_ACCESS_TOKEN: '',
    VERIFY_TOKEN: ''
  };
  fs.writeFileSync('.env', JSON.stringify(env));
}

function createFilesIfNotExist() {
  if (!fs.existsSync('config.json')) {
    createConfigFile();
  }
  if (!fs.existsSync('.env')) {
    createEnvFile();
  }
}

function changeSystemState(systemState) {
  createFilesIfNotExist();
  const config = JSON.parse(fs.readFileSync('config.json'));
  config.systemState = systemState;
  fs.writeFileSync('config.json', JSON.stringify(config));
}

function changeToken(PAGE_ACCESS_TOKEN, VERIFY_TOKEN) {
  createFilesIfNotExist();
  const config = JSON.parse(fs.readFileSync('.env'));
  config.PAGE_ACCESS_TOKEN = PAGE_ACCESS_TOKEN;
  config.VERIFY_TOKEN = VERIFY_TOKEN;
  fs.writeFileSync('.env', JSON.stringify(config));
}

function getSystemState() {
  createFilesIfNotExist();
  const config = JSON.parse(fs.readFileSync('config.json'));
  return config.systemState;
}

function getToken() {
  createFilesIfNotExist();
  const config = JSON.parse(fs.readFileSync('.env'));
  return { PAGE_ACCESS_TOKEN: config.PAGE_ACCESS_TOKEN, VERIFY_TOKEN: config.VERIFY_TOKEN };
}

module.exports = {
  changeSystemState,
  changeToken,
  getSystemState,
  getToken
};