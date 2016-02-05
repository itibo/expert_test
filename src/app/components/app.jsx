import React from "react";
import Header from "./header";
import Home from "./home";

export default class App extends React.Component{
  render() {
    return (
      <div className="page">
        <Header />
        {this.props.children || <Home />}
      </div>
    )
  }
}
