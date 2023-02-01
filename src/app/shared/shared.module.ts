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

@NgModule({
    declarations:[
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CurrencyConverterPipe,
        DataTableWrapperComponent,
        DataTableFilter,
    ],
    imports:[
        CommonModule,
        NgxPaginationModule,
        ReactiveFormsModule 
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
        DataTableFilter
    ],
})
export class SharedModule{}