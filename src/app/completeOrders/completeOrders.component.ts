import { Component, OnInit, NgZone } from '@angular/core';
import { ObservableArray, EventData, Switch } from 'tns-core-modules';
import { Orders } from '~/models/orders.model';
import { OrdersService } from '~/services/orders.service';
import { CourierService } from '~/services/courier.service';
import { MenuService } from '../menu.service';

@Component({
	moduleId: module.id,
	selector: 'completeOrders',
	templateUrl: './completeOrders.component.html',
	styleUrls: ['./completeOrders.component.css']
})

export class CompleteOrdersComponent implements OnInit {

	active: boolean = false;
	listOrders = new ObservableArray<Orders>();
	countCompletes: number = 0;
	constructor(
		private menuService: MenuService,
		private orderService: OrdersService,
		private ngZone: NgZone
	) { }

	async ngOnInit() {
		this.active = CourierService.isDisponible;
		this.orderService.myOrdersComplete((list: Orders[]) => {
			this.ngZone.run(item => {
				this.listOrders = new ObservableArray<Orders>();
				this.listOrders.push(list);
				this.countCompletes = this.listOrders.length;
			});
		});
	}

	toggle(args: EventData) {
		let sw = args.object as Switch;
		this.ngZone.run(item => {
			CourierService.isDisponible = sw.checked; // boolean
			this.active = CourierService.isDisponible;
		});
	}

	openMenu() {
		this.menuService.openSideDrawer.emit(true);
	}
}