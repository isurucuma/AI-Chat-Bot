const fs = require("fs");

function createConfigFile() {
  const config = {
    systemState: "default",
  };
  fs.writeFileSync("config.json", JSON.stringify(config));
}

function createEnvFile() {
  const env = `PAGE_ACCESS_TOKEN=temp
  VERIFY_TOKEN=abcd1111`;
  fs.writeFileSync(".env", env);
}

function createFilesIfNotExist() {
  if (!fs.existsSync("config.json")) {
    createConfigFile();
  }
  if (!fs.existsSync(".env")) {
    createEnvFile();
  }
}

function changeSystemState(systemState) {
  createFilesIfNotExist();
  const config = JSON.parse(fs.readFileSync("config.json"));
  config.systemState = systemState;
  fs.writeFileSync("config.json", JSON.stringify(config));
  return config.systemState;
}

function changeToken(PAGE_ACCESS_TOKEN, VERIFY_TOKEN) {
  createFilesIfNotExist();
  // update .env file with new tokens
  const env = fs.readFileSync(".env", "utf8").split("\n");
  env[0] = `PAGE_ACCESS_TOKEN=${PAGE_ACCESS_TOKEN}`;
  env[1] = `VERIFY_TOKEN=${VERIFY_TOKEN}`;
  fs.writeFileSync(".env", env.join("\n"));
}

function getSystemState() {
  createFilesIfNotExist();
  const config = JSON.parse(fs.readFileSync("config.json"));
  return config.systemState;
}

function getToken() {
  createFilesIfNotExist();
  const env = fs.readFileSync(".env", "utf8").split("\n");
  const config = {};
  console.log(env);
  // remove if /r have
  env.forEach((line) => {
    const [key, value] = line.split("=");
    config[key.trim()] = value.trim();
  });

  console.log(config);
  return {
    PAGE_ACCESS_TOKEN: config.PAGE_ACCESS_TOKEN,
    VERIFY_TOKEN: config.VERIFY_TOKEN,
  };
}

module.exports = {
  changeSystemState,
  changeToken,
  getSystemState,
  getToken,
};
