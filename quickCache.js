/*
*Check out my site site here: https://github.com/bstaley/
*
*   Copyright 2015 Brandon R Staley
*
*   Licensed under the Apache License, Version 2.0 (the "License");
*   you may not use this file except in compliance with the License.
*   You may obtain a copy of the License at
*
*       http://www.apache.org/licenses/LICENSE-2.0
*
*   Unless required by applicable law or agreed to in writing, software
*   distributed under the License is distributed on an "AS IS" BASIS,
*   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*   See the License for the specific language governing permissions and
*   limitations under the License.
*
*Developed by: Brandon R Staley(bstaley0@gmail.com)
*Purpose: script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.
*Dependencies: javascript
*Tested on browsers: Chrome 28+, Firefox 22+, IE 9+, O 16+
*Usage:
*Contributers:
*/

var QuickCache = function (timeout, errorCallback) {
    /// <signature>
    /// <summary>script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.</summary>
    /// </signature>
    /// <signature>
    /// <summary>script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.</summary>
    /// <param name="timeout" type="int">time in milliseconds that the cached data last before expiring.</param>
    /// </signature>
    /// <signature>
    /// <summary>script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.</summary>
    /// <param name="errorCallback" type="function(error)">a callback function that will handle bubbling the error to your assigned function</param>
    /// </signature>
    /// <signature>
    /// <summary>script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.</summary>
    /// <param name="timeout" type="int">time in milliseconds that the cached data last before expiring.</param>
    /// <param name="errorCallback" type="function(error)">a callback function that will handle bubbling the error to your assigned function</param>
    /// </signature>

    //keep context
    var cache = this;

    //check overloads 
    if (timeout && typeof (timeout) === 'function') {
        errorCallback = timeout;
        timeout = null;
    }

    //store the timeout amount for measurement
    cache.timeout = timeout;

    //check to see if localstorage is allowed
    cache.isSupported = (function () {
        try {
            //check to see if localStorage exist. if it does it will throw an exception
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            //by not returning anything undefined will be the product of this function
            handleError('localStorage is not supported');
        }
    })();

    cache.set = function (key, data) {
        /// <summary>store a javascript object in the localStorage.</summary>
        /// <param name="key" type="string">the unique identifier to store an object against.</param>
        /// <param name="data" type="object">any javascript object to store.</param>
        /// <returns type="object">why not return the data you put in. chaining and stuff.</returns>

        //check localStorage availability
        if (cache.isSupported) {
            try {
                //since timeout is optional we may not need to set a timeout
                if (cache.timeout) {
                    //this will store an associated time with a key so that we can check to see if the data is expired
                    localStorage.setItem(key + 'Time', new Date().toJSON());
                }
                //stringify and store
                localStorage.setItem(key, JSON.stringify(data));
                //why not return the data you put in. chaining and stuff.
                return data;
            }
            catch (ex) {
                handleError(ex.message);
            }
        }
    };

    cache.get = function (key) {
        /// <summary>retreive a javascript object from the localStorage.</summary>
        /// <param name="key" type="string">the unique identifier to store an object against.</param>
        /// <returns type="object">will return null if timeout expired/cache isn't supported/object wasn't found. otherwise it will return the found object.</returns>

        //check localStorage availability
        if (cache.isSupported) {
            //if timeout isn't defined just get the data, if it is check the timeout against time now to see if it is expired
            if (!cache.timeout || (new Date() - new Date(localStorage.getItem(key + 'Time'))) < cache.timeout) {
                //if not expired return the json pared data.
                return JSON.parse(localStorage.getItem(key));
            }
        }
        //return what you would expect if we could not find the value
        return null;
    };

    function handleError(errMessage) {
        /// <summary>private method to handle errors. makes the callback and console logs.</summary>
        /// <param name="errMessage" type="string">the message from the error.</param>
        var error = new Error(errMessage);
        !errorCallback || errorCallback.apply(cache, [error]);
        console.log(error);
    }
};
