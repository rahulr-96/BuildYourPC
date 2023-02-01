import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PCPartsService } from './pcparts-list/pcparts.service';
import { CPUCoolerService } from './products/cpu-cooler/cpu-cooler.service';
import { CPUService } from './products/cpu/cpu.service';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    CPUService,
    PCPartsService,
    CPUCoolerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class CoreModule {}
