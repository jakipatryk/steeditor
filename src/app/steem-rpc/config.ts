import { InjectionToken } from '@angular/core';

export interface SteemRPCConfig {
  node: string;
}

export const STEEM_RPC_CONFIG = new InjectionToken<SteemRPCConfig>(
  'steemRPCConfig'
);
