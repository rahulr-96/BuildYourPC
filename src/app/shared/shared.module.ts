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
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import{ThemeToggleComponent} from './theme-toggle/theme-toggle.component'
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  routeAnimations
} from './animations/route.animations';
import { AnimationsService } from './animations/animations.service';
import { ToastComponent } from "./toast/toast/toast.component";
import { ToasterComponent } from "./toast/toaster/toaster.component";
import { QRCodeModule } from 'angularx-qrcode';
import { ProductListComponent } from "../products/products-list/products-list.component";
export {
  routeAnimations,
  ROUTE_ANIMATIONS_ELEMENTS,
  AnimationsService
};
import { RouterModule } from '@angular/router';
import { RangeSliderComponent } from "./range-slider/range-slider.component";
import { ProductSearchComponent } from "../products/product-search/product-search.component";

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
        ProductListComponent,
        RangeSliderComponent,
        ProductSearchComponent
    ],
    imports:[
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        FormsModule,
        QRCodeModule,
        RouterModule
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
        ProductListComponent,
        RouterModule,
        RangeSliderComponent,
        ProductSearchComponent
    ],
})
export class SharedModule{}
