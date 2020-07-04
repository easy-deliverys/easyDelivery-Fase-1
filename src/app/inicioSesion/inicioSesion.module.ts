import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { InicioSesionComponent } from "./inicioSesion.component";
import { InicioSesionRoutingModule } from "./inicioSesion.routing";


@NgModule({
    bootstrap: [
        InicioSesionComponent
    ],
    imports: [
        NativeScriptCommonModule,
        InicioSesionRoutingModule
    ],
    declarations: [
        InicioSesionComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

export class InicioSesionModule { }