/*
*Check out my site site here: https://github.com/bstaley/
*
*   Copyright 2014 Brandon R Staley
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

/*
 * script for storing json objects in the localstorage, if available. has a timeout feature that will ignore expired data.
 * @param {int} [timeout] - time in milliseconds that the cached data last before expiring.
 */
var QuickCache = function (timeout) {

    //keep context
    var cache = this;

    //store the timeout amount for measurement
    cache.timeout = timeout;


    /*
     * check to see if localstorage is allowed
     */
    cache.supportsLocalStorage = function () {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    /*
     * store a javascript object in the localStorage
     * @param {string} key - the unique identifier to store an object against.
     * @param {object} data - any javascript object to store.
     */
    cache.set = function (key, data) {
        //check localStorage availability
        if (cache.supportsLocalStorage()) {
            //since timeout is optional we may not need to set a timeout
            if (cache.timeout) {
                //this will store an associated time with a key so that we can check to see if the data is expired
                localStorage.setItem(key + 'Time', new Date().toJSON());
            }
            //stringify and store
            localStorage.setItem(key, JSON.stringify(data));
        }
        else { console.log("Can't Cache"); }
    };

    /*
    * retreive a javascript object from the localStorage
    * @param {string} key - the unique identifier that an object is stored with.
    */
    cache.get = function (key) {
        //check localStorage availability
        if (cache.supportsLocalStorage()) {
            //if timeout isn't defined just get the data, if it is check the timeout against time now to see if it is expired
            if (!cache.timeout || (new Date() - new Date(localStorage.getItem(key + 'Time'))) < cache.timeout) {
                //if not expired return the json pared data.
                return JSON.parse(localStorage.getItem(key));
            }
        }
        else { console.log("Can't Cache"); }
    };
};