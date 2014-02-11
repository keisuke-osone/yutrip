//マップに関する疑似クラス
function Map (lat, lon) {
    //Mapの中央を決める
    this.lat = lat;
    this.lon = lon;
    
    //初期位置を中心にMapを表示
    this.initialize = function () {
      
        var mapOptions = {
            center: new google.maps.LatLng(this.lat , this.lon),
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
              mapOptions);

        google.maps.event.addListener(map, "click", function() {
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


