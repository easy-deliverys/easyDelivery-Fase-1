import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SignInRoutingModule } from './signin.routing'
import { SignInComponent } from './signin.component';
import { ActionBar } from '../actionBar/actionBar.component'

@NgModule({
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    imports: [
        NativeScriptCommonModule,
        SignInRoutingModule
    ],
    exports: [],
    declarations: [SignInComponent, ActionBar],
    providers: [],
})
export class SignInModule { }
