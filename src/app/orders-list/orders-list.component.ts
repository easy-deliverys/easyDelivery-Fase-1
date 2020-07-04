import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuService } from '../menu.service';
import { EventData } from 'tns-core-modules/ui/page';
import { ObservableArray } from "tns-core-modules";
import { Switch } from 'tns-core-modules/ui/switch';
import { listOrdersService } from '~/services/list-orders.service';
import { Orders } from '~/models/orders.model';

@Component({
	selector: 'orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit {

	active: boolean = false;
	listOrders = new ObservableArray<Orders>();
	constructor(
		private menuService: MenuService,
		private orderService: listOrdersService
	) {
		
	}

	async ngOnInit() {
		this.orderService.watchListOrders((Response: Orders[])=>{
			this.listOrders.splice(0, this.listOrders.length);
			this.listOrders.push(Response.filter(item => item.realizando === false));
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