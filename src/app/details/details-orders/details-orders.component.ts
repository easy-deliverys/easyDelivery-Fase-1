import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ObservableArray, Utils } from "tns-core-modules";
import { OrdersService } from '~/services/orders.service';
import { Orders } from '~/models/orders.model';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular';
import { stateOrders } from '~/app/types';
import { CourierService } from '~/services/courier.service';
import { firestore } from 'nativescript-plugin-firebase/firebase';
import { MenuService } from '~/app/menu.service';
import { LoginService } from '~/services/login.service';


@Component({
	selector: 'details-orders',
	templateUrl: './details-orders.component.html',
	styleUrls: ['./details-orders.component.css']
})

export class DetailsOrdersComponent implements OnInit {
	listOrders = new ObservableArray<Orders>();
	DetailsOrder: Orders;
	email:string = LoginService.codeUser;
	id: string = null;
	ref: string = null;
	Docid: string;
	constructor(private OrdersService: OrdersService,
		private activate: ActivatedRoute,
		private NgZone: NgZone,
		private routerExtension: RouterExtensions,
		private courier: CourierService,
		private menuService: MenuService) {}

	async ngOnInit() {
		this.id = this.activate.snapshot.paramMap.get('id');
		this.ref = this.activate.snapshot.paramMap.get('ref');
		this.Docid = this.id != null ? this.id : this.ref;
		this.Docid != null ?
		this.OrdersService.findOrder((this.Docid), (Response: Orders) => {
			this.NgZone.run(item => {
				this.DetailsOrder = Response;
			});
		}) : null;
	}

	back() {
		this.routerExtension.back();
	}

	OpenCall(phone: number) {
		Utils.openUrl('tel:' + phone);
	}

	OpenWhatsapp(phone: number) {
		Utils.openUrl('https://api.whatsapp.com/send?phone=57' + phone);
	}

	openMenu() {
		this.menuService.openSideDrawer.emit(true);
	}
	delivery(state: stateOrders) {
		switch (state) {
			case "received":
				this.courier.realizarEntrega(this.OrdersService.docRef.doc(this.Docid), state);		
			break;
			case "delivered":
				this.courier.paqueteRecibido(this.OrdersService.docRef.doc(this.Docid), state);		
			break;
			case "ready":
				CourierService.courier.realizados.find(item => item === this.Docid) == undefined  ? 
				CourierService.courier.realizados.push(this.Docid) : null;
				this.courier.paqueteEntregado(this.OrdersService.docRef.doc(this.Docid), state);		
			break;
		}
	}
}