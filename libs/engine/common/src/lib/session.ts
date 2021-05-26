import { BrowserExtensionSync } from '@wdio/devtools-service';
import type { Browser } from 'webdriverio';

export const CURRENT_SESSION = Symbol.for('CURRENT_SESSION');
export const SESSION_FACTORY = Symbol.for('SESSION_FACTORY');

export type SessionFactory = () => Promise<Session>;

export type EngineBrowser = Browser<'async'> & BrowserExtensionSync;

export interface Session {
  browser: EngineBrowser;
}
