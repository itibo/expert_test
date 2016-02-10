import React from "react";

export default class ImportSystem extends React.Component{
  importClick() {
    let system = this.state.text;
    global.localStorage.setItem("ExpertSystem", system);
    window.location.href = "#/systems/using";
//    this.props.history.push('systems');
  }

  textChange(e) {
    this.setState({text: e.currentTarget.value})
  }

  render() {
    return (
      <div className="panel">
        <h2>Import a Expert System</h2>
        <p>
          <b>Format: </b>
        </p>
        <textarea onChange={this.textChange.bind(this)}/>
        <div className="actions">
        	<button onClick={this.importClick.bind(this)}>Import</button>
        </div>
      </div>
    )
  }
}
