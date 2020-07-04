import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DetailsOrdersRoutingModule } from './details-orders.routing';
import { DetailsOrdersComponent } from './details-orders/details-orders.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common'

@NgModule({
    declarations: [DetailsOrdersComponent],
    imports: [NativeScriptCommonModule, DetailsOrdersRoutingModule],
    exports: [],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DetailOrdersModule {

}