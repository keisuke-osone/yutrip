function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(34.985458 , 135.757755),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"),
      mapOptions);
}
    