/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { OntarioParksService } from '@rezo-finder/engine/ontario-parks';

import { AppModule } from './app/app.module';

const log = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const service = app.get(OntarioParksService);

  const campsites = await service.getCampsites();
  const campsiteNames = campsites.filter(m => !!m.resourceLocationId).map(m => m.resourceLocationLocalizedValues['en-CA']);
  log.debug(campsites.map(c => ({ mapId: c.mapId, camp: c.resourceLocationLocalizedValues['en-CA'] })));

  const [ equipment ] = await service.getEquipment();
  const [ singleTent, twoTents, threeTents, trailerOrRvUpTo_18ft_5_5m, trailerOrRvUpTo_25ft_7_6m, trailerOrRvUpTo_32ft_9_7m, trailerOrRvOver_32ft_9_7m ] = equipment.subEquipmentCategories

  await service.checkAvailability({
    campsite: campsiteNames.find(c => c === 'Sandbanks Provincial Park'),
    equipment: _.groupBy(singleTent.localizedValues, 'cultureName')['en-US'],
  });

  // await app.listen(port, () => {
  //   Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  // });
}

bootstrap().catch(err => console.log(err));
