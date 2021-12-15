function promiseNoData(data){
    return(
        !data && <img src  ="http://www.csc.kth.se/~cristi/loading.gif" alt="spinner"></img>
    )
}
export default promiseNoData;