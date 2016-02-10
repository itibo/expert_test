import React from "react";

import '../../styles/test.scss';

export default class Header extends React.Component{
  render() {
    return (
      <div className="primary-nav">
        <a href="#/" className="logo">
        	<img src="./res/logo.png" />
        	<h1 className="test">ES Builder</h1>
        </a>
        <div className="actions">
          <a href="#/systems">
            Expert Systems
          </a>
          <a href="#/facebook">
            FB
          </a>
          <a href="#/google">
            GoogleMap
          </a>
        </div>
      </div>
    )
  }
}
