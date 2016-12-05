import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../phrase-app/models/message';
import { PhraseAppService } from './phrase-app.service';
import { PhraseAppDataService } from './phrase-app-data.service';

import * as _ from 'lodash';

@Injectable()
export class PhraseAppSearchService {
    constructor(private phraseAppService: PhraseAppService,
        private phraseAppDataService: PhraseAppDataService) { }


    search(searchTerm: string): any {
        return this.phraseAppService
            .getMessages(false)
            .then((messages) => {
                return _.filter(messages, function (message) {
                    return message.key.match(new RegExp('(' + searchTerm + ')', 'i')) ||
                        (message.labels['master-english'] && message.labels['master-english'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-engineering'] && message.labels['en-engineering'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-DK'] && message.labels['en-DK'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-FI'] && message.labels['en-FI'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-NO'] && message.labels['en-NO'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-SE'] && message.labels['en-SE'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['fi-FI'] && message.labels['fi-FI'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['nb-NO'] && message.labels['nb-NO'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['sv-FI'] && message.labels['sv-FI'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['sv-SE'] && message.labels['sv-SE'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['da-dk'] && message.labels['da-dk'].message.match(new RegExp('(' + searchTerm + ')', 'i')));
                });
            });
    }


    searchKey(searchTerm: string): any {
        return this.phraseAppDataService
            .getMessages(false)
            .then((messages) => {
                return _.filter(messages, function (message) {
                    return message.key.match(new RegExp('(' + searchTerm + ')', 'i')) ||
                        (message.labels['master-english'] && message.labels['master-english'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-engineering'] && message.labels['en-engineering'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-DK'] && message.labels['en-DK'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-FI'] && message.labels['en-FI'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-NO'] && message.labels['en-NO'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['en-SE'] && message.labels['en-SE'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['fi-FI'] && message.labels['fi-FI'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['nb-NO'] && message.labels['nb-NO'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['sv-FI'] && message.labels['sv-FI'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['sv-SE'] && message.labels['sv-SE'].content.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['da-dk'] && message.labels['da-dk'].content.match(new RegExp('(' + searchTerm + ')', 'i')));
                });
            });
    }

}
