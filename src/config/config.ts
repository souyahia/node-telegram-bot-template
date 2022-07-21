import path from 'path';
import nconf  from 'nconf';
import { ConfigKey, defaults } from './defaults';

export class AppConfig {
  private config = nconf.env('__')
    .file({ file: path.join(__dirname, '../app-config.json') })
    .defaults(defaults);

  get(key: ConfigKey): string {
    const value = this.config.get(key) as (string | undefined);
    if (!value) {
      throw new Error(`Missing required config param "${key}"`);
    }
    return value;
  }

  getNumber(key: ConfigKey): number {
    const value = this.config.get(key) as (string | undefined);
    if (!value) {
      throw new Error(`Missing required config param "${key}"`);
    }
    if (parseInt(value, 10).toString() !== value) {
      throw new Error(`Expected param "${key}" to be an integer but instead found "${value}"`);
    }
    return Number(value);
  }
}
