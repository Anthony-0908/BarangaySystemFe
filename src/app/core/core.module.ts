// src/app/core/core.module.ts
import { NgModule, Optional, SkipSelf } from '@angular/core';

@NgModule({
  providers: [
    // singleton services here
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it only in AppModule.');
    }
  }
}
