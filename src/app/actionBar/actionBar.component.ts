import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'actionBar',
	templateUrl: './actionBar.component.html',
	styleUrls: ['./actionBar.component.css']
})

export class ActionBar implements OnInit {

	active: boolean = true;
	constructor() { }

	ngOnInit() { }
}