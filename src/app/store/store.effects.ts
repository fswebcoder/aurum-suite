import { AuthFailedEffect } from './effects/auth-failed.effect';
import { LoginEffects } from './effects/auth.effects';
import { SetCompanyEffect } from './effects/set-company.effect';
import { HydratationEffects } from './hydratation/effects/hydratation.effects';

export const STORE_EFFECTS = [LoginEffects, AuthFailedEffect, SetCompanyEffect, HydratationEffects];
