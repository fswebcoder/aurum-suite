import { AuthFailedEffect } from "./effects/auth-failed.effect";
import { LoginEffects } from "./effects/auth.effects";
import { HydratationEffects } from "./hydratation/effects/hydratation.effects";

export const STORE_EFFECTS = [
    LoginEffects,
    AuthFailedEffect,
    HydratationEffects
];
