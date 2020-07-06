import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";
import { LoginService } from "~/services/login.service";

const routes: Routes = [
    { path: "", redirectTo: LoginService.codeUser.length === 0 ? "/signin" : "/ordersList", pathMatch: "full" },
    { path: "signin", loadChildren: () => import('./signin/signin.module').then(m => m.SignInModule) },
    { path: "ordersList", loadChildren: () => import('./orders-list/orders-list.module').then(m => m.OrdesListModule) },
    { path: "detailsorders/ref/:ref", loadChildren: () => import('./details/details-order.module').then(m => m.DetailOrdersModule) },
    { path: "detailsorders/:id", loadChildren: () => import('./details/details-order.module').then(m => m.DetailOrdersModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
