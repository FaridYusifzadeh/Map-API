// import React, { Component } from 'react';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

// const mapStyles = {
//   width: '40%',
//   height: '40%',
// };

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={{
//           lat: 40.409264,
//           lng: 49.867092,
//         }}
//       />
//     );
//   }
// }

// export default GoogleApiWrapper({
//   googleMapURL:
//     'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtcWMK7Lj_VccSnmNk6iswLM1C7ROxcpY',
// })(MapContainer);

// import React, { Component } from 'react';
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class SimpleMap extends Component {
//   static defaultProps = {
//     center: {
//       lat: 40.409264,
//       lng: 49.867092,
//     },
//     zoom: 11,
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly
//       <div style={{ height: '950px', width: '950px' }}>
//         <GoogleMapReact
//           // bootstrapURLKeys={{
//           //   key:
//           //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtcWMK7Lj_VccSnmNk6iswLM1C7ROxcpY',
//           // }}
//           googleMapURL={{
//             key:
//               'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtcWMK7Lj_VccSnmNk6iswLM1C7ROxcpY',
//           }}
//           defaultCenter={this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default SimpleMap;

// import React from 'react';
// // import GoogleMapReact from 'google-map-react';

// // const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const SimpleMap = () => {
//   // static defaultProps = {
//   //   center: {
//   //     lat: 40.409264,
//   //     lng: 49.867092,
//   //   },
//   //   zoom: 11,
//   // };

//   const initMap = () => {
//     var directionsService = new google.maps.DirectionsService();
//     var directionsDisplay = new google.maps.DirectionsRenderer();
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 7,
//       center: { lat: 41.85, lng: -87.65 },
//     });
//     directionsDisplay.setMap(map);

//     var printRoute = function () {
//       calculateAndDisplayRoute(directionsService, directionsDisplay);
//     };

//     getCurrentLocation(function (loc) {
//       if (loc != null) {
//         document.getElementById('startInner').value = loc.toString();
//         document.getElementById('start').innerHTML = 'Current location';
//         map.setCenter(loc);
//       } else {
//         document.getElementById('start').innerHTML =
//           'Current location not found';
//         document.getElementById('btnCalc').disabled = true;
//       }
//     });

//     document.getElementById('btnCalc').addEventListener('click', printRoute);
//   };

//   function calculateAndDisplayRoute(directionsService, directionsDisplay) {
//     directionsService.route(
//       {
//         origin: document.getElementById('startInner').value,
//         destination: document.getElementById('end').value,
//         travelMode: google.maps.TravelMode.DRIVING,
//       },
//       function (response, status) {
//         if (status === google.maps.DirectionsStatus.OK) {
//           directionsDisplay.setDirections(response);
//         } else {
//           window.alert('Directions request failed due to ' + status);
//         }
//       }
//     );
//   }

//   function getCurrentLocation(complete) {
//     // Try W3C Geolocation (Preferred)
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         function (position) {
//           var location = new google.maps.LatLng(
//             position.coords.latitude,
//             position.coords.longitude
//           );
//           complete(location);
//         },
//         function () {
//           complete(null);
//         }
//       );
//     } else {
//       complete(null);
//     }
//   }

//   return (
//     // Important! Always set the container height explicitly
//     // <div style={{ height: '950px', width: '950px' }}>
//     //   <GoogleMapReact
//     //     // bootstrapURLKeys={{
//     //     //   key:
//     //     //     'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtcWMK7Lj_VccSnmNk6iswLM1C7ROxcpY',
//     //     // }}
//     //     googleMapURL={{
//     //       key:
//     //         'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtcWMK7Lj_VccSnmNk6iswLM1C7ROxcpY',
//     //     }}
//     //     defaultCenter={this.props.center}
//     //     defaultZoom={this.props.zoom}
//     //   >
//     //     <AnyReactComponent lat={59.955413} lng={30.337844} text='My Marker' />
//     //   </GoogleMapReact>
//     // </div>

//     <div>
//       <div id='floating-panel'>
//         <b>Start: </b>
//         <span id='start'>Current Location</span>
//         <b>End: </b>
//         <input id='end' type='text'></input>
//         <input id='startInner' type='hidden'></input>
//         <button id='btnCalc'>Print route</button>
//       </div>
//       {initMap()}
//       <div id='map'></div>
//       <script
//         src='https://maps.googleapis.com/maps/api/js?callback=initMap'
//         async
//         defer
//       ></script>
//     </div>
//   );
// };

// export default SimpleMap;

import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './Map';

const mapStyles = {
  width: '50%',
  height: '50%',
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 40.409264,
          lng: 49.867092,
        }}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={'Kenyatta International Convention Centre'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        <CurrentLocation />
      </Map>
    );
  }
}

export default GoogleApiWrapper((props) => ({
  apiKey: props.apiKey,
}))(MapContainer);
