import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { connect, Db, MongoClient } from 'mongodb';

const dbName = 'rezo';

@Injectable()
export class MongoService implements OnApplicationBootstrap {

  get mongoURL(): string {
    return process.env['MONGO_URL'] ?? `mongodb://localhost:27017/${dbName}`;
  }

  #client: MongoClient;
  get client(): MongoClient {
    return this.#client;
  }

  get db(): Db {
    if (!this.#client) {
      throw new Error('Must connect to mongo before getting access to DB');
    }
    return this.#client.db(dbName);
  }

  constructor() {
    //
  }

  async onApplicationBootstrap() {
    this.#client ??= await connect(this.mongoURL, { w: 1 });
    const db = this.client.db();
    const collections = await db.listCollections({}, { nameOnly: true }).toArray();
    const collectionNames = collections.map(c => c.name as string);
    if (!collectionNames.includes('system')) {
      await db.createCollection('system', {});
    }
  }

}
