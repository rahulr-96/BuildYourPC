import { Component } from "@angular/core";
import {routeAnimations} from "../shared/shared.module";
@Component({
    selector:'app-products',
    templateUrl:'./products.component.html',
    animations: [routeAnimations]
})
export class ProductsComponent{

}
