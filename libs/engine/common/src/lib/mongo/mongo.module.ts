import { Module } from '@nestjs/common';

import { MongoService } from './mongo.service';

@Module({
  controllers: [],
  providers: [
    MongoService,
  ],
  exports: [
    MongoService,
  ],
})
export class MongoModule {}
