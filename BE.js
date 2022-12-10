import fetch from 'node-fetch';
const API = "https://jsonplaceholder.typicode.com/todos";


/**
 * SLOW API CHALLENGE
 */

//Following next funtion exits 

/**
 * Stores data (value) by key 
 */

async function cache_stores(key, value){
    const cache = new Map();
    cache.set(key, value);
    return cache
}

/**
 * Retrieves data by key (if it exist)
 */


async function cache_retrieve(key){
    let cache_retrieve = {}
    let result = 0
    return (key) => {
        if (key in cache_retrieve) {
            console.log("Search in cache-retrieve")
            return cache_retrieve[key] // un numero
        }
        else {
            console.log("Call...")
            result = key
            cache_retrieve[key] = key
            return result  
        }
    }
}



function fetchData(urlApi){
    return fetch(urlApi)
}

async function slow_function(input){
    return fetchData(`${API}/${input}`)
        .then((response) => response.json())
        .then((json) => json)
        .then((data) => {
            console.log(data)
        })
        .catch(error => console.log(error))
        .finally(() => console.log('Finally'))

}

/**
 * runs faster than slow_function by using cache funtions
 */

function memoize(slow_function){

    const cache = new Map();
    
    
    return (...args) => {
        const key =JSON.stringify(args);
        
        

        if (cache.has(cache_retrieve(key))) {
            return cache.get(key); 
        }
        
        //Delete cache entry if API call fails
        cache.set(key, slow_function(...args).catch((error) => {
            cache.delete(key);
            return Promise.reject(error)
        }))
        return cache.get(key)
    }
}


async function getData(){
    // Here the higer order function is called
    let cachedFetch = memoize(slow_function)

    let response1 = await cachedFetch(1) // Call to server with id 1
    let response2 = await cachedFetch(2) // Call to server with id 2
    let response3 = await cachedFetch(1) // id is 1, will be served from cache

    let response4 = await cachedFetch(3) // Call to server with id 3
    let response5 = await cachedFetch(2) // Id is 2, will be save in cache
}

getData(); 