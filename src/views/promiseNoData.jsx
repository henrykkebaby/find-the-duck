function promiseNoData(promise, data, error){
    {console.log("promise "+promise)}
    return(
        !promise && <span>no data</span>
        || error && <span>{error}</span>
        || !data && <img src  ="http://www.csc.kth.se/~cristi/loading.gif"></img>
    )
}