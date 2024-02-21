import { format } from 'winston';
import { Console, File } from 'winston/lib/winston/transports';

export const winstonOptions = {
  transports: [
    new Console({
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        format.align(),
        format.printf(
          (info) =>
            `[${info.timestamp}] ${info.level}[${info.name}]: ${info.message}`,
        ),
      ),
    }),
    new File({
      filename: 'logstash.log',
      dirname: 'log/',
      format: format.combine(format.timestamp(), format.logstash()),
      level: 'info',
    }),
    new File({
      filename: 'error.log',
      dirname: 'log/',
      format: format.combine(format.timestamp(), format.logstash()),
      level: 'error',
    }),
  ],
};
