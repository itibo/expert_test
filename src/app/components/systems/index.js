import React from "react";
import {API} from "./api";
import { Link } from 'react-router'

export default class ExpertSystems extends React.Component{

  state = {
    systems: []
  };

  eraseESes(){
    API.eraseESes();
    this.setState({
      systems: API.getSystems()
    });
  }

  componentDidMount(){
    this.setState({
      systems: API.getSystems()
    });
  }

  render(){
    return (
      <div>
        <div className="panel">
          <h2>Expert Systems</h2>
          <div className="actions">
            <Link to={`/system/new`}>New ES</Link>
            <Link to={`systems/export`}>Export ES</Link>
            <Link to={`/systems/import`}>Import ES</Link>
            <button onClick={this.eraseESes.bind(this)}>Erase ESs</button>
          </div>
          <ul>
            {this.state.systems.map((s) => {
              return (
                <li key={s.id}><Link to={`/system/${s.id}`}>{s.name || s.id || "undefined"}</Link></li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}
