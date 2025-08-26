import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse } from '../Protocols';

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
    if (body instanceof HttpResponse)
      return {
        ...(body instanceof HttpResponse ? body : { data: body }),
        error: null,
        timestamp: new Date(),
      };
  }
}
