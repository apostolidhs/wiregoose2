const {transports, format, createLogger, config} = require('winston');
const {timestamp, printf} = format;

module.exports = filename => {
  const csvFormat = printf(({level, message, timestamp}) => `${timestamp}|${level}|${message}`);
  const consoleFormat = printf(({level, message, timestamp}) => `${timestamp} ${level} ${message}`);

  const fileTransport = new transports.File({
    filename,
    level: 'silly',
    dirname: 'logs',
    maxsize: 20 * 1024 * 1024,
    maxFiles: 10,
    tailable: true,
    format: format.combine(timestamp(), csvFormat)
  });

  const consoleTransport = new transports.Console({
    format: format.combine(timestamp(), format.colorize(), consoleFormat),
    level: process.env.NODE_ENV === 'development' ? 'silly' : 'info'
  });

  return createLogger({
    transports: [consoleTransport, fileTransport],
    levels: config.npm.levels
  });
};
