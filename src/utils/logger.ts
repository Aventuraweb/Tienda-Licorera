import winston from 'winston';

// Crear el logger de Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

// Define la propiedad `stream` como un objeto con una función `write` que es compatible con Morgan
const stream: { write: (message: string) => void } = {
  write: (message: string) => logger.info(message.trim()),
};

export { logger, stream };
