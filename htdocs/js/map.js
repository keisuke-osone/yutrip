//マップに関する疑似クラス
function Map (lat, lon) {
    //Mapの中央 //初期値は京都駅
    var center = {lat: 34.985458 , lon: 135.757755};
    var mapOptions = {
            center: new google.maps.LatLng(center.lat , center.lon),
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    var map;

    //初期位置を中心にMapを表示
    this.initialize = function () {
        map = new google.maps.Map(document.getElementById("map_canvas"),
              mapOptions);

        // google.maps.event.addListener(map, "click", function() {
        //     var chicago = new google.maps.LatLng(this.lat , this.lon);
        //     var numTiles = 1 << map.getZoom();
        //     var projection = new MercatorProjection();
        //     var worldCoordinate = projection.fromLatLngToPoint(chicago);
        //     var pixelCoordinate = new google.maps.Point(
        //           worldCoordinate.x * numTiles,
        //           worldCoordinate.y * numTiles);
        //     console.log(Math.floor(pixelCoordinate.x)+ ", " + Math.floor(pixelCoordinate.y));
        // });
    }

    //APIからの結果を元にマーカーを作成
    this.mappingObject = function () {
        //仮でテスト
        var url = 'js/test.json';

        d3.json(url, function(error, json) {
            console.log(json.g.rest);
            console.log(json.p);
            console.log(center);

            json.g.rest.forEach(function(d) {
                //緯度経度の設定
                var latlng　=　new google.maps.LatLng(d.latitude, d.longitude);

                //マーカーの作成
                var marker = new google.maps.Marker ({
                    draggable:true,
                    animation: google.maps.Animation.DROP, /* マーカーのアニメーション */
                    icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=飯|e67e22|FFFFFF',
                    position: latlng, /* マーカーを立てる場所の緯度・経度 */
                    map: map, /*マーカーを配置する地図オブジェクト */
                    title: d.name
                });
            });

            json.p.places.forEach(function(d) {
                // console.log(d);
                for(key in d) {
                    var lat;
                    var lon;
                    var title;
                    console.log(key);
                    console.log(d[key]);
                    for(keys in d[key]) {
                        //rep = keys.match(/lat/);
                        if (keys.match(/lat/)) {
                            // console.log('lat');
                            // console.log(d[key][keys][0]);
                            lat = d[key][keys][0].value;
                        } else if (keys.match(/long/)) {
                            // console.log('long');
                            // console.log(d[key][keys][0]);
                            lon = d[key][keys][0].value;
                        } else if (keys.match(/title/)) {
                            // console.log('long');
                            // console.log(d[key][keys][0]);
                            title = d[key][keys][0].value;
                        }
                    }
                    // var goldStar = {
                    //   path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                    //   fillColor: "yellow",
                    //   fillOpacity: 0.8,
                    //   scale: 1,
                    //   strokeColor: "gold",
                    //   strokeWeight: 14
                    // };

                    //緯度経度の設定
                    var latlng　=　new google.maps.LatLng(lat, lon);

                    //マーカーの作成
                    var marker = new google.maps.Marker ({
                        draggable: true,
                        animation: google.maps.Animation.DROP, /* マーカーのアニメーション */
                        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=輪|7FFF00|000000',
                        position: latlng, /* マーカーを立てる場所の緯度・経度 */
                        map: map, /*マーカーを配置する地図オブジェクト */
                        title: title
                    });
                    // rep = str.match(/正規表現/);
                }
            });

            // 緯度・経度：日本, 京都駅
            var latlng　=　new google.maps.LatLng(center.lat, center.lon);

            var marker = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                title: '京都駅'
            });
        });
    }
}

