import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsOrdersComponent } from './details-orders/details-orders.component';


const routes: Routes = [
    { path: '', component: DetailsOrdersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DetailsOrdersRoutingModule { }
