module.exports = {
  apps: [
    {
      name: 'primeqa-website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      watch: false,
      env: {
        PORT: 1338,
        NODE_ENV: 'production'
      },
      env_production: {
        PORT: 1338,
        NODE_ENV: 'production'
      }
    }
  ]
};
