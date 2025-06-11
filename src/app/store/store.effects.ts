import { AuthFailedEffect } from './effects/auth-failed.effect';
import { LoginEffects } from './effects/auth.effects';
import { CommonEffect } from './effects/common/common.effect';
import { GetPermissionsFailedEffect } from './effects/get-permissions-failed.effect';
import { PermissionEffects } from './effects/get-permissions.effect';
import { SetCompanyEffect } from './effects/set-company.effect';
import { HydratationEffects } from './hydratation/effects/hydratation.effects';

export const STORE_EFFECTS = [
  LoginEffects,
  AuthFailedEffect,
  SetCompanyEffect,
  PermissionEffects,
  HydratationEffects,
  GetPermissionsFailedEffect,
  CommonEffect,

];
