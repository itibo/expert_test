import "../styles/common.scss"
import "../styles/defaults.scss"
import "../styles/fonts.scss"

import React    			from 'react';
import { render }           from 'react-dom'
import { Router, Route }    from 'react-router';

import App  				from './components/app';
import Home  				from './components/home';
import SystemsNew			from './components/systems/new';
import SystemsImport		from './components/systems/import';
import SystemsExport		from './components/systems/export';
import SystemsUsing			from './components/systems/using';

import FBLogin from "./components/facebook/login"
import FBContent from "./components/facebook/photos"
import GoogleMapPage from "./components/google/map"

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// googlemaps api
(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = "//maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'googleapis-v3'));

class PhonegapApp {
	constructor() {
		if (typeof(cordova) !== 'undefined' || typeof(phonegap) !== 'undefined') {
			document.addEventListener('deviceready', this.onDeviceReady, false);
		} else {
			window.onload = this.onDeviceReady();
		}
	}

	onDeviceReady() {

		window.fbAsyncInit = function() {
			FB.init({
				appId      : '1951030151789466',
				cookie     : true,  // enable cookies to allow the server to access
														// the session
				xfbml      : true,  // parse social plugins on this page
				version    : 'v2.5'
			});

			this.receivedEvent('deviceready');
		}.bind(this);
	}

	receivedEvent() {
		render((
            <Router>
                <Route path="/" component={App}>
                    <Route path="home" component={Home} />
                    <Route path="systems/new"  component={SystemsNew} />
                    <Route path="systems/import" component={SystemsImport} />
                    <Route path="systems/export" component={SystemsExport} />
                    <Route path="systems/using" component={SystemsUsing} />
										<Route path="facebook" getComponent={(location, cb) => {
											FB.getLoginStatus((response) => {
												if ('connected' == response.status){
													cb(null, FBContent)
												} else {
													cb(null, FBLogin)
												}
									    })
										}}/>
										<Route path="google" component={GoogleMapPage} />
                </Route>
            </Router>
		), document.getElementById('content'))
	}
}

var app = new PhonegapApp();
export default app;
