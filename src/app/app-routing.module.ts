import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular";

const routes: Routes = [
   { path: "", redirectTo: "/signin", pathMatch: "full" },
   { path: "signin", loadChildren: () => import('./signin/signin.module').then(m => m.SignInModule)}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
