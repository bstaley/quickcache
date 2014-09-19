Quick Cache
==========

Script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.

##Usage
####initialize

with 2s expiration
`var cache = new QuickCache(2000);`

with no expiration
`var cache = new QuickCache();`

####store data

`cache.set('terms',{a:'1',b:'2',c:'3'});`

####retrieve data

`cache.get('terms');`
>with the first variable above if you did not get the data within 2s it would return a null.
>on the second example the data would be returned.
