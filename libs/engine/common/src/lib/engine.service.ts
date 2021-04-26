import { Injectable } from '@nestjs/common';

import { remote } from 'webdriverio';
import { DevToolsOptions } from 'devtools';
import { Session } from './session';

export interface NewSessionParams extends DevToolsOptions {
  headless?: boolean;
}

const HEADLESS_ARGS = [
  '--headless',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',  
];

const CHROME_BIN_PATH=`/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome`;

@Injectable()
export class EngineService {

  public async startNewSession(params?: NewSessionParams): Promise<Session> {
    const opts = {
      headless: true,
      defaultViewport: {
        width: 800,
        height: 600,
        deviceScaleFactor: 1,
        isMobile: false
      },
      ...params,
    };

    const browser = await remote({
      logLevel: 'trace', //'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';
      automationProtocol: 'devtools', // 'webdriver' | 'devtools' | './protocol-stub';
      capabilities: {
        browserName: 'chrome',
        acceptInsecureCerts: true,
        "wdio:devtoolsOptions": {
          headless: opts.headless,
        },
      },
    });

    return { browser };
  }

}
