Quick Cache
==========

Script for storing JavaScript objects in the localStorage, if available. The script has a timeout feature that will return a `null` if the data has expired.

##Usage
####initialize

with 2s expiration and an error callback handler
`var cache = new QuickCache(2000, function(error){/*handle error*/});`

with no expiration and an error callback handler
`var cache = new QuickCache(function(error){/*handle error*/});`

with 2s expiration
`var cache = new QuickCache(2000);`

with no expiration
`var cache = new QuickCache();`

####store data

`cache.set('terms',{a:'1',b:'2',c:'3'});`

####retrieve data

`var termData = cache.get('terms');`
>with the first `cache` variable above if you did not get the data within 2s it would return a `null`.
>on the second `cache` the data would be `{a:'1',b:'2',c:'3'}` because a timeout does not exist.

##Why Timeout?
Fair enough. Lets say you have some data in a hybrid application. This data may change once a month or once a week. It's not really critical data, but you would like to check for it every once and a while.

```
\\create cache object to expire once a week
var colorCache = new QuickCache((1000 * 60 * 60 * 24 * 7));

\\try to get colors from cache
var colors = colorCache.get('colors');

\\if colors don't exist or are expired get the latest
if(!colors){
    //call external to get colors
    colors = getColors();
    //refresh the cache
    colorCache.set('colors',colors);
}
```
