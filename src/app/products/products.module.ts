
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CaseComponent } from "./case/case.component";
import { CPUCoolerComponent } from "./cpu-cooler/cpu-cooler.component";
import { CPUComponent } from "./cpu/cpu.component";
import { MemoryComponent } from "./memory/memory.component";
import { MotherBoardComponent } from "./motherboard/motherboard.component";
import { PowersupplyComponent } from "./powersupply/powersupply.component";
import { ProductFilterComponent } from "./product-filter/product-filter.component";
// import { ProductListComponent } from "./products-list/products-list.component";
import { ProductsStartComponent } from "./products-start/products-start.component";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products.routing.module";
import { StorageComponent } from "./storage/storage.component";
import { VideocardComponent } from "./videocard/videocard.component";
import { CommonModule } from "@angular/common";


@NgModule({
    declarations:[
        ProductsComponent,
        ProductsStartComponent,
        CPUComponent,
        CPUCoolerComponent,
        MotherBoardComponent,
        MemoryComponent,
        StorageComponent,
        VideocardComponent,
        CaseComponent,
        PowersupplyComponent,
        ProductFilterComponent
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, ProductsRoutingModule, CommonModule, FormsModule]
})
export class ProductsModule{}
