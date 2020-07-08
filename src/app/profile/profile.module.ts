import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ProfileRoutingModule } from './profile.routing';
import { ProfileComponent } from './profile.component'

@NgModule({
    imports: [NativeScriptCommonModule, ProfileRoutingModule],
    exports: [],
    declarations: [ProfileComponent],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})
export class ProfileModule { }
