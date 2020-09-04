import {baseURL,versionNumber,ext,key,language} from '../config/development'




const searchGeneratorURL = (query)=>{

    let url=`${baseURL}/search/${versionNumber}/search/${query}.${ext}?key=${key}&language=${language}`;
    return url;
    
}

export default searchGeneratorURL;