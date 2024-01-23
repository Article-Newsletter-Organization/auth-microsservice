import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}
  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(
      plaintext,
      parseInt(this.configService.get<string>('bycrpt.salt')),
    );
  }

  hashCompare(hash: string, plaintext: string): boolean {
    return bcrypt.compareSync(plaintext, hash);
  }
}
