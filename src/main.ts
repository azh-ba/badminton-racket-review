import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { ErrorHandler } from '@angular/core';
import { CustomErrorHandler } from './app/services/custom-error-handler.service';

platformBrowserDynamic().bootstrapModule(AppModule,  {
  providers: [
    {
      provide: ErrorHandler,
      useClass: CustomErrorHandler
    },
  ]
})
  .catch(err => console.error(err));
