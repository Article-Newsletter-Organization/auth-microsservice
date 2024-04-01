import { AppError, HttpException } from 'src/Presentetion/Protocols';

interface MemoryUsageDiff {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
}

export interface Metrics {
  requestUrl?: string;
  responseTime?: number;
  statusCode?: number;
  responseSize?: number;
  memoryUsage?: MemoryUsageDiff;
  totalMemory?: number;
  freeMemory?: number;
}

export interface LogModel {
  metrics?: Metrics;
  exception?: HttpException;
}
