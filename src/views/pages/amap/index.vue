<template>
  <div>
    <div id="container">
      <div class="stackBlur">
        <div class="stackBlur-content"></div>
      </div>
    </div>
    <div class="operation-panel">
      <el-button size="small" @click="change2Dor3D('2D')">2D</el-button>
      <el-button size="small" @click="change2Dor3D('3D')">3D</el-button>
    </div>

  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
// import * as StackBlur from 'stackblur-canvas';
export default {
  name: 'Map',
  props: {},
  data() {
    return {
      AMap: null,
      map: null,
      loca: null,
      marker: null,
      polyline: null,
      passedPolyline: null
    }
  },
  beforeCreate() {
    AMapLoader.load({
      "key": "1d69655efabee693bf2f99d8580ea7e7",  // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",                        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": ['AMap.ControlBar'],                              // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      "AMapUI": {                                 // 是否加载 AMapUI，缺省不加载
        "version": '1.1',                         // AMapUI 缺省 1.1
        "plugins": []                              // 需要加载的 AMapUI ui插件
      },
      "Loca": {                                   // 是否加载 Loca， 缺省不加载
        "version": '2.0'                        // Loca 版本，缺省 1.3.2
      }
    }).then(AMap => {
      this.$nextTick(() => this.initMap(AMap));
    }).catch(e => {
      console.error(e);
    })
  },
  created() {

  },
  mounted() {
    // StackBlur.canvasRGBA(document.getElementById('stackBlur'), 0, 0, 0, 0, 0);
  },
  methods: {
    change2Dor3D(mode) {
      if (mode === '2D') {
        this.map.setPitch(15);
        this.map.setZoom(5.29);
      }
      if (mode === '3D') {

        this.map.setPitch(60);
        this.map.setZoom(6.5);
      }
    },
    initMap(AMap) {
      this.AMap = AMap;
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        rotateEnable:true,
        viewMode: '3D', // 地图模式
        pitch: 15,
        mapStyle: "amap://styles/dark",
        center: [121.473667,31.230525],
        zoom: 5.29,
      });
      this.map.setFitView();
      this.map.addControl(new AMap.ControlBar({
        showZoomBar:false,
        showControlButton:true,
        position:{
          right:'10px',
          top:'10px'
        }
      }));
      this.loca = new window.Loca.Container({
        map: this.map,
      });

      const scatter = new window.Loca.ScatterLayer({
        loca: this.loca,
        zIndex: 10,
        opacity: 0.6,
        visible: true,
        zooms: [2, 22],
      });

      const pointGeo = new window.Loca.GeoJSONSource({
        data: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "type": 0,
                "ratio": 0.0369,
                "lineWidthRatio": 1
              },
              "geometry": {
                "type": "Point",
                "coordinates": [121.473667,31.230525]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 2,
                "ratio": 0.0189,
                "lineWidthRatio": 0.47674418604651164
              },
              "geometry": {
                "type": "Point",
                "coordinates": [117.120128,36.652069]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 3,
                "ratio": 0.0167,
                "lineWidthRatio": 0.41279069767441856
              },
              "geometry": {
                "type": "Point",
                "coordinates": [118.675724,24.874452]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 4,
                "ratio": 0.0148,
                "lineWidthRatio": 0.35755813953488375
              },
              "geometry": {
                "type": "Point",
                "coordinates": [114.304569,30.593354]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 5,
                "ratio": 0.0147,
                "lineWidthRatio": 0.35465116279069764
              },
              "geometry": {
                "type": "Point",
                "coordinates": [117.227267,31.820567]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 5,
                "ratio": 0.0147,
                "lineWidthRatio": 0.35465116279069764
              },
              "geometry": {
                "type": "Point",
                "coordinates": [113.625351,34.746303]
              }
            }
          ]
        }
      });

      scatter.setSource(pointGeo);

      scatter.setStyle({
        unit: 'meter',
        size: [100000, 100000],
        borderWidth: 0,
        texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
        duration: 2000,
        animate: true,
      });
      this.loca.add(scatter);

      // 弧线
      const pulseLink = new window.Loca.PulseLinkLayer({
        // loca,
        zIndex: 10,
        opacity: 1,
        visible: true,
        zooms: [2, 22],
        depth: true,
      });

      const geo = new window.Loca.GeoJSONSource({
        data: {
          "type": "FeatureCollection",
          "features": [
            {
              "type": "Feature",
              "properties": {
                "type": 0,
                "ratio": 0.0369,
                "lineWidthRatio": 1
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [121.473667,31.230525],
                  [117.120128,36.652069]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 0,
                "ratio": 0.0369,
                "lineWidthRatio": 1
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [117.120128,36.652069],
                  [121.473667,31.230525]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 1,
                "ratio": 0.035,
                "lineWidthRatio": 0.9447674418604651
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [121.473667,31.230525],
                  [118.675724,24.874452]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 1,
                "ratio": 0.035,
                "lineWidthRatio": 0.9447674418604651
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [118.675724,24.874452],
                  [121.473667,31.230525]

                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 2,
                "ratio": 0.0189,
                "lineWidthRatio": 0.47674418604651164
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [121.473667,31.230525],
                  [114.304569,30.593354]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 2,
                "ratio": 0.0189,
                "lineWidthRatio": 0.47674418604651164
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [114.304569,30.593354],
                  [121.473667,31.230525]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 3,
                "ratio": 0.0167,
                "lineWidthRatio": 0.41279069767441856
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [121.473667,31.230525],
                  [117.227267,31.820567]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 3,
                "ratio": 0.0167,
                "lineWidthRatio": 0.41279069767441856
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [117.227267,31.820567],
                  [121.473667,31.230525]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 4,
                "ratio": 0.0148,
                "lineWidthRatio": 0.35755813953488375
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [121.473667,31.230525],
                  [113.625351,34.746303]
                ]
              }
            },
            {
              "type": "Feature",
              "properties": {
                "type": 4,
                "ratio": 0.0148,
                "lineWidthRatio": 0.35755813953488375
              },
              "geometry": {
                "type": "LineString",
                "coordinates": [
                  [113.625351,34.746303],
                  [121.473667,31.230525]
                ]
              }
            }
          ]
        }
      });

      pulseLink.setSource(geo);
      pulseLink.setStyle({
        unit: 'px',
        dash: [40000, 0, 40000, 0],
        lineWidth: function () {
          return [3, 3];
        },
        height: function (index, feat) {
          return feat.distance / 3 + 10;
        },
        // altitude: 1000,
        smoothSteps: 30,
        speed: function () {
          return 100;
        },
        flowLength: 50,
        lineColors: function () {
          return ['rgb(183, 58, 205)', 'rgb(60, 15, 247)'];
        },
        maxHeightScale: 0.5, // 弧顶位置比例
        headColor: 'rgba(255, 191, 255, 0.8)',
        trailColor: 'rgba(208, 114, 255, 0.2)'
      });
      this.loca.add(pulseLink);
      this.loca.animate.start();

      // 图例
      /*const colors = ['#FFF8B4', '#D3F299', '#9FE084', '#5ACA70', '#00AF53', '#00873A', '#006B31', '#004835', '#003829'].reverse();
      const lengend = new window.Loca.Legend({
        loca: this.loca,
        title: {
          label: '健康度',
          fontColor: '#eee',
        },
        style: {
          backgroundColor: 'rgba(255,255,255,0.1)',
          left: '20px',
          bottom: '40px',
        },
        dataMap: [
          { label: 100, color: colors[8] },
          { label: 80, color: colors[7] },
          { label: 75, color: colors[6] },
          { label: 70, color: colors[5] },
          { label: 65, color: colors[4] },
          { label: 60, color: colors[3] },
          { label: 55, color: colors[2] },
          { label: 50, color: colors[1] },
          { label: 40, color: colors[0] },
        ],
      });*/

      // 点击事件处理
      const clickInfo = new AMap.Marker({
        anchor: 'bottom-center',
        position: [121.473667,31.230525, 0],
      });
      clickInfo.setMap(this.map);
      clickInfo.hide();
      this.map.on("click", function (e) {
        console.log(e);
        const feat = pulseLink.queryFeature(e.pixel.toArray());

        if (feat) {
          clickInfo.show();
          // const props = feat.properties;
          clickInfo.setPosition(feat.coordinates[1]);
          clickInfo.setContent(
              '<div style="text-align: center; height: 20px; width: 150px; color:#fff; font-size: 14px;">' +
              '速率: ' + feat.properties['ratio'] +
              '</div>'
          );
        } else {
          clickInfo.hide();
        }
      });

      // 或者使用 $refs 获取节点
      // this.map = new AMap.Map(this.$refs.container);
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  position: relative;
  width: 900px;
  height: 600px;
  margin: 0 auto;
}
.operation-panel {
  margin-top: 16px;
}
.stackBlur {
  position: absolute;
  top: 100px;
  right:10px;
  z-index: 1;
  width: 300px;
  height: 300px;
  border-radius: 16px;
  perspective:1200px;

}
.stackBlur-content{
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background-color: rgba(180, 180, 180, 0.2);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d; /* Safari and Chrome */
  transform-origin:50% 50% -100px;

  animation: card-rotateY 1s;
  -webkit-animation: card-rotateY 1s; /* Safari 与 Chrome */
}

@keyframes card-rotateY
{
  from {transform: rotateY(45deg);-webkit-transform: rotateY(45deg); /* Safari and Chrome */}
  to {transform: rotateY(0deg);-webkit-transform: rotateY(0deg); /* Safari and Chrome */}
}

@-webkit-keyframes card-rotateY /* Safari 与 Chrome */
{
  from {transform: rotateY(45deg);-webkit-transform: rotateY(45deg); /* Safari and Chrome */}
  to {transform: rotateY(0deg);-webkit-transform: rotateY(0deg); /* Safari and Chrome */}
}

</style>
