import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import * as _ from 'lodash';

@Injectable()
export class LoginService {
    private apiEndpoint = 'https://phrase-app-viewer.herokuapp.com/api/login';  // URL to web api
    constructor(private http: Http) {
    }

    /** authenticateUser()
        Request: {'username':'','password':''}
        Response: {'username':'','status':''}  //OK Or NOT_OK
    */
    authenticateUser(userDetails: Object) {
        return this.http
            .post(this.apiEndpoint, userDetails)
            .map(res => res.json());
    }
}
