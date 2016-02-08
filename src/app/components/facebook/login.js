import React from "react";

export default class FBLogin extends React.Component {

  handleClick() {
      FB.login(() => {
        FB.getLoginStatus(() => {
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
