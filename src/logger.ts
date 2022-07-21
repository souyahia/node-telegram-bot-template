import { createLogger, LogLevelString } from 'bunyan';
import { appConfig, ConfigKey } from './config';

const acceptedLevelValues = ['trace', 'debug', 'info', 'warn', 'error', 'fatal'];
const name = appConfig.get(ConfigKey.LOGGER_NAME);
const level = appConfig.get(ConfigKey.LOGGER_LEVEL) as LogLevelString;

if (!acceptedLevelValues.includes(level)) {
  throw new Error(`Unknown logger level "${level}"`);
}

export const logger = createLogger({ name, level });
