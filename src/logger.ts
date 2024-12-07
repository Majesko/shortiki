import pino, { Logger } from 'pino';

export const createLogger = (): Logger => {
  return pino({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  });
};
