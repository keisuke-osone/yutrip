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
        // ここに入力の確認処理

        // ここから文字列取得
        // 
    });

main.mappingObject();
