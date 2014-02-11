//マップに関する疑似クラス
function Map (lat, lon) {
    //Mapの中央 //初期値は京都駅
    this.center = {lat: 34.985458 , lon: 135.757755};
    this.mapOptions = {
            center: new google.maps.LatLng(this.center.lat , this.center.lon),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    this.map;

    //初期位置を中心にMapを表示
    this.initialize = function () {
    	this.map = new google.maps.Map(document.getElementById("map_canvas"),
              this.mapOptions);

        google.maps.event.addListener(this.map, "click", function() {
            var chicago = new google.maps.LatLng(this.lat , this.lon);
            var numTiles = 1 << map.getZoom();
            var projection = new MercatorProjection();
            var worldCoordinate = projection.fromLatLngToPoint(chicago);
            var pixelCoordinate = new google.maps.Point(
                  worldCoordinate.x * numTiles,
                  worldCoordinate.y * numTiles);
            console.log(Math.floor(pixelCoordinate.x)+ ", " + Math.floor(pixelCoordinate.y));
        });
    }

}


