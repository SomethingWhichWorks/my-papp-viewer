import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Message } from '../phrase-app/models/message';
import * as _ from 'lodash';

@Injectable()
export class PhraseAppService {
    private phraseAppUrl = 'https://phrase-app-viewer.herokuapp.com/api/phraseapp';  // URL to web api
    //private phraseAppUrl = '/api/phraseapp';  // URL to web api
    private phraseAppData: Message[] = [];

    constructor(private http: Http) {
        this.init();
    }

    private init() {
        this.getMessages(true).then((response) => {
            if (response.message) {
                setTimeout(() => {
                    this.getMessages(true);
                }, 10000);
            }
        });
    }



    getMessages(forceRefresh: boolean): Promise<any> {
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
                    .catch(error => {
                        console.error('An error occurred', error);
                        reject(error);
                    });
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
