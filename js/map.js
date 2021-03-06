
  
        // Variables for the API
        var lon = -77.105920; // Longitud
        var lat = -12.071113; // Latitus
        var limit = 50;       // Limite de lugares
        var params = [        // Keywords para buscar en la API
            "drugstore",
            "inkafarma",
            "mifarma",
            "farmacia"
        ]
        // https://atlas.microsoft.com/search/fuzzy/json?&api-version=1.0&query=drugstore+inkafarma&subscription-key=tcjAIVJj5TJwBMRh2izUcHp5zrUdNbK0wLTf1dKdtrU&lon=-77.1059&lat=-12.0711&radius=100000&limit=50

        // Current location pin
        var pin = new atlas.data.Feature(new atlas.data.Point([lon, lat]));

        // Instantiate map to the div with id "map"
        var subscriptionKey = "tcjAIVJj5TJwBMRh2izUcHp5zrUdNbK0wLTf1dKdtrU";
        var map = new atlas.Map("map", {
            "subscription-key": subscriptionKey,
            center: [lon, lat],
            zoom: 15
        });
        // Initialize the pin layer for search results to the map
        var searchLayerName = "search-results";
        map.addPins([pin], {
            name: 'current-location',
            cluster: false,
            icon: "pin-red"
        });
        // Perform a request to the search service and create a pin on the map for each result
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            var searchPins = [];
            if (this.readyState === 4 && this.status === 200) {
                var response = JSON.parse(this.responseText);
                var poiResults = response.results.filter(function (result) { return result.type === "POI" }) || [];
                searchPins = poiResults.map(function (poiResult) {
                    var poiPosition = [poiResult.position.lon, poiResult.position.lat];
                    return new atlas.data.Feature(new atlas.data.Point(poiPosition), {
                        name: poiResult.poi.name,
                        address: poiResult.address.freeformAddress,
                        position: poiResult.position.lat + ", " + poiResult.position.lon
                    });
                });
                map.addPins(searchPins, {
                    name: searchLayerName,
                    cluster: false,
                    icon: "pin-round-darkblue"
                });

                // Codigo para hacer que la vista del mapa actual pueda ver los marcadores jalados de la API
                // var lons = searchPins.map(function (pin) { return pin.geometry.coordinates[0] });
                // var lats = searchPins.map(function (pin) { return pin.geometry.coordinates[1] });
                // var swLon = Math.min.apply(null, lons);
                // var swLat = Math.min.apply(null, lats);
                // var neLon = Math.max.apply(null, lons);
                // var neLat = Math.max.apply(null, lats);

                // map.setCameraBounds({
                //     bounds: [swLon, swLat, neLon, neLat],
                //     padding: 0
                // });
            }
        };
        var url = "https://atlas.microsoft.com/search/fuzzy/json?";
        url += "&api-version=1.0";
        url += "&query=" + params.join('%20');
        url += "&subscription-key=" + subscriptionKey;
        url += "&lon=" + lon;
        url += "&lat=" + lat;
        url += "&radius=5000";
        url += "&limit=" + limit;
        xhttp.open("GET", url, true);
        xhttp.send();
        // Add a popup to the map which will display some basic information about a search result on hover over a pin
        var popup = new atlas.Popup();
        map.addEventListener("mouseover", searchLayerName, function (e) {
            var popupContentElement = document.createElement("div");
            popupContentElement.style.padding = "5px";
            var popupNameElement = document.createElement("div");
            popupNameElement.innerText = e.features[0].properties.name;
            popupContentElement.appendChild(popupNameElement);
            var popupAddressElement = document.createElement("div");
            popupAddressElement.innerText = e.features[0].properties.address;
            popupContentElement.appendChild(popupAddressElement);
            var popupPositionElement = document.createElement("div");
            popupPositionElement.innerText = e.features[0].properties.position;
            popupContentElement.appendChild(popupPositionElement);
            popup.setPopupOptions({
                position: e.features[0].geometry.coordinates,
                content: popupContentElement
            });
            popup.open(map);
        });
