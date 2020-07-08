import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MenuService } from "./menu.service";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { LoginService } from "~/services/login.service";
import { RouterExtensions } from "nativescript-angular";
import { NavigationTransition, Transition } from "tns-core-modules/ui"
import { menuOptions } from "./types";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {

    menuOption: menuOptions = "ordersList";
    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    constructor(
        private _changeDetectionRef: ChangeDetectorRef,
        private menuService: MenuService,
        private route: RouterExtensions
    ) { }

    ngOnInit() {
        this.menuService.openSideDrawer.subscribe(Response => Response ? this.openDrawer() : this.onCloseDrawerTap());
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    navigateTo(option: menuOptions) {
        this.menuOption = option;
        this.route.navigate(["/" +option], { clearHistory: true });
        this.menuService.openSideDrawer.emit(false);
    }

    closeSesion() {
        LoginService.closeSesion()
        this.route.navigate(["/signin"], { clearHistory: true });
        this.menuService.openSideDrawer.emit(false);
        this.menuOption = "ordersList";
    }
}
