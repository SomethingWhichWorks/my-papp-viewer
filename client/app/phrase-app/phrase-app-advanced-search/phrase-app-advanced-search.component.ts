import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import * as moment from 'moment';

import { PhraseAppSearchService } from '../../services/phrase-app-search.service';
import { PhraseAppDataService } from '../../services/phrase-app-data.service';
import { Message } from '../models/message';


@Component({
  moduleId: module.id,
  selector: 'phrase-app-advanced-search',
  templateUrl: 'phrase-app-advanced-search.component.html',  
  styleUrls: ['phrase-app-advanced-search.component.css'],
  providers: [PhraseAppSearchService]  
})
export class PhraseAppAdvancedSearchComponent implements OnInit {
  messages: Observable<Message[]>;
  private searchTerms = new Subject<string>();
  private selectedLabel: any;

  constructor(
    private PhraseAppDataService: PhraseAppDataService,
    private phraseAppSearchService: PhraseAppSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.messages = this.searchTerms
      .debounceTime(500)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.phraseAppSearchService.searchKey(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Message[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Message[]>([]);
      });
  }

  gotoDetail(message: Message): void {
    let link = ['/messageDetails', message.key];
    this.router.navigate(link);
  }

  setSelectedLabel(id: any): void {
    this.PhraseAppDataService.getLabelDetails(id).then(labelData => {
        this.selectedLabel = labelData;
    }, err => {
        this.selectedLabel = {};
    });
  }

  clearSelectedLabel(): void {
    this.selectedLabel = undefined;
  }

  getKeys(object:Object): any[] {
     return Object.keys(object);
  } 

  showMessageDetails(id): void {
    console.log('Show metadata for key Details');
    this.setSelectedLabel(id);
    $('#message-details-modal').modal('show');
  }

   toMomentCalendarText(dateText) {
    return moment(dateText).calendar();
  }
}
