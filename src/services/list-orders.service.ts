import { Injectable } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { Orders } from '~/models/orders.model';

@Injectable({providedIn: 'root'})
export class listOrdersService {
    docRef: firestore.CollectionReference;
    constructor() {
        this.docRef = firebase.firestore().collection("valledupar - CO/pedidos/lista");
    }

    async watchListOrders(callback: Function) {
        this.docRef.onSnapshot({includeMetadataChanges: true},(snap: firestore.QuerySnapshot) => {
            let list: Orders[] = [];
            snap.forEach( item => {
                let data = <Orders>item.data();
                data.id = item.id;
                list.push(data);
            });
            callback(list);
        }, error => callback(error));
    }
}