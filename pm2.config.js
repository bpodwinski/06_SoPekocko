const { isFunctionOrConstructorTypeNode } = require("typescript");

module.exports = {
  apps: [
    {
      name: "frontend",
      script: "ng",
      args: "serve",
      watch: false,
      log_file: "frontend.log",
      time: false,
    },
    {
      name: "backend",
      cwd: "./backend",
      script: "node",
      args: "server",
      watch: false,
      log_file: "backend.log",
      time: false,
    },
  ],
};
