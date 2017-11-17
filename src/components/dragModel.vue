<template>
  <div ref="dragObj">
    <slot></slot>
  </div>
</template>

<script>
import Hammer from "hammerjs"
import {reqAnimationFrame} from "./../lib/drag.js"
export default {
  name: 'dragModel',
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
      }
    }
  },
  props: {
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
      var el = that.$refs.dragObj;
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
      var el = this.$refs.dragObj;
      that.transform.translate = {
        x: parseInt(that.X) + ev.deltaX,
        y: parseInt(that.Y) + ev.deltaY
      };
      that.requestElementUpdate();
      that.$emit("onPan", {
        x: that.transform.translate.x,
        y: that.transform.translate.y,
        angle: that.transform.angle,
        scale: that.transform.scale,
        opacity: that.transform.opacity
      });
    },
    onPanEnd (ev) {
      var that = this;
      var el = this.$refs.dragObj;
      that.transform.translate = {
        x: parseInt(that.X) + ev.deltaX,
        y: parseInt(that.Y) + ev.deltaY
      };
      that.X = parseInt(that.transform.translate.x);
      that.Y = parseInt(that.transform.translate.y);
      that.requestElementUpdate();
      that.$emit("onPanEnd", {
        x: that.X,
        y: that.Y,
        angle: that.transform.angle,
        scale: that.transform.scale,
        opacity: that.transform.opacity
      });
    }
  },
  watch: {
    START_X: function (val) {
      this.X = val;
      this.transform.translate.x = parseInt(this.X);
    },
    START_Y: function (val) {
      this.Y = val;
      this.transform.translate.y = parseInt(this.Y);
    },
    START_ANGLE: function (val) {
      this.transform.translate.angle = parseInt(val);
    },
    START_SCALE: function (val) {
      this.transform.translate.scale = parseInt(val);
    },
    START_OPACITY: function (val) {
      this.transform.translate.opacity = parseInt(val);
    },
  },
  mounted () {
    var that = this;
    var el = this.$refs.dragObj;
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
</style>
