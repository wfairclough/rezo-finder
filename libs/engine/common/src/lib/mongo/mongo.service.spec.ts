import { MongoService } from './mongo.service';

describe('MongoService', () => {
  
  beforeEach(() => {
    //
  })

  it('should connect to client once', async () => {
    const mongoService = new MongoService();
    // mongoService.testFn = jest.fn();
    await mongoService.onApplicationBootstrap();
    // expect(mongoService.testFn).toHaveBeenCalledTimes(1);
    const collections = await mongoService.db.listCollections().toArray();
    expect(collections.find(c => c.name === 'system').name).toBe('system');
    const client1 = mongoService.client;
    // expect(mongoService.testFn).toHaveBeenCalledTimes(1);
    const client2 = mongoService.client;
    // expect(mongoService.testFn).toHaveBeenCalledTimes(1);
    expect(client1).toEqual(client2);
    expect(client1 == client2).toBeTruthy();
  });
  

});