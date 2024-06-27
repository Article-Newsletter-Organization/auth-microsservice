import { context, trace } from '@opentelemetry/api';


const tracer = trace.getTracer('Global');

export function TraceSpan(spanName: string): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const span = tracer.startSpan(spanName);
      const spanContext = trace.setSpan(context.active(), span);

      try {
        const result = await context.with(spanContext, async () => {
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