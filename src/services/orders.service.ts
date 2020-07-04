import { Injectable } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { Orders } from '~/models/orders.model';
import { ThrowStmt } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    docRef: firestore.CollectionReference;
    public static list: Orders[] = [];
    constructor() {
        this.docRef = firebase.firestore().collection("valledupar - CO/pedidos/lista");
    }

    async watchListOrders(callback: Function) {
        this.docRef.onSnapshot({ includeMetadataChanges: true }, (snap: firestore.QuerySnapshot) => {
            OrdersService.list = [];
            snap.forEach(item => {
                let data = <Orders>item.data();
                data.id = item.id;
                OrdersService.list.push(data);
            });
            callback(OrdersService.list);
        }, error => callback(error));
    }

    async findOrder(id: string, callback: Function) {
        this.docRef.doc(id).onSnapshot({ includeMetadataChanges: true }, (snap: firestore.DocumentSnapshot) => {
            callback(<Orders>snap.data())
        }, error => callback(error));
    }
}