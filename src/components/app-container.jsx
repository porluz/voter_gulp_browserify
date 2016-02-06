//'use strict';
import React from 'react';
import Feed from './Feed.jsx';

export default class AppContainer extends React.Component {
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
