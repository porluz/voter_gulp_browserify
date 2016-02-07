//'use strict';
import React from 'react';
import Feed from './Feed.jsx';
import Firebase from 'firebase';

export default class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        // Register the callback to be fired every time auth state changes
        this.ref = new Firebase('https://shining-inferno-6585.firebaseio.com');

        this.authDataCallback = this.authDataCallback.bind(this);
        this.ref.onAuth(this.authDataCallback);

        // Login
        // Or via popular OAuth providers ("facebook", "github", "google", or "twitter")
        this.ref.authWithOAuthPopup('facebook', this.authHandler);

        //ref.authWithOAuthRedirect("<provider>", authHandler);
        // prefer pop-ups, so we don't navigate away from the page
        // ref.authWithOAuthPopup("google", function(error, authData) {
        //   if (error) {
        //     if (error.code === "TRANSPORT_UNAVAILABLE") {
        //       // fall-back to browser redirects, and pick up the session
        //       // automatically when we come back to the origin page
        //       ref.authWithOAuthRedirect("google", function(error) { /* ... */ });
        //     }
        //   } else if (authData) {
        //     // user authenticated with Firebase
        //   }
        // });
    }

    authDataCallback(authData) {
        var isNewUser = false;
        if (authData) {
            console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
        } else {
            console.log('User is logged out');
        }
        if (authData && isNewUser) {
          // save the user's profile into the database so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          this.ref.child('users').child(authData.uid).set({
            provider: authData.provider,
            name: this.getName(authData)
          });
        }
    }

    // find a suitable name based on the meta info given by each provider
    getName(authData) {
        switch(authData.provider) {
           case 'facebook':
             return authData.facebook.displayName;
        }
    }

    authHandler(error, authData) {
      if (error) {
        console.log('Login Failed!', error);
      } else {
        console.log('Authenticated successfully with payload:', authData);
      }
    }

    render() {
        /* jshint ignore:start */
        /* jscs: disable */
        return (
            <div>
                <div className="jumbotron text-center">
                    <h2>Voter</h2>
                </div>
                <div>
                    <Feed />
                </div>
            </div>
        );
        /* jshint ignore:end */
        /* jscs: enable */
    }
}
