import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((body) => {
        return this.bodyFormatter(body);
      }),
    );
  }
  bodyFormatter(body: any) {
    return {
      data: body,
      error: null,
      timestamp: new Date(),
    };
  }
}
