export function setMap() {
  //初始化地图
  var map = new AMap.Map('map_div', {
    resizeEnable: true, //是否监控地图容器尺寸变化
    zoom: 19, //初始地图级别
    center: [108.885808, 34.185921], //初始地图中心点
  });
  map.setLang('en');
  var marker = new AMap.Marker({
    position: map.getCenter(),
    icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
    offset: new AMap.Pixel(0, 0)
  });

  marker.setMap(map);

  // 设置鼠标划过点标记显示的文字提示
  marker.setTitle('Room 11928, Unit 1, Building2, I-City Block');

  // 设置label标签
  // label默认蓝框白底左上角显示，样式className为：amap-marker-label
  marker.setLabel({
    //修改label相对于maker的位置
    offset: new AMap.Pixel(-50, -42),
    content: "<div class='info'>Visual Artisan</div>"
  });
}
