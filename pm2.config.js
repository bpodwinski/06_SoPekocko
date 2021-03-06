module.exports = {
  apps: [
    {
      name: "frontend",
      cwd: "./frontend",
      script: "ng",
      args: "serve",
      watch: false,
      log_file: "frontend.log",
      time: false,
    },
    {
      name: "backend",
      cwd: "./backend",
      script: "npm run dev",
      watch: false,
      log_file: "backend.log",
      time: false,
    },
  ],
};
