import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html'
})

export class AddEventComponent implements OnInit {

    tab: string = 'addevent';
    constructor(private router: Router) {

    }

    ngOnInit() {
        switch(this.router.url) {
            case '/add-event':
                this.tab = 'addevent';
                break;
            case '/add-meetup':
                this.tab = 'addmeetup';
                break;
            default:
                this.tab = 'addevent';
        }
    }
    displayTab(value) {
        this.tab = value;
    }
}