import React,{useState} from 'react';
import './App.css';
import SimpleMap from './components/SimpleMap';
import UrlGenerator from "./services/urlGeneratorService";
import TomTomMap from './components/tomtom-map/tomrom-map'

function App() {
 const [autocomplete,setavtocomplete]=useState([])

  let searchchange=(e)=>{
      let url=UrlGenerator(e.target.value)
      fetch(url)
      .then(async res=>{
        let data=await res.json();
        if(Array.isArray(data.results)){
          setavtocomplete([
            ...data.results
          ])
        }
        console.log(data)
      })
  }
  return (
    <div className='App'>
      {/* <SimpleMap /> */}
      <input type='text' onChange={searchchange}/>
      <ul>
        {
          autocomplete.map((x,i)=>{
            return <li key={i}>{x.address.freeformAddress}</li>
          })
        }
      </ul>
      <TomTomMap/>
    </div>
  );
}

export default App;
