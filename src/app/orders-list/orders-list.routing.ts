import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";
import { OrdersListComponent } from "./orders-list.component";

const routes: Routes = [
   { path: "", component: OrdersListComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class OrderListRoutingModule { }