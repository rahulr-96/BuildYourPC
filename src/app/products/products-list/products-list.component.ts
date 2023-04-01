import { Component } from "@angular/core";
import { routeAnimations } from "src/app/shared/shared.module";

@Component({
    selector:'app-products-list',
    templateUrl:'./products-list.component.html',
    animations: [routeAnimations]
})
export class ProductListComponent{

}
