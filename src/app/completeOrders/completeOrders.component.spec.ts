import { TestBed, inject } from '@angular/core/testing';

import { CompleteOrdersComponent } from './completeOrders.component';

describe('a completeOrders component', () => {
	let component: CompleteOrdersComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				CompleteOrdersComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([CompleteOrdersComponent], (CompleteOrdersComponent) => {
		component = CompleteOrdersComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});