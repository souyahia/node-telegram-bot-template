import { appConfig, ConfigKey } from './config';
import { logger } from './logger';
import { MyTelegramBot } from './telegram';

const myTelegramBot = new MyTelegramBot({
  secret: appConfig.get(ConfigKey.TELEGRAM_SECRET),
  username: appConfig.get(ConfigKey.TELEGRAM_USERNAME),
});

try {
  myTelegramBot.start();
} catch (err) {
  logger.error(err);
}
