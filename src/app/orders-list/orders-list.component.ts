import { Component, OnInit, NgZone } from '@angular/core';
import { MenuService } from '../menu.service';
import { EventData } from 'tns-core-modules/ui/page';
import { ObservableArray, Observable } from "tns-core-modules";
import { Switch } from 'tns-core-modules/ui/switch';
import { OrdersService } from '~/services/orders.service';
import { Orders } from '~/models/orders.model';


@Component({
	selector: 'orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit {

	active: boolean = false;
	countNuevos: number = 0;
	listOrders = new ObservableArray<Orders>();
	constructor(
		private menuService: MenuService,
		private orderService: OrdersService,
		private NgZone: NgZone
	) {
	}

	async ngOnInit() {
		this.orderService.watchListOrders((Response: Orders[])=>{
			this.listOrders.splice(0, this.listOrders.length);
			this.listOrders.push(Response.filter(item => item.realizando === false));
			this.NgZone.run(item => {
				this.countNuevos = this.listOrders.length;
			});
		});
	}


	openMenu() {
		this.menuService.openSideDrawer.emit(true);
	}

	toggle(args: EventData) {
		let sw = args.object as Switch;
		this.active = sw.checked; // boolean
	}
}