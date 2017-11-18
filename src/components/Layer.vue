<template>
  <div class="layer" :style="style">
    <dragModel ref="content" class="layer_content" :START_X="X" :START_Y="Y" :START_ANGLE="ANGLE" :START_SCALE="SCALE" :START_OPACITY="OPACITY" @onTap="toggleOptions" @onPan="unpdateOptions" @onPanEnd="saveOptions">
      <img :src="pic" draggable="false" ondragstart="(function(){return false})()">
    </dragModel>
    <dragModel class="layer_options" :class="{'show': showOptions}">
        <el-form label-position="left" label-width="55px">
          <el-form-item label="x">
            <el-input v-model="INPUT_X"></el-input>
          </el-form-item>
          <el-form-item label="y">
            <el-input v-model="INPUT_Y"></el-input>
          </el-form-item>
          <el-form-item label="angle">
            <el-input v-model="INPUT_ANGLE"></el-input>
          </el-form-item>
          <el-form-item label="scale">
            <el-input v-model="INPUT_SCALE"></el-input>
          </el-form-item>
          <el-form-item label="opacity">
            <el-input v-model="INPUT_OPACITY"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitOptions()">Save</el-button>
        <el-button @click="resetOptions()">Reset</el-button>
    </dragModel>
  </div>
</template>

<script>
import dragModel from './dragModel'

export default {
  name: 'layer',
  data () {
    var that = this;
    return {
      showOptions: false,
      ticking: false,
      X: that.START_X,
      Y: that.START_Y,
      SCALE: that.START_SCALE,
      ANGLE: that.START_ANGLE,
      OPACITY: that.START_OPACITY,
      INPUT_X: that.START_X,
      INPUT_Y: that.START_Y,
      INPUT_SCALE: that.START_SCALE,
      INPUT_ANGLE: that.START_ANGLE,
      INPUT_OPACITY: that.START_OPACITY,
    }
  },
  computed: {
    style: function () {
      return {
        'z-index': this.zIndex
      }
    }
  },
  props: {
    layerID: Number,
    zIndex: Number,
    pic: String,
    name: String,
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
  components: {
    dragModel
  },
  methods: {
    toggleOptions() {
      this.showOptions = !this.showOptions;
    },
    unpdateOptions({x, y}) {
      var that = this;
      that.INPUT_X = x;
      that.INPUT_Y = y;
    },
    saveOptions({x, y, angle, scale, opacity}) {
      var that = this;
      that.X = x;
      that.Y = y;
      that.ANGLE = angle;
      that.SCALE = scale;
      that.OPACITY = opacity;
      that.$store.commit('dragSide', {
        id: that.layerID,
        x: that.X,
        y: that.Y,
        angle: that.ANGLE,
        scale: that.SCALE,
        opacity: that.OPACITY
      })
    },
    submitOptions() {
      var that = this;
      that.X = parseInt(that.INPUT_X);
      that.Y = parseInt(that.INPUT_Y);
      that.ANGLE = parseInt(that.INPUT_ANGLE);
      that.SCALE = parseFloat(that.INPUT_SCALE);
      that.OPACITY = parseFloat(that.INPUT_OPACITY);
      that.$refs.content.requestElementUpdate();
      that.$store.commit('dragSide', {
        id: that.layerID,
        x: that.X,
        y: that.Y,
        angle: that.ANGLE,
        scale: that.SCALE,
        opacity: that.OPACITY
      })
    },
    resetOptions() {
      var that = this;
      that.X = 0;
      that.INPUT_X = 0;
      that.Y = 0;
      that.INPUT_Y = 0
      that.ANGLE = 0;
      that.INPUT_ANGLE = 0;
      that.SCALE = 1;
      that.INPUT_SCALE = 1;
      that.OPACITY = 1;
      that.INPUT_OPACITY = 1;
      that.$refs.content.requestElementUpdate();
      that.$store.commit('dragSide', {
        id: that.layerID,
        x: that.X,
        y: that.Y,
        angle: that.ANGLE,
        scale: that.SCALE,
        opacity: that.OPACITY
      });
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
  .layer{
    position: absolute;
    width: 90vw;
    height: 80vh;
    .layer_content{
      position: absolute;
      width:100%;
      height:100%;
      img{
        display: block;
        max-width: 90vw;
        max-height: 80vh;
        margin: 0 auto;

      }
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
      display: none;
      &.show{
        display: block;
      }
    }
  }
</style>
