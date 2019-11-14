const winston = require('winston');

const fileTransport = new winston.transports.File({
  dirname: 'logs',
  filename: 'app.log',
  maxsize: 20 * 1024 * 1024,
  maxFiles: 10,
  tailable: true
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), winston.format.simple())
});

const logger = winston.createLogger({
  transports: [consoleTransport, fileTransport]
});

module.exports = logger;
