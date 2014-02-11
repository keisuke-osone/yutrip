//初期設定
//Mapのオブジェクトを作成
var main = new Map(34.985458 , 135.757755);

//Mapを描画
main.initialize();

//検索ボタンが押された際の処理
d3.select('#search')
	.on('click', function () {
		console.log('押されたよ');
	});
