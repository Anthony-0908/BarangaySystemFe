import { InjectionToken } from "@angular/core";
import { environment } from "../environment/environment";



export interface AppConfig { 
  apiUrl:string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config', {
  providedIn: 'root',
  factory: () => ({
    apiUrl: environment.backendURL
  })
});