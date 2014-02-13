//初期設定
//Mapのオブジェクトを作成
var main = new Map(34.985458 , 135.757755);

//Mapを描画
main.initialize();

//検索ボタンが押された際の処理
d3.select('#search')
    .on('click', function () {
        console.log('押されたよ');
        //テキストボックス内の情報取得
        var inputText = d3.select('#search-text')[0][0].value;
        
        console.log(inputText);
        
        //検索ワードから緯度経度を取得してAPIに送る
        getLatLng(inputText, function (latlng) {
    		
    		for (var i = 0; i < latlng.length; i++) {
    			console.log(Math.round(latlng[i].d));
    			console.log(Math.round(latlng[i].e));
    			// latlng[0].d = 35.03950409999999;
    			// latlng[0].e = 135.72843090000003;
    			console.log(latlng[i].d);
    			console.log(latlng[i].e);
    			var data = new Array();
    			data.latitude = latlng[i].d;
    			data.longitude = latlng[i].e;
    			console.log(data);

                // // 仮でテスト
                var url = 'http://localhost:8888/search.php?latitude=' + data.latitude + '&longitude=' + data.longitude;

                console.log(url);
                
                d3.json(url, function(error, json) {
                    console.log(json);
                    main.mappingObject(json);
                });

    	// 		$.ajax({
	    // 			type: 'GET',
	    // 			url:'http://localhost:8888/search.php',
	    // 			async: true,
	    // 			data: data,
	    // 			success: function(result) {
	    // 				// console.log('成功');
					// 	console.log(result);
					// 	main.mappingObject(result);
					// },
					// error: function() {
					// 	alert('失敗しました');
					// },

    	// 		});	
    		}
        })        

        // ここから文字列取得
        // 
    });

// main.mappingObject();

