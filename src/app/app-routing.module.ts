import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";

const routes: Routes = [
    { path: "", redirectTo: "/ordersList", pathMatch: "full" },
    { path: "signin", loadChildren: () => import('./signin/signin.module').then(m => m.SignInModule) },
    { path: "ordersList", loadChildren: () => import('./orders-list/orders-list.module').then(m => m.OrdesListModule) }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
