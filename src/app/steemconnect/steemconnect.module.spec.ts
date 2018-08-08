import { SteemconnectModule } from './steemconnect.module';

fdescribe('SteemconnectModule', () => {
  let steemconnectModule: SteemconnectModule;

  beforeEach(() => {
    steemconnectModule = new SteemconnectModule();
  });

  it('should create an instance', () => {
    expect(steemconnectModule).toBeTruthy();
  });
});
