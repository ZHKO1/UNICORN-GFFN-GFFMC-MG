<template>
  <div class="layer" :style="style">
    <img ref="img" :src="pic" draggable="false" ondragstart="(function(){return false})()">
  </div>
</template>

<script>
import Hammer from "hammerjs"
import {reqAnimationFrame} from "./../lib/drag.js"
export default {
  name: 'layer',
  data () {
    var that = this;
    return {
      ticking: false,
      X: that.START_X,
      Y: that.START_Y,
      transform : {
        translate: { x: 0, y: 0 },
        scale: 1,
        angle: 0,
        rx: 0,
        ry: 0,
        rz: 0
      },
      style: {
        "z-index": that.zIndex + 2,
      }
    }
  },
  props: {
    zIndex: Number,
    pic: String,
    type: {
      type: String,
      default: 'art'
    },
    START_X: {
      type: Number,
      default: 0
    },
    START_Y: {
      type: Number,
      default: 0
    }
  },
  methods: {
    updateElementTransform() {
      var that = this;
      var transform = that.transform;
      var el = that.$refs.img;
      var value = [
        'translate3d(' + transform.translate.x + 'px, ' + transform.translate.y + 'px, 0)',
        'scale(' + transform.scale + ', ' + transform.scale + ')',
        'rotate3d('+ transform.rx +','+ transform.ry +','+ transform.rz +','+  transform.angle + 'deg)'
      ];

      value = value.join(" ");
      el.style.webkitTransform = value;
      el.style.mozTransform = value;
      el.style.transform = value;
      that.ticking = false;
    },
    requestElementUpdate() {
      var that = this;
      if(!that.ticking) {
        reqAnimationFrame(that.updateElementTransform);
        that.ticking = true;
      }
    },
    onPan(ev) {
      var that = this;
      var el = this.$refs.img;
      el.className = '';
      that.transform.translate = {
        x: that.X + ev.deltaX,
        y: that.Y + ev.deltaY
      };
      that.requestElementUpdate();
    },
    onPanEnd (ev) {
      var that = this;
      var el = this.$refs.img;
      el.className = '';
      that.transform.translate = {
        x: that.X + ev.deltaX,
        y: that.Y + ev.deltaY
      };
      that.X = that.transform.translate.x;
      that.Y = that.transform.translate.y;
      that.requestElementUpdate();
    }
  },
  mounted () {
    var that = this;
    var el = this.$refs.img;
    var mc = new Hammer.Manager(el);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    mc.on("panstart panmove", this.onPan);
    mc.on("panend", this.onPanEnd);
    that.transform = {
      translate: { x: that.X, y: that.Y },
      scale: 1,
      angle: 0,
      rx: 0,
      ry: 0,
      rz: 0
    };
    that.requestElementUpdate();

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
  .layer{
    position: absolute;
    width: 90vw;
    height: 80vh;
    img{
      display: block;
      max-width: 90vw;
      max-height: 80vh;
      margin: 0 auto;
    }
  }
</style>
