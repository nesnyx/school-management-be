module.exports = {
  apps: [
    {
      name: 'nestjs-dev',
      script: './dist/main.js', // File hasil build
      instances: 1,
      exec_mode: 'fork',
      watch: true, // Restart otomatis saat file berubah
      ignore_watch: ['node_modules', 'logs', 'dist'],
      env: {
        NODE_ENV: 'development',
        PORT: 4301,
      },
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};