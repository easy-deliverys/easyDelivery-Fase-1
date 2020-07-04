import { Injectable } from '@angular/core';

import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { CdetailsOrders } from '~/models/details-orders';

@Injectable({
    providedIn: 'root'
})
export class DetailsOrdesService {
    docRef: firestore.DocumentReference;
    constructor() {
        this.docRef = firebase.firestore().collection("valledupar - CO").doc("pedidos");
    }


    whatOrders(callback: Function) {
        this.docRef.onSnapshot((snap: firestore.DocumentSnapshot) => {
            callback(<CdetailsOrders[]>snap.data().data);
        }, error => callback(error))
    }

}