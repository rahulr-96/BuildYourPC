import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CPUCoolerResolverService } from "./cpu-cooler/cpu-cooler-resolver.service";
import { CPUCoolerComponent } from "./cpu-cooler/cpu-cooler.component";
import { CPUResolverService } from "./cpu/cpu-resolver.service";
import { CPUComponent } from "./cpu/cpu.component";
import { ProductsStartComponent } from "./products-start/products-start.component";
import { ProductsComponent } from "./products.component";

const routes: Routes = [
    {
        path: '', component: ProductsComponent, children:[
            {path: '', component: ProductsStartComponent},
            {path: 'cpu', component: CPUComponent, resolve: [CPUResolverService]},
            {path: 'cpuCooler', component: CPUCoolerComponent, resolve: [CPUCoolerResolverService]}
        ]    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProductsRoutingModule{}