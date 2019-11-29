const convict = require("convict");

const schema = {
  PORT: {
    doc: "The port to listen on",
    format: "port",
    default: null,
    env: "PORT"
  }
};

module.exports = {
  getConfig: () => {
    const config = convict(schema);

    config.validate({ allowed: "strict" });

    return config.getProperties();
  }
};
