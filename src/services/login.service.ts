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
                LoginService.codeUser = userLogin.email;
                callback(true)
            })
            .catch(() => callback(false));
    }

    public static get codeUser() {
        return AppSettings.getString("_doc", "");
    }

    public static set codeUser(pass: string) {
        AppSettings.setString("_doc", pass);
    }
    
    public static closeSesion() {
        firebase.auth().signOut();
        AppSettings.clear();
        return "/signin";
    }
}