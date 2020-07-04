import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";

const routes: Routes = [
    { path: "", redirectTo: "/detailsorders", pathMatch: "full" },
    { path: "detailsorders/ref/:ref", loadChildren: () => import('./details/details-order.module').then(m => m.DetailOrdersModule) },
    { path: "detailsorders/:id", loadChildren: () => import('./details/details-order.module').then(m => m.DetailOrdersModule) }

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
