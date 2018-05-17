import { AuthEffects } from './auth.effects';
import { LoginEffects } from './login.effects';
import { RouterEffects } from './router.effects';

export const effects: any[] = [RouterEffects, AuthEffects, LoginEffects];

export * from './auth.effects';
export * from './login.effects';
export * from './router.effects';
