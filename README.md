# BE-AllRooms
This test consists of storing in cache the requests or API calls, making the results of these calls faster, this was done using a unique key for each request, if the API is called again with the same key, we can, return the promise from the cache without having to retrieve it again from the servers.
