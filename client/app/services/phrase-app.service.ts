import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Message } from '../phrase-app/models/message';
import * as _ from 'lodash';

@Injectable()
export class PhraseAppService {
    private phraseAppUrl = '/api/phraseapp/data.json';  // URL to web api
    private phraseAppData: Message[] = [];

    constructor(private http: Http) {
        this.init();
    }

    private init() {
        this.http
            .get(this.phraseAppUrl)
            .toPromise()
            .then(response => {
                this.phraseAppData = response.json();
            })
            .catch(this.handleError);
    }

    getMessages(forceRefresh:boolean): Promise<Message[]> {
        return new Promise((resolve, reject) => {
            if (this.phraseAppData.length !== 0 && forceRefresh == false) {
                resolve(this.phraseAppData);
            } else {
                this.http
                    .get(this.phraseAppUrl)
                    .toPromise()
                    .then(response => {
                        this.phraseAppData = response.json();
                        resolve(this.phraseAppData);
                    })
                    .catch(this.handleError);
            }
        });
    }

    getMessageDetails(messageKey: string): Promise<Message> {

        return new Promise((resolve, reject) => {
            resolve(_.find(this.phraseAppData, (message: Message) => {
                return message.key === messageKey;
            }));
        });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
