import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../phrase-app/models/message';
import { PhraseAppService } from './phrase-app.service';

import * as _ from 'lodash';

@Injectable()
export class PhraseAppSearchService {
    constructor(private phraseAppService: PhraseAppService) { }


    search(searchTerm: string): any {
        return this.phraseAppService
            .getMessages(false)
            .then((messages) => {
                return _.filter(messages, function (message) {
                    return message.key.match(new RegExp('(' + searchTerm + ')', 'i')) ||
                        (message.labels['en-engineering'] && message.labels['en-engineering'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['sv-SE'] && message.labels['sv-SE'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['da-dk'] && message.labels['da-dk'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['fi-FI'] && message.labels['fi-FI'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['sv-FI'] && message.labels['sv-FI'].message.match(new RegExp('(' + searchTerm + ')', 'i'))) ||
                        (message.labels['nb-NO'] && message.labels['nb-NO'].message.match(new RegExp('(' + searchTerm + ')', 'i')))
                });
            });
    }
}
