import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CaseResolverService } from "./case/case-resolver.service";
import { CaseComponent } from "./case/case.component";
import { CPUCoolerResolverService } from "./cpu-cooler/cpu-cooler-resolver.service";
import { CPUCoolerComponent } from "./cpu-cooler/cpu-cooler.component";
import { CPUResolverService } from "./cpu/cpu-resolver.service";
import { CPUComponent } from "./cpu/cpu.component";
import { MemoryResolverService } from "./memory/memory-resolver.service";
import { MemoryComponent } from "./memory/memory.component";
import { MotherBoardResolverService } from "./motherboard/motherboard-resolver.service";
import { MotherBoardComponent } from "./motherboard/motherboard.component";
import { PowersupplyResolverService } from "./powersupply/powersupply-resolver.service";
import { PowersupplyComponent } from "./powersupply/powersupply.component";
import { ProductsStartComponent } from "./products-start/products-start.component";
import { ProductsComponent } from "./products.component";
import { StorageResolverService } from "./storage/storage-resolver.service";
import { StorageComponent } from "./storage/storage.component";
import { VideocardResolverService } from "./videocard/videocard-resolver.service";
import { VideocardComponent } from "./videocard/videocard.component";

const routes: Routes = [
    {
        path: '', component: ProductsComponent, children:[
            {path: '', component: ProductsStartComponent},
            {path: 'cpu', component: CPUComponent, resolve: [CPUResolverService]},
            {path: 'cpuCooler', component: CPUCoolerComponent, resolve: [CPUCoolerResolverService]},
            {path: 'motherboard', component: MotherBoardComponent, resolve: [MotherBoardResolverService]},
            {path: 'memory', component: MemoryComponent, resolve: [MemoryResolverService]},
            {path: 'storage', component: StorageComponent, resolve: [StorageResolverService]},
            {path: 'videocard', component: VideocardComponent, resolve: [VideocardResolverService]},
            {path: 'case', component: CaseComponent, resolve: [CaseResolverService]},
            {path: 'powersupply', component: PowersupplyComponent, resolve: [PowersupplyResolverService]}
            
        ]    
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProductsRoutingModule{}