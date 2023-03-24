
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { PCPartsListComponent } from "./pcparts-list.component";
import { PCPartsListRoutingModule } from "./pcparts-list.routing.module";

@NgModule({
    declarations:[
        PCPartsListComponent,
    ],
    imports: [RouterModule, SharedModule, FormsModule, PCPartsListRoutingModule]
})
export class PCPartsListModule{}
