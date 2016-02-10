import React from "react";

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


export default class ExpertTable extends React.Component {
  render() {
    return (
      <div className="rTable">
        <ExpertTableHeader {...this.props.properties} />
        {this.props.objects.map(function(obj_name, obj_idx){
          return (
            <div key={'tblr' + obj_idx + 'row'} className="rTableRow">
              <div key={'tblr' + obj_idx + '0'} className="rTableCell">{obj_name}</div>
              {this.props.properties.map(function(prop_name, prop_idx){
                return (
                  <div className="rTableCell" key={'tblr' + obj_idx + '' + prop_idx}>
                    <input type="checkbox" data-x={obj_idx} data-y={prop_idx}
                      key={'tbli' + obj_idx + '' + prop_idx}
                      checked={this.props.grid[obj_idx][prop_idx] ? "checked" : ""}
                      onChange={this.props.onChangeHandler} />
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
