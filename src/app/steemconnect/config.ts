import { InjectionToken } from '@angular/core';

export type Scope =
  | 'login'
  | 'vote'
  | 'comment'
  | 'comment_options'
  | 'custom_json'
  | 'delete_comment'
  | 'claim_reward_balance';

export interface SteemconnectConfig {
  clientId: string;
  scope: Array<Scope>;
  state?: string;
}

export const STEEMCONNECT_CONFIG = new InjectionToken<SteemconnectConfig>(
  'steemconnectConfig'
);
