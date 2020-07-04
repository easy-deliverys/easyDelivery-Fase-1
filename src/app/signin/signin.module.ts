import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SignInRoutingModule } from './signin.routing'
import { SignInComponent } from './signin.component';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@NgModule({
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    imports: [
        NativeScriptCommonModule,
        SignInRoutingModule,
        NativeScriptFormsModule
    ],
    exports: [],
    declarations: [SignInComponent],
    providers: [],
})
export class SignInModule { }
