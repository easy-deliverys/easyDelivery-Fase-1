import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { login } from '~/models/login.model';
import { LoginService } from '~/services/login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})

export class SignInComponent implements OnInit {

	@ViewChild('email', { static: true }) email: ElementRef;
	@ViewChild('password', { static: true }) password: ElementRef;
	constructor(
		private auth: LoginService, 
		page: Page,
		private route: Router) {
		page.actionBarHidden = true;
	}

	ngOnInit() { }

	comenzar() {
		let user: login = { email: this.email.nativeElement.text, password: this.password.nativeElement.text }
		this.auth.Authentication(user,(response: boolean) => {
			response ? this.route.navigateByUrl("ordersList") : alert("revise los campos o comuniquese con el administrador");
		});
	}
}