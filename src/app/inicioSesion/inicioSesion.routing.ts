import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { InicioSesionComponent } from "./inicioSesion.component";

const routes: Routes = [
    { path: "", component: InicioSesionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class InicioSesionRoutingModule { }
