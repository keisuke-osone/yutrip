//マップに関する疑似クラス
function Map (latitude, longitude) {
    //Mapの中央 //初期値は京都駅
    // var center = {lat: 34.985458 , lon: 135.757755};
    var center = {lat: latitude , lon: longitude};
    //var center = {lat: 35.021365 , lon: 135.755481};
    var mapOptions = {
            center: new google.maps.LatLng(center.lat , center.lon),
            zoom: 14,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false
        };
    var map;
    var markerArray = new Array();

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

    this.setCenter = function (latitude, longitude) {
        center = {lat: latitude , lon: longitude};
        // map.center = new google.maps.LatLng(center.lat , center.lon);
        map.setCenter(new google.maps.LatLng(center.lat , center.lon));
    }

    //APIからの結果を元にマーカーを作成
    this.mappingObject = function (json) {
        console.log(map.center);

        //仮でテスト
        //var url = 'js/test.json';

        //d3.json(url, function(error, json) {
            // console.log(json.g.rest);
            // console.log(json.p);
            // console.log(center);
            var markerG = new Array();
            var infowindowG = new Array();
            var markerP = new Array();
            var infowindowP = new Array();

            json.g.rest.forEach(function(d) {
                console.log(d);

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
                // マーカーの配列を追加
                markerG.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    for (var i = 0; i < infowindowG.length; i++) {
                        infowindowG[i].close();
                    }
                        //距離計算でToになるマーカーを配列にいれる
                        markerArray[1] = marker;
                        //距離の計算
                        if(markerArray.length >= 2) {
                            var distance = google.maps.geometry.spherical.computeDistanceBetween(markerArray[0].getPosition(), markerArray[1].getPosition());
                            console.log("距離は、"+ distance);
                        }

                    

                    map.setZoom(16);
                    map.setCenter(marker.getPosition());

                    console.log(d3.selectAll('.description'));

                    var infowindow = new google.maps.InfoWindow({
                        content: "<section class='description'><h1><a href='" + d.url + "' target='_blank'>" + d.name + "</a></h1><p>" + d.category + "(" + distance.toFixed(1) + "m)</p></section>"
                    });
                    infowindowG.push(infowindow);

                    infowindow.open(map, marker);
                });
            });

            json.p.places.forEach(function(d) {
                // console.log(d);
                for(key in d) {
                    var lat;
                    var lon;
                    var title = '情報無し';
                    var description = '情報無し';
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
                        } else if (keys.match(/usageFee/)) {
                            // console.log('long');
                            // console.log(d[key][keys][0]);
                            description = d[key][keys][0].value;
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
                        // icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=輪|7FFF00|000000',
                        icon: 'images/parking.png',
                        position: latlng, /* マーカーを立てる場所の緯度・経度 */
                        map: map, /*マーカーを配置する地図オブジェクト */
                        title: title
                    });
                    markerP.push(marker);
                    // rep = str.match(/正規表現/);



                    google.maps.event.addListener(marker, 'click', function() {
                        for (var i = 0; i < infowindowP.length; i++) {
                            infowindowP[i].close();
                        }

                        //距離計算でToになるマーカーを配列にいれる
                        markerArray[1] = marker;
                        //距離の計算
                        if(markerArray.length >= 2) {
                            var distance = google.maps.geometry.spherical.computeDistanceBetween(markerArray[0].getPosition(), markerArray[1].getPosition());
                            console.log("距離は、"+ distance);
                        }

                        map.setZoom(16);
                        map.setCenter(marker.getPosition());

                        console.log(d3.selectAll('.description'));

                        var infowindow = new google.maps.InfoWindow({
                            content: "<section class='description'><h1><a href='" + d.url + "' target='_blank'>" + title + "</a></h1><p>" + description + "(" + distance.toFixed(1) +  "m</p></section>"
                        });
                        infowindowP.push(infowindow);

                        infowindow.open(map, marker);
                    });
                }
            });

            // 緯度・経度：日本, 京都駅
            var latlng　=　new google.maps.LatLng(center.lat, center.lon);

            var marker = new google.maps.Marker({
                position: latlng, /* マーカーを立てる場所の緯度・経度 */
                map: map, /*マーカーを配置する地図オブジェクト */
                title: '京都駅'
            });

            //距離計算の時にFromとなるマーカーを配列に入れる
            markerArray[0] = marker;

  //      });
    }
}

