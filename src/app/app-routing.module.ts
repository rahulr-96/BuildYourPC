import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'recipes', loadChildren:() => import('./recipes/recipes.module').then(m => m.RecipesModule) },
    { path: 'shopping-list', loadChildren:() => import('./shopping-list/shopping.module').then(m => m.ShoppingModule) },
    { path: 'auth', loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: 'list', loadChildren:() => import('./pcparts-list/pcparts-list.module').then(m => m.PCPartsListModule) },
    { path: 'products', loadChildren:() => import('./products/products.module').then(m => m.ProductsModule) }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule {

}