import React from "react";
import {API} from "./api";

class ExpertTableHeader extends React.Component {
  render() {
    return (
      <div className="rTableRow">
        <div key='tblh0' className="rTableHead">&nbsp;</div>
        {Object.keys(this.props).map(function(pr_idx){
          return (
            <div key={'tblh' + (pr_idx + 1)} className="rTableHead">
              <span>{this.props[pr_idx]}</span>
            </div>
          );
        }, this)}
      </div>
    )
  }
}

class ExpertTable extends React.Component {
  render() {
    return (
      <div className="rTable">
        <ExpertTableHeader {...this.props.properties} />
        {this.props.objects.map(function(obj_name, obj_idx){
          return (
            <div className="rTableRow">
              <div key={'tblr' + obj_idx + '0'} className="rTableCell">{obj_name}</div>
              {this.props.properties.map(function(prop_name, prop_idx){
                return (
                  <div className="rTableCell" key={'tblr' + obj_idx + '' + prop_idx}>
                    <input type="checkbox" data-x={obj_idx} data-y={prop_idx}
                      key={'tbli' + obj_idx + '' + prop_idx}
                      checked={this.props.grid[obj_idx][prop_idx] ? "checked" : ""}
                      onClick={this.props.onChangeHandler} />
                   </div>
                )
              }, this)}
            </div>
          )
        }, this)}
      </div>
    );
  }
}

export default class NewSystem extends React.Component{
  constructor(props) {
    super(props);

    this.state = { grid: [], properties: [], objects: [] };
  }

  changeRelation(e) {
    let check = e.currentTarget;

    let x = check.attributes.getNamedItem('data-x').value;
    let y = check.attributes.getNamedItem('data-y').value;

    let newGrid = this.state.grid;
    newGrid[x][y] = !newGrid[x][y];
    this.setState({"grid": newGrid});
  }

  changeStateOfLists(e) {
    let button = e.currentTarget;
    let list = button.attributes.getNamedItem('data-list').value;
    let action = button.attributes.getNamedItem('data-action').value;
    this.changeState(action, list, list + "_" + (this.state[list].length + 1));
  }

  changeState(action, name, title) {
    let newState = {};
    let param = this.state[name];
    action == "add" ? param.push(title) : param.pop();
    newState[name] = param;
    newState["grid"] = this.rebuildGrid();
    this.setState(newState);
  }

  rebuildGrid() {
    let grid = [];
    for (let i=0; i<this.state.objects.length; i++) {
      grid[i] = [];
      for (let j=0; j<this.state.properties.length; j++) {
        grid[i][j] = false;
      }
    }
    return grid;
  }

/*  renderGrid() {
    let thead = [<th key={0}></th>];
    for (let k=0; k<this.state.properties.length; k++) {
      thead.push(<th key={k+1}>{this.state.properties[k]}</th>);
    }
    let tbody = [];
    tbody.push(<tr key={0}>{thead}</tr>);

    for (let i=0; i<this.state.objects.length; i++) {
      let tr=[<th key={0}>{this.state.objects[i]}</th>];
      for (let j=0; j<this.state.properties.length; j++) {
        tr.push(<td key={j+1}>
            <input type="checkbox" data-x={i} data-y={j}
                   checked={this.state.grid[i][j] ? "checked" : ""}
                   onClick={this.changeRelation.bind(this)} />
          </td>);
      }
      tbody.push(<tr key={i+1}>{tr}</tr>);
    }
    return (<table>{tbody}</table>);
  }
*/

  componentWillUpdate(nextProps, nextState) {
    console.log("will update");
    global.localStorage.setItem("ExpertSystem", JSON.stringify(nextState));
  }

  render() {
//    console.log(this.state);
//    let table = this.renderGrid();

    return (
      <div className="panel">
        <h2>Create an Expert System</h2>
        <p>object/property style</p>

        {/*table*/}

        <ExpertTable objects={this.state.objects}
          properties={this.state.properties}
          grid={this.state.grid}
          onChangeHandler={this.changeRelation.bind(this)}  />

        <br />
        <div className="actions">
          <button data-action="add" data-list="objects" onClick={this.changeStateOfLists.bind(this)}>Add object</button>
          <button data-action="add" data-list="properties" onClick={this.changeStateOfLists.bind(this)}>Add property</button>
          <button data-action="remove" data-list="objects" onClick={this.changeStateOfLists.bind(this)}>Remove object</button>
          <button data-action="remove" data-list="properties" onClick={this.changeStateOfLists.bind(this)}>Remove property</button>
          <a href="#/systems/export">Export system</a>
        </div>
      </div>
    )
  }
}
