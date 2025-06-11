import { authProvider } from "./auth/auth.provider";
import { commonProvider } from "./common/common.provider";

export const ALL_REPOSITORIES = [authProvider(), commonProvider()];
