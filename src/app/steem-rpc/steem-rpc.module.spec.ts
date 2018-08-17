import { SteemRPCModule } from './steem-rpc.module';

fdescribe('SteemRPCModule', () => {
  let steemRpcModule: SteemRPCModule;

  beforeEach(() => {
    steemRpcModule = new SteemRPCModule();
  });

  it('should create an instance', () => {
    expect(steemRpcModule).toBeTruthy();
  });
});
