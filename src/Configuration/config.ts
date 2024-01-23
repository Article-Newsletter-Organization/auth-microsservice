export default () => ({
  port: parseInt(process.env['PORT'], 10) || 3000,
  redis: {
    host: process.env['REDIS_HOST'] || 'localhost',
    port: process.env['REDIS_PORT'] || 6379,
  },
  bcrypt: {
    salt: parseInt(process.env['BYCRYP_SALT']) || 12,
  },
  jwt: {
    secret: process.env['JWT_SECRET'] || 'secret',
    expiresIn: process.env['JWT_EXPIRE_TIME'] || '60s',
  },
});
