import { Component, OnInit, NgZone } from '@angular/core';
import { MenuService } from '../menu.service';
import { EventData } from 'tns-core-modules/ui/page';
import { ObservableArray } from "tns-core-modules";
import { Switch } from 'tns-core-modules/ui/switch';
import { OrdersService } from '~/services/orders.service';
import { Orders } from '~/models/orders.model';
import { Router, NavigationEnd } from '@angular/router';
import { CourierService } from '~/services/courier.service';
import { Courier } from '~/models/courier.model';


@Component({
	selector: 'orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.css']
})

export class OrdersListComponent implements OnInit {

	active: boolean = false;
	countNuevos: number = 0;
	listOrders = new ObservableArray<Orders>();
	courier = new Courier();
	realizando: Orders;
	constructor(
		private menuService: MenuService,
		private orderService: OrdersService,
		private courierService: CourierService,
		private NgZone: NgZone,
		private route: Router
	) {	}

	async ngOnInit() {
		this.active = CourierService.isDisponible;
		this.courierService.watchCurier((curier: Courier) => {
			this.NgZone.run(item => {
				this.courier = curier;
			});
		});
		this.route.events.subscribe(event => {
			!this.courier.banned ? this.updateBack(event) : null;
		});
		this.loadData();
	}

	loadData() {
		this.orderService.watchListOrders((Response: Orders[])=>{
			!this.courier.banned ?
			this.NgZone.run(item => {
				this.listOrders.splice(0, this.listOrders.length);
				this.listOrders.push(Response);
				this.countNuevos = this.listOrders.length;
			}): null;
		});
	}

	openMenu() {
		this.menuService.openSideDrawer.emit(true);
	}

	toggle(args: EventData) {
		let sw = args.object as Switch;
		this.NgZone.run(item => {
			CourierService.isDisponible = sw.checked; // boolean
			this.active = CourierService.isDisponible;
		});
	}

	detailOrder(index: string) {
		this.active == false || this.courier.realizando.length > 0 ? 
		alert('Mientras estes ocupado o estes realizando un pedido, no podras ver más pedidos'):
		this.route.navigate(['/detailsorders', index ]);
	}

	private updateBack(event: any) {
		if (event instanceof NavigationEnd) { 
			this.listOrders = new ObservableArray<Orders>();
			this.listOrders.push(OrdersService.list);
		}
	}
}