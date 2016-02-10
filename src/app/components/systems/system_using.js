import React from "react";
import {API} from "./api";

export default class ExpertSystemUsing extends React.Component{
  constructor(props) {
    super(props);
    if (this.props.params.sysId && "new" != this.props.params.sysId){
      this.state = API.getSystemById(this.props.params.sysId).data;
    }
    this.state.done = false;
    this.state.history = [];
  }

  componentWillMount() {
    this.checkSystem();
  }

  checkSystem() {
    let objects = this.state.objects;
    console.log("objects: " + objects);
    console.log("properties: " + this.state.properties);

    if (objects) {
      if (objects.length == 1) {
        this.setState({done: true});
        alert("Answer = " + objects.pop());
      } else {
        console.log("More that 1 answer. Continue...");
        this.setState({currentProp: this.state.properties.pop() });
      }
    } else {
      console.log("Objects not found!");
    }
  }

  onClick(e) {
    let value = e.currentTarget.attributes.getNamedItem('data-val').value;
    let index = this.state.properties.length;
    let result = [];
    let countOfObjects = this.state.objects.length

    let history = this.state.history;
    history.push({ property: this.state.currentProp, answer: value});
    this.setState({history: history});

    for(let i=0; i<countOfObjects; i++) {
      if(this.state.grid[i][index] == value) {
        result.push(i);
      }
    }
  console.log("result: " + result);
    let grid = this.state.grid;
    let objects = this.state.objects;
    for(let i=0; i<countOfObjects; i++) {
      if(result.indexOf(i) === -1) {
        console.log("remove " + i + " object: " + objects[i]);
        grid.splice(i, 1);
        objects.splice(i, 1);
      }
    }
    this.setState({grid: grid, objects: objects});
    this.checkSystem();
  }

  render() {
    return (
      <div>
        <div className="panel">
          <h2>Use a Expert System</h2>
          <p>
            Match prop: {this.state.currentProp}
          </p>
          <div className="actions">
            <button disabled={this.state.done ? "disabled" : ""} data-val="1" onClick={this.onClick.bind(this)}>Yes</button>
            <button disabled={this.state.done ? "disabled" : ""} data-val="0" onClick={this.onClick.bind(this)}>No</button>
          </div>
        </div>
        <div className="panel">
          <h2>History</h2>
          { this.state.history.map((record, index) => {
            return (
              <p key={index}>
                Property: {record.property}
                <br/>
                Answer: {record.answer ? "Yes" : "No"}
              </p>
            );
          })}
        </div>
      </div>
    )
  }
}
