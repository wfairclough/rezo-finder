import { Browser, Element } from 'webdriverio';

export class CampsiteSearchForm {
  get selectPark(): Promise<Element<any>> {
    return this.browser.$('mat-select[formcontrolname="park"]');
  }

  get selectEquipment(): Promise<Element<any>> {
    return this.browser.$('mat-select[formcontrolname="equipment"]');
  }

  get inputArrivalDate(): Promise<Element<any>> {
    return this.browser.$(`input[formcontrolname="arrivalDate"]`);
  }

  get inputDepartureDate(): Promise<Element<any>> {
    return this.browser.$(`input[formcontrolname="departureDate"]`);
  }

  get inputNights(): Promise<Element<any>> {
    return this.browser.$(`input[formcontrolname="numberOfNights"]`);
  }

  get inputPartySize(): Promise<Element<any>> {
    return this.browser.$(`input[formcontrolname="partySize"]`);
  }

  get buttonSubmit(): Promise<Element<any>> {
    return this.browser.$('app-button*=Search')
  }

  constructor(
    private readonly browser: Browser<'async'>,
  ) {}

  async getCampsites() {
    await (await this.selectPark).click();
    const options = await this.browser.$$('mat-option .mat-option-text');
    const campsites = await Promise.all(options.map(opt => opt.getText()));
    await this.browser.keys('Escape');
    return campsites;
  }

  async selectCampsite(campsite: string) {
    await (await this.selectPark).click();
    try {
      const site = await this.browser.$(`mat-option*=${campsite}`);
      if (site) {
        await site.scrollIntoView();
        await site.click();
        return site;
      }
    } catch (err) {
      console.log(`NOT FOUND`);
    }
    await this.browser.keys('Escape');
    return null;
  }

  async setArrivalDate(date: string) {
    (await this.inputArrivalDate).addValue(date);
  }

  async submit() {
    await (await this.buttonSubmit).click();
  }

}