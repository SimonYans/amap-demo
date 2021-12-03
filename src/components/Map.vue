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
      viewMode: '2D',
      AMap: null,
      map: null,
      marker: null,
      polyline: null,
      passedPolyline: null
    }
  },
  beforeCreate() {
    AMapLoader.load({
      "key": "1d69655efabee693bf2f99d8580ea7e7",  // 申请好的Web端开发者Key，首次调用 load 时必填
      "version": "2.0",                        // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      "plugins": [],                              // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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
        this.map.setPitch(0);
      }
      if (mode === '3D') {
        this.map.setPitch(75);
      }
    },
    initMap(AMap) {
      this.AMap = AMap;
      this.map = new AMap.Map("container", {
        resizeEnable: true,
        viewMode: '3D', // 地图模式
        mapStyle: "amap://styles/dark"
      });
      this.map.setFitView();
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
  right:36px;
  z-index: 1;
  width: 300px;
  height: 300px;
  border-radius: 16px;
  perspective:600px;

}
.stackBlur-content{
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  background-color: rgba(180, 180, 180, 0.2);
  transform-orgin: 300px 150px;
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d; /* Safari and Chrome */

  animation: card-rotateY 2s;
  -webkit-animation: card-rotateY 2s; /* Safari 与 Chrome */
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
