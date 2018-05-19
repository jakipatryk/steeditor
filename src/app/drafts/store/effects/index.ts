import { BroadcastEffects } from './broadcast.effects';
import { DraftsEffects } from './drafts.effects';

export const effects: any[] = [DraftsEffects, BroadcastEffects];

export * from './drafts.effects';
export * from './broadcast.effects';
