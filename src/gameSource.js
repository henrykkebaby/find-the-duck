const  GameSource={   // JS object creation literal
    apiCall(params) {
    return fetch("https://bing-image-search1.p.rapidapi.com/images/"+params, {
             "method": "GET",              // HTTP method
             "headers": {                  // HTTP headers
                "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
                "x-rapidapi-key": "7e55c27f08msh8c81fc9012b3cd6p130723jsnc06c6ea8151b",
            }
     })
     .then(response=>{
            if(!response.ok){
                
                throw Error(response.statusText)
            }
            return response;

     })   
    // from HTTP headers to HTTP response data:
    .then(response => response.json());
    }
    ,   // comma between object entries
    searchImages(searchq){
        return GameSource.apiCall("search?q="+searchq.replaceAll(' ', '%20'))
        .then(data=> data.value)
    }
 };
 
 export default GameSource;