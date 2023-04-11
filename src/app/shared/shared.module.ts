import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import {NgxPaginationModule} from 'ngx-pagination';
import { CurrencyConverterPipe } from "./currency-converter/currency-converter.pipe";
import { DataTableWrapperComponent } from "./data-table/data-table-wrapper.component";
import { DataTableFilter } from "./data-table/data-table-filter.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import{ThemeToggleComponent} from './theme-toggle/theme-toggle.component'
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { ToastComponent } from "./toast/toast/toast.component";
import { ToasterComponent } from "./toast/toaster/toaster.component";
import { QRCodeModule } from 'angularx-qrcode';
export {
  routeAnimations,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService
};

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CurrencyConverterPipe,
        DataTableWrapperComponent,
        DataTableFilter,
        ThemeToggleComponent,
        ToastComponent,
        ToasterComponent,
    ],
    imports:[
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        QRCodeModule
    ],
    exports:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CurrencyConverterPipe,
        CommonModule,
        NgxPaginationModule,
        DataTableWrapperComponent,
        DataTableFilter,
        ThemeToggleComponent,
        ToastComponent,
        ToasterComponent,
        QRCodeModule,
    ],
})
export class SharedModule{}
