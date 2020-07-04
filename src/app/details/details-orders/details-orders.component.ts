import { Component, OnInit, NgZone } from '@angular/core';
import { CdetailsOrders } from '~/models/details-orders';
import { ObservableArray, Utils } from "tns-core-modules";
import { DetailsOrdesService } from '~/services/details-orders.service';
import { OrdersService } from '~/services/orders.service';
import { Orders } from '~/models/orders.model';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'details-orders',
	templateUrl: './details-orders.component.html',
	styleUrls: ['./details-orders.component.css']
})

export class DetailsOrdersComponent implements OnInit {
	listOrders = new ObservableArray<Orders>();
	DetailsOrder: Orders;
	Docid: string;
	Docref: string;
	constructor(private OrdersService: OrdersService,
		private activate: ActivatedRoute,
		private NgZone: NgZone) {

	}

	async ngOnInit() {
		this.Docid = this.activate.snapshot.paramMap.get('id');
		this.Docref = this.activate.snapshot.paramMap.get('ref');
		this.Docid != null ?
			this.OrdersService.findOrder((this.Docid), (Response: Orders) => {
				this.NgZone.run(item => {
					this.DetailsOrder = Response;
				});
			}) : this.Docref != null ?
				this.OrdersService.findOrder((this.Docref), (Response: Orders) => {
					this.NgZone.run(item => {
						this.DetailsOrder = Response;
					});
				}) :
				null;
	}

	OpenCall(phone: number) {
		Utils.openUrl('tel:' + phone);
	}

	OpenWhatsapp(phone: number) {
		Utils.openUrl('https://api.whatsapp.com/send?phone=57' + phone);
	}
	odad() {

	}
}