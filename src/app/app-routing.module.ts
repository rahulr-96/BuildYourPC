import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { PCPartsResolverService } from "./pcparts/pcparts-list/pcparts-list-resolver.service";

const appRoutes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'list', loadChildren:() => import('./pcparts/pcparts-list/pcparts-list.module').then(m => m.PCPartsListModule), resolve: [PCPartsResolverService]},
    { path: 'products', loadChildren:() => import('./products/products.module').then(m => m.ProductsModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
