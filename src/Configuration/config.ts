import { readFileSync } from 'fs';
import { join } from 'path';

function getFile(path: string) {
  try {
    return readFileSync(
      join(process.cwd(), `src/Configuration/keys/${path}`),
      'utf8',
    );
  } catch (error) {
    console.log(error);
    return '';
  }
}

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
    expiresIn: process.env['JWT_EXPIRE_TIME'] || 3600,
    privateKey: process.env['JWT_PRIVATE_KEY'] || getFile('private_key.pem'),
    publicKey: process.env['JWT_PUBLIC_KEY'] || getFile('public_key.pem'),
  },
});
