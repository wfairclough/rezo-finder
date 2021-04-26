import { Browser } from 'webdriverio';

export const CURRENT_SESSION = Symbol.for('CURRENT_SESSION');

export interface Session {
  browser: Browser<'async'>;
}
