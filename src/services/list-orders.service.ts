import { Injectable } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { Orders } from '~/models/orders.model';

@Injectable({providedIn: 'root'})
export class listOrdersService {
    docRef: firestore.DocumentReference;
    constructor() {
        this.docRef = firebase.firestore().collection("valledupar - CO").doc("pedidos");
    }

    async watchListOrders(callback: Function) {
        this.docRef.onSnapshot({includeMetadataChanges: true},(snap: firestore.DocumentSnapshot) => {
            callback(<Orders[]>snap.data().data);
        }, error => callback(error));
    }
}