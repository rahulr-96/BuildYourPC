import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PCPartsService } from './pcparts/pcparts.service';
import { CPUCoolerService } from './products/cpu-cooler/cpu-cooler.service';
import { MotherBoardService } from './products/motherboard/motherboard.service';
import { CPUService } from './products/cpu/cpu.service';
import { MemoryService } from './products/memory/memory.service';
import { StorageService } from './products/storage/storage.service';
import { VideocardService } from './products/videocard/videocard.service';
import { CaseService } from './products/case/case.service';
import { PowersupplyService } from './products/powersupply/powersupply.service';
import { RouteReuseStrategy } from '@angular/router';
import { HttpRequestInterceptor } from './shared/loading-spinner/loading-spinner-interceptor.service';

@NgModule({
  providers: [
    CPUService,
    PCPartsService,
    CPUCoolerService,
    MotherBoardService,
    MemoryService,
    StorageService,
    VideocardService,
    CaseService,
    PowersupplyService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    }
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: CustomRouteReuseStrategy,
    // }
  ],
})
export class CoreModule {}
