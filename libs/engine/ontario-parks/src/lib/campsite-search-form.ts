import { EngineBrowser } from '@rezo-finder/engine/common';
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
    private readonly browser: EngineBrowser,
  ) {}

  async getCampsites() {
    const selectParkEl = await this.selectPark
    await selectParkEl.waitForClickable();
    await selectParkEl.click();
    const options = await this.browser.$$('mat-option .mat-option-text');
    const campsites = [];
    for (const option of options) {
      await option.scrollIntoView();
      const text = await option.getText();
      campsites.push(text);
    }
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