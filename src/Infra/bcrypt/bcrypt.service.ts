import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { TraceSpan } from 'src/Configuration/Decorators/span.decorator';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}

  @TraceSpan("Hash")
  async hash(plaintext: string): Promise<string> {
    return await bcrypt.hash(
      plaintext,
      parseInt(this.configService.get<string>('bycrpt.salt')),
    );
  }

  @TraceSpan("Hash Compare")
  hashCompare(hash: string, plaintext: string): boolean {
    return bcrypt.compareSync(plaintext, hash);
  }
}
