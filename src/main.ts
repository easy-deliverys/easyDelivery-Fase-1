// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import * as firebase from "nativescript-plugin-firebase/app";
import { AppModule } from "./app/app.module";
import * as firebase2 from "nativescript-plugin-firebase";
import { LocalNotifications } from "nativescript-local-notifications";
import { Color } from "tns-core-modules";
import { Message } from "nativescript-plugin-firebase";
import { CourierService } from "./services/courier.service";

firebase2.subscribeToTopic("mensajero_valledupar");
firebase.initializeApp({
    onMessageReceivedCallback:(message: Message) => {
        CourierService.isDisponible && CourierService.courier.banned == false && CourierService.courier.realizando.length == 0 ?
        LocalNotifications.schedule([{
            title: message.title,
            body:  message.body,
            badge: 1,
            ongoing: true, // makes the notification ongoing (Android only)
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
          }]): null;
    },
    showNotifications: false,
    storageBucket: "gs://easy-deliverys.appspot.com",
    persist: false
});

// A traditional NativeScript application starts by initializing global objects,
// setting up global CSS rules, creating, and navigating to the main page.
// Angular applications need to take care of their own initialization:
// modules, components, directives, routes, DI providers.
// A NativeScript Angular app needs to make both paradigms work together,
// so we provide a wrapper platform object, platformNativeScriptDynamic,
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
