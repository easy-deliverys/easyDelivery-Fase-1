import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { CompleteOrdersComponent } from "./completeOrders.component";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { completeOrderListRoutingModule } from './completeOrders.routing';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
@NgModule({
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    imports: [
        completeOrderListRoutingModule,
        NativeScriptFormsModule,
        NativeScriptCommonModule,
        NativeScriptUIListViewModule,
    ],
    exports: [],
    declarations: [CompleteOrdersComponent],
    providers: [],
})
export class completeOrdesListModule { }