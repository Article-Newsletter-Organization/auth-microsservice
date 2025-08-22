export abstract class HttpResponse<T = any> {
  status: number;
  message: string;
  data?: T;

  constructor(attrs: { status: number; data?: T; message: string }) {
    this.status = attrs.status;
    this.message = attrs.message;
    this.data = attrs.data;
  }

  toString() {
    return `Response ${this.status}: ${
      this.message
    } - ${Date.now().toString()}`;
  }

  getHttpReponse() {
    return {
      status: this.status,
      message: this.message,
      data: this.data ?? null,
    };
  }

  getLog() {
    return {
      status: this.status,
      message: this.message,
    };
  }
}
