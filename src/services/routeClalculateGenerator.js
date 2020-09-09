import {baseURL,versionNumber,key} from '../config/development'

const routCalculateGenerator=(query)=>{
   
   let url=`${baseURL}/routing/${versionNumber}/calculateRoute/${query}/json?key=${key}`;
   return url
}

export default routCalculateGenerator