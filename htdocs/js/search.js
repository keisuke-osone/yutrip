function getLatLng(place) {

    var geocoder = new google.maps.Geocoder();

    //geocodeリクエストを実行
    //住所,ワード→緯度経度取得の場合は、addressを指定
    geocoder.geocode({

        address: place

    }, function(results, status) {

        //検索結果取得
        var response = checkGeoCoderStatus(status);

        //エラーが返ってきた場合
        if(checkGeoCoderStatus(status) !== true) {
            alert(response);
        }

        //Todo:for-inは遅いから変更する
        //緯度経度を取得
        console.log(results);
        var latlng = new Array();
        for (var i in results) {
            if (results[i].geometry) {
                latlng[i] = results[i].geometry.location;
            }
        }
        return latlng;
        // console.log(latlng[0].d);
    });
    
}

//ジオコーダーからのレスポンスのチェック 
function checkGeoCoderStatus(status) {
  
    var result;

    switch(status) {
        case google.maps.GeocoderStatus.OK: 
            result = true;
            break;
        case google.maps.GeocoderStatus.ERROR: 
            result = 'サーバ通信中にエラーが発生しました。';
            break;
        case google.maps.GeocoderStatus.INVALID_REQUEST: 
            result = 'リクエストが不正な値です。';
            break;
        case google.maps.GeocoderStatus.OVER_QUERY_LIMIT: 
            result = 'GoogleMapAPIの使用回数上限を超えました。';
            break;
        case google.maps.GeocoderStatus.REQUEST_DENIED: 
            result = 'リクエストが拒否されました。';
            break;
        case google.maps.GeocoderStatus.UNKNOWN_ERROR: 
            result = 'ディレクションサービスのサーバ処理時にでエラーが発生しました。';
            break;
        case google.maps.GeocoderStatus.ZERO_RESULTS: 
            result = '検索結果が見つかりません。';
            break;
        default:
            result = '不明なエラーです。';
            break;
    }
    return result;
}