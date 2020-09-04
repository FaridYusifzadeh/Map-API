import React,{useState} from 'react';
import './App.css';
import SimpleMap from './components/SimpleMap';
import UrlGenerator from "./services/urlGeneratorService";

function App() {
 const [autocomplete,setavtocomplete]=useState([])
  let searchchange=(e)=>{
      let url=UrlGenerator(e.target.value)
      fetch(url)
      .then(async res=>{
        let data=await res.json();
        setavtocomplete([
          ...data.results
        ])
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
    </div>
  );
}

export default App;
