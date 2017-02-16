// app/auth.service.ts

import {Injectable} from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {Router} from '@angular/router';


// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    // Configure Auth0
    lock = new Auth0Lock('HrvKG65gBQEQVHJBsvA5jDr6JN69VazF', 'maheshk172.eu.auth0.com',
        {
            auth: {
                //redirectUrl: 'http://localhost:8080/#/phrase-app-dashboard',
                redirect: false,
                sso: false
            },
            closable: false
        });

    constructor(private router: Router) {
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', authResult => {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if (error) {
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.router.navigate(['phrase-app-dashboard']);
                this.lock.hide();
            });
        });

        this.lock.on('authorization_error', error => {
            console.log('Error thrown while authorizing: ', error);
        });

        this.lock.on('hash_parsed', resp => {
            console.log('Response is : ', resp);
        });

        this.lock.on('unrecoverable_error', authenticationResult => {
            console.log('unrecoverable Error with result: ', authenticationResult);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
    };

    public getLoggedInUserName() {
        var obj = JSON.parse(localStorage.getItem('profile'));
        if (obj) {
            return obj.name;
        } else {
            return '';
        }
    }
}