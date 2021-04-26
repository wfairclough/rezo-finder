import { Inject, Injectable } from '@nestjs/common';
import { CURRENT_SESSION, Session } from '@rezo-finder/engine/common';
import { Browser, Element } from 'webdriverio';
import { CampsiteSearchForm } from './campsite-search-form';

export interface CheckAvailabilityParams {

}

const PARKS_ONTARIO_RESERVATIONS_URL = 'https://reservations.ontarioparks.com/';

@Injectable()
export class OntarioParksService {

  private get browser(): Browser<'async'> {
    return this.session.browser;
  }

  constructor(
    @Inject(CURRENT_SESSION) private session: Session,
  ) {}

  async checkAvailability(params: CheckAvailabilityParams) {
    await this.browser.url(PARKS_ONTARIO_RESERVATIONS_URL);
    const title = await this.browser.getTitle();
    console.log(`Loaded: ${title}`);
    await this.browser.pause(3000);

    const form = new CampsiteSearchForm(this.browser);

    const campsites = await form.getCampsites()
    console.log(campsites);

    await this.browser.pause(3000);

    await form.selectCampsite(campsites[10]);

    await form.setArrivalDate('5/15/2021');

    await this.browser.pause(1000);

    form.submit();

    await this.browser.pause(3000);

    
  
    await this.browser.deleteSession();
  }

}
