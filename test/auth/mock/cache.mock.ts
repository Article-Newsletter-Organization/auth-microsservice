import { Cache } from '@nestjs/cache-manager';
import { WrapTTL, Store } from 'cache-manager';

export namespace CacheManagerMock {
  export class MockClass implements Partial<Cache> {
    set =
      jest.fn();
    get = jest
      .fn()
      .mockReturnValue('Value Cached');
    del = jest.fn();
    reset = jest.fn();
    wrap= jest.fn();
    store: Store;
  }
}
