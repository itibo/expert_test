import React from "react";

export default class ExportSystem extends React.Component{
  render() {
    let expertSystem = global.localStorage.getItem("systems");

    return (
      <div className="panel">
        <h2>Export a Expert System</h2>
        <p>
          <b>Format: </b>
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <textarea value={expertSystem} />
        <div className="actions">
        	<a href="#/systems/using">Use System</a>
        </div>
      </div>
    )
  }
}
