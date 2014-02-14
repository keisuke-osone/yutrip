//2点間の距離を求める
function calcDistance (numClick, markerFrom, markerTo) {
	
	//クリック数が奇数の時
	if(numClick % 2 !== 0) {

		console.log("奇数回クリック");

	} else {

		// var from = markerFrom.getPosition(); //始点
		// var to   = markerTo.getPosition();   //終点
		// //距離を求める
		// var distance = google.maps.geometry.spherical.computeDistanceBetween(markerFrom, markerTo) / 1000;
		 console.log("偶数回クリック");
		// console.log("距離は" + distance);
	}

}