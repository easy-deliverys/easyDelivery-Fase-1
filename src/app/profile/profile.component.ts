import { Component, OnInit, NgZone } from '@angular/core';
import { MenuService } from '../menu.service';
import { CourierService } from '~/services/courier.service';
import { Courier } from '~/models/courier.model';
import { EventData, Switch } from 'tns-core-modules';

@Component({
	selector: 'profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
	Courier = new Courier();
	active: boolean = false;

	constructor(
		private ngZone: NgZone,
		private menuService: MenuService,
		private courierService: CourierService) {
	}

	ngOnInit() {
		this.active = CourierService.isDisponible;
		this.courierService.watchCurier((Element: Courier) => {
			this.ngZone.run(() => {
				this.Courier = Element;
			});
		});
	}

	openMenu() {
		this.menuService.openSideDrawer.emit(true);
	}

	toggle(args: EventData) {
		let sw = args.object as Switch;
		this.ngZone.run(item => {
			CourierService.isDisponible = sw.checked; // boolean
			this.active = CourierService.isDisponible;
		});
	}
}
