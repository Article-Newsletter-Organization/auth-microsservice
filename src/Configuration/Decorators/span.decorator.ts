import { api } from '@opentelemetry/sdk-node';

const tracer = api.trace.getTracer('Global');

export function TraceSpan(spanName: string): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const span = tracer.startSpan(spanName);
      const spanContext = api.trace.setSpan(api.context.active(), span);

      try {
        const result = await api.context.with(spanContext, async () => {
          return await originalMethod.apply(this, args);
        });
        return result;
      } catch (error) {
        span.recordException(error);
        throw error;
      } finally {
        span.end();
      }
    };

    return descriptor;
  };
}