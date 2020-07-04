import { Injectable } from '@angular/core';
import * as firebase from "nativescript-plugin-firebase/app";
import { login } from '~/models/login.model';
import * as AppSettings from "tns-core-modules/application-settings";

@Injectable({ providedIn: 'root' })

export class LoginService {
    constructor() { }

    Authentication(userLogin: login, callback: Function) {
        firebase.auth().signInWithEmailAndPassword(userLogin.email, userLogin.password)
            .then(() => {
                callback(true)
            })
            .catch(() =>  callback(false));
    }
}