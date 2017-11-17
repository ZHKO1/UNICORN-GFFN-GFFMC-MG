<template>
  <div class="layer" :style="style">
    <img ref="img" :src="pic" draggable="false" ondragstart="(function(){return false})()">
    <div class="layer_options">
      <el-form label-position="left" label-width="55px" :model="transform">
        <el-form-item label="x">
          <el-input v-model="transform.translate.x"></el-input>
        </el-form-item>
        <el-form-item label="y">
          <el-input v-model="transform.translate.y"></el-input>
        </el-form-item>
        <el-form-item label="angle">
          <el-input v-model="transform.angle"></el-input>
        </el-form-item>
        <el-form-item label="scale">
          <el-input v-model="transform.scale"></el-input>
        </el-form-item>
        <el-form-item label="opacity">
          <el-input v-model="transform.opacity"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitOptions()">Save</el-button>
      <el-button @click="resetOptions()">Reset</el-button>
    </div>
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
        translate: { x: that.START_X, y: that.START_Y },
        scale: that.START_SCALE,
        angle: that.START_ANGLE,
        rx: 0,
        ry: 0,
        rz: 1,
        opacity: that.START_OPACITY
      },
      style: {
        "z-index": that.zIndex,
      }
    }
  },
  props: {
    layerID: Number,
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
    },
    START_ANGLE: {
      type: Number,
      default: 0
    },
    START_SCALE: {
      type: Number,
      default: 1
    },
    START_OPACITY: {
      type: Number,
      default: 1
    },
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
      el.style.opacity = transform.opacity;
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
        x: parseInt(that.X) + ev.deltaX,
        y: parseInt(that.Y) + ev.deltaY
      };
      that.requestElementUpdate();
    },
    onPanEnd (ev) {
      var that = this;
      var el = this.$refs.img;
      el.className = '';
      that.transform.translate = {
        x: parseInt(that.X) + ev.deltaX,
        y: parseInt(that.Y) + ev.deltaY
      };
      that.X = parseInt(that.transform.translate.x);
      that.Y = parseInt(that.transform.translate.y);
      that.requestElementUpdate();
      that.$store.commit('dragSide', {
        id: that.layerID,
        x: that.X,
        y: that.Y,
        angle: that.transform.angle,
        scale: that.transform.scale,
        opacity: that.transform.opacity
      })
    },
    submitOptions() {
      var that = this;
      that.X = parseInt(that.transform.translate.x);
      that.Y = parseInt(that.transform.translate.y);
      that.requestElementUpdate();
      that.$store.commit('dragSide', {
        id: that.layerID,
        x: that.X,
        y: that.Y,
        angle: that.transform.angle,
        scale: that.transform.scale,
        opacity: that.transform.opacity
      })
    },
    resetOptions() {
      var that = this;
      that.transform.translate.x = 0;
      that.transform.translate.y = 0;
      that.X = that.transform.translate.x;
      that.Y = that.transform.translate.y;
      that.transform.angle = 0;
      that.transform.scale = 1;
      that.transform.opacity = 1;
      that.requestElementUpdate();
      that.$store.commit('dragSide', {
        id: that.layerID,
        x: that.X,
        y: that.Y,
        angle: that.transform.angle,
        scale: that.transform.scale,
        opacity: that.transform.opacity
      })
    }
  },
  mounted () {
    var that = this;
    console.log(that.transform);
    var el = this.$refs.img;
    var mc = new Hammer.Manager(el);
    mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    mc.on("panstart panmove", this.onPan);
    mc.on("panend", this.onPanEnd);
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
    .layer_options{
      position: absolute;
      width: 180px;
      top: 0px;
      right: 0px;
      padding: 30px;
      background: white;
      border-radius: 15px;
      border: 1px solid #D3D3D3;
    }
  }
</style>
