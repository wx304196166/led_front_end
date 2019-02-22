export function setMap() {
  var mapType = google.maps.MapTypeId.ROADMAP;
  var lat = 34.184445,
    lng = 108.884685,
    zoom = 19;
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng), //地图的中心点
    zoom: zoom, //地图缩放比例
    mapTypeId: mapType, //指定地图展示类型：卫星图像、普通道路
    scrollwheel: true //是否允许滚轮滑动进行缩放
  };
  var map = new google.maps.Map(document.getElementById("map_div"), mapOptions); //创建谷歌地图
  
  // 添加marker 
  var marker = new google.maps.Marker({
    map: map,
    position: new google.maps.LatLng(lat, lng)
  });
  var infowindow = new google.maps.InfoWindow({content: "Visual Artisan" }); //创建一个InfoWindow
  infowindow.open(map, marker); //把这个infoWindow绑定在选定的marker上面
  //使用谷歌地图定义的事件，给这个marker添加点击事件
  google.maps.event.addListener(marker, "click", function(){
      infowindow.open(map,marker);
  });  
  
}
