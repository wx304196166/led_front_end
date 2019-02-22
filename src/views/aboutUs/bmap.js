export function setMap() {
  var map;

  function initMap() {
    createMap();
    setMapEvent();
    addMapControl();
    addMapOverlay();
  }

  function createMap() {
    map = new BMap.Map("map_div");
    map.centerAndZoom(new BMap.Point(108.893736, 34.193774), 19);
  }

  function setMapEvent() {
    map.enableScrollWheelZoom();
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom()
  }

  function addClickHandler(target, window) {
    target.addEventListener("click", function () {
      target.openInfoWindow(window);
    });
  }

  function addMapOverlay() {
    var markers = [{
      content: "Room 11928, Unit 1, Building2, I-City Block,  No. 11 of Tang Yan South Road,  Zhangba Street office, Hi-tech zone, Xi'an, Shaanxi",
      title: "Visual Artisan",
      imageOffset: {
        width: -46,
        height: -21
      },
      position: {
        lat: 34.193666,
        lng: 108.893704
      }
    }];
    for (var index = 0; index < markers.length; index++) {
      var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);
      var marker = new BMap.Marker(point, {
        icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
          imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)
        })
      });
      var label = new BMap.Label(markers[index].title, {
        offset: new BMap.Size(25, 5)
      });
      var opts = {
        width: 200,
        title: markers[index].title,
        enableMessage: false
      };
      var infoWindow = new BMap.InfoWindow(markers[index].content, opts);
      marker.setLabel(label);
      addClickHandler(marker, infoWindow);
      map.addOverlay(marker);
    };
  }

  function addMapControl() {
    var scaleControl = new BMap.ScaleControl({
      anchor: BMAP_ANCHOR_BOTTOM_LEFT
    });
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_LEFT,
      type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: true
    });
    map.addControl(overviewControl);
  }
  initMap();
}
