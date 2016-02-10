import React from "react";
import {API} from "./api";
import ExpertTable from "./expert_table";
import { Link } from 'react-router'

export default class ExpertSystemItem extends React.Component{

  state = {
    system: {
      data: { grid: [], properties: [], objects: [] }
    }
  };

  saveSystem(){
    API.setSystem(this.state.system);
    this.props.history.push('systems');
  }

  changeStateOfLists(e) {
    let list = e.currentTarget.attributes.getNamedItem('data-list').value;
    let action = e.currentTarget.attributes.getNamedItem('data-action').value;
    let _structure = this.state.system;

    if ("add" == action){
      _structure.data[list].push(list + "_" + (_structure.data[list].length + 1))
      if ("objects" == list){
        _structure.data.grid.push(
          Array.apply(null, Array(_structure.data.properties.length))
          .map(Number.prototype.valueOf,0)
        )
      } else {
        _structure.data.grid.forEach((arr) => {
          arr.push(0)
        })
      }
      //
    } else {
      _structure.data[list].pop();
      if ("objects" == list){
        _structure.data.grid.pop();
      } else {
        _structure.data.grid.forEach((arr) => {
          arr.pop()
        })
      }
    }

    this.setState({system: _structure});
  }

  changeRelation(e) {
    let x = e.currentTarget.attributes.getNamedItem('data-x').value;
    let y = e.currentTarget.attributes.getNamedItem('data-y').value;
    let _structure = this.state.system;
    _structure.data.grid[x][y] = !_structure.data.grid[x][y];
    this.setState({system: _structure});
  }

  componentDidMount(){
    if (this.props.params.sysId && "new" != this.props.params.sysId){
      this.setState({
        system: API.getSystemById(this.props.params.sysId)
      });
    }
  }

  render(){
    let system = this.state.system.data;

    return (
        <div className="panel">
          <h2>Create an Expert System</h2>
          <p>object/property style</p>

          <ExpertTable objects={system.objects}
            properties={system.properties}
            grid={system.grid}
            onChangeHandler={this.changeRelation.bind(this)}
           />

          <br />
          <div className="actions">
            <button onClick={this.changeStateOfLists.bind(this)} data-action="add" data-list="objects">Add object</button>
            <button onClick={this.changeStateOfLists.bind(this)} data-action="add" data-list="properties">Add property</button>
            <button onClick={this.changeStateOfLists.bind(this)} data-action="remove" data-list="objects">Remove object</button>
            <button onClick={this.changeStateOfLists.bind(this)} data-action="remove" data-list="properties">Remove property</button>
            <button onClick={this.saveSystem.bind(this)}>Save</button>
            {this.props.params.sysId && "new" != this.props.params.sysId ? <Link to={`/system/${this.props.params.sysId}/using`}>ES Using</Link> : null}
          </div>
        </div>
    )
  }
}
