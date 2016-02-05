import React from "react";
import { Router }    from 'react-router';
import FacebookLogin from 'react-facebook-login';

export default class FBLogin extends React.Component {

  handleClick() {
      FB.login((response) => {
        FB.getLoginStatus((response) => {
          this.props.history.go('/facebook');
        })
      }, {scope: 'public_profile,email,user_photos'});
  }

  render() {
    return (
      <button type="button" onClick={this.handleClick.bind(this)}>Facebook Login</button>
    );
  }
}
