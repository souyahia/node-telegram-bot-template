export enum ConfigKey {
  TELEGRAM_SECRET = 'TelegramSecret',
  TELEGRAM_USERNAME = 'TelegramUsername',
  LOGGER_LEVEL = 'LoggerLevel',
  LOGGER_NAME = 'LoggerName',
}

export const defaults: { [key in ConfigKey]?: string } = {
  [ConfigKey.LOGGER_LEVEL]: 'info',
  [ConfigKey.LOGGER_NAME]: 'my-telegram-bot-logger',
};
