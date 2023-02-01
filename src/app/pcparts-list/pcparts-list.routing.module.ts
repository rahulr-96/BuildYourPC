import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PCPartsListComponent } from "./pcparts-list.component";

const routes: Routes = [
    {
        path: '', component: PCPartsListComponent    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PCPartsListRoutingModule{}