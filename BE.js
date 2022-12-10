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

// // const prueba1 = cache_stores('a', 1)
// // console.log(prueba1)

/**
 * Retrieves data by key (if it exist)
 */


//Esto lo tome de mi cuaderno
async function cache_retrieve(key){
    let cache_retrieve = {}
    return (key) => {
        if (key in cache_retrieve) {
            console.log("Search in cache-retrieve")
            return cache_retrieve[key]
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

const ww = slow_function(5) // Probada 
// console.log(ww)
//---------///

/**
 * runs faster than slow_function by using cache funtions
 */

function memoize(slow_function){
    // return fast_function;
    const cache = cache_stores()
    return (...args) => {
        const key =JSON.stringify(args);

        if (cache.has(key)){
            return cache.get(key); 
        }
        //Delete 

    }
}