import { chooseOneFrom } from './utils';

const defaultChatResponses = [
  'Hello.',
  'Hi 🤗',
  'Hey !',
];

export function getDefaultChatResponse(): string {
  return chooseOneFrom(defaultChatResponses);
}
