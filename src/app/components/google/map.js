import React from "react";
import { GoogleMapLoader, GoogleMap, Marker, DirectionsRenderer} from "react-google-maps";
import { ContextMenu, MenuItem, ContextMenuLayer } from "react-contextmenu";

class MapContext extends React.Component {

  handleSelect(data) {
    this.props.onAddWaypoint(data.add)
  }

  render() {
    return(
      <ContextMenu identifier="some_unique_identifier">
          <MenuItem
            disabled={this.props.waypoints.length>0}
            data={{add: "origin"}}
            onSelect={this.handleSelect.bind(this)}
          >
              Add Origin Point
          </MenuItem>
          <MenuItem
            disabled={this.props.waypoints.length<1}
            data={{add: "destination"}}
            onSelect={this.handleSelect.bind(this)}
          >
              Add Destination Point
          </MenuItem>
          <MenuItem divider />
          <MenuItem
            disabled={this.props.waypoints.length<2}
            data={{add: "waypoint"}}
            onSelect={this.handleSelect.bind(this)}
          >
              Add Waypoint
          </MenuItem>
      </ContextMenu>
    )
  }
}

const GoogleMapContent = class extends React.Component {

  componentDidMount() {
    this.refs.mapSection.addEventListener('contextmenu', (ev)=> {
      this.props.onSetCurrentPoint(ev.detail);
    } );
  }

  handleMapRightClick(event){

    this.refs.mapSection.dispatchEvent(
      Object.assign(
        new CustomEvent("contextmenu", {
          bubbles: true,
          detail: event
        }),
        {
          screenX: event.pixel.x,
          screenY: event.pixel.y,
          clientX: event.pixel.x,
          clientY: event.pixel.y
        }
      )
    )
  }

  handleMarkerRightclick(index, event){
    // let {markers} = this.state;
    // this.setState({ markers: markers.splice(index,1) && markers });
  }

  render () {
    let _style = {
      height: '600px'
    };
    let {directions} = this.props;

    return (
      <section ref="mapSection" style={_style}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              defaultZoom={14}
              defaultCenter={{lat: 53.676507, lng: 23.839601}}
              onRightclick={this.handleMapRightClick.bind(this)}
            >
              {this.props.waypoints.map((waypoint, index) => {
                return (
                  <Marker
                    {...waypoint}
                    // onRightclick={this.handleMarkerRightclick.bind(this, index)}
                  />
                );
              })}
              {directions ? <DirectionsRenderer directions={directions} /> : null}
            </GoogleMap>
          }
        />
      </section>
    )
  }
}

const GoogleMapContentLayer = ContextMenuLayer("some_unique_identifier", (props) => {
    // console.log("GoogleMapContentLayer props: %O", props)
    return {
        waypoints: props.waypoints
    };
})(GoogleMapContent);

export default class GoogleMapPage extends React.Component {

  state = {
    waypoints: [],
    currentPoint: {},
    directions: null
  };

  componentDidMount() {
    this.DirectionsService = new google.maps.DirectionsService();
  }

  setCurrentPoint(point){
    this.setState({currentPoint: point})
  }

  deleteWaypoint(...props){
    console.log("changeWaypoins props: %O", props)
  }

  addWaypoint(point){
    let {waypoints, currentPoint} = this.state;

    let createWaypointObject = (obj) => {
      return {
        position: obj.latLng,
        defaultAnimation: 2,
        key: Date.now()
      }
    }

    this.setState({
      waypoints: 'origin' == point
        ? (waypoints.unshift(createWaypointObject(currentPoint)) && waypoints)
        : ('destination' == point ? (waypoints.push(createWaypointObject(currentPoint)) && waypoints)
          : (waypoints.splice( (waypoints.length - 1), 0, createWaypointObject(currentPoint)) && waypoints)),
      currentPoint: {}
    }, () => {

      if (waypoints.length>1){
        let [_origin, _destination, _waypoints] = [
          waypoints[0].position,
          waypoints[waypoints.length-1].position,
          waypoints.slice(1, -1).map((_wp)=> {
            return {location: _wp.position}
          })
        ];

        let _directions_ervice_params = Object.assign({}, {
          origin: _origin,
          destination: _destination,
          travelMode: google.maps.TravelMode.DRIVING
        }, _waypoints.length ? {waypoints: _waypoints} : {})

        console.log("_directions_ervice_params: %O", _directions_ervice_params)

        this.DirectionsService.route(_directions_ervice_params,
          (result, status) => {
            if(status == google.maps.DirectionsStatus.OK) {
              this.setState({
                directions: result
              })
            }
            else {
              console.error(`error fetching directions ${ result }`);
            }
          }
        );
      } else {
        this.setState({
          directions: null
        })
      }
    })
  }

  render(){
    return(
      <div>
        <GoogleMapContentLayer
          waypoints={this.state.waypoints}
          directions={this.state.directions}
          onSetCurrentPoint={this.setCurrentPoint.bind(this)}
          onDeleteWaypoint={this.deleteWaypoint.bind(this)}
        />
        <MapContext
          onAddWaypoint={this.addWaypoint.bind(this)}
          waypoints={this.state.waypoints} />
      </div>
    );
  }
}
