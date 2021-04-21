const fs = require('fs');
const defaultConfig = require('./default.config')

module.exports = {
  getConfig() {
    let config;

    let file = `${process.pwd()}/.pod.config.json`

    console.log(file)
    if (fs.existsSync(file)) {
      try {
        config = JSON.parse(fs.readFileSync(file));
      } catch(e) {
        console.log('Invalid JSON', e);
      }
    } else {
      config = defaultConfig;
      file = 'default';
    }

    return {
      file,
      config
    };
  }
}