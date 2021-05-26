import { Module } from '@nestjs/common';
import got, { Got } from 'got';

const client = got.extend({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});


export type HttpClient = Got;
export const HTTP_CLIENT = Symbol.for('HTTP_CLIENT');

const GotProvider = {
  provide: HTTP_CLIENT,
  useFactory: () => client,
};

@Module({
  controllers: [],
  providers: [
    GotProvider,
  ],
  exports: [
    GotProvider,
  ],
})
export class GotModule {}
