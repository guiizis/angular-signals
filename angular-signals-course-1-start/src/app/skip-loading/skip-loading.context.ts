import { HttpContextToken } from "@angular/common/http";

export const SkipLoadingContext = new HttpContextToken(() => false);
