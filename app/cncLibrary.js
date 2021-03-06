angular.module('cncLibrary', [])

.constant('GEOLOCATIONS_API_PREFIX', 'http://api.geonames.org/countryInfoJSON?username=jettagozoom')

.factory('cncCountries', ['$http', '$q', 'GEOLOCATIONS_API_PREFIX',
                  function($http,   $q,   GEOLOCATIONS_API_PREFIX) {
    var countryInfo = [];
    return function() {
        if (countryInfo.length == 0) {
            var defer = $q.defer();
            $http.get(GEOLOCATIONS_API_PREFIX)
            .success(function(data) {
                countryInfo = removeDups(data.geonames);
                defer.resolve(countryInfo);
            })
            return defer.promise;
        } else {
            //defer.resolve(countryInfo);
            return countryInfo;
        }
    }

    function removeDups(countries) {
        var newname = "",
            tmpArray = [],
            arrayLen = 0;
            foundDup = false;

        for (country in countries) {
            newname = countries[country].countryName;
            arrayLen = tmpArray.length;

            if (arrayLen == 0) {
                tmpArray.push(countries[country]);
            } else {
                foundDup = false;
                for (var i = 0; i < arrayLen; i++) {
                    var name = tmpArray[i].countryName;
                    if (name === newname) {
                        foundDup = true;
                        console.log("Found a duplicate name: " + newname);
                        break;
                    }
                }
                if (foundDup == false) {
                    tmpArray.push(countries[country]);
                }
            }
        }
        return tmpArray;
    }
}]);

