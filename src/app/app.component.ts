import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MenuService } from "./menu.service";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    templateUrl: "./app.component.html",
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit{ 

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    constructor (
        private _changeDetectionRef: ChangeDetectorRef,
        private menuService: MenuService
    ){}

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
}
