import { Injectable } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { Orders } from '~/models/orders.model';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class OrdersService {
    docRef: firestore.CollectionReference;
    public static myOrderlist: Orders[] = [];
    public static list: Orders[] = [];
    constructor() {
        this.docRef = firebase.firestore().collection("valledupar - CO/pedidos/lista");
    }

    async watchListOrders(callback: Function) {
        this.docRef.where("estado", "==", "new").onSnapshot({ includeMetadataChanges: true }, (snap: firestore.QuerySnapshot) => {
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

    async myOrdersComplete(callback: Function) {
        try {
            let data = await this.docRef.where("estado", "==", "ready").where("encargado", "==", LoginService.codeUser).get({ source: "default" });
            OrdersService.myOrderlist = [];
            data.forEach(item => {
                let data = <Orders>item.data();
                data.id = item.id;
                OrdersService.myOrderlist.push(data);
            });
            callback(OrdersService.myOrderlist)
        } catch (error) {
            callback(error);
        }
    }
}