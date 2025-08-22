import { HttpResponse } from '../Protocols';

export class OkResponse<T = any> extends HttpResponse<T> {
  constructor(attrs: { data?: T; message?: string } = {}) {
    super({
      data: attrs.data,
      status: 200,
      message: attrs.message ?? 'Ok',
    });
  }
}
