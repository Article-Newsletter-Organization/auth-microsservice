export default () => ({
  port: parseInt(process.env['PORT'], 10) || 3000,
  redis: {
    host: process.env['REDIS_HOST'] || 'localhost',
    port: process.env['REDIS_PORT'] || 6379,
  },
});
