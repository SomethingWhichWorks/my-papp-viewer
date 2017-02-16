import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { Message } from '../models/message';
import { PhraseAppService } from '../../services/phrase-app.service';
import { ProgressBarService } from '../../progress-bar/progress-bar.service';


@Component({
    moduleId: module.id,
    selector: 'phrase-app-dashboard',
    templateUrl: 'phrase-app-dashboard.component.html',
    styleUrls: ['phrase-app-dashboard.component.css']
})

export class PhraseAppDashboardComponent implements OnInit {
    disableAll: boolean;
    lastLoadedTime: string;
    message: string;

    constructor(private router: Router,
        private phraseAppService: PhraseAppService,
        private progessBarService: ProgressBarService) {
    }

    ngOnInit(): void {
        var currentDate = moment().format();
        this.lastLoadedTime = currentDate;
        this.progessBarService.showDialog('We are preparing for fluent searching experience ....');
        this.phraseAppService.getMessages(true).then((response) => {
            if (response.message) {
                this.message = response.message;
            } else {
                this.message = undefined;
            }
            this.progessBarService.hideDialog();
            this.startMessageRemovalTimer();
        }, (err) => {
            this.progessBarService.hideDialog();
            this.message = "Unable to refresh labels at this time, please try again later";
            this.startMessageRemovalTimer();
        });
    }

    // To be used phrase-app-search
    refreshPhraseAppData(): void {
        this.progessBarService.showDialog('Please wait until we download keys from phrase app....');
        this.disableAll = true;
        this.phraseAppService.getMessages(true).then((response) => {
            var currentDate = moment().format();

            if (response.message) {
                this.message = response.message;
            } else {
                this.message = undefined;
            }

            this.lastLoadedTime = currentDate;
            this.disableAll = false;
            this.progessBarService.hideDialog();
            this.startMessageRemovalTimer();
        }, () => {
            this.disableAll = false;
            this.progessBarService.hideDialog();
            this.message = "Unable to refresh labels at this time, please try again later";
            this.startMessageRemovalTimer();
           
        });
    }

    getLastLoaded() {
        return moment(this.lastLoadedTime).calendar();
    }

    startMessageRemovalTimer() {
         setTimeout(() => {
            this.message = undefined;
        }, 5000);
    }

    
}
