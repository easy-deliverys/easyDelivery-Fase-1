import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { OrdersListComponent } from "./orders-list.component";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { OrderListRoutingModule } from './orders-list.routing';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
@NgModule({
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    imports: [
        OrderListRoutingModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
    ],
    exports: [],
    declarations: [OrdersListComponent],
    providers: [],
})
export class OrdesListModule { }
