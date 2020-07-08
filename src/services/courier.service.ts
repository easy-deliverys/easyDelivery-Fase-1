import { Injectable } from '@angular/core';
import { firestore } from "nativescript-plugin-firebase/firebase";
import * as firebase from "nativescript-plugin-firebase/app";
import { LoginService } from './login.service';
import { Courier } from '~/models/courier.model';
import { stateOrders } from '~/app/types';
import * as geolocation from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import * as AppSettings from "tns-core-modules/application-settings";

@Injectable({
    providedIn: 'root'
})
export class CourierService {
    docRef: firestore.DocumentReference;
    public static Location: geolocation.Location
    public static courier: Courier;
    constructor() {
        this.docRef = firebase.firestore().collection("valledupar - CO/mensajeros/lista").doc(LoginService.codeUser);
    }

    async watchCurier(callback: Function) {
        this.docRef.onSnapshot({ includeMetadataChanges: true }, (snap: firestore.DocumentSnapshot) => {
            CourierService.courier = <Courier>snap.data()
            callback(CourierService.courier);
        }, error => callback(error));
    }

    async realizarEntrega(orden: firestore.DocumentReference, OrderState: stateOrders) {
        await this.actualLocation();
        firebase.firestore().batch()
            .update(this.docRef, { realizando: orden.id })
            .update(orden, { estado: OrderState, encargado: LoginService.codeUser, escogido: this.timeReport() })
            .commit()
            .then(() => console.log("Batch successfully committed"))
            .catch(error => console.log(`Batch error: ${error}`));
    }

    async paqueteRecibido(orden: firestore.DocumentReference, OrderState: stateOrders) {
        await this.actualLocation();
        firebase.firestore().batch()
            .update(orden, { estado: OrderState, recibido: this.timeReport() })
            .commit()
            .then(() => console.log("Batch successfully committed"))
            .catch(error => console.log(`Batch error: ${error}`));
    }

    async paqueteEntregado(orden: firestore.DocumentReference, OrderState: stateOrders) {
        await this.actualLocation();
        firebase.firestore().batch()
            .update(this.docRef, { realizando: "" , realizados: CourierService.courier.realizados})
            .update(orden, { estado: OrderState, entregado: this.timeReport() })
            .commit()
            .then(() => console.log("Batch successfully committed"))
            .catch(error => console.log(`Batch error: ${error}`));
    }

    private async actualLocation() {
        try {
            CourierService.Location = await geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.any, maximumAge: 5000, timeout: 20000 });   
        } catch (error) {
            alert("Parece que hay un problema con el GPS reinicia la opcion de ubicacion de tu telefono.");
        }
    }

    private timeReport() {
        return { 
            ubicacion: firebase.firestore().GeoPoint(CourierService.Location.latitude, CourierService.Location.longitude ), 
            hora: firestore.FieldValue.serverTimestamp() 
        };
    }

    public static get isDisponible() : boolean {
        let doc =  AppSettings.getBoolean("_disponible", false);
        return doc;
    }

    public static set isDisponible(active: boolean) {
        AppSettings.setBoolean("_disponible", active);
    }
}