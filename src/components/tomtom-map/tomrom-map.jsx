import React, { useEffect, useState } from 'react'
import {key} from '../../config/development'
import routCalculateGenerator from '../../services/routeClalculateGenerator'

function TomTomMap() {
 const tt = window.tt;
 const option={
   key: key,
   container: 'tomtom-map',
   style: 'tomtom://vector/1/basic-main',
   center: [49.9196,40.42092],
   zoom: 11
}
 const [locations,setLocations] = useState({
    startLoc:[49.9196, 40.42092],
    endLoc:[49.8196, 40.43092],
    points:''
 })
 
 useEffect(()=>{
  var map = tt.map(option);

var attributions = ['<a href="https://www.tomtom.com/mapshare/tools/">Report map issue</a>'];
map.getAttributionControl().addAttribution(attributions);

map.addControl(new tt.FullscreenControl());
map.addControl(new tt.NavigationControl());
map.dragRotate.enable();
map.addControl(new tt.GeolocateControl({
 positionOptions: {
     enableHighAccuracy: true
 },
 trackUserLocation: true
})
.on('geolocate',(e)=>{
  console.log(e)
})
);

map.addTier(new tt.TrafficFlowTilesTier({
 key: key,
 incidentDetails: true,
 incidentTiles: true
}))

map.dragPan.enable();

console.log(map)

// var marker1 = new tt.Marker({color:'#ff0000',
// width:'25',
// draggable:true})
// .setLngLat(locations.startLoc)
// .addTo(map)
// .on('dragend',(e)=>{
//  let loc=e.target.getLngLat()
//  setLocations({
//   ...locations,
//   startLoc:[loc.lat,loc.lng]
//  })
//  console.log(loc)
// })


// var marker2 = new tt.Marker(
//  {color:'#ff0000',
//  width:'25',
//  draggable:true})
// .setLngLat(locations.endLoc)
// .addTo(map)
// .on('dragend',(e)=>{
//  let loc=e.target.getLngLat()
//  console.log(loc)
//  setLocations({
//   ...locations,
//   endLoc:[loc.lat,loc.lng]
//  })
// });

// locations.points.forEach(x=>{
//    var newMarker = new tt.Marker(
//   {color:'#ff0000',
//   width:'20',
//   scale:1})
//  .setLngLat([x.longitude,x.latitude])
//  .addTo(map)
// })


if(locations.points!==''){
   const route=locations.points.toGeoJson();
   console.log("route",route)
  // drawLayer(map,route, "#00d7ff", 6);
   getSectionsData(route, "COUNTRY").forEach((tollRoad, i) =>{
      console.log('tollRoad',tollRoad)
      drawLayer(map,tollRoad, `tollRoad_${i}`, "#ff0000", 4)
   }
   );
   fitBounds(map,route)
}


 },[locations])


 function getSectionsData(geojson, type) {

   const { sections } = geojson.features[0].properties;
 
   const result = [];
 
   const coordinates = Array.prototype.concat.call(
     [],
     geojson.features[0].geometry.coordinates
   );
 
   for (const section of sections) {
 
     if (section.sectionType === type) {
 
       result.push({
 
         type: "Feature",
 
         properties: {
 
           ...section,
 
           sectionType: type,
 
         },
 
         geometry: {
 
           type: "LineString",
 
           coordinates: coordinates.slice(
 
             section.startPointIndex,
 
             section.endPointIndex + 1
 
           ),
 
         },
 
       });
 
     }
 
   }
 
   return result;
 
 }

 function fitBounds(map,geojson) {

   const coordinates = geojson.features[0].geometry.coordinates;

   console.log("coordinates",coordinates)
   
   // const bounds = coordinates.reduce(
   //   (bounds, coord) => {
   //      console.log('bounds',bounds)
   //      bounds.extend(tt.LngLat.convert(coord))
   //    },
   //      new tt.LngLatBounds()
   // );
    
   let bound=new tt.LngLatBounds();
   coordinates.forEach(x=>{
      bound.extend(tt.LngLat.convert([x[1],x[0]]))
   })
    console.log(bound)
   map.jumpTo(map.cameraForBounds(bound, { padding: 5 }));
 
 }
 function drawLayer(map,route,id,color,width){
   map.addLayer({

      id: id,
    
      type: "line",
    
      source: {
    
        type: "geojson",
    
        data:route,
    
      },
    
      paint: {
    
        "line-color": color,
    
        "line-width": width,
    
      },
    
    });

//    map.addLayer({
//       'id': '123',
//       'type': 'line',
//       'source': {
//           'type': 'geojson',
//           'data': {
//               'type': 'FeatureCollection',
//               'features': [
//                   {
//                       'type': 'Feature',
//                       'geometry': {
//                           'type': 'LineString',
//                           'properties': {},
//                           'coordinates': [
//                               [2.7505287, 41.6709659],
//                               [2.5010908655347097, 41.57083364442753]
//                           ]
//                       }
//                   }
//               ]
//           }
//       },
//       'layout': {
//           'line-cap': 'round',
//           'line-join': 'round'
//       },
//       'paint': {
//           'line-color': color,
//           'line-width': width
//       }
// });
 }


  const calculateEvent=()=>{
   // let query=`${locations.startLoc[1]},${locations.startLoc[0]}:${locations.endLoc[1]},${locations.endLoc[0]}`;
   // let url=routCalculateGenerator(query);
   // fetch(url)
   // .then(async res=>{
   //    let data=await res.json()
   //    console.log(res)
   //    setLocations({
   //     ...locations,
   //     points:data})
   // }).catch(err=>console.log(err))
   console.log('tt-services',tt )
   tt.services.calculateRoute({

      key: `${key}`,
  
      locations: `${locations.startLoc[1]},${locations.startLoc[0]}:${locations.endLoc[1]},${locations.endLoc[0]}`,
  
      sectionType: ["tollRoad", "country"],
  
      traffic: false,
  
    }).go()
    .then((routeJson)=>{
       setLocations({
          ...locations,
          points:routeJson
       })
    })
  }

 return (
  <>
  <button onClick={calculateEvent}>Calcualte</button>
  <div id='tomtom-map' style={{'width':'100%','height':'500px'}}>
  </div>
  </>
 )
}

export default TomTomMap
