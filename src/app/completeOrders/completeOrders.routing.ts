import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";
import { CompleteOrdersComponent } from "./completeOrders.component";

const routes: Routes = [
   { path: "", component: CompleteOrdersComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class completeOrderListRoutingModule { }