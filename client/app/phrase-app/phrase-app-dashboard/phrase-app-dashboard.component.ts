import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { Message } from '../models/message';
import { PhraseAppService } from '../../services/phrase-app.service';


@Component({
  moduleId: module.id,
  selector: 'phrase-app-dashboard',
  templateUrl: 'phrase-app-dashboard.component.html',
  styleUrls: ['phrase-app-dashboard.component.css']
})

export class PhraseAppDashboardComponent implements OnInit {
   
  disableAll: boolean;
  lastLoadedTime: string;
  constructor(
    private router: Router,
    private phraseAppService: PhraseAppService) {
  }

  ngOnInit(): void {
    var currentDate = moment().format();
    this.lastLoadedTime = currentDate;
  }

  refreshKeys(): void {
    console.log('Refreshing keys ');
    this.disableAll = true;
    this.phraseAppService.getMessages(true).then(() => {
        var currentDate = moment().format();
        this.lastLoadedTime = currentDate;
        this.disableAll = false;
    }, () => {
       this.disableAll = false;
    });
  }

  getLastLoaded() {
    return moment(this.lastLoadedTime).calendar();
  }
}
