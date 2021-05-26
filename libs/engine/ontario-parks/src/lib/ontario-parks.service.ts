import { Inject, Injectable, Logger } from '@nestjs/common';
import { CURRENT_SESSION, HttpClient, HTTP_CLIENT, Session, SessionFactory, SESSION_FACTORY } from '@rezo-finder/engine/common';
import { CampsiteSearchForm } from './campsite-search-form';
import { Equipment } from './models/equipment';
import { RootMaps } from './models/rootmaps';

export interface CheckAvailabilityParams {
  campsite: string;
  equipment: string;
}

const PARKS_ONTARIO_RESERVATIONS_URL = 'https://reservations.ontarioparks.com/';

const log = new Logger('OntarioParksService');

@Injectable()
export class OntarioParksService {

  constructor(
    @Inject(SESSION_FACTORY) private sessionFactory: SessionFactory,
    @Inject(HTTP_CLIENT) private http: HttpClient,
  ) {}

  async getCampsites() {
    const resp = await this.http.get<RootMaps>('https://reservations.ontarioparks.com/api/resourcelocation/rootmaps');
    const rootmaps = resp.body
    log.debug(`Got ${rootmaps?.length} root maps`);
    return rootmaps;
  }

  async getEquipment() {
    const resp = await this.http.get<Equipment[]>('https://reservations.ontarioparks.com/api/equipment');
    const equipment = resp.body
    log.debug(`Got ${equipment?.length} root maps`);
    return equipment;
  }

  async checkAvailability(params: CheckAvailabilityParams) {
    const { campsite } = params;
    const { browser } = await this.sessionFactory();
    await browser.url(PARKS_ONTARIO_RESERVATIONS_URL);
    const title = await browser.getTitle();
    console.log(`Loaded: ${title}`);
    await browser.pause(3000);

    const form = new CampsiteSearchForm(browser);

    await browser.pause(3000);

    await form.selectCampsite(campsite);

    await form.setArrivalDate('5/31/2021');

    await browser.pause(10000);

    form.submit();

    await browser.pause(3000);

    await browser.deleteSession();
  }

}
