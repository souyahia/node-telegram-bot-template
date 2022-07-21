import TelegramBot, { Message } from 'node-telegram-bot-api';
import { logger } from '../logger';
import { getDefaultChatResponse, getHelpResponse } from '../responses';

interface MyTelegramBotCommand {
  name: string,
  handler: (message: Message) => void,
}

export interface MyTelegramBotConfig {
  secret: string,
  username: string,
}

export class MyTelegramBot {
  private readonly telegram: TelegramBot;
  private readonly commands: MyTelegramBotCommand[] = [
    { name: 'help', handler: (message) => this.onHelpCommand(message) },
  ];

  private startingTime: number | null = null;

  constructor(private readonly config: MyTelegramBotConfig) {
    this.telegram = new TelegramBot(this.config.secret, { polling: true });
    logger.info(`MyTelegramBot created with username @${this.config.username}.`);
  }

  start(): void {
    logger.info('Starting MyTelegramBot...');
    this.startingTime = Date.now() / 1000;
    this.telegram.on('message', (message) => this.onMessage(message));
  }

  private onMessage(message: Message): void {
    if (this.isNewMessage(message) && !this.onCommand(message)) {
      if (message.chat.type === 'private') {
        this.onPrivateMessage(message);
      } else if (message.chat.type === 'group' || message.chat.type === 'supergroup') {
        this.onGroupMessage(message);
      }
    }
  }

  private onCommand(message: Message): boolean {
    for (const command of this.commands) {
      if (message.text && message.text.startsWith(`/${command.name}`)) {
        logger.debug(`Command /${command.name} received in M#${message.message_id} in C#${message.chat.id}.`);
        command.handler(message);
        return true;
      }
    }
    return false;
  }

  private onHelpCommand(message: Message): void {
    const response = getHelpResponse();
    this.sendMessage(response, message.chat.id);
  }

  private onPrivateMessage(message: Message): void {
    const response = getDefaultChatResponse();
    this.sendMessage(response, message.chat.id);
  }

  private onGroupMessage(message: Message): void {
    const response = getDefaultChatResponse();
    this.replyToMessage(response, message);
  }

  private sendMessage(markdownText: string, chatId: number): void {
    logger.trace(`Sending the following message in C#${chatId} :`, markdownText);
    this.telegram.sendMessage(
      chatId,
      markdownText,
      {
        disable_web_page_preview: true,
        parse_mode: 'Markdown',
      },
    )
      .then(() => logger.debug(`Message sent in C#${chatId}.`))
      .catch((err) => logger.error(`Error when sending message in C#${chatId} :`, err));
  }

  private replyToMessage(markdownText: string, replyTo: Message): void {
    logger.trace(`Replying the following message to M#${replyTo.message_id} in C#${replyTo.chat.id} :`, markdownText);
    this.telegram.sendMessage(
      replyTo.chat.id,
      markdownText,
      {
        reply_to_message_id: replyTo.message_id,
        disable_web_page_preview: true,
        parse_mode: 'Markdown',
      },
    )
      .then(() => logger.debug(`Reply sent to M#${replyTo.message_id} in C#${replyTo.chat.id}.`))
      .catch((err) => logger.error(`Error when replying to M#${replyTo.message_id} in C#${replyTo.chat.id} :`, err));
  }

  private isNewMessage(message: Message): boolean {
    return this.startingTime !== null && message.date >= this.startingTime;
  }
}
