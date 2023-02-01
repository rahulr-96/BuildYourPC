
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CPUCoolerComponent } from "./cpu-cooler/cpu-cooler.component";
import { CPUComponent } from "./cpu/cpu.component";
import { ProductListComponent } from "./products-list/products-list.component";
import { ProductsStartComponent } from "./products-start/products-start.component";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products.routing.module";


@NgModule({
    declarations:[
        ProductsComponent,
        ProductListComponent,
        ProductsStartComponent,
        CPUComponent,
        CPUCoolerComponent
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, ProductsRoutingModule]
})
export class ProductsModule{}