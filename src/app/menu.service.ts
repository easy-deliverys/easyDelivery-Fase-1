import { Injectable, EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})

export class MenuService {
    openSideDrawer = new EventEmitter<Boolean>();
    constructor() { }    
}