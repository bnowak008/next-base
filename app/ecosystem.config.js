module.exports = {
  apps: [
    {
      name: "next-base",
      script: "./dist/server/index.js",
      node_args: "-r dotenv/config",
      autorestart: true,
      watch: true,
      max_memory_restart: "1G"
    }
  ]
};